// src/components/features/search/SearchPanel.js
'use client';

import React, { useState } from 'react';

const SearchPanel = ({ chapters, onNavigateToChapter }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSettings, setSearchSettings] = useState({
    chapter: 'all',
    matchType: 'contains',
    sortBy: 'relevance'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Perform search
    const results = [];
    const searchQuery = query.toLowerCase();
    
    chapters.forEach((chapter, index) => {
      // Skip if searching in specific chapter and this isn't it
      if (searchSettings.chapter !== 'all' && 
          searchSettings.chapter !== index.toString()) {
        return;
      }
      
      const content = chapter.content.toLowerCase();
      let matches = false;
      
      switch (searchSettings.matchType) {
        case 'exact':
          matches = content.includes(` ${searchQuery} `);
          break;
        case 'starts':
          matches = content.match(new RegExp(`\\b${searchQuery}`, 'i'));
          break;
        case 'ends':
          matches = content.match(new RegExp(`${searchQuery}\\b`, 'i'));
          break;
        case 'contains':
        default:
          matches = content.includes(searchQuery);
          break;
      }
      
      if (matches) {
        // Get text around match for context
        const startIndex = content.indexOf(searchQuery);
        let contextStart = Math.max(0, startIndex - 50);
        let contextEnd = Math.min(content.length, startIndex + searchQuery.length + 50);
        let context = chapter.content.substring(contextStart, contextEnd);
        
        // Add ellipses if needed
        if (contextStart > 0) context = '...' + context;
        if (contextEnd < content.length) context += '...';
        
        // Count occurrences for relevance
        const occurrences = (content.match(new RegExp(searchQuery, 'g')) || []).length;
        
        results.push({
          id: chapter.id,
          title: chapter.title,
          index,
          context,
          relevance: occurrences
        });
      }
    });
    
    // Sort results
    if (searchSettings.sortBy === 'chapter') {
      results.sort((a, b) => a.index - b.index);
    } else {
      results.sort((a, b) => b.relevance - a.relevance);
    }
    
    setSearchResults(results);
    setIsSearching(false);
  };
  
  return (
    <div className="search-panel">
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in book..."
          />
          <button 
            className="btn btn-outline-secondary border-start-0" 
            type="button" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            title="Advanced Search"
          >
            <i className="bi bi-sliders"></i>
          </button>
          <button 
            className="btn btn-primary" 
            type="submit"
          >
            Search
          </button>
        </div>
        
        {showAdvanced && (
          <div className="advanced-search-panel mt-2 p-3 rounded border">
            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label small">Chapter</label>
                <select 
                  className="form-select form-select-sm" 
                  value={searchSettings.chapter}
                  onChange={(e) => setSearchSettings({...searchSettings, chapter: e.target.value})}
                >
                  <option value="all">All Chapters</option>
                  {chapters.map((chapter, index) => (
                    <option key={chapter.id} value={index}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small">Match Type</label>
                <select 
                  className="form-select form-select-sm"
                  value={searchSettings.matchType}
                  onChange={(e) => setSearchSettings({...searchSettings, matchType: e.target.value})}
                >
                  <option value="contains">Contains</option>
                  <option value="exact">Exact Match</option>
                  <option value="starts">Starts With</option>
                  <option value="ends">Ends With</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small">Sort By</label>
                <select 
                  className="form-select form-select-sm"
                  value={searchSettings.sortBy}
                  onChange={(e) => setSearchSettings({...searchSettings, sortBy: e.target.value})}
                >
                  <option value="relevance">Relevance</option>
                  <option value="chapter">Chapter Order</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
      
      {isSearching && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Searching...</span>
          </div>
          <p className="mt-2">Searching...</p>
        </div>
      )}
      
      {searchResults.length > 0 && !isSearching && (
        <div className="search-results mt-4">
          <h6 className="mb-3">Found {searchResults.length} results for "{query}"</h6>
          
          {searchResults.map((result, index) => (
            <div 
              key={index}
              className="card mb-3 search-result-item cursor-pointer hover-bg-light" 
              onClick={() => onNavigateToChapter(result.index)}
            >
              <div className="card-body py-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="card-title mb-0">{result.title}</h6>
                  <span className="badge bg-primary rounded-pill">Chapter {result.index + 1}</span>
                </div>
                <p className="card-text small mb-0" dangerouslySetInnerHTML={{
                  __html: result.context.replace(
                    new RegExp(query, 'gi'),
                    match => `<mark>${match}</mark>`
                  )
                }}></p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {searchResults.length === 0 && query && !isSearching && (
        <div className="alert alert-info mt-4">
          No results found for "{query}". Try different search terms or check the spelling.
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
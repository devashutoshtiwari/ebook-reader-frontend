// src/components/layout/Sidebar.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Sidebar = ({ isVisible, currentPath }) => {
  const [activeTab, setActiveTab] = useState('table-of-contents');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);

  // Load bookmarks and notes from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = localStorage.getItem('ebook_bookmarks');
      const savedNotes = localStorage.getItem('ebook_notes');
      
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks));
        } catch (e) {
          console.error('Error loading bookmarks:', e);
        }
      }
      
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes));
        } catch (e) {
          console.error('Error loading notes:', e);
        }
      }
    }
  }, []);

  // Handle tab switching
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Filter TOC based on search term
  const handleTocSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sample TOC data - in a real app, this would come from your book content
  const tableOfContents = [];

  // Filter TOC items based on search term
  const filteredToc = tableOfContents.filter(chapter => 
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.sections?.some(section => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <aside className={`book-sidebar ${isVisible ? 'visible' : ''}`} id="sidebar">
      {/* Reader Profile */}
      <div className="reader-profile p-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="reader-avatar">
            <span>JD</span>
          </div>
          <div>
            {/* <div className="reader-name">John Doe</div> */}
            <div className="reader-progress small text-muted">25% completed</div>
          </div>
        </div>
      </div>

      {/* Sidebar Tabs */}
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab ${activeTab === 'table-of-contents' ? 'active' : ''}`} 
          onClick={() => handleTabClick('table-of-contents')}
          aria-selected={activeTab === 'table-of-contents'}
        >
          <i className="bi bi-list-ul me-2"></i>Contents
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => handleTabClick('bookmarks')}
          aria-selected={activeTab === 'bookmarks'}
        >
          <i className="bi bi-bookmark me-2"></i>Bookmarks
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => handleTabClick('notes')}
          aria-selected={activeTab === 'notes'}
        >
          <i className="bi bi-journal-text me-2"></i>Notes
        </button>
      </div>

      {/* Table of Contents Tab */}
      {/* <div 
        id="table-of-contents" 
        className={`tab-content ${activeTab === 'table-of-contents' ? 'active' : ''}`}
        role="tabpanel"
      >
        <div className="search-within-toc p-2">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              value={searchTerm}
              onChange={handleTocSearch}
              placeholder="Find in contents..."
            />
          </div>
        </div>
        <ul className="toc-list">
          {filteredToc.map((chapter) => (
            <li className="toc-item" key={chapter.id}>
              <a 
                href={`#${chapter.id}`} 
                className={`toc-link ${currentPath === `/${chapter.id}` ? 'active' : ''}`}
              >
                <span className="chapter-badge">{chapter.id.replace('chapter', '')}</span>
                <span>{chapter.title}</span>
              </a>
              {chapter.sections && chapter.sections.length > 0 && (
                <>
                  <button 
                    className="btn-expand-toc collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#sub${chapter.id}`}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </button>
                  <ul className="collapse sub-toc-list" id={`sub${chapter.id}`}>
                    {chapter.sections.map((section) => (
                      <li className="toc-subitem" key={section.id}>
                        <a 
                          href={`#${section.id}`} 
                          className={`toc-sublink ${currentPath === `/${section.id}` ? 'active' : ''}`}
                        >
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Bookmarks Tab */}
      <div 
        id="bookmarks" 
        className={`tab-content ${activeTab === 'bookmarks' ? 'active' : ''}`}
        role="tabpanel"
      >
        {/* <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
          <h5 className="m-0">Your Bookmarks</h5>
          <div className="btn-group btn-group-sm" role="group">
            <button className="btn btn-outline-secondary btn-sm" id="sortBookmarks" title="Sort Bookmarks">
              <i className="bi bi-sort-down"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm" id="clearAllBookmarks" title="Clear All">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div> */}
        
        {bookmarks.length === 0 ? (
          <div id="emptyBookmarks" className="empty-state">
            <div className="empty-icon">
              <i className="bi bi-bookmark"></i>
            </div>
            <h5>No bookmarks yet</h5>
            <p className="text-muted">Save your favorite pages for quick access</p>
            <button className="btn btn-sm btn-primary mt-2" id="howToBookmark">
              <i className="bi bi-info-circle me-2"></i>How to bookmark
            </button>
          </div>
        ) : (
          <div id="bookmarksList">
            {bookmarks.map((bookmark) => (
              <div 
                className="p-3 border-bottom bookmark-item d-flex justify-content-between align-items-start" 
                data-chapter-id={`chapter${bookmark.id}`}
                key={bookmark.id}
              >
                <div>
                  <div className="fw-medium mb-1">{bookmark.title}</div>
                  <div className="small text-muted">Added: {bookmark.displayDate}</div>
                </div>
                <button 
                  className="btn btn-sm btn-outline-danger rounded-circle remove-bookmark" 
                  data-id={bookmark.id} 
                  aria-label="Remove bookmark"
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes Tab */}
      <div 
        id="notes" 
        className={`tab-content ${activeTab === 'notes' ? 'active' : ''}`}
        role="tabpanel"
      >
        {/* <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
          <h5 className="m-0">Your Notes</h5>
          <div className="btn-group btn-group-sm" role="group">
            <button className="btn btn-outline-secondary btn-sm" id="exportNotes" title="Export Notes">
              <i className="bi bi-download"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm" id="sortNotes" title="Sort Notes">
              <i className="bi bi-sort-down"></i>
            </button>
          </div>
        </div> */}
        
        {notes.length === 0 ? (
          <div id="emptyNotes" className="empty-state">
            <div className="empty-icon">
              <i className="bi bi-journal-text"></i>
            </div>
            <h5>No notes yet</h5>
            <p className="text-muted">Select text and add notes as you read</p>
            <button className="btn btn-sm btn-primary mt-2" id="howToNote">
              <i className="bi bi-info-circle me-2"></i>How to add notes
            </button>
          </div>
        ) : (
          <div id="notesList">
            {notes.map((note) => (
              <div 
                className={`p-3 border-bottom note-item ${note.important ? 'border-start border-4 border-primary ps-2' : ''}`}
                data-chapter-index={note.chapterIndex}
                data-note-id={note.id}
                key={note.id}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="mb-0 me-2">{note.title}</h6>
                  <div className="dropdown">
                    <button className="btn btn-sm btn-link text-muted p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                      <li><button className="dropdown-item edit-note" data-id={note.id}><i className="bi bi-pencil me-2"></i>Edit</button></li>
                      <li><button className="dropdown-item toggle-important" data-id={note.id}>
                        {note.important ? 
                          <><i className="bi bi-star-fill me-2 text-warning"></i>Remove Important</> : 
                          <><i className="bi bi-star me-2"></i>Mark as Important</>}
                      </button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item text-danger delete-note" data-id={note.id}><i className="bi bi-trash me-2"></i>Delete</button></li>
                    </ul>
                  </div>
                </div>
                <div className="fw-normal mb-2">{note.text}</div>
                {note.reference && (
                  <div className="small fst-italic text-muted mb-2 border-start border-2 ps-2">
                    "{note.reference.substring(0, 50)}{note.reference.length > 50 ? '...' : ''}"
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">{note.chapterTitle}</span>
                  <span className="small text-muted">{note.displayDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
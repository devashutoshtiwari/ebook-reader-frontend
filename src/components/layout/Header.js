// src/components/layout/Header.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchPanel from '@/components/features/search/SearchPanel';

const Header = ({ toggleSidebar, toggleTheme, isDarkMode }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className="book-header d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            <button 
              className="header-control me-2" 
              onClick={toggleSidebar}
              title="Toggle Sidebar" 
              aria-label="Toggle Sidebar"
            >
              <i className="bi bi-list fs-4"></i>
            </button>
            <h1 className="fs-4 m-0 d-none d-sm-block logo-text">
              Demo <span className="text-primary fw-bold">eBook</span>
            </h1>
          </div>
          
          <div className="d-flex align-items-center">
            <button 
              className="header-control mx-1 d-none d-sm-flex" 
              onClick={toggleSearch}
              title="Search" 
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
            
            <button 
              className="header-control mx-1" 
              id="bookmarksBtn" 
              title="Bookmarks" 
              aria-label="Bookmarks"
            >
              <i className="bi bi-bookmark"></i>
              <span className="badge-indicator bookmarks-count-badge" id="bookmarksCount"></span>
            </button>
            
            <button 
              className="header-control mx-1" 
              id="notesBtn" 
              title="Notes" 
              aria-label="Notes"
            >
              <i className="bi bi-journal-text"></i>
              <span className="badge-indicator notes-count-badge" id="notesCount"></span>
            </button>
            
            <div className="dropdown d-none d-md-block">
              <button 
                className="header-control mx-1 dropdown-toggle" 
                type="button" 
                id="toolsDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
                title="Tools" 
                aria-label="Tools"
              >
                <i className="bi bi-tools"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="toolsDropdown">
                <li><a className="dropdown-item" href="#"><i className="bi bi-download me-2"></i>Download</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-share me-2"></i>Share</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-universal-access me-2"></i>Accessibility</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-printer me-2"></i>Print</a></li>
              </ul>
            </div>
            
            <button 
              className="header-control ms-1" 
              onClick={toggleTheme}
              title="Toggle Dark Mode" 
              aria-label="Toggle Dark Mode"
            >
              <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>
            
            <button 
              className="header-control ms-1 d-md-none" 
              onClick={toggleMobileMenu}
              title="Menu" 
              aria-label="Menu"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action" onClick={() => {
            toggleSearch();
            toggleMobileMenu();
          }}>
            <i className="bi bi-search me-3"></i>Search
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <i className="bi bi-download me-3"></i>Download
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <i className="bi bi-share me-3"></i>Share
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <i className="bi bi-universal-access me-3"></i>Accessibility
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <i className="bi bi-printer me-3"></i>Print
          </a>
        </div>
      </div>

      {/* Search Container */}
      {/* {isSearchOpen && (
        <div className="search-container" style={{ display: 'block' }}>
          <div className="container">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                id="searchInput" 
                placeholder="Search in book..."
              />
              <button 
                className="btn btn-outline-secondary border-start-0" 
                type="button" 
                id="advancedSearchBtn" 
                title="Advanced Search"
              >
                <i className="bi bi-sliders"></i>
              </button>
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={toggleSearch}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        </div>
      )} */}

      {isSearchOpen && (
  <div className="search-container" style={{ display: 'block' }}>
    <div className="container">
      <SearchPanel 
        chapters={chapters} // You'll need to pass chapters down from the parent
        onNavigateToChapter={(index) => {
          navigateToChapter(index);
          setSearchOpen(false);
        }}
      />
    </div>
  </div>
)}
    </>
  );
};

export default Header;
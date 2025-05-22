// src/components/reader/Navigation.js
'use client';

import React from 'react';

const Navigation = ({ 
  currentPage, 
  totalPages, 
  progress, 
  onPrevious, 
  onNext, 
  hasPrevious = true, 
  hasNext = true 
}) => {
  return (
    <div className="page-navigation">
      <div className="d-flex align-items-center">
        <button 
          className="page-nav-btn" 
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label="Previous page"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="page-indicator">
          <span id="currentPageNum">{currentPage}</span> / <span id="totalPages">{totalPages}</span>
        </div>
        <button 
          className="page-nav-btn" 
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next page"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
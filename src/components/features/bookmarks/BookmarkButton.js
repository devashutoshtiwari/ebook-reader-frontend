// src/components/features/bookmarks/BookmarkButton.js
'use client';

import React, { useState, useEffect } from 'react';
import useEbookStore from '@/store/useEbookStore';

const BookmarkButton = ({ chapterId, chapterTitle }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { bookmarks, addBookmark } = useEbookStore();
  
  // Check if chapter is bookmarked
  useEffect(() => {
    const isMarked = bookmarks.some(bookmark => bookmark.id === chapterId);
    setIsBookmarked(isMarked);
  }, [bookmarks, chapterId]);
  
  const handleBookmarkClick = () => {
    // Toggle bookmark
    const wasAdded = addBookmark(chapterId, chapterTitle);
    
    // Show toast notification
    const toastMessage = wasAdded ? 'Page bookmarked' : 'Bookmark removed';
    showToast(toastMessage, wasAdded ? 'success' : 'info');
  };
  
  // Simple toast notification function
  const showToast = (message, type = 'primary') => {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    
    toastContainer.appendChild(toastEl);
    
    // Initialize and show the toast
    const toast = new bootstrap.Toast(toastEl, {
      animation: true,
      autohide: true,
      delay: 3000
    });
    
    toast.show();
    
    // Remove the toast element after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function () {
      toastEl.remove();
    });
  };
  
  return (
    <button 
      className="btn btn-outline-primary btn-sm rounded-circle me-2 page-action-btn" 
      onClick={handleBookmarkClick}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this page"} 
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
    >
      <i className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
    </button>
  );
};

export default BookmarkButton;
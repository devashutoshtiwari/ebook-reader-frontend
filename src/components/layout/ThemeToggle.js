// src/components/layout/ThemeToggle.js
'use client';

import React from 'react';
import useEbookStore from '@/store/useEbookStore';
import { showToast } from '@/components/ui/Toast';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useEbookStore();
  
  const handleToggle = () => {
    toggleDarkMode();
    
    // Show toast notification
    const message = darkMode ? 'Light mode enabled' : 'Dark mode enabled';
    showToast(message, 'info');
  };
  
  return (
    <button 
      className="header-control ms-1" 
      onClick={handleToggle}
      title="Toggle Dark Mode" 
      aria-label="Toggle Dark Mode"
    >
      <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
    </button>
  );
};

export default ThemeToggle;
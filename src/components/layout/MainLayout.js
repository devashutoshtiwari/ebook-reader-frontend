'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Initialize sidebar state and theme based on localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedSidebarState = localStorage.getItem('sidebarVisible');
      const initialSidebarState = savedSidebarState 
        ? savedSidebarState === 'true'
        : window.innerWidth >= 992;
      
      setSidebarVisible(initialSidebarState);
      const savedTheme = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialDarkMode = savedTheme 
        ? savedTheme === 'true'
        : prefersDark;
      
      setIsDarkMode(initialDarkMode);
      
      if (initialDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      }
    }
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    const newState = !isSidebarVisible;
    setSidebarVisible(newState);
    localStorage.setItem('sidebarVisible', String(newState));
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newState = !isDarkMode;
    setIsDarkMode(newState);
    
    if (newState) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
    
    localStorage.setItem('darkMode', String(newState));
  };

  return (
    <div className={`book-container ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode}
      />
      
      <Sidebar 
        isVisible={isSidebarVisible}
        currentPath={pathname}
      />
      
      <main className="book-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
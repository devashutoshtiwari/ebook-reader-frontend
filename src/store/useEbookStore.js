// src/store/useEbookStore.js
import { create } from 'zustand';

// Create a store to manage global eBook state
const useEbookStore = create((set, get) => ({
  // Reading state
  currentChapterIndex: 0,
  progress: 0,
  totalChapters: 0,
  
  // User preferences
  fontSize: 100, // percentage
  darkMode: false,
  
  // Collection data
  bookmarks: [],
  notes: [],
  
  // Actions
  setCurrentChapter: (index) => {
    set({ 
      currentChapterIndex: index,
      progress: ((index + 1) / get().totalChapters) * 100
    });
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebook_position', index);
    }
  },
  
  setTotalChapters: (count) => set({ totalChapters: count }),
  
  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    set({ darkMode: newDarkMode });
    
    // Update document theme
    if (typeof document !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-bs-theme');
      }
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode);
    }
  },
  
  // Initialize state from localStorage
  initializeFromStorage: () => {
    if (typeof window === 'undefined') return;
    
    // Load reading position
    const savedPosition = localStorage.getItem('ebook_position');
    if (savedPosition !== null) {
      set({ currentChapterIndex: parseInt(savedPosition) });
    }
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === 'true';
      set({ darkMode: isDarkMode });
    }
  }
}));

export default useEbookStore;
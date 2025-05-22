'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import BookmarkButton from '@/components/features/bookmarks/BookmarkButton';

const ReaderView = ({ chapters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const [narrationSpeed, setNarrationSpeed] = useState(1.0);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathChapterId = pathname.split('/').pop();
      
      if (pathChapterId && pathChapterId.startsWith('chapter')) {
        const chapterIndex = chapters.findIndex(ch => ch.id === pathChapterId);
        if (chapterIndex !== -1) {
          setCurrentChapterIndex(chapterIndex);
          return;
        }
      }
      

      const savedPosition = localStorage.getItem('ebook_position');
      if (savedPosition !== null) {
        setCurrentChapterIndex(parseInt(savedPosition));
      }
    }
  }, [pathname, chapters]);


  useEffect(() => {
    const newProgress = ((currentChapterIndex + 1) / chapters.length) * 100;
    setProgress(newProgress);
    
    // Save current position to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ebook_position', currentChapterIndex);
      localStorage.setItem('ebook_progress', Math.round(newProgress));
      localStorage.setItem('ebook_last_read', new Date().toISOString());
    }
    
    // Update URL without full page reload
    if (chapters[currentChapterIndex]) {
      const chapterId = chapters[currentChapterIndex].id;
      window.history.pushState(null, null, `/${chapterId}`);
    }
    
    // Stop any ongoing narration when chapter changes
    if (isNarrating) {
      stopNarration();
    }
  }, [currentChapterIndex, chapters, isNarrating]);

  // Navigate to specified chapter
  const navigateToChapter = (index) => {
    if (index >= 0 && index < chapters.length) {
      setCurrentChapterIndex(index);
    }
  };

  // Navigate to next chapter
  const navigateNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      navigateToChapter(currentChapterIndex + 1);
    }
  };

  // Navigate to previous chapter
  const navigatePrevious = () => {
    if (currentChapterIndex > 0) {
      navigateToChapter(currentChapterIndex - 1);
    }
  };

  // Voice narration functions
  const startNarration = () => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported in this browser');
      return;
    }

    const currentChapter = chapters[currentChapterIndex];
    if (!currentChapter) return;

    // Get chapter content for narration
    const chapterContent = currentChapter.content || 'No content available for narration.';

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(chapterContent);
    utterance.rate = narrationSpeed;
    
    // Store utterance in state so we can control it later
    setSpeechUtterance(utterance);
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    setIsNarrating(true);
    
    // Handle narration end
    utterance.onend = function() {
      setIsNarrating(false);
    };
  };

  const pauseResumeNarration = () => {
    if (!window.speechSynthesis) return;
    
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.pause();
    }
  };

  const stopNarration = () => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    setIsNarrating(false);
  };

  const changeNarrationSpeed = (speed) => {
    setNarrationSpeed(speed);
    
    // If already narrating, update the speed
    if (isNarrating && speechUtterance) {
      // Cancel current and restart with new speed
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(speechUtterance.text);
      utterance.rate = speed;
      
      // Store updated utterance in state
      setSpeechUtterance(utterance);
      
      // Resume narration
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Left arrow key - previous chapter
      if (e.key === 'ArrowLeft') {
        navigatePrevious();
      }
      // Right arrow key - next chapter
      else if (e.key === 'ArrowRight') {
        navigateNext();
      }
      // Space - toggle narration
      else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault(); // Prevent page scroll
        if (isNarrating) {
          pauseResumeNarration();
        } else {
          startNarration();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Clean up speech synthesis when component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentChapterIndex, isNarrating]);

  // Get current chapter
  const currentChapter = chapters[currentChapterIndex] || { 
    id: 'loading', 
    title: 'Loading...', 
    content: 'Loading content...' 
  };

  return (
    <div className="reader-view">
      {/* Chapter Content */}
      <motion.section 
        key={currentChapter.casestudyId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="chapter"
        id={currentChapter.casestudyId}
      >
        <div className="chapter-number">{currentChapterIndex + 1}</div>
        <div className="chapter-heading">
          <h2 className="display-title">{currentChapter.title}</h2>
          {currentChapter.casestudyMarkup && (
            <p className="chapter-intro">{currentChapter.casestudyMarkup}</p>
          )}

          {/* Page Actions */}
          // Then in the Page Actions section:
            <div className="page-actions">
                <BookmarkButton 
                    chapterId={currentChapter.casestudyId}
                    chapterTitle={currentChapter.title}
                />
                <button 
                    className="btn btn-outline-primary btn-sm rounded-circle me-2 page-action-btn" 
                    title="Add note to this page" 
                    aria-label="Add note to this page"
                >
                    <i className="bi bi-pencil"></i>
                </button>
            </div>
        </div>

        <div className="chapter-content">
          {/* Render chapter content - in a real app, you might want to use dangerouslySetInnerHTML or a markdown parser */}
          <div dangerouslySetInnerHTML={{ __html: currentChapter.content }}></div>
          
          {/* Voice Narration Control */}
          <div className="voice-controls mt-5">
            <div className="card card-body border-0 p-0">
              <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                <h5 className="mb-0 d-flex align-items-center">
                  <i className="bi bi-volume-up fs-4 me-2 text-primary"></i> Voice Narration
                </h5>
                <div className="d-flex align-items-center flex-grow-1 gap-2">
                  <div className="btn-group">
                    <button 
                      className={`btn ${isNarrating ? 'btn-success' : 'btn-primary'} voice-btn`} 
                      onClick={startNarration}
                      title="Play narration"
                    >
                      <i className="bi bi-play-fill"></i>
                    </button>
                    <button 
                      className="btn btn-outline-primary voice-btn" 
                      onClick={pauseResumeNarration}
                      title="Pause narration"
                    >
                      <i className="bi bi-pause-fill"></i>
                    </button>
                    <button 
                      className="btn btn-outline-primary voice-btn" 
                      onClick={stopNarration}
                      title="Stop narration"
                    >
                      <i className="bi bi-stop-fill"></i>
                    </button>
                  </div>
                  
                  <div className="d-flex align-items-center voice-speed-control ms-3">
                    <label htmlFor="voiceSpeed" className="me-2 mb-0 small fw-medium">Speed:</label>
                    <select 
                      id="voiceSpeed" 
                      className="form-select form-select-sm" 
                      style={{ width: '80px' }}
                      value={narrationSpeed}
                      onChange={(e) => changeNarrationSpeed(parseFloat(e.target.value))}
                    >
                      <option value="0.8">0.8x</option>
                      <option value="1">1.0x</option>
                      <option value="1.2">1.2x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2.0x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Controls */}
      <Navigation 
        currentPage={currentChapterIndex + 1}
        totalPages={chapters.length}
        progress={progress}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        hasPrevious={currentChapterIndex > 0}
        hasNext={currentChapterIndex < chapters.length - 1}
      />
    </div>
  );
};

export default ReaderView;
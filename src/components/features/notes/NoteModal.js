// src/components/features/notes/NoteModal.js
'use client';

import React, { useState, useEffect } from 'react';
import useEbookStore from '@/store/useEbookStore';

const NoteModal = ({ 
  isOpen, 
  onClose, 
  chapterId, 
  chapterTitle, 
  chapterIndex,
  selectedText = '' 
}) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const { addNote } = useEbookStore();
  
  // Set initial state
  useEffect(() => {
    if (isOpen) {
      // Default title if selected text is provided
      if (selectedText) {
        setNoteTitle(`Note on "${selectedText.substring(0, 20)}${selectedText.length > 20 ? '...' : ''}"`);
      } else {
        setNoteTitle(`Note on ${chapterTitle}`);
      }
      
      setNoteText('');
      setIsImportant(false);
    }
  }, [isOpen, selectedText, chapterTitle]);
  
  const handleSave = () => {
    // Validate
    if (!noteText.trim()) return;
    
    // Create note object
    const note = {
      title: noteTitle.trim() || `Note on ${chapterTitle}`,
      text: noteText.trim(),
      reference: selectedText || null,
      chapterId,
      chapterTitle,
      chapterIndex,
      important: isImportant
    };
    
    // Save note
    addNote(note);
    
    // Close modal
    onClose();
    
    // Show success toast
    showToast('Note saved', 'success');
  };
  
  // Simple toast notification function
  const showToast = (message, type = 'primary') => {
    // Implementation similar to BookmarkButton showToast
    // ...
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Note</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {selectedText && (
              <div className="alert alert-light">
                <strong>Selected text:</strong> <span className="text-body-secondary">&quot;{selectedText}&quot;</span>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="note-title" className="form-label">Note Title:</label>
              <input 
                type="text" 
                id="note-title" 
                className="form-control" 
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Enter a title for your note..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note-text" className="form-label">Your Note:</label>
              <textarea 
                id="note-text" 
                className="form-control" 
                rows="4" 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your note here..."
              ></textarea>
            </div>
            <div className="form-check mb-3">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="noteImportant" 
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="noteImportant">
                Mark as important
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleSave}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default NoteModal;
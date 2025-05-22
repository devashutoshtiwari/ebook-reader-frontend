// src/components/features/notes/NoteButton.js
'use client';

import React, { useState } from 'react';
import NoteModal from './NoteModal';

const NoteButton = ({ chapterId, chapterTitle, chapterIndex }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <button 
        className="btn btn-outline-primary btn-sm rounded-circle me-2 page-action-btn" 
        onClick={openModal}
        title="Add note to this page" 
        aria-label="Add note to this page"
      >
        <i className="bi bi-pencil"></i>
      </button>
      
      <NoteModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        chapterId={chapterId}
        chapterTitle={chapterTitle}
        chapterIndex={chapterIndex}
      />
    </>
  );
};

export default NoteButton;
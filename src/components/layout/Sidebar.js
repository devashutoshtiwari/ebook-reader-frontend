'use client';

import React, { useState } from 'react';

const Sidebar = ({ isVisible, currentPath }) => {
  const [activeTab, setActiveTab] = useState('customer-list');
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);

  // Handle tab switching
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <aside className={`book-sidebar ${isVisible ? 'visible' : ''}`} id="sidebar">
      {/* Reader Profile */}
      <div className="reader-profile p-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="reader-avatar">
            <span>AT</span>
          </div>
          <div>
            <div className="reader-name">Ashutosh Tiwari</div>
          </div>
        </div>
      </div>

      {/* Sidebar Tabs */}
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab ${activeTab === 'customer-list' ? 'active' : ''}`} 
          onClick={() => handleTabClick('customer-list')}
          aria-selected={activeTab === 'customer-list'}
        >
          <i className="bi bi-list-ul me-2"></i>Customers
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

      {/* Customer Tab */}
      <div 
        id="customer-list" 
        className={`tab-content ${activeTab === 'customer-list' ? 'active' : ''}`}
        role="tabpanel"
      >
        <ul className="toc-list">
          <li className="toc-item">
            <a href={`#`} className={`toc-link active`}>
              <span>All Customers</span>
            </a>
          </li>
          <li className="toc-item">
            <a href={`#`} className={`toc-link`}>
              <span>Customer Name</span>
            </a>
          </li>
          <li className="toc-item">
            <a href={`#`} className={`toc-link`}>
              <span>Customer Name</span>
            </a>
          </li>
          <li className="toc-item">
            <a href={`#`} className={`toc-link`}>
              <span>Customer Name</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Bookmarks Tab */}
      <div 
        id="bookmarks" 
        className={`tab-content ${activeTab === 'bookmarks' ? 'active' : ''}`}
        role="tabpanel"
      > 
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
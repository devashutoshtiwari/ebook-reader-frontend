'use client';
import BookmarkButton from '@/components/features/bookmarks/BookmarkButton';

export default function Casestudy({ casestudy }) {
  return (
    <div className="reader-view">
      <section className="chapter">
        <div className="chapter-heading">
          <h2 className="display-title">{casestudy.title}</h2>
          {/* Page Actions */}
            <div className="page-actions">
                <BookmarkButton/>
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
          {casestudy.casestudyMarkup}
        </div>
      </section>
    </div>
  );
}
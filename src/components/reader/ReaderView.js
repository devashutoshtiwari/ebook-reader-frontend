'use client';
import BookmarkButton from '@/components/features/bookmarks/BookmarkButton';

const ReaderView = () => {
  return (
    <div className="reader-view">
      <section className="chapter">
        <div className="chapter-heading">
          <h2 className="display-title">Insuring the Future: Noventiq Reinvents Cybersecurity for a Life Insurance Leader</h2>
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
          <div>
            <p>About the Client</p>
            <p>Ageas Federal Life Insurance is one of India&apos;s leading private life insurers, known for delivering innovative insurance solutions and customer-centric services. With a strong focus on trust and technology, the company is committed to staying ahead in an increasingly digital and threat-prone environment.</p>
            <p>About the Client</p>
            <p>Ageas Federal Life Insurance is one of India&apos;s leading private life insurers, known for delivering innovative insurance solutions and customer-centric services. With a strong focus on trust and technology, the company is committed to staying ahead in an increasingly digital and threat-prone environment.</p>
            <p>About the Client</p>
            <p>Ageas Federal Life Insurance is one of India&apos;s leading private life insurers, known for delivering innovative insurance solutions and customer-centric services. With a strong focus on trust and technology, the company is committed to staying ahead in an increasingly digital and threat-prone environment.</p>
            <p>About the Client</p>
            <p>Ageas Federal Life Insurance is one of India&apos;s leading private life insurers, known for delivering innovative insurance solutions and customer-centric services. With a strong focus on trust and technology, the company is committed to staying ahead in an increasingly digital and threat-prone environment.</p>
            <p>About the Client</p>
            <p>Ageas Federal Life Insurance is one of India&apos;s leading private life insurers, known for delivering innovative insurance solutions and customer-centric services. With a strong focus on trust and technology, the company is committed to staying ahead in an increasingly digital and threat-prone environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReaderView;
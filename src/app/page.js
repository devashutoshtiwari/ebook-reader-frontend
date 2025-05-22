'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ReaderView from '@/components/reader/ReaderView';
import { caseStudies } from '@/dummydata/casestudies';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper" style={{ display: 'flex' }}>
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading eBook...</span>
          </div>
          <p className="mt-2">Loading eBook...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <ReaderView chapters={caseStudies} />
    </MainLayout>
  );
}
'use client';

import MainLayout from '@/components/layout/MainLayout';
import ReaderView from '@/components/reader/ReaderView';
import { caseStudies } from '@/dummydata/casestudies';

export default function Home() {

  return (
    <MainLayout>
      <ReaderView chapters={caseStudies} />
    </MainLayout>
  );
}
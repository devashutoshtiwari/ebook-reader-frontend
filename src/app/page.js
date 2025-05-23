'use client';

import CasestudyList from '@/components/CasestudyList';
import MainLayout from '@/components/layout/MainLayout';
import { caseStudies } from '@/dummydata/casestudies';

export default function Home() {

  return (
    <MainLayout>
      <CasestudyList caseStudies={caseStudies}/>
    </MainLayout>
  );
}
'use client';

import CasestudyList from '@/components/CasestudyList';
import { caseStudies } from '@/dummydata/casestudies';

export default function Home() {
  return <CasestudyList caseStudies={caseStudies} />;
}

'use client';

import { use } from 'react';
import Casestudy from '@/components/Casestudy';
import { caseStudies } from '@/dummydata/casestudies';
import { notFound } from 'next/navigation';

export default function CasestudyPage({ params }) {
  const { casestudyid } = use(params);

  const casestudy = caseStudies.find((b) => b.casestudyId === casestudyid);

  if (!casestudy) {
    return notFound();
  }

  return <Casestudy casestudy={casestudy} />;
}

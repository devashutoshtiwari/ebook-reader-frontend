import { notFound } from 'next/navigation';
import Casestudy from '@/components/Casestudy';
import { caseStudies } from '@/dummydata/casestudies';

export default async function CasestudyPage({ params }) {
  const { casestudyid } = params;
  const casestudy = caseStudies.find((b) => b.casestudyId === casestudyid);

  if (!casestudy) {
    return notFound();
  }

  return (
    <>
    <Casestudy casestudy={casestudy} />
    </>
  );
}

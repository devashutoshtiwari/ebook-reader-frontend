import Link from 'next/link';

export default function CasestudyList({ caseStudies }) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Casestudies</h1>
      <div className="row">
        {caseStudies.map((casestudy) => (
          <div key={casestudy.casestudyId} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{casestudy.title}</h5>
                <p className="card-text">
                  {casestudy.casestudyMarkup.length > 100
                    ? `${casestudy.casestudyMarkup.substring(0, 100)}...`
                    : casestudy.casestudyMarkup}
                </p>
                <Link href={`/${casestudy.casestudyId}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import Link from 'next/link';
import {useState } from 'react'

export default function CasestudyList({ caseStudies }) {
    const [view, setView] = useState('tile');
     const handleViewChange = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="container mt-4">
      
    <div className='row'>
        <div className='col-md-9'>
            <div className='row'>
                <div className='col-md-3 mb-5'>
                    <select className="form-select" aria-label="Default select example">
                        <option>Select OEM</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='col-md-3 mb-5'>
                    <select className="form-select" aria-label="Default select example">
                        <option>Select Industry</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='col-md-3 mb-5'>
                    <select className="form-select" aria-label="Default select example">
                        <option>Select Solution</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='col-md-3 mb-5'>
                    <select className="form-select" aria-label="Default select example">
                        <option>Customer Approval</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            
        </div>
        <div className='col-md-3'>
            <div>
                <button
                    className={`btn btn-outline-primary me-2 ${view === 'tile' ? 'active' : ''}`}
                    onClick={() => handleViewChange('tile')}
                >
                    Tile View
                </button>
                <button
                    className={`btn btn-outline-primary ${view === 'list' ? 'active' : ''}`}
                    onClick={() => handleViewChange('list')}
                >
                    List View
                </button>
                </div>
        </div>
    </div>
      <div className="row">
        {caseStudies.map((casestudy) => (
          <div key={casestudy.casestudyid} className={`${view === "tile" ? "col-md-12 mb-4" : "col-md-4 mb-4"}`}>
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
export default function Casestudy({ casestudy }) {
  return (
    <div className="container mt-4">
      <h1>{casestudy.title}</h1>
      <p>{casestudy.casestudyMarkup}</p>
    </div>
  );
}
function JobCard({ title, company, location, salary, description }) {
  return (
    <article className="listing-card">
      <div className="listing-meta">
        <span>{company}</span>
        <span>{location}</span>
      </div>
      <h3>{title}</h3>
      <p className="salary-chip">{salary}</p>
      <p className="listing-description">{description}</p>
      <button type="button" className="primary-btn">
        Apply Now
      </button>
    </article>
  );
}

export default JobCard;

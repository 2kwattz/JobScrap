import { useState } from "react";

function SearchSection({ title, subtitle, placeholder, items }) {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const searchableText = [
      item.title,
      item.company,
      item.location,
      item.description,
      item.salary,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query.toLowerCase());
  });

  return (
    <section className="search-page">
      <div className="page-hero compact">
        <p className="eyebrow">Search Opportunities</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="search-toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
          placeholder={placeholder}
          aria-label={placeholder}
        />
      </div>

      <div className="card-grid">
        {filteredItems.map((item) => (
          <article className="listing-card" key={`${item.title}-${item.company}`}>
            <div className="listing-meta">
              <span>{item.company}</span>
              <span>{item.location}</span>
            </div>
            <h3>{item.title}</h3>
            <p className="salary-chip">{item.salary}</p>
            <p className="listing-description">{item.description}</p>
            <button type="button" className="primary-btn">
              Apply Now
            </button>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <h3>No matches yet</h3>
          <p>Try another keyword like design, frontend, marketing, or remote.</p>
        </div>
      ) : null}
    </section>
  );
}

export default SearchSection;

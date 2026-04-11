import { useState } from "react";
import JobCard from "./JobCard.jsx";

function SearchSection({ title, subtitle, placeholder, items }) {
  const [draftQuery, setDraftQuery] = useState("");
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

      <form
        className="search-toolbar search-toolbar-form"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(draftQuery);
        }}
      >
        <input
          type="search"
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
          className="search-input"
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <button type="submit" className="primary-btn search-btn">
          Search
        </button>
      </form>

      <div className="card-grid">
        {filteredItems.map((item) => (
          <JobCard
            key={`${item.title}-${item.company}`}
            title={item.title}
            company={item.company}
            location={item.location}
            salary={item.salary}
            description={item.description}
          />
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

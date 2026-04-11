import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

const highlights = [
  {
    title: "1,200+ live opportunities",
    text: "Fresh jobs and internships for tech, design, business, and operations.",
  },
  {
    title: "Fast category browsing",
    text: "Jump straight into full-time jobs or internship openings with dedicated pages.",
  },
  {
    title: "Designed for clarity",
    text: "Beautiful UI, strong hierarchy, and focused cards make scanning easy.",
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-grid">
        <div className="page-hero">
          <p className="eyebrow">Modern Career Portal</p>
          <h2>Find the right job or internship with confidence.</h2>
          <p>
            JobScrap is a clean, modern platform for discovering opportunities,
            comparing roles, and taking the next step in your career journey.
          </p>

          <div className="hero-actions">
            <Link to="/jobs" className="primary-btn link-btn">
              Explore Jobs
            </Link>
            <Link to="/internships" className="secondary-btn link-btn">
              View Internships
            </Link>
          </div>
        </div>

        <HeroCarousel />
      </section>

      <section className="highlights-grid">
        {highlights.map((item) => (
          <article className="highlight-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default HomePage;

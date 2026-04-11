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

const testimonials = [
  {
    quote:
      "CareerPilot made it much easier to compare openings without feeling overwhelmed. I found a frontend role that actually matched the kind of product work I wanted.",
    name: "Aarav Mehta",
    role: "Frontend Developer",
    outcome: "Hired in 3 weeks",
  },
  {
    quote:
      "The internship flow felt clear and intentional. I could move fast, save the right options, and stay organized while applying during my final semester.",
    name: "Riya Sharma",
    role: "Product Design Intern",
    outcome: "2 offers received",
  },
  {
    quote:
      "I liked how modern and focused everything felt. Instead of digging through clutter, I could actually spot strong opportunities and act on them quickly.",
    name: "Kabir Nair",
    role: "Marketing Associate",
    outcome: "Shortlisted by 5 companies",
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

      <section className="testimonials-section">
        <div className="page-hero compact testimonials-intro">
          <p className="eyebrow">Success Stories</p>
          <h2>People using CareerPilot are moving with more clarity.</h2>
          <p>
            From first internships to full-time roles, candidates are using the
            platform to search smarter, stay organized, and convert momentum
            into real outcomes.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <article
              className={index === 0 ? "testimonial-card featured" : "testimonial-card"}
              key={item.name}
            >
              <p className="testimonial-quote">"{item.quote}"</p>
              <div className="testimonial-footer">
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.role}
                  </p>
                </div>
                <span className="testimonial-chip">{item.outcome}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

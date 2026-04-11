import { useEffect, useState } from "react";

const slides = [
  {
    image: "/slides/slide-1.svg",
    title: "Find roles built around your strengths",
    copy: "Browse curated jobs from startups, agencies, and global teams.",
  },
  {
    image: "/slides/slide-2.svg",
    title: "Discover internships that launch careers",
    copy: "Explore early-career opportunities designed for learning and growth.",
  },
  {
    image: "/slides/slide-3.svg",
    title: "Search faster with a clearer path",
    copy: "Use focused search experiences for full-time roles and internships.",
  },
  {
    image: "/slides/slide-4.svg",
    title: "Step into a more modern job hunt",
    copy: "A clean experience that keeps discovery, details, and action in one place.",
  },
];

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="carousel-card" aria-label="Featured opportunities">
      <div className="carousel-frame">
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className={
              index === activeIndex ? "carousel-slide active" : "carousel-slide"
            }
          >
            <img src={slide.image} alt={slide.title} className="carousel-image" />
            <div className="carousel-copy">
              <p className="eyebrow">Featured Opportunity</p>
              <h3>{slide.title}</h3>
              <p>{slide.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="carousel-dots" aria-label="Slide controls">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === activeIndex ? "dot active" : "dot"}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="page-hero compact">
        <p className="eyebrow">Contact Us</p>
        <h2>We would love to hear from you.</h2>
        <p>
          Reach out for partnership requests, hiring support, or general
          questions about opportunities on JobScrap.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-card">
          <h3>Get in touch</h3>
          <p>Email: hello@jobscrap.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bengaluru, India</p>
        </div>

        <form className="contact-card contact-form">
          <label>
            Full Name
            <input type="text" placeholder="Enter your name" />
          </label>

          <label>
            Email Address
            <input type="email" placeholder="Enter your email" />
          </label>

          <label>
            Message
            <textarea rows="5" placeholder="Tell us how we can help" />
          </label>

          <button type="button" className="primary-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;

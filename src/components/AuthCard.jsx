import { Link } from "react-router-dom";

function AuthCard({
  eyebrow,
  title,
  description,
  fields,
  buttonLabel,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  secondaryLinkLabel,
  secondaryLinkTo,
}) {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="page-hero auth-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <form className="contact-card auth-form">
          {fields.map((field) => (
            <label key={field.label}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea rows="5" placeholder={field.placeholder} />
              ) : (
                <input type={field.type} placeholder={field.placeholder} />
              )}
            </label>
          ))}

          <button type="button" className="primary-btn">
            {buttonLabel}
          </button>

          <div className="auth-links">
            {secondaryLinkTo ? (
              <Link to={secondaryLinkTo} className="text-link">
                {secondaryLinkLabel}
              </Link>
            ) : null}
            <p>
              {footerText}{" "}
              <Link to={footerLinkTo} className="text-link">
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AuthCard;

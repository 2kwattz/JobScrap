import { Link } from "react-router-dom";
import { useState } from "react";

function LoginCard() {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login form:", formData);
  };

  return (
    <section className="auth-page auth-page-login">
      <div className="auth-shell auth-shell-login">
        <div className="page-hero auth-intro auth-intro-login">
          <span className="auth-badge">Career Hub</span>
          <p className="eyebrow">Welcome Back</p>
          <h2>Step back into your job search with clarity and momentum.</h2>
          <p>
            Review saved opportunities, track applications, and keep your next
            move organized in one polished workspace.
          </p>

          <div className="auth-meta-list">
            <div className="auth-meta-item">
              <span>Saved roles</span>
              <strong>120+</strong>
            </div>
            <div className="auth-meta-item">
              <span>Active applications</span>
              <strong>24</strong>
            </div>
            <div className="auth-meta-item">
              <span>Response tracking</span>
              <strong>Real-time</strong>
            </div>
          </div>
        </div>

        <form className="contact-card auth-form auth-form-login" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <p className="eyebrow">Member Access</p>
            <h3>Sign in to your dashboard</h3>
            <p>Pick up where you left off with saved roles and application tracking.</p>
          </div>

          <label className="auth-field">
            Email Address
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter your email"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="primary-btn">
            Login
          </button>

          <div className="auth-links auth-links-login">
            <Link to="/reset-password" className="text-link">
              Forgot password?
            </Link>
            <p>
              New here? <Link to="/register" className="text-link">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginCard;

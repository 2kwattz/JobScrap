import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../apis/apis";

function RegisterCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    securityQuestionAnswer: "",
    profilePicture: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreview("");
      setFormData({
        ...formData,
        profilePicture: "",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(imageData);
      setFormData((currentFormData) => ({
        ...currentFormData,
        profilePicture: imageData,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("User Registered:", response);
      alert("User Registered")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="page-hero auth-intro">
          <p className="eyebrow">Join JobScrap</p>
          <h2>Create your account and unlock better opportunities.</h2>
          <p>
            Sign up to save roles, build your profile, and stay organized
            throughout your job hunt.
          </p>
        </div>

        <form className="contact-card auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <label className="auth-field">
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>

            <label className="auth-field">
              Last Name
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            Security Question Answer
            <input
              type="text"
              name="securityQuestionAnswer"
              placeholder="Enter your security answer"
              value={formData.securityQuestionAnswer}
              onChange={handleChange}
            />
          </label>

          <label className="auth-field">
            Profile Picture
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {imagePreview ? (
            <div className="image-upload-preview">
              <img src={imagePreview} alt="Profile preview" className="image-upload-preview-img" />
            </div>
          ) : null}

          <button type="submit" className="primary-btn">
            Register
          </button>

          <div className="auth-links">
            <p>
              Already have an account? <Link to="/login" className="text-link">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterCard;

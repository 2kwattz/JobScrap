import { useState } from "react";
import profileAvatar from "../assets/profileAvatar.svg";

const profileStats = [
  { label: "Applications Sent", value: "18" },
  { label: "Saved Jobs", value: "07" },
  { label: "Interviews", value: "03" },
];

const savedRoles = [
  {
    title: "Frontend Developer",
    company: "NovaPixel Studio",
    status: "Applied 2 days ago",
  },
  {
    title: "UI/UX Design Intern",
    company: "Studio Harbor",
    status: "Saved for later",
  },
  {
    title: "Backend Engineer",
    company: "CloudSprint",
    status: "Interview scheduled",
  },
];

const profileHighlights = [
  "React and UI architecture",
  "Design systems and accessibility",
  "API integration and dashboards",
  "Portfolio and resume optimization",
];

function ProfilePageView() {
  const [avatar, setAvatar] = useState(profileAvatar);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="profile-page">
      <div className="page-hero compact">
        <p className="eyebrow">User Profile</p>
        <h2>Your career dashboard at a glance.</h2>
        <p>
          Track your applications, highlight your strengths, and manage the
          opportunities that matter most to you.
        </p>
      </div>

      <div className="profile-layout">
        <article className="profile-card profile-overview">
          <div className="profile-photo-panel">
            <img
              src={avatar}
              alt="Profile portrait of Aarav Rao"
              className="profile-avatar profile-photo"
            />
            <label className="profile-photo-action">
              <input
                type="file"
                accept="image/*"
                className="profile-photo-input"
                onChange={handlePhotoChange}
              />
              Change Photo
            </label>
          </div>
          <div className="profile-overview-copy">
            <div className="profile-badge-row">
              <span className="profile-badge">Open to work</span>
              <span className="profile-badge secondary">Frontend Specialist</span>
            </div>
            <h3>Aarav Rao</h3>
            <p>Frontend Developer | Bengaluru, India</p>
            <p>
              Building responsive web experiences with React, UI systems, and a
              sharp eye for product detail.
            </p>
            <div className="profile-skill-list">
              {profileHighlights.map((item) => (
                <span key={item} className="profile-skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="profile-stats">
          {profileStats.map((stat) => (
            <article className="profile-card stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </article>
          ))}
        </div>

        <article className="profile-card">
          <h3>Profile Details</h3>
          <div className="detail-list">
            <div className="detail-row">
              <span>Email</span>
              <strong>aarav@example.com</strong>
            </div>
            <div className="detail-row">
              <span>Phone</span>
              <strong>+91 98765 12345</strong>
            </div>
            <div className="detail-row">
              <span>Experience</span>
              <strong>2+ years</strong>
            </div>
            <div className="detail-row">
              <span>Preferred Roles</span>
              <strong>Frontend, UI Engineer, Product-Focused Developer</strong>
            </div>
            <div className="detail-row">
              <span>Portfolio</span>
              <strong>aaravrao.dev</strong>
            </div>
          </div>
        </article>

        <article className="profile-card">
          <h3>Saved & Recent Roles</h3>
          <div className="saved-role-list">
            {savedRoles.map((role) => (
              <div className="saved-role-item" key={`${role.title}-${role.company}`}>
                <div>
                  <strong>{role.title}</strong>
                  <p>{role.company}</p>
                </div>
                <span>{role.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="profile-card profile-card-wide">
          <h3>About Me</h3>
          <p className="profile-about">
            I enjoy building modern product experiences that feel fast, usable,
            and visually refined. My current focus is frontend engineering with
            React, reusable components, and shipping interfaces that balance
            business goals with user experience.
          </p>
        </article>
      </div>
    </section>
  );
}

export default ProfilePageView;

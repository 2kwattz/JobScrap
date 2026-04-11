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

function ProfilePage() {
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
          <div className="profile-avatar">AR</div>
          <div>
            <h3>Aarav Rao</h3>
            <p>Frontend Developer • Bengaluru, India</p>
            <p>
              Building responsive web experiences with React, UI systems, and a
              sharp eye for product detail.
            </p>
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
            <p>Email: aarav@example.com</p>
            <p>Phone: +91 98765 12345</p>
            <p>Experience: 2+ years</p>
            <p>Preferred Roles: Frontend, UI Engineer, Product-focused Developer</p>
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
      </div>
    </section>
  );
}

export default ProfilePage;

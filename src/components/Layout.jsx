import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Internships", to: "/internships" },
  { label: "Profile", to: "/profile" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
  { label: "Contact Us", to: "/contact" },
];

function Layout() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">JS</div>
          <div>
            <p className="brand-kicker">Career Discovery Platform</p>
            <h1 className="brand-name">JobScrap</h1>
          </div>
        </div>

        <nav className="topnav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>JobScrap helps students and professionals find the right next move.</p>
        <p>Built for jobs, internships, and better opportunities.</p>
      </footer>
    </div>
  );
}

export default Layout;

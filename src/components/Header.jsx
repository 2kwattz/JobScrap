import { NavLink } from "react-router-dom";
import Logo from "../../src/assets/logoText.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
  { label: "Internships", to: "/internships" },
  { label: "Profile", to: "/profile" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
  { label: "Contact Us", to: "/contact" },
];

function Header() {
  return (
    <header className="topbar">
      <div className="brand-block">
        <img src={Logo} alt="JobScrap" className="brand-logo" />
      </div>

      <nav className="topnav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;

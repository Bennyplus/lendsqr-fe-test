import React from "react";
import "../styles/navbar.scss";

// Assets
import logoIcon from "../assets/Union.svg";
import logoText from "../assets/lendsqr.svg";

// Use a placeholder for the avatar if you don't have one, or import it
// Ideally, the user image would come from a prop or context
import avatarPlaceholder from "../assets/image 4.svg";
import np_1 from "../assets/np_1.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* 1. Logo Section */}
      <div className="navbar-logo">
        <img src={logoIcon} alt="Lendsqr Logo" className="logo-icon" />
        <img src={logoText} alt="lendsqr" className="logo-text" />
      </div>

      {/* 2. Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search for anything" />
        <button type="button">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {/* 3. Right Actions */}
      <div className="navbar-actions">
        <a href="#" className="docs-link">
          Docs
        </a>

        {/* Notification Bell */}
        <img src={np_1} alt="Notification Bell" className="notification-icon" />

        <div className="user-profile">
          <img src={avatarPlaceholder} alt="User Avatar" className="avatar" />
          <span className="user-name">Adedeji</span>
          <svg
            className="dropdown-icon"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#213F7D" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

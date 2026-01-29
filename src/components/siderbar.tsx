import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/sidebar.scss";
import userIcon from "../assets/user-friends 1.png";
import guarantorIcon from "../assets/users 1.svg";
import loanIcon from "../assets/sack 1.png";
import decisionIcon from "../assets/handshake-regular 1.png";
import savingsIcon from "../assets/piggy-bank 1.svg";
import loanRequestIcon from "../assets/Group 104.svg";
import whitelistIcon from "../assets/user-check 1.png";
import karmaIcon from "../assets/user-times 1.png";
import businessIcon from "../assets/briefcase 1.png";
import savingsProductsIcon from "../assets/np_bank_148501_000000 1.png";
import feesAndChargesIcon from "../assets/coins-solid 1.png";
import transactionsIcon from "../assets/icon19.png";
import reportsIcon from "../assets/chart-bar 2.svg";
import servicesIcon from "../assets/galaxy 1.png";
import serviceAccountIcon from "../assets/user-cog 1.png";
import settlementsIcon from "../assets/scroll 1.png";
import slidersIcon from "../assets/sliders-h 1.png";
import auditLogsIcon from "../assets/clipboard-list 1.png";
import feesAndChargesIcon2 from "../assets/badge-percent 1.png";
// Placeholder Icons (Using simple SVGs or imported assets if available)
// Ideally, we imports these from assets folder. using inline SVGs for speed/demo.
const BriefcaseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33333 4.66667H12.6667C13.4 4.66667 14 5.26667 14 6V13.3333C14 14.0667 13.4 14.6667 12.6667 14.6667H3.33333C2.6 14.6667 2 14.0667 2 13.3333V6C2 5.26667 2.6 4.66667 3.33333 4.66667ZM11.3333 4.66667V3.33333C11.3333 2.6 10.7333 2 10 2H6C5.26667 2 4.66667 2.6 4.66667 3.33333V4.66667H11.3333ZM3.33333 13.3333V6H12.6667V13.3333H3.33333ZM8 7.33333C6.89543 7.33333 6 8.22876 6 9.33333C6 10.4379 6.89543 11.3333 8 11.3333C9.10457 11.3333 10 10.4379 10 9.33333C10 8.22876 9.10457 7.33333 8 7.33333Z"
      fill="#213F7D"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.33333L2 6.66667V13.3333C2 14.0667 2.6 14.6667 3.33333 14.6667H6V10H10V14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3333V6.66667L8 1.33333Z"
      fill="#213F7D"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
      fill="#213F7D"
    />
  </svg>
);

// Generic placeholder icon for others
const GenericIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="4" fill="#213F7D" />
  </svg>
);

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button
        className="toggle-button"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? (
          // Expand icon (chevron right)
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Collapse icon (chevron left)
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Global Switcher */}
      <div className="org-switcher">
        <BriefcaseIcon />
        <span>Switch Organization</span>
        <svg
          className="arror-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10L12 15L17 10H7Z" fill="#213F7D" />
        </svg>
      </div>

      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `nav-item dashboard-item ${isActive ? "active" : ""}`
        }
      >
        <HomeIcon />
        <span>Dashboard</span>
      </NavLink>

      {/* CUSTOMERS */}
      <div className="section-header">CUSTOMERS</div>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `nav-item ${isActive || location.pathname.startsWith("/users") ? "active" : ""}`
        }
      >
        <img src={userIcon} alt="usericon" />
        <span>Users</span>
      </NavLink>
      <div className="nav-item">
        <img src={guarantorIcon} alt="guarantoricon" />
        <span>Guarantors</span>
      </div>
      <div className="nav-item">
        <img src={loanIcon} alt="loanicon" />
        <span>Loans</span>
      </div>
      <div className="nav-item">
        <img src={decisionIcon} alt="decisionicon" />
        <span>Decision Models</span>
      </div>
      <div className="nav-item">
        <img src={savingsIcon} alt="savingsicon" />
        <span>Savings</span>
      </div>
      <div className="nav-item">
        <img src={loanRequestIcon} alt="loanrequesticon" />
        <span>Loan Requests</span>
      </div>
      <div className="nav-item">
        <img src={whitelistIcon} alt="whitelisticon" />
        <span>Whitelist</span>
      </div>
      <div className="nav-item">
        <img src={karmaIcon} alt="karmaicon" />
        <span>Karma</span>
      </div>

      {/* BUSINESSES */}
      <div className="section-header">BUSINESSES</div>
      <div className="nav-item">
        <img src={businessIcon} alt="businessicon" />
        <span>Organization</span>
      </div>
      <div className="nav-item">
        <img src={loanRequestIcon} alt="loanRequestIcon" />
        <span>Loan Products</span>
      </div>
      <div className="nav-item">
        <img src={savingsProductsIcon} alt="savingsProductsIcon" />
        <span>Savings Products</span>
      </div>
      <div className="nav-item">
        <img src={feesAndChargesIcon} alt="feesAndChargesIcon" />
        <span>Fees and Charges</span>
      </div>
      <div className="nav-item">
        <img src={transactionsIcon} alt="transactionsIcon" />
        <span>Transactions</span>
      </div>
      <div className="nav-item">
        <img src={servicesIcon} alt="servicesIcon" />
        <span>Services</span>
      </div>
      <div className="nav-item">
        <img src={serviceAccountIcon} alt="serviceAccountIcon" />
        <span>Service Account</span>
      </div>
      <div className="nav-item">
        <img src={settlementsIcon} alt="settlementsIcon" />
        <span>Settlements</span>
      </div>
      <div className="nav-item">
        <img src={reportsIcon} alt="reportsIcon" />
        <span>Reports</span>
      </div>

      {/* SETTINGS */}
      <div className="section-header">SETTINGS</div>
      <div className="nav-item">
        <img src={slidersIcon} alt="slidersIcon" />
        <span>Preferences</span>
      </div>
      <div className="nav-item">
        <img src={feesAndChargesIcon2} alt="feesAndChargesIcon" />
        <span>Fees and Pricing</span>
      </div>
      <div className="nav-item">
        <img src={auditLogsIcon} alt="auditLogsIcon" />
        <span>Audit Logs</span>
      </div>
    </div>
  );
};

export default Sidebar;

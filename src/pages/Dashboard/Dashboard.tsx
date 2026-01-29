import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import "../../styles/dashboard.scss";
import Sidebar from "../../components/siderbar";
import FilterModal, { type FilterValues } from "../../components/filtermodal";
import { Eye } from "lucide-react";
import blacklistIcon from "../../assets/blacklist.png";
import activateIcon from "../../assets/activate.png";
import { getUsers } from "../../api/users";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";

interface UserData {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilterHeader, setActiveFilterHeader] = useState<string | null>(
    null,
  );
  const [activeKebabId, setActiveKebabId] = useState<number | null>(null);

  // API States
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let cachedUsers = localStorage.getItem("lendsqr_users");
      let usersData: UserData[] = [];

      if (cachedUsers) {
        usersData = JSON.parse(cachedUsers);
      } else {
        // Fetch everything once
        const response = await getUsers();
        usersData = response.data;
        localStorage.setItem("lendsqr_users", JSON.stringify(usersData));
      }

      setAllUsers(usersData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Simulate loading state for visual feedback when changing pages or filters
  useEffect(() => {
    if (allUsers.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 400); // Short delay to show the "blue spinner" visual cue
      return () => clearTimeout(timer);
    }
  }, [currentPage, pageSize, activeFilters]);

  // Derive unique organizations for filter dropdown
  const organizations = Array.from(
    new Set(allUsers.map((u) => u.organization)),
  ).sort();

  // Filtered users logic
  const filteredUsers = allUsers.filter((user) => {
    const orgMatch =
      !activeFilters.organization ||
      user.organization === activeFilters.organization;
    const userMatch =
      !activeFilters.username ||
      user.username
        .toLowerCase()
        .includes(activeFilters.username.toLowerCase());
    const emailMatch =
      !activeFilters.email ||
      user.email.toLowerCase().includes(activeFilters.email.toLowerCase());
    const phoneMatch =
      !activeFilters.phoneNumber ||
      user.phoneNumber.includes(activeFilters.phoneNumber);
    const statusMatch =
      !activeFilters.status || user.status === activeFilters.status;

    let dateJoinedMatch = true;
    if (activeFilters.dateJoined) {
      const selectedDate = new Date(activeFilters.dateJoined);
      const userDate = new Date(user.dateJoined);
      // Compare only date part (ignoring potential time differences)
      dateJoinedMatch =
        selectedDate.getFullYear() === userDate.getFullYear() &&
        selectedDate.getMonth() === userDate.getMonth() &&
        selectedDate.getDate() === userDate.getDate();
    }

    return (
      orgMatch &&
      userMatch &&
      emailMatch &&
      phoneMatch &&
      statusMatch &&
      dateJoinedMatch
    );
  });

  // Derived stats from ALL users
  const totalUsersCount = allUsers.length;
  const activeUsersTotal = allUsers.filter((u) => u.status === "Active").length;
  const loanUsersTotal = Math.floor(totalUsersCount * 0.24);
  const savingUsersTotal = Math.floor(totalUsersCount * 0.18);

  // Pagination logic based on FILTERED users
  const totalUsersShowing = filteredUsers.length;
  const startIndex = (currentPage - 1) * pageSize;
  const users = filteredUsers.slice(startIndex, startIndex + pageSize);

  const toggleFilterModal = (header: string) => {
    if (activeFilterHeader === header) {
      setActiveFilterHeader(null);
    } else {
      setActiveFilterHeader(header);
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveKebabId(null);
    };

    if (activeKebabId !== null) {
      window.addEventListener("click", handleGlobalClick);
    }

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [activeKebabId]);

  const totalPages = Math.ceil(totalUsersShowing / pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterSubmit = (filters: FilterValues) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const range = 2; // Number of pages to show around current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > range + 2) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - range);
      const end = Math.min(totalPages - 1, currentPage + range);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (range + 1)) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h2 className="page-title">Users</h2>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="icon-wrapper pink">
                <img src={icon1} alt="icon1" />
              </div>
              <span className="stat-label">Users</span>
              <span className="stat-value">
                {totalUsersCount.toLocaleString()}
              </span>
            </div>

            <div className="stat-card">
              <div className="icon-wrapper purple">
                <img src={icon2} alt="icon2" />
              </div>
              <span className="stat-label">Active Users</span>
              <span className="stat-value">
                {activeUsersTotal.toLocaleString()}
              </span>
            </div>

            <div className="stat-card">
              <div className="icon-wrapper orange">
                <img src={icon3} alt="icon3" />
              </div>
              <span className="stat-label">Users with Loans</span>
              <span className="stat-value">
                {loanUsersTotal.toLocaleString()}
              </span>
            </div>

            <div className="stat-card">
              <div className="icon-wrapper red">
                <img src={icon4} alt="icon4" />
              </div>
              <span className="stat-label">Users with Savings</span>
              <span className="stat-value">
                {savingUsersTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-container">
            {error && <div className="error-message">{error}</div>}

            {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}

            <table className={loading ? "loading-opacity" : ""}>
              <thead>
                <tr>
                  {[
                    "Organization",
                    "Username",
                    "Email",
                    "Phone Number",
                    "Date Joined",
                    "Status",
                  ].map((header) => (
                    <th key={header}>
                      <div className="header-content">
                        {header}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFilterModal(header);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            d="M6.22222 11.5556H9.77778V10.2222H6.22222V11.5556ZM0 4.44444V5.77778H16V4.44444H0ZM2.66667 8.66667H13.3333V7.33333H2.66667V8.66667Z"
                            fill="#545F7D"
                          />
                        </svg>
                        {activeFilterHeader === header && (
                          <FilterModal
                            onClose={() => setActiveFilterHeader(null)}
                            onFilter={handleFilterSubmit}
                            onReset={handleFilterReset}
                            organizations={organizations}
                            initialFilters={activeFilters}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && !loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.organization}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        {new Date(user.dateJoined).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${user.status.toLowerCase()}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="action-cell">
                        <div
                          className="kebab-wrapper"
                          style={{ position: "relative" }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveKebabId(
                                activeKebabId === user.id ? null : user.id,
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <path
                              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                              stroke="#545F7D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                              stroke="#545F7D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                              stroke="#545F7D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          {activeKebabId === user.id && (
                            <div className="kebab-dropdown">
                              <div
                                className="dropdown-item"
                                onClick={() =>
                                  navigate(`/dashboard/users/${user.id}`)
                                }
                              >
                                <Eye size={16} />
                                <span>View Details</span>
                              </div>
                              <div className="dropdown-item">
                                <img src={blacklistIcon} alt="" width="16" />
                                <span>Blacklist User</span>
                              </div>
                              <div className="dropdown-item">
                                <img src={activateIcon} alt="" width="16" />
                                <span>Activate User</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination">
              <div className="showing-text">
                Showing
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                out of {totalUsersShowing}
              </div>
              <div className="page-controls">
                <button
                  className="nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {getPageNumbers().map((page, i) => (
                  <React.Fragment key={i}>
                    {page === "..." ? (
                      <span className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        className={currentPage === page ? "active" : ""}
                        onClick={() => handlePageChange(page as number)}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}

                <button
                  className="nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

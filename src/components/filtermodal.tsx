import React, { useState } from "react";
import "../styles/filtermodal.scss";

export interface FilterValues {
  organization?: string;
  username?: string;
  email?: string;
  dateJoined?: string;
  phoneNumber?: string;
  status?: string;
}

interface FilterModalProps {
  onClose: () => void;
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
  organizations: string[];
  initialFilters?: FilterValues;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  onFilter,
  onReset,
  organizations = [],
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({});
    onReset?.();
    onClose?.();
  };

  const handleFilter = () => {
    onFilter?.(filters);
    onClose?.();
  };

  return (
    <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
      <div className="filter-field">
        <label>Organization</label>
        <div className="select-wrapper">
          <select
            name="organization"
            value={filters.organization || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select
            </option>
            {organizations?.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          <svg className="chevron" viewBox="0 0 24 24">
            <path d="M7 10L12 15L17 10H7Z" />
          </svg>
        </div>
      </div>

      <div className="filter-field">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="User"
          value={filters.username || ""}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email || ""}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Date</label>
        <div className="date-wrapper">
          <input
            type="date"
            name="dateJoined"
            value={filters.dateJoined || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={filters.phoneNumber || ""}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Status</label>
        <div className="select-wrapper">
          <select
            name="status"
            value={filters.status || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
          <svg className="chevron" viewBox="0 0 24 24">
            <path d="M7 10L12 15L17 10H7Z" />
          </svg>
        </div>
      </div>

      <div className="filter-actions">
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
        <button type="button" className="filter-btn" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterModal;

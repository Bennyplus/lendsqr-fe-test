import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/siderbar";
import { ArrowLeft, User, Star } from "lucide-react";
import "../../styles/user-detail.scss";
import { getUserById } from "../../api/users";

interface UserProfile {
  fullName: string;
  avatar: string;
  tier: number;
  gender: string;
  bvn: string;
  maritalStatus: string;
  children: number | string;
  residenceType: string;
}

interface AccountInfo {
  balance: number;
  bankName: string;
  accountNumber: string;
}

interface EducationEmployment {
  educationLevel: string;
  employmentStatus: string;
  employmentSector: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: { min: number; max: number };
  loanRepayment: number;
}

interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

interface UserFullData {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  profile: UserProfile;
  account: AccountInfo;
  educationEmployment: EducationEmployment;
  socials: Socials;
  guarantors: Guarantor[];
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        // 1. Try to find user in localStorage first
        const cachedUsers = localStorage.getItem("lendsqr_users");
        if (cachedUsers) {
          const users: any[] = JSON.parse(cachedUsers);
          // Use == to handle potential string/number ID mismatches
          const user = users.find((u) => u.id == id);
          if (user) {
            setUserData(user);
            setLoading(false);
            return;
          }
        }

        // 2. Fallback to API if not found in cache
        const data = await getUserById(id!);
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="dashboard-content">
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading user details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="dashboard-content">
            <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
              {error || "User not found"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="dashboard-content">
          <div className="user-detail-page">
            <Link to="/dashboard" className="back-link">
              <ArrowLeft />
              <span>Back to Users</span>
            </Link>

            <div className="header-section">
              <h2 className="page-title">User Details</h2>
              <div className="action-buttons">
                <button className="blacklist-btn">Blacklist User</button>
                <button className="activate-btn">Activate User</button>
              </div>
            </div>

            {/* Summary Card */}
            <div className="user-card">
              <div className="card-top">
                <div className="profile-info">
                  <div className="avatar">
                    {userData.profile.avatar ? (
                      <img src={userData.profile.avatar} alt="" />
                    ) : (
                      <User />
                    )}
                  </div>
                  <div className="name-id">
                    <h2>{userData.profile.fullName}</h2>
                    <p>{userData.username}</p>
                  </div>
                </div>

                <div className="tier-info">
                  <p>User's Tier</p>
                  <div className="stars">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        fill={
                          i < userData.profile.tier ? "currentColor" : "none"
                        }
                        className={i < userData.profile.tier ? "filled" : ""}
                      />
                    ))}
                  </div>
                </div>

                <div className="balance-info">
                  <h3>₦{userData.account.balance.toLocaleString()}</h3>
                  <p>
                    {userData.account.accountNumber}/{userData.account.bankName}
                  </p>
                </div>
              </div>

              <div className="card-tabs">
                <div className="tab active">General Details</div>
                <div className="tab">Documents</div>
                <div className="tab">Bank Details</div>
                <div className="tab">Loans</div>
                <div className="tab">Savings</div>
                <div className="tab">App and System</div>
              </div>
            </div>

            {/* Full Details Container */}
            <div className="details-container">
              {/* Personal Information */}
              <section className="info-section">
                <h4>Personal Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <span>{userData.profile.fullName}</span>
                  </div>
                  <div className="info-item">
                    <label>Username</label>
                    <span>{userData.username}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone Number</label>
                    <span>{userData.phoneNumber}</span>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <span>{userData.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Bvn</label>
                    <span>{userData.profile.bvn}</span>
                  </div>
                  <div className="info-item">
                    <label>Gender</label>
                    <span>{userData.profile.gender}</span>
                  </div>
                  <div className="info-item">
                    <label>Marital Status</label>
                    <span>{userData.profile.maritalStatus}</span>
                  </div>
                  <div className="info-item">
                    <label>Children</label>
                    <span>{userData.profile.children || "None"}</span>
                  </div>
                  <div className="info-item">
                    <label>Type of Residence</label>
                    <span>{userData.profile.residenceType}</span>
                  </div>
                </div>
              </section>

              {/* Education and Employment */}
              <section className="info-section">
                <h4>Education and Employment</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Level of Education</label>
                    <span>{userData.educationEmployment.educationLevel}</span>
                  </div>
                  <div className="info-item">
                    <label>Employment Status</label>
                    <span>{userData.educationEmployment.employmentStatus}</span>
                  </div>
                  <div className="info-item">
                    <label>Sector of Employment</label>
                    <span>{userData.educationEmployment.employmentSector}</span>
                  </div>
                  <div className="info-item">
                    <label>Duration of Employment</label>
                    <span>
                      {userData.educationEmployment.employmentDuration}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Office Email</label>
                    <span>{userData.educationEmployment.officeEmail}</span>
                  </div>
                  <div className="info-item">
                    <label>Monthly Income</label>
                    <span>
                      ₦
                      {userData.educationEmployment.monthlyIncome.min.toLocaleString()}{" "}
                      - ₦
                      {userData.educationEmployment.monthlyIncome.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Loan Repayment</label>
                    <span>
                      ₦
                      {userData.educationEmployment.loanRepayment.toLocaleString()}
                    </span>
                  </div>
                </div>
              </section>

              {/* Socials */}
              <section className="info-section">
                <h4>Socials</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Twitter</label>
                    <span>{userData.socials.twitter}</span>
                  </div>
                  <div className="info-item">
                    <label>Facebook</label>
                    <span>{userData.socials.facebook}</span>
                  </div>
                  <div className="info-item">
                    <label>Instagram</label>
                    <span>{userData.socials.instagram}</span>
                  </div>
                </div>
              </section>

              {/* Guarantors */}
              {userData.guarantors.map((guarantor, index) => (
                <section key={index} className="info-section">
                  {index === 0 && <h4>Guarantor</h4>}
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name</label>
                      <span>{guarantor.fullName}</span>
                    </div>
                    <div className="info-item">
                      <label>Phone Number</label>
                      <span>{guarantor.phoneNumber}</span>
                    </div>
                    <div className="info-item">
                      <label>Email Address</label>
                      <span>{guarantor.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Relationship</label>
                      <span>{guarantor.relationship}</span>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

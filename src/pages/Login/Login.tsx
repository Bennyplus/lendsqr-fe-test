import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss";

// Assets
import logoIcon from "../../assets/Union.svg";
import logoText from "../../assets/lendsqr.svg";
import illustration from "../../assets/pablo-sign-in 1.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    console.log("Logging in with:", { email, password });
    localStorage.setItem("isAuthenticated", "true");
    localStorage.removeItem("lendsqr_users"); // Clear cache to force fresh fetch on dashboard land
    // Navigate to dashboard or home (placeholder)
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      {/* 2️⃣ Left Section (Brand / Illustration Panel) */}
      <div className="left-section">
        <div className="brand-header">
          <img src={logoIcon} alt="Lendsqr Logo" className="logo-icon" />
          <img src={logoText} alt="lendsqr" className="brand-text" />
        </div>

        <div className="illustration-container">
          <img src={illustration} alt="Login Illustration" />
        </div>
      </div>

      {/* 3️⃣ Right Section (Authentication Panel) */}
      <div className="right-section">
        <div className="mobile-brand-header">
          <img src={logoIcon} alt="Lendsqr Logo" className="logo-icon" />
          <img src={logoText} alt="lendsqr" className="brand-text" />
        </div>

        <div className="welcome-header">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleLogin}>
            {/* 3.2.1 Email Input Field */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* 3.2.2 Password Input Field */}
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            {/* 3.2.3 Forgot Password Link */}
            <div className="forgot-password">
              <a href="/forgot-password" onClick={(e) => e.preventDefault()}>
                FORGOT PASSWORD?
              </a>
            </div>

            {/* 3.2.4 Login Button */}
            <button type="submit" className="login-button">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

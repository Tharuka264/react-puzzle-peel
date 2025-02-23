import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="login-container vh-100"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="text-center mt-4" style={{ color: "#4F0640" }}>
        Welcome to PUZZLE PEEL
      </h1>
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="login-card card shadow-lg p-4"
          style={{ width: "400px" }}
        >
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

          <div className="nav nav-tabs mb-3">
            <button
              className={`nav-link ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`nav-link ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          ) : (
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./LoginPage.css";

function LoginPage() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const email = location.state?.email;

  const resetForm = (form: HTMLFormElement) => {
    form.reset();
  };

  useEffect(() => {
    if (email) {
      sessionStorage.setItem("userEmail", email);
    }
  }, [email]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const loginData = { email, password };
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        const sessionEmail = formData.get("email") as string;
        sessionStorage.setItem("userEmail", sessionEmail);
        setTimeout(() => navigate("/home"), 1000);
        resetForm(form);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in, please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const userName = formData.get("userName");
    const password = formData.get("password");

    const signUpData = { email, userName, password };
    try {
      console.log(signUpData);
      const response = await fetch("http://localhost:8081/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
        setIsLogin(true);
        resetForm(form);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up, please try again.");
    }
  };

  return (
    <div
      className="login-container vh-100"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="text-center mt-4" style={{ color: "#4F0640" }}>
        Welcome to PUZZLE PEEL
      </h1>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="position-fixed top-0 start-50 translate-middle-x p-3"
        style={{ zIndex: 11 }}
      >
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body"></div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card login-card shadow-lg p-4"
          style={{ width: "400px" }}
        >
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

          <div className="nav nav-tabs mb-3">
            <button
              className={`nav-link ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                document.querySelector("form")?.reset();
              }}
            >
              Login
            </button>
            <button
              className={`nav-link ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                document.querySelector("form")?.reset();
              }}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="btn-card">
                <button type="submit" className="btn btn-success w-50">
                  Login
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
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
                  name="email"
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
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="btn-card">
                <button type="submit" className="btn btn-success w-50">
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

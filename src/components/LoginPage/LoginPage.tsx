import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ userName: "", email: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, userName } = formData;
    const endpoint = isLogin ? "login" : "addUser";
    const payload = isLogin
      ? { email, password }
      : { email, password, userName };

    try {
      const response = await fetch(`http://localhost:8081/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);

        sessionStorage.setItem("userEmail", email);

        if (isLogin) {
          setTimeout(() => navigate("/home"), 1000);
        } else {
          setIsLogin(true);
        }
        resetForm();
      } else {
        toast.error(data.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container vh-100 d-flex flex-column">
      <h1
        className="text-center mt-4 spicy-rice-regular"
        style={{ color: "#4F0640" }}
      >
        Welcome to PUZZLE PEEL
      </h1>

      <ToastContainer position="top-right" autoClose={3000} />

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
                resetForm();
              }}
            >
              Login
            </button>
            <button
              className={`nav-link ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
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
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="btn-card text-center">
              <button type="submit" className="btn btn-success w-50">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

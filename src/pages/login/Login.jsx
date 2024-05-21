import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: null, // default role
  });

  // Login handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://blog-server-nu-weld.vercel.app/api/auth/signin",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);
      const userRole = response.data.data.role;

      if (userRole === "buyer") {
        navigate("/buyer");
      } else if (userRole === "seller") {
        navigate("/seller");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Registration handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://blog-server-nu-weld.vercel.app/api/auth/signup",
        userData
      );

      if (response.data.success) {
        alert("Successfully Registered");
        // navigate("/register");
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url(./assets/Images/computer.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <label className="swap swap-flip text-9xl">
            <input type="checkbox" />
            <div className="swap-on">
              <form className="card-body" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h5>
                {error && <div className="text-red-600">{error}</div>}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered text-black"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered text-black"
                    required
                    minLength="8"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in to your account"}
                  </button>
                </div>
                <label className="label">
                  <span className=" text-sm">Not registered?</span>{" "}
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover bg-orange-200"
                  >
                    Create Account
                  </Link>
                </label>
              </form>
            </div>
            {/* Registration form */}
            // Registration form
            <div className="swap-off">
              <form className="card-body" onSubmit={handleSignUp}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="input input-bordered text-black"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="input input-bordered text-black"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="input input-bordered text-black"
                    required
                    minLength="8"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your password"
                    className="input input-bordered text-black"
                    required
                    minLength="8"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    name="role"
                    value={userData.role}
                    onChange={(e) =>
                      setUserData({ ...userData, role: e.target.value })
                    }
                    className="input input-bordered text-black"
                    required
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Signing up..." : "Register"}
                  </button>
                </div>
                <label className="label">
                  <Link
                    to="/login"
                    className="label-text-alt link link-hover text-white"
                  >
                    Already have an account? Login
                  </Link>
                </label>
              </form>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

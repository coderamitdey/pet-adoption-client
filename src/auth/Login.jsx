import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2"; 
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await MySwal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      await MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      await MySwal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      await MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-base-content">
          Login
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-2"
        >
          Login with Google
        </button>

        <p className="mt-2 text-base-content/70 text-center">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="underline text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

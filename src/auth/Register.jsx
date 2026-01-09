import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

 
    if (!name || !photoURL || !email || !password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

 
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must have at least 1 uppercase letter");
      toast.error("Password must have at least 1 uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must have at least 1 lowercase letter");
      toast.error("Password must have at least 1 lowercase letter");
      return;
    }

    try {
    
      const result = await createUserWithEmailAndPassword(auth, email, password);

      
      await updateProfile(result.user, {
        displayName: name,
        photoURL,
      });

      toast.success("Registration successful!");
      navigate("/"); 
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed!");
    }
  };

 
  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-base-content">
          Register
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
            required
          />

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
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full mt-2"
        >
          Register with Google
        </button>

        <p className="mt-2 text-base-content/70 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

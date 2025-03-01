import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState("Login");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginError, setLoginError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [redirectTo, setRedirectTo] = useState(null); // State for redirection URL

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoginError(null); // Clear previous login errors

    const userData = {
      username: loginIdentifier,
      password: password,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setLoginError(errorData.error || "Login failed. Wrong username or password.");
        return;
      }

      const responseData = await response.json();
      console.log("Login successful:", responseData);
      login(responseData);

      // Conditional Redirection based on User Role - NO ALERT MESSAGE ANYMORE
      if (responseData.user.role === 'admin') {
        setRedirectTo('/admin-panel'); // Redirect to Admin Panel for admin users
      } else {
        setRedirectTo('/MyProfile'); // Redirect to MyProfile for other roles (patients, doctors)
      }

    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Error during login. Please try again.");
    }
  };

  if (redirectTo) { // Conditionally redirect using Navigate component
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book your
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}
        {state === "Login" && <div className="w-full"></div>}
        <div className="w-full">
          <p>Email or Username</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1" // <-- CORRECTED className - Removed extra single quote '
            type="text" 
            placeholder="Enter your email or username"
            onChange={(e) => setLoginIdentifier(e.target.value)}
            value={loginIdentifier}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {loginError && <p className="text-red-500 mt-2">{loginError}</p>} {/* Display login error message */}


        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary underline cursor-pointer"
            >
              Login here
            </Link>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <Link
              to="/register"
              className="text-primary underline cursor-pointer"
            >
              Click here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
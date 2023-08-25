import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { useHistory } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      history.push("/home");
    } catch (error) {
      // Handle login errors (e.g., show an error message)
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in </h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="text"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}

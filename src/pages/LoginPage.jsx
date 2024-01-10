import { useState } from "react";
import { Link } from "react-router-dom";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useApi } from "../hooks/useApi";
import PopUp from "../components/PopUp";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toggleIconOne, inputTypeOne } = useTogglePasswordVisibility();
  const { isLoading, fetchData } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await fetchData("http://localhost:4000/login", "POST", {}, user, "/");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="user-wrapper">
        <PopUp />
        <h1>Welcome back !</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="pass-wrapper">
            <div>
              <label htmlFor="pass">Password</label>
              <Link to="/password/send-email">Forgot password ?</Link>
            </div>
            <input
              className="password"
              type={inputTypeOne}
              name="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <span className="pass-toggle-icon">{toggleIconOne}</span>
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </form>
        <div className="user-redirect">
          <p>Don't have an account ?</p>
          <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

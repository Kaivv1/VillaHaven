import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import PopUp from "../components/PopUp";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
import { login } from "../helpers/userHelperFunctions";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toggleIconOne, inputTypeOne } = useTogglePasswordVisibility();
  useChangeDocumentTitle("Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      email: email,
      password: password,
    };

    const data = await login(user);

    if (!data.success) {
      setIsLoading(false);
      return toast.error(data.message);
    }

    if (data.success) {
      setIsLoading(false);
      navigate("/");
    }
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
          <p>Don&apos;t have an account ?</p>
          <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

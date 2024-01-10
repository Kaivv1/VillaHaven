import { Link } from "react-router-dom";
import { useState } from "react";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useApi } from "../hooks/useApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import PopUp from "../components/PopUp";
const RegisterPage = () => {
  const { toggleIconOne, toggleIconTwo, inputTypeOne, inputTypeTwo } =
    useTogglePasswordVisibility();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { status, isLoading, fetchData } = useApi();

  useEffect(() => {
    if (status === 201) {
      toast.success("Registration successful");
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords not matching");
      return;
    }
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      password: password,
    };
    await fetchData(
      "http://localhost:4000/register",
      "POST",
      "",
      newUser,
      "/login"
    );
  };
  return (
    <div className="register-container">
      <div className="user-wrapper">
        <PopUp />
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
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
          <div>
            <label>Gender</label>
            <div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender">Other</label>
              </div>
            </div>
          </div>
          <div className="pass-wrapper">
            <label htmlFor="pass">Password</label>
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
          <div className="pass-wrapper">
            <label htmlFor="confirm_pass">Confirm password</label>
            <input
              className="password"
              type={inputTypeTwo}
              name="confirm_pass"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            <span className="pass-toggle-icon">{toggleIconTwo}</span>
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "sign up"}
          </button>
        </form>
        <div className="user-redirect">
          <p>Already have an account ?</p>
          <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

/*eslint no-useless-catch: */
import { useState } from "react";
import PopUp from "../components/PopUp";
import { getSecret } from "../helpers/userHelperFunctions";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useUserVerification } from "../hooks/useUserVerification";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretValue, setSecretValue] = useState("");
  const navigate = useNavigate();
  const { isLoading, handleResetPassword } = useUserVerification();
  const { toggleIconOne, toggleIconTwo, inputTypeOne, inputTypeTwo } =
    useTogglePasswordVisibility();
  const encryptedValue = Cookies.get("encrypted_cookie");
  const userEmail = CryptoJS.AES.decrypt(encryptedValue, secretValue).toString(
    CryptoJS.enc.Utf8
  );

  useEffect(() => {
    const handleFetchSecret = async () => {
      const { secret_value } = await getSecret();
      setSecretValue(secret_value);
    };

    handleFetchSecret();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword !== password) {
        return toast.error("Passwords not matching");
      }

      const { success, message } = await handleResetPassword(
        userEmail,
        password
      );

      if (!success) {
        return toast.error(`${message}`);
      }

      if (success) {
        setPassword("");
        setConfirmPassword("");
        Cookies.remove("encrypted_cookie");
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="reset-password-container">
      <div className="user-wrapper">
        <PopUp />
        <h1>Reset Password</h1>
        <form onSubmit={handleReset}>
          <div className="pass-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={inputTypeOne}
              className="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <span className="pass-toggle-icon">{toggleIconOne}</span>
          </div>
          <div className="pass-wrapper">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type={inputTypeTwo}
              className="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            <span className="pass-toggle-icon">{toggleIconTwo}</span>
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

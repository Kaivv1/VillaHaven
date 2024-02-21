/*eslint no-unused-vars: */
import { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getSecret } from "../helpers/userHelperFunctions";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import VerificationTimer from "../components/VerificationTimer";
import { useUserVerification } from "../hooks/useUserVerification";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
const OTPVerificationPage = () => {
  const [OTP, setOTP] = useState("");
  const [secretValue, setSecretValue] = useState("");
  const navigate = useNavigate();
  useChangeDocumentTitle("VerifyOTP");
  const encryptedValue = Cookies.get("encrypted_cookie");
  const userEmail = CryptoJS.AES.decrypt(encryptedValue, secretValue).toString(
    CryptoJS.enc.Utf8
  );
  const {
    isActive,
    setIsActive,
    remainingTime,
    setRemainingTime,
    handleDeleteOTP,
    isLoading,
    handleResend,
    handleVerifyOTP,
  } = useUserVerification(userEmail, userEmail && true);

  useEffect(() => {
    const handleFetchSecret = async () => {
      const { secret_value } = await getSecret();
      setSecretValue(secret_value);
    };

    handleFetchSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await handleVerifyOTP(OTP);

    if (!success) {
      return toast.error(`${message}`);
    }

    if (success) {
      setOTP("");
      navigate("/password/reset-password");
    }
  };

  return (
    <div className="verify-otp-container">
      <PopUp />
      <div className="user-wrapper">
        <h1>Password Recovery</h1>
        <p>Enter OTP to recover password.</p>
        {isActive && (
          <VerificationTimer
            isActive={isActive}
            setIsActive={setIsActive}
            setRemainingTime={setRemainingTime}
            remainingTime={parseInt(remainingTime)}
            deleteOTP={handleDeleteOTP}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="OTP">
              Enter 6 digit verification code sent to your email
            </label>
            <input
              name="OTP"
              type="text"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Verify"}
          </button>
        </form>
        <div className="user-redirect">
          <p>Time has expired ?</p>
          <Link onClick={handleResend}>Resend</Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;

import { useEffect, useState } from "react";
import PopUp from "../components/PopUp";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteOTP,
  generateOTP,
  getSecret,
  resendOTP,
  verifyOTP,
} from "../helpers/userHelperFunctions";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import VerificationTimer from "../components/VerificationTimer";
import { useLocalStorage } from "../hooks/useLocalStorage";
const OTPVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [secretValue, setSecretValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const encryptedValue = Cookies.get("encrypted_cookie");
  const userEmail = CryptoJS.AES.decrypt(encryptedValue, secretValue).toString(
    CryptoJS.enc.Utf8
  );
  const [remainingTime, setRemainingTime] = useLocalStorage(
    300000,
    "remainingTime"
  );

  useEffect(() => {
    const handleFetchSecret = async () => {
      const { secret_value } = await getSecret();
      setSecretValue(secret_value);
    };

    handleFetchSecret();
  }, []);

  useEffect(() => {
    const handleSentEmail = async () => {
      if (!userEmail) return;
      try {
        setIsActive(true);
        const data = await generateOTP(userEmail);

        if (data) {
          return toast.success(
            "We have sent you an email with your verification code"
          );
        }
      } catch (error) {
        return toast(
          "You already have an active OTP verification code sent to your email"
        );
      }
    };

    handleSentEmail();
  }, [userEmail, setRemainingTime]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("remainingTime", JSON.stringify(remainingTime));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [remainingTime]);

  const handleDeleteOTP = async () => {
    await deleteOTP(userEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await verifyOTP(userEmail, OTP);

    if (!success) {
      return toast.error(`${message}`);
    }

    if (success) {
      setIsActive(false);
      setRemainingTime((prev) => (prev = 300000));
      localStorage.removeItem("remainingTime");
      setOTP("");
      navigate("/password/reset-password");
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      const promise = resendOTP(userEmail);

      await toast.promise(promise, {
        loading: "Sending...",
        success: "We have sent you an email with the verification code",
        error: "Could not send you an email",
      });
      if (!isActive) {
        setIsActive(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
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

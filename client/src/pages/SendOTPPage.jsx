import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserByEmail } from "../helpers/userHelperFunctions";
import toast from "react-hot-toast";
import PopUp from "../components/PopUp";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";

const SendOTPPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secretValue, setSecretValue] = useState("");
  const encryptedValue = CryptoJS.AES.encrypt(userEmail, secretValue);
  const navigate = useNavigate();
  useChangeDocumentTitle("SendOTP");

  useEffect(() => {
    const handleFetchSecret = async () => {
      try {
        const res = await fetch("https://villa-haven-api.vercel.app/secret");

        const { secret_value } = await res.json();
        setSecretValue(secret_value);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await getUserByEmail(userEmail);
      if (data.success === false) return toast.error("Invalid email");
      Cookies.set("encrypted_cookie", encryptedValue);
      navigate("/password/verify-email");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <PopUp />
      <div className="user-wrapper">
        <h1>Password Recovery</h1>
        <p>We will send an email with a verification code</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Send"}
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

export default SendOTPPage;

/*eslint no-unused-vars: */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteOTP,
  generateOTP,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "../helpers/userHelperFunctions";
import { useLocalStorage } from "./useLocalStorage";

export const useUserVerification = (email = "", start = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useLocalStorage(
    300000,
    "remainingTime"
  );

  useEffect(() => {
    const handleSentEmail = async () => {
      if (!email) return;
      try {
        setIsActive(true);
        const data = await generateOTP(email);

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

    if (start) handleSentEmail();
  }, [email, start]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("remainingTime", JSON.stringify(remainingTime));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [remainingTime]);

  const handleResend = async () => {
    try {
      setIsLoading(true);
      const promise = resendOTP(email);

      await toast.promise(promise, {
        loading: "Sending...",
        success: "We have sent you an email with the verification code",
        error: "Could not send you an email",
      });
      if (!isActive) {
        setIsActive(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (OTP) => {
    setIsLoading(true);
    const { success, message } = await verifyOTP(email, OTP);
    if (success) {
      setIsActive(false);
      setRemainingTime((prev) => (prev = 300000));
      localStorage.removeItem("remainingTime");
    }
    setIsLoading(false);
    return { success, message };
  };

  const handleDeleteOTP = async () => {
    await deleteOTP(email);
  };

  const handleResetPassword = async (email, password) => {
    setIsLoading(true);
    const { success, message } = await resetPassword(email, password);

    setIsLoading(false);
    return { success, message };
  };

  return {
    isActive,
    setIsActive,
    remainingTime,
    setRemainingTime,
    handleDeleteOTP,
    isLoading,
    handleResend,
    handleVerifyOTP,
    handleResetPassword,
  };
};

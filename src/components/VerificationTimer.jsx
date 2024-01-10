import { useEffect } from "react";

const VerificationTimer = ({
  setRemainingTime,
  remainingTime,
  isActive,
  setIsActive,
  deleteOTP,
}) => {
  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return (
      <p>
        Verify until:{" "}
        <span style={{ color: minutes === 0 && seconds <= 10 && "red" }}>
          <span>{`${minutes < 10 && "0"}${minutes}`}</span>:
          <span>{`${seconds < 10 ? "0" : ""}${seconds}`}</span>
        </span>
      </p>
    );
  };

  useEffect(() => {
    let timer;

    const updateTimer = () => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    };

    if (isActive) {
      timer = setInterval(() => {
        updateTimer();

        if (remainingTime === 0) {
          setIsActive(false);
          deleteOTP();
          setRemainingTime((prev) => (prev = 300000));
          localStorage.removeItem("remainingTime");
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, setRemainingTime, remainingTime, setIsActive, deleteOTP]);

  return (
    <div className="verification-timer-container">
      {formatTime(remainingTime)}
    </div>
  );
};

export default VerificationTimer;

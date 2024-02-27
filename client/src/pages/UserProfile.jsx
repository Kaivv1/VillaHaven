import { useEffect, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "../components/Button";
import { deleteUser, updateUserByToken } from "../helpers/userHelperFunctions";
import toast from "react-hot-toast";
import { useUserVerification } from "../hooks/useUserVerification";
import VerificationTimer from "../components/VerificationTimer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { useChangeDocumentTitle } from "../hooks/useChangeDocumentTitle";
import { useModalData } from "../contexts/ModalDataContext";
import ConfirmModal from "../components/ConfirmModal";
import { useChangeDocumentOverflow } from "../hooks/useChangeDocumentOverflow";
import Cookies from "js-cookie";

const UserProfile = () => {
  const { user, token } = useFetchUser();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [OTP, setOTP] = useState("");
  const [editWithoutPass, setEditWithoutPass] = useState(false);
  const [editPass, setEditPass] = useLocalStorage(false, "isEditPass");
  const [isResetPass, setIsResetPass] = useLocalStorage(false, "isResetPass");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const navigate = useNavigate();
  const {
    isActive,
    setIsActive,
    remainingTime,
    setRemainingTime,
    handleDeleteOTP,
    isLoading: isLoadingUserVerify,
    handleResend,
    handleVerifyOTP,
    handleResetPassword,
  } = useUserVerification(userData.email, editPass);
  const { toggleIconOne, toggleIconTwo, inputTypeOne, inputTypeTwo } =
    useTogglePasswordVisibility();
  const { showConfirmModal, setShowConfirmModal } = useModalData();
  useChangeDocumentOverflow(showConfirmModal);
  useChangeDocumentTitle("User | Profile");

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      return;
    }
  }, [user]);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUserData((prev) => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("gender", userData.gender);
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }
    try {
      await updateUserByToken(token, formData);
      toast.success("User profile updated successfully");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
    setEditWithoutPass(false);
  };

  const handleCancel = () => {
    setPreview();
    setEditWithoutPass(false);
    setUserData((prev) => ({
      ...prev,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      gender: user?.gender,
    }));
  };

  const handleChangePass = () => {
    setEditPass(true);
    setRemainingTime(300000);
  };

  const handleCancelEdit = () => {
    setEditPass(false);
    setIsActive(false);
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("isEditPass");
    handleDeleteOTP();
  };

  const handleCancelConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await deleteUser(token).then((data) => {
      setShowConfirmModal(false);
      if (!data.success) {
        toast.error("There was a problem deleting your account!");
        setIsLoading(false);
      }
      if (data.success) {
        toast.success("Your account was deleted successfully");
        setIsLoading(false);
        Cookies.remove("access_token");
        navigate("/login");
      }
    });
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await handleVerifyOTP(OTP);
    if (!success) {
      setOTP("");
      return toast.error(`${message}`);
    }
    if (success) {
      toast.success(`${message}`);
      setEditPass(false);
      setIsResetPass(true);
      setOTP("");
    }
  };

  const handleCancelResetPass = () => {
    setIsResetPass(false);
    setPassword("");
    setConfirmPassword("");
  };

  const handleResetPassSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords not matching");
    }
    const { success, message } = await handleResetPassword(
      userData.email,
      password
    );
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setPassword("");
      setConfirmPassword("");
      setIsResetPass(false);
    }
  };
  return (
    <div className="user-profile-container">
      <h1>Account Information</h1>
      <form
        className="user-info-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="avatar-wrapper">
          <label
            htmlFor="avatar"
            className={!editWithoutPass ? "disabled" : ""}
          >
            {preview && <img src={preview} alt="" className="user-avatar" />}
            {user?.avatar && !preview && (
              <img src={user?.avatar} alt="" className="user-avatar" />
            )}
            {!user?.avatar && !preview && (
              <AccountCircleIcon fontSize="large" className="user-icon" />
            )}
          </label>
          <input
            name="avatar"
            id="avatar"
            type="file"
            onChange={handleFile}
            accept="image/*"
            disabled={!editWithoutPass}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={userData?.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={!editWithoutPass}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            value={userData?.firstName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            placeholder="Enter your first name"
            disabled={!editWithoutPass}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            value={userData?.lastName}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            placeholder="Enter your last name"
            disabled={!editWithoutPass}
            required
          />
        </div>
        <div className="gender-wrapper">
          <p>Gender</p>
          <div className="radio-inputs">
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={userData?.gender === "male"}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                disabled={!editWithoutPass}
                required
              />
              <label htmlFor="gender">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={userData?.gender === "female"}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                disabled={!editWithoutPass}
                required
              />
              <label htmlFor="gender">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={userData?.gender === "other"}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                disabled={!editWithoutPass}
                required
              />
              <label htmlFor="gender">Other</label>
            </div>
          </div>
        </div>

        {editWithoutPass ? (
          <div className="form-btns">
            <Button onClick={() => handleCancel()} className="cancel-btn">
              Cancel
            </Button>
            <Button
              type="submit"
              className="save-btn"
              isLoading={isLoading}
              isLoadingMsg="Saving..."
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="form-btns">
            <Button
              type="button"
              onClick={() => setEditWithoutPass(true)}
              className="edit-btn"
              disabled={editPass || isResetPass || isLoading}
            >
              Edit
            </Button>
            {!editPass && !isResetPass && (
              <Button
                className="change-pass-btn"
                onClick={() => handleChangePass()}
                disabled={isLoading}
              >
                Change password
              </Button>
            )}
            <Button
              className="delete-acc-btn"
              disabled={editPass || isResetPass}
              isLoading={isLoading}
              isLoadingMsg="Deleting..."
              onClick={() => setShowConfirmModal(true)}
            >
              Delete account
            </Button>
          </div>
        )}
      </form>
      {editPass && (
        <div className="verify-otp-form">
          {isActive && (
            <VerificationTimer
              isActive={isActive}
              setIsActive={setIsActive}
              setRemainingTime={setRemainingTime}
              remainingTime={parseInt(remainingTime)}
              deleteOTP={handleDeleteOTP}
            />
          )}
          {!isActive && (
            <div className="otp-expired">
              <p style={{ color: "#ef4444", marginBottom: "0.2rem" }}>
                Time expired:
              </p>
              <Link onClick={handleResend}>Resend OTP</Link>
            </div>
          )}
          <form onSubmit={handleVerifySubmit}>
            <div className="input-wrapper">
              <label htmlFor="OTP">
                Enter 6 digit verification code sent to your email
              </label>
              <input
                name="OTP"
                id="OTP"
                type="text"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            <div className="form-btns">
              <Button
                onClick={() => handleCancelEdit()}
                className="cancel-otp-btn"
              >
                Cancel
              </Button>
              <Button
                className="verify-otp-btn"
                isLoading={isLoadingUserVerify}
                isLoadingMsg="Verifying..."
                type="submit"
              >
                Verify
              </Button>
            </div>
          </form>
        </div>
      )}
      {isResetPass && (
        <form className="reset-pass-form" onSubmit={handleResetPassSubmit}>
          <h2>Change your password</h2>
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
          <div className="form-btns">
            <Button
              className="cancel-reset-btn"
              onClick={() => handleCancelResetPass()}
            >
              Cancel
            </Button>
            <Button
              className="reset-pass-btn"
              isLoadingMsg="Loading..."
              type="submit"
              isLoading={isLoadingUserVerify}
            >
              Reset
            </Button>
          </div>
        </form>
      )}
      {showConfirmModal && (
        <ConfirmModal
          onCancel={() => handleCancelConfirmModal()}
          onConfirm={async () => await handleConfirm()}
        />
      )}
    </div>
  );
};

export default UserProfile;

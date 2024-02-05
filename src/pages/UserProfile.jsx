import { useEffect, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "../components/Button";
const UserProfile = () => {
  const { user } = useFetchUser();
  const [preview, setPreview] = useState();
  const [userData, setUserData] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const [editWithoutPass, setEditWithoutPass] = useState(false);

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
      };

      reader.readAsDataURL(file);
    }

    setUserData((prev) => ({ ...prev, avatar: file }));
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("avatar", userData.avatar);
  };
  return (
    <div className="user-profile-container">
      <h1>Account Information</h1>
      <form className="user-info-form" onSubmit={handleSubmit}>
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
            <Button
              onClick={() => setEditWithoutPass(false)}
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button type="submit" className="save-btn">
              Save
            </Button>
          </div>
        ) : (
          <div className="form-btns">
            <Button
              type="button"
              onClick={() => setEditWithoutPass(true)}
              className="edit-btn"
            >
              Edit
            </Button>
            <Button className="change-pass-btn">Change password</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;

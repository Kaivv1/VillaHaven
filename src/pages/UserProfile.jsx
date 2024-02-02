import { useState } from "react";

const UserProfile = () => {
  const [picture, setPicture] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <div className="user-profile-container">
      <h1>Account Information</h1>
      <form>
        <div>
          <label htmlFor="picture">Profile picture</label>
          <input name="picture" type="file" accept="image/*" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

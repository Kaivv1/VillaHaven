import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <div>controllers</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

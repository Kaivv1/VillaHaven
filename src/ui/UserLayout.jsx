import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
const UserLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-layout-wrapper">
        <nav>
          <NavLink to="/user/profile">
            <span>
              <PersonIcon fontSize="small" />
            </span>
            Account
          </NavLink>
          <NavLink to="/user/bookings">
            <span>
              <AirplaneTicketIcon fontSize="small" />
            </span>
            Bookings
          </NavLink>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

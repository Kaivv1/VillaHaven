import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import PopUp from "../components/PopUp";
const UserLayout = () => {
  return (
    <div className="user-layout">
      <PopUp />
      <div className="user-layout-wrapper">
        <nav>
          <NavLink to="/user/profile">
            <span>
              <PersonIcon fontSize="small" />
            </span>
            Account
          </NavLink>
          <NavLink to="/user/reservations">
            <span>
              <AirplaneTicketIcon fontSize="small" />
            </span>
            Reservations
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

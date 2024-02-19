/*eslint-disable react/prop-types */

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Tooltip } from "react-tooltip";
const CustomDatePicker = (props) => {
  return (
    <div className="input-wrapper">
      <div>
        <label>{props.label}</label>
        <span id="reserved"> *</span>

        <Tooltip
          anchorSelect="#reserved"
          content="If you cannot choose certain dates, it means they are reserved !"
        />
      </div>
      <div className="date-wrapper">
        <DatePicker {...props} required />
        <CalendarMonthIcon className="calendar-icon" />
      </div>
    </div>
  );
};

export default CustomDatePicker;

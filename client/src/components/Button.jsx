/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

const Button = ({
  children,
  onClick,
  className,
  icon,
  iconColor = "#222222",
  to = "",
  isLoading,
  isLoadingMsg = "",
  type = "button",
  disabled,
}) => {
  const navigate = useNavigate();

  if (type === "button" || type === "submit") {
    return (
      <button
        className={className}
        onClick={to === "-1" ? () => navigate(-1) : onClick}
        disabled={isLoading || disabled}
        type={type}
      >
        {isLoading ? (
          isLoadingMsg
        ) : (
          <>
            {children}
            {icon && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: iconColor,
                }}
              >
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link
        to={`${to}`}
        className={className}
        style={{
          textDecoration: "none",
          cursor: `${isLoading || disabled ? "not-allowed" : ""}`,
        }}
      >
        {isLoading ? (
          isLoadingMsg
        ) : (
          <>
            {children}
            {icon && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: iconColor,
                }}
              >
                {icon}
              </span>
            )}
          </>
        )}
      </Link>
    );
  }
};

export default Button;

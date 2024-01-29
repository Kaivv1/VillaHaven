/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  className,
  icon,
  iconColor = "#222222",
  to = "",
  isLoading,
  isLoadingMsg = "",
}) => {
  return (
    <>
      {to ? (
        <Link to={`${to}`} style={{ textDecoration: "none" }}>
          <button className={className} onClick={onClick} disabled={isLoading}>
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
        </Link>
      ) : (
        <button className={className} onClick={onClick} disabled={isLoading}>
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
      )}
    </>
  );
};

export default Button;

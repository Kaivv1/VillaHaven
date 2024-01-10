const Button = ({
  children,
  onClick,
  className,
  icon,
  iconColor = "#222222",
}) => {
  return (
    <button className={className} onClick={onClick}>
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
    </button>
  );
};

export default Button;

/*eslint-disable react/prop-types */

const ErrorMessage = ({ msg }) => {
  return (
    <div className="error-message">
      <p>{msg}</p>
    </div>
  );
};

export default ErrorMessage;

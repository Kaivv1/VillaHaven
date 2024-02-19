import Button from "../components/Button";
import WestIcon from "@mui/icons-material/West";
const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div>
        <h1>404</h1>
        <h2>Page not Found</h2>
        <p>
          Somethings gone missing. Sorry, we couldn&apos;t find the page you are
          looking for.
        </p>
        <Button type="link" to="/">
          <WestIcon fontSize="small" />
          Go back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

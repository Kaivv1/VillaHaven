import { useState } from "react";
import Button from "../Button";
import EmailIcon from "@mui/icons-material/Email";
const FooterSubscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="footer-subscribe">
      <h4>Join our newsletter</h4>
      <p> Diam et habitasse tortor cras donec urna eget dolor in turpis</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button
          className="footer-btn"
          icon={<EmailIcon sx={{ fontSize: "1rem" }} />}
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default FooterSubscribe;

import { useEffect, useState } from "react";
import Button from "../Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FooterSupportBox = () => {
  const [appEmail, setAppEmail] = useState("");
  useEffect(() => {
    const fetchAppEmail = async () => {
      const res = await fetch("http://localhost:4000/getappemail");
      if (!res.ok) return;
      const data = await res.json();
      setAppEmail(data.app_email);
    };
    fetchAppEmail();
  }, []);
  const handleClick = () => {
    const email = appEmail;
    const subject = "Chat with us";

    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    window.location.href = mailToLink;
  };
  return (
    <div className="footer-support-box">
      <div>
        <h4>Speak to us about your travel plans, we&apos;re here to help.</h4>
        <p>
          Share your travel dreams with us – our team is here to ensure your
          VillaHaven experience is personalized and memorable.
        </p>
      </div>
      <Button
        className="footer-btn"
        icon={<WhatsAppIcon sx={{ fontSize: "1rem" }} />}
        iconColor="#f5f5f5"
        onClick={handleClick}
      >
        Chat with us
      </Button>
    </div>
  );
};

export default FooterSupportBox;

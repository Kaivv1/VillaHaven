import Button from "../Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FooterSupportBox = () => {
  return (
    <div className="footer-support-box">
      <div>
        <h4>Speak to us about your travek plans, we're here to help.</h4>
        <p>
          Diam et habitasse tortor cras donec urna eget dolor in turpis
          venenatis eget pulnivar ipsum quisque non arcu nulla
        </p>
      </div>
      <Button
        className="footer-btn"
        icon={<WhatsAppIcon sx={{ fontSize: "1rem" }} />}
        iconColor="#f5f5f5"
      >
        Chat with us
      </Button>
    </div>
  );
};

export default FooterSupportBox;

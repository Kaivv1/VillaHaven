import { useEffect, useState } from "react";
import Button from "../Button";
import EmailIcon from "@mui/icons-material/Email";
import toast from "react-hot-toast";
import { useFetchUser } from "../../hooks/useFetchUser";
import { sendEmail } from "../../helpers/userHelperFunctions";

const FooterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const { user } = useFetchUser();

  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setFirstName(user?.firstName);
    } else {
      return;
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const message = {
      name: firstName,
      userEmail: email,
      text: "Thank you for subscribing to our newsletter, now we will be able to send you all of our exclusive offers!",
      subject: "Newsletter",
    };

    const data = await sendEmail(message);
    if (data.success === false) {
      setIsLoading(false);
      return toast.error("Something went wrong, subscription failed");
    }

    toast.success("You successfully subscribed to our newsletter");
    setIsLoading(false);
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
          isLoading={isLoading}
          isLoadingMsg="Sending..."
          type="submit"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default FooterSubscribe;

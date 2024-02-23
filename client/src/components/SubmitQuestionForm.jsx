import { useEffect, useState } from "react";
import Button from "./Button";
import EmailIcon from "@mui/icons-material/Email";
import PopUp from "./PopUp";
import toast from "react-hot-toast";
import { useFetchUser } from "../hooks/useFetchUser";
import { sendEmail } from "../helpers/userHelperFunctions";

const SubmitQuestionForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useFetchUser();

  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setFullName(`${user?.firstName} ${user?.lastName}`);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const message = {
      name: fullName,
      userEmail: email,
      text: "We have recieved your email, our support team will contact with you!",
      subject: "Question",
    };

    await sendEmail(message);
    setIsLoading(false);
    toast.success("Email sent");
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="submitQuestionForm">
      <PopUp />
      <div className="form-header">
        <h2>Have a question ?</h2>
        <p>
          Our support team will be most happy to help out. Fill the form and we
          will contact you as soon as we can!
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter you email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Ask your question here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <Button
        icon={<EmailIcon sx={{ fontSize: "1rem" }} />}
        className="submit-question-btn"
        isLoading={isLoading}
        isLoadingMsg="Sending..."
        type="submit"
      >
        Send message
      </Button>
    </form>
  );
};

export default SubmitQuestionForm;

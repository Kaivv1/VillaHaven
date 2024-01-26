import { useEffect, useState } from "react";
import Button from "./Button";
import EmailIcon from "@mui/icons-material/Email";
import Cookies from "js-cookie";
import PopUp from "./PopUp";
import toast from "react-hot-toast";

const SubmitQuestionForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const res = await fetch(`http://localhost:4000/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data === false) return;
      setFullName(`${data.firstName} ${data.lastName}`);
      setEmail(data.email);
    };
    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const message = {
      name: fullName,
      userEmail: email,
      text: "We have recieved your email, out support team will contact with you!",
      subject: "Question",
    };

    const res = await fetch("http://localhost:4000/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok)
      return toast.error("Something went wrong we couldn't send you email");

    await res.json();
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
      >
        Send message
      </Button>
    </form>
  );
};

export default SubmitQuestionForm;

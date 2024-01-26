/*eslint-disable react/prop-types */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const FAQBox = ({ FAQ }) => {
  const { question, answer } = FAQ;

  return (
    <div className="FAQ">
      <div className="label">
        <h3>{question}</h3>
        <KeyboardArrowDownIcon className="arrow-down" />
      </div>
      <div className="answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQBox;

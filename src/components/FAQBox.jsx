/*eslint-disable react/prop-types */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const FAQBox = ({ FAQ, onToggle, selected, i }) => {
  const { question, answer } = FAQ;

  return (
    <div className="FAQ" onClick={() => onToggle(i)}>
      <div className={`${selected === i ? "label active" : "label"}`}>
        <h3>{question}</h3>
        <KeyboardArrowDownIcon className="arrow-down" />
      </div>
      <div className={`${selected === i ? "answer show" : "answer"}`}>
        {answer}
      </div>
    </div>
  );
};

export default FAQBox;

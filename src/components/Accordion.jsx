/* eslint-disable react/prop-types*/

import Loading from "../ui/Loading";
import ErrorMessage from "./ErrorMessage";
import FAQBox from "./FAQBox";

const Accordion = ({ FAQs, isLoading, error }) => {
  return (
    <div className="accordion-container">
      {isLoading && <Loading />}
      {error && (
        <ErrorMessage msg="We are sorry, we currently have an issue with loading the frequently asked questions.." />
      )}
      {!isLoading && FAQs.map((FAQ, i) => <FAQBox key={i} FAQ={FAQ} />)}
    </div>
  );
};

export default Accordion;

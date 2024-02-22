/* eslint-disable react/prop-types*/

import { useState } from "react";
import Loader from "../ui/Loader";
import ErrorMessage from "./ErrorMessage";
import FAQBox from "./FAQBox";

const Accordion = ({ FAQs, isLoading, error }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="accordion-container">
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage msg="We are sorry, we currently have an issue with loading the frequently asked questions.." />
      )}
      {!isLoading &&
        FAQs.map((FAQ, i) => (
          <FAQBox
            key={i}
            FAQ={FAQ}
            onToggle={toggle}
            selected={selected}
            i={i}
          />
        ))}
    </div>
  );
};

export default Accordion;

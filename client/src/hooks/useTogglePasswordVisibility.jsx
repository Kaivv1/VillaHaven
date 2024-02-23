import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const toggleIconOne = (
    <FontAwesomeIcon
      icon={visibleOne ? faEyeSlash : faEye}
      onClick={() => setVisibleOne((visible) => !visible)}
    />
  );
  const toggleIconTwo = (
    <FontAwesomeIcon
      icon={visibleTwo ? faEyeSlash : faEye}
      onClick={() => setVisibleTwo((visible) => !visible)}
    />
  );
  const inputTypeOne = visibleOne ? "text" : "password";
  const inputTypeTwo = visibleTwo ? "text" : "password";

  return { toggleIconOne, toggleIconTwo, inputTypeOne, inputTypeTwo };
};

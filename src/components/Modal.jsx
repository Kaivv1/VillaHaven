import { useEffect } from "react";
import { useRef } from "react";

const Modal = ({ video, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const callback = (e) => {
      if (!ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", callback);

    return () => document.removeEventListener("mousedown", callback);
  }, [onClose]);

  return (
    <div className="video-modal--container">
      <div ref={ref}>
        <iframe
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <button onClick={onClose}>&#x2715;</button>
      </div>
    </div>
  );
};

export default Modal;

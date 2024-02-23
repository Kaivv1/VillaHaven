/*eslint-disable react/prop-types */

import Button from "./Button";

const ConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="confirm-modal-container">
      <div className="confirm-modal-wrapper">
        <p>Are you sure you want to continue this action ?</p>
        <div>
          <Button onClick={() => onCancel()} className="cancel-btn">
            Cancel
          </Button>
          <Button
            onClick={async () => await onConfirm()}
            className="confirm-btn"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

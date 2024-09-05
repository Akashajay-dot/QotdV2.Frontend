import React from "react";
import "../Styles/Modal.css"; 

const Modal = ({ onClose, children }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose} className="closeButton">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

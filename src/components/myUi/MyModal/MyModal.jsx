import React from "react";
import classes from "./MyModal.module.css";
const MyModal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modal}>
      <div className={classes.modal_content}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default MyModal;

import React from "react";
import classes from "./MyModal.module.css";
const MyModal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modal}>
      <div className={classes.modal_content}>{children}</div>
    </div>
  );
};

export default MyModal;

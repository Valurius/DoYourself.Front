import React from "react";
import classes from "./MyButton.module.css";
// Создаем функциональный компонент MyLink
const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myButton}>
      {children}
    </button>
  );
};

export default MyButton;

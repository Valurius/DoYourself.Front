import React from "react";
import classes from "./MyText.module.css"
const MyText = (props) => {
  // Деструктурируем props
  const {children} = props;

  // Возвращаем элемент Link с дополнительными свойствами
  return (
    <p className={classes.MyText}>{children}</p>
  );
};

export default MyText;
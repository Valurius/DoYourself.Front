import React from "react";
import { Link } from "react-router-dom";
import classes from "./MyLink.module.css"
// Создаем функциональный компонент MyLink
const MyLink = (props) => {
  // Деструктурируем props
  const { to, children, ...rest } = props;

  // Возвращаем элемент Link с дополнительными свойствами
  return (
    <Link 
      className={classes.myLink}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default MyLink;
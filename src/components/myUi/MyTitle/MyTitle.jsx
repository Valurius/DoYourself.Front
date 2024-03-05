import React from "react";
import classes from "./MyTitle.module.css";
const MyTitle = (props) => {
  const { children } = props;
  return <p className={classes.MyTitle}>{children}</p>;
};

export default MyTitle;

import React from "react";
import classes from "./MyList.module.css";

// Компонент для отдельного элемента списка
const MyList = ({ items, onToggle }) => {
  return (
    <ul className={classes["my-list"]}>
      {items.map((item) => (
        <li
          key={item.id}
          className={classes["my-list-item"]}
          onClick={() => onToggle(item.id)}
        >
          <label htmlFor={item.id} className={classes[item.done ? "done" : ""]}>
            <input
              onChange={() => onToggle(item.id)}
              type="checkbox"
              checked={item.done || false}
            />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default MyList;

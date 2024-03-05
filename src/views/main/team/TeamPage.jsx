import React, { useCallback, useState } from "react";
import "../team/team.css"; // Убедитесь, что CSS файл импортирован
import MyList from "../../../components/myUi/MyList/MyList";
import MyButton from "../../../components/myUi/MyButton/MyButton";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import Menu from "../../../components/Menu";
import { Sidebar } from "react-pro-sidebar";
import MenuBar from "../../../components/Menu";

const TeamPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      img: "https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg",
    },
    {
      id: 2,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      img: "https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg",
    },
    {
      id: 3,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      img: "https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg",
    },
  ]);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Мартиросян Гарегин",
      desk: "Разработчик",
      img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663637190_10-mykaleidoscope-ru-p-uspeshnie-molodie-lyudi-vkontakte-10.jpg",
    },
    {
      id: 2,
      name: "Василий Петров",
      desk: "Дружок",
      img: "https://geniy1s.ru/wp-content/uploads/2022/08/15d04cb6c97336bb90dcf65811978a71.jpg",
    },
    {
      id: 3,
      name: "Петр Васильев",
      desk: "Пирожок",
      img: "https://wagerevans.com/wp-content/uploads/2019/03/Looking-For-Ways-To-Make-Your-Smile-Whiter.jpeg",
    },
  ]);

  const handleToggle = useCallback(
    (id) => {
      const newTasks = [...tasks];
      const index = newTasks.findIndex((task) => task.id === id);
      newTasks[index].done = !newTasks[index].done;
      setTasks(newTasks);
    },
    [tasks]
  );

  return <MenuBar />;
};

export default TeamPage;

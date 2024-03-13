import React, { useCallback, useState } from "react";
import "../team/team.css"; // Убедитесь, что CSS файл импортирован
import MyList from "../../../components/myUi/MyList/MyList";
import MyButton from "../../../components/myUi/MyButton/MyButton";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import Menu from "../../../components/Menu";
import { Sidebar } from "react-pro-sidebar";
import MenuBar from "../../../components/Menu";
import MyText from "../../../components/myUi/MyText/MyText";

const Team = () => {
  // Здесь может быть логика для получения данных о команде и участниках

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн Гара сайта",
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

  return (
    <div className="team-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-tasks">
        <MyTitle>Мои задачи</MyTitle>
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task">
              <div className="task-icon">
                <img src={task.img} alt={task.name} />
              </div>
              <h2 className="name">{task.name}</h2>
              <div className="task-description">
                <p>{task.desk}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

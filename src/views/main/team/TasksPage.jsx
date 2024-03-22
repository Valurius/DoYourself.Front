import React, { useCallback, useState } from "react";
import "../team/tasks.css"; // Убедитесь, что CSS файл импортирован
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../components/Menu";

const TeamPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно .",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 2,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 3,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
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
    <div className="tasks-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-tasks">
        <MyTitle>Задачи команды</MyTitle>
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

export default TeamPage;

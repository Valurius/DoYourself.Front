import React, { useCallback, useState } from "react";
import "../styles/tasks.css"; // Убедитесь, что CSS файл импортирован
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/context";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";

const TasksPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках
  const { userRole } = useRoleContext();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно .",
      member: "Мартиросян Гарегин",
      project: "Венера",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 2,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      member: "Кто-то",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 3,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      member: "Кто-то",
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
        {userRole === "admin" ? <MyButton>Добавить</MyButton> : ""}
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task">
              <div className="task-icon">
                <img src={task.img} alt={task.name} />
              </div>
              <h2 className="name">{task.name}</h2>
              <div className="task-content">
                <div className="task-description">
                  <MyText>Задача: {task.desk}</MyText>
                  <MyText>Исполнитель: {task.member}</MyText>
                  <MyText>Проект: {task.project}</MyText>
                </div>
                <div>
                  <MyLink to="/1/task/">Перейти</MyLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

import React, { useState } from "react";
import "../styles/task.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import { useRoleContext } from "../../../../context/RoleContext";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import { useParams } from "react-router-dom";

const TasksPage = () => {
  const { userRole } = useRoleContext();
  const { teamId } = useParams();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно .",
      member: "Мартиросян Гарегин",
      project: "Венера",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
  ]);

  return (
    <div className="task-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="task-window">
        <MyLink to={`/${teamId}/tasks/`}>Назад</MyLink>
        <MyTitle>Задача Такая-то</MyTitle>
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task-page-content">
              <div className="task-details">
                <h2 className="name">{task.name}</h2>
                <MyText>{task.desk}</MyText>
                <MyText>{task.member}</MyText>
                <MyText>{task.project}</MyText>
                <MyLink to="/1/task/">Перейти</MyLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

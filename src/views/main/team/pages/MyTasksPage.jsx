import React, { useState, useEffect } from "react";
import "../styles/myTasks.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import { fetchTeamUserTasks } from "../../../../api/TaskApi";
import { Link, useParams } from "react-router-dom";
import { fetchUserById } from "../../../../api/UserApi";
import { fetchProjectById } from "../../../../api/ProjectApi";

const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const { teamId } = useParams();

  useEffect(() => {
    const loadUserTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userTasks = await fetchTeamUserTasks(userId, teamId);
        const tasksWithAdditionalInfo = await Promise.all(
          userTasks.map(async (task) => {
            const projectData = await fetchProjectById(task.projectId);
            const userData = await fetchUserById(task.userId);
            return {
              ...task,
              projectName: projectData.title,
              userName: userData.name,
            };
          })
        );
        setTasks(tasksWithAdditionalInfo);
      } catch (error) {
        console.error("Ошибка при получении задач пользователя:", error);
      }
    };

    loadUserTasks();
  }, [teamId]);

  return (
    <div className="myTasks-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="myTasks-list">
        <MyTitle>Мои задачи</MyTitle>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="card">
              <div className="card-header">
                <div className="card-title">{task.title}</div>
                <div
                  className={
                    task.priority === "Высокий"
                      ? "card-priority-high"
                      : task.priority === "Средний"
                      ? "card-priority-medium"
                      : "card-priority-low"
                  }
                >
                  {task.priority === "Высокий"
                    ? "☆☆☆ "
                    : task.priority === "Средний"
                    ? "☆☆ "
                    : "☆ "}
                  {task.priority}
                </div>
              </div>
              <div className="card-body">
                <div className="card-description">
                  Описание задачи: {task.description}
                </div>
                <div className="card-description">
                  Ответственный: {task.userName}
                </div>
                <div className="card-description">
                  Проект: {task.projectName}
                </div>
                <div className="card-deadline">
                  Задачу необходимо выполнить до:{" "}
                  {new Date(task.deadline).toLocaleDateString("ru-RU")}
                </div>
                <div className="link-button-container">
                  <Link
                    to={`/${teamId}/${task.projectId}/${task.id}/`}
                    className="link-button"
                  >
                    Перейти
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="noTasks">У вас нет задач</p>
        )}
      </div>
    </div>
  );
};

export default MyTasksPage;

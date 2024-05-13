import React, { useState, useEffect } from "react";
import "../styles/myTasks.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { fetchTeamUserTasks } from "../../../../api/TaskApi"; // Убедитесь, что путь к API корректный
import { Link, useParams } from "react-router-dom";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import { fetchUserById } from "../../../../api/UserApi";

const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const { teamId } = useParams();
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const loadUserTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userTasks = await fetchTeamUserTasks(userId, teamId);
        setTasks(userTasks);
        const userIds = userTasks.map((task) => task.userId);
        const uniqueUserIds = [...new Set(userIds)];
        const userNamesPromises = uniqueUserIds.map((id) => fetchUserById(id));
        const users = await Promise.all(userNamesPromises);
        const names = {};
        users.forEach((user) => {
          names[user.id] = user.name;
        });
        setUserNames(names);
      } catch (error) {
        console.error("Ошибка при получении задач пользователя:", error);
      }
    };

    loadUserTasks();
  }, []);

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
              <div className="card-content">
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
                      ? "☆☆☆"
                      : task.priority === "Средний"
                      ? "☆☆"
                      : "☆"}
                    {task.priority}
                  </div>
                </div>
                <div className="card-description">
                  Описание задачи: {task.description}
                </div>
                <div className="card-description">
                  Ответственный: {userNames[task.userId]}
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

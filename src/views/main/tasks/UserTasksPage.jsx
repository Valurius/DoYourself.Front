// Импортируем React и useState
import React, { useCallback, useEffect, useState } from "react";
import "../tasks/tasks.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyList from "../../../components/myUi/MyList/MyList";
// Создаем компонент TaskList
const UserTasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team B" },
    { id: 4, name: "Team B" },
    { id: 5, name: "Team B" },
  ]);

  useEffect(() => {
    fetch("https://localhost:44305/api/task")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

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
    <div className="task-list">
      <MyTitle>Список задач</MyTitle>
      <MyList items={tasks} onToggle={handleToggle} />
    </div>
  );
};

// Экспортируем компонент TaskList
export default UserTasksPage;

import React, { useCallback, useEffect, useState } from "react";
import "../styles/tasks.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/context";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { useParams } from "react-router-dom";
import { fetchTasks, createTask } from "../../../../api/TaskApi";

const TasksPage = () => {
  const { userRole } = useRoleContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    needToBeDoneAt: "2024-04-25",
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { teamId } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const loadTasks = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      console.log(taskData);
      await createTask(taskData);
      closeModal();
      await loadTasks();
    } catch (error) {
      console.error("Ошибка при создании команды:", error);
    }
  };

  return (
    <div className="tasks-page">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Добавление задачи</MyTitle>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label htmlFor="title">Название задачи:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                placeholder="Название"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание задачи:</label>
              <textarea
                id="description"
                value={taskData.description}
                name="description"
                onChange={handleInputChange}
                placeholder="Описание"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Приоритет:</label>
              <select
                id="taskPriority"
                name="taskPriority"
                onChange={handleInputChange}
              >
                <option value="Высокий">Высокий</option>
                <option value="Средний">Средний</option>
                <option value="Низкий">Низкий</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Ответственный:</label>
              <select
                id="taskManager"
                name="taskManager"
                onChange={handleInputChange}
              >
                <option value="Гар">Гар</option>
                <option value="Не Гар">Не Гар</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Временная задача?</label>
              <select id="taskManager" name="taskManager">
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="needToBeDoneAt">Срок выполнения:</label>
              <input
                type="date"
                id="needToBeDoneAt"
                value={taskData.needToBeDoneAt}
                name="needToBeDoneAt"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="submit">Добавить задачу</button>
              <button type="button" onClick={closeModal}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      </MyModal>

      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-tasks">
        <MyTitle>Задачи команды</MyTitle>
        {userRole === "admin" ? (
          <div>
            <MyLink to={`/${teamId}/tags/`}>Тэги</MyLink>
            <MyButton onClick={openModal}>Добавить</MyButton>
          </div>
        ) : (
          ""
        )}

        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task">
              <div className="task-icon">
                <img src={task.img} alt={task.name} />
              </div>
              <h2 className="name">{task.name}</h2>
              <div className="task-content">
                <div className="task-description">
                  <MyText>Задача: {task.title}</MyText>
                  <MyText>Описание: {task.description}</MyText>
                  <MyText>Проект: {task.project}</MyText>
                </div>
                <div>
                  <MyLink to={`/${teamId}/task/`}>Перейти</MyLink>
                </div>
              </div>
              <button>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

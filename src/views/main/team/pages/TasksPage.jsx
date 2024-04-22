import React, { useCallback, useState } from "react";
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

const TasksPage = () => {
  const { userRole } = useRoleContext();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { teamId } = useParams();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно придумать и нарисовать красивый и удобный дизайн для нашего сайта.",
      member: "Мартиросян Гарегин",
      project: "Венера",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 2,
      name: "Функционал сайта",
      desk: "Нужно придумать хороший функционал для нашего сайта.",
      member: "Мартиросян Гарегин",
      project: "Венера",
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
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Добавление задачи</MyTitle>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="taskName">Название задачи:</label>
              <input type="text" id="taskName" name="taskName" required />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Описание задачи:</label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Приоритет:</label>
              <select id="taskPriority" name="taskPriority">
                <option value="Высокий">Высокий</option>
                <option value="Средний" selected>
                  Средний
                </option>
                <option value="Низкий">Низкий</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskDeadline">Срок выполнения:</label>
              <input
                type="date"
                id="taskDeadline"
                name="taskDeadline"
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
                  <MyText>Задача: {task.desk}</MyText>
                  <MyText>Исполнитель: {task.member}</MyText>
                  <MyText>Проект: {task.project}</MyText>
                </div>
                <div>
                  <MyLink to={`/${teamId}/task/`}>Перейти</MyLink>
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

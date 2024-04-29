import React, { useCallback, useEffect, useState } from "react";
import "../styles/project.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/RoleContext";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { Link, useParams } from "react-router-dom";
import { fetchTasks, createTask } from "../../../../api/TaskApi";
import { fetchTeamTitleById } from "../../../../api/TeamApi";

const ProjectPage = () => {
  const { teamId } = useParams();
  const { userRole } = useRoleContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamTitle, setTeamTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Низкий",
    needToBeDoneAt: "2024-04-25",
  });

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  function isValidImageURL(str) {
    return /\.(jpeg|jpg|gif|png)$/.test(str);
  }

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      const tasksData = await fetchTasks(teamId);
      setTasks(tasksData);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  }, [teamId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const title = await fetchTeamTitleById(teamId);
        setTeamTitle(title);
        await loadTasks();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    loadData();
  }, [teamId, loadTasks]);

  const handleCreateTask = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await createTask(taskData);
        closeModal();
        await loadTasks();
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
      }
    },
    [taskData, loadTasks]
  );

  return (
    <div className="projects-page">
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
              <label htmlFor="priority">Приоритет:</label>
              <select
                id="priority"
                name="priority"
                value={taskData.priority}
                onChange={handleInputChange}
              >
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
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
      <div className="project-content">
        <div>
          <MyLink to={`/${teamId}/projects/`}>Назад</MyLink>
        </div>
        <MyTitle>Проект "{teamTitle}"</MyTitle>
        {userRole === "admin" ? (
          <div>
            <MyLink to={`/${teamId}/tags/`}>Тэги</MyLink>
            <MyButton onClick={openModal}>Добавить</MyButton>
          </div>
        ) : (
          ""
        )}
        <div className="project-info">
          <div className="project-tasks">
            <MyTitle>Задачи проекта</MyTitle>
            {tasks.map((task) => (
              <div key={task.id}>
                <div class="card">
                  <div className="card-image">
                    {isValidImageURL(task.image) ? (
                      <img src={task.image} alt={task.name} />
                    ) : (
                      <img
                        src="https://sun9-59.userapi.com/impg/_djd7n4HCVLXfczBeRBNC2oyCy37QqPTa7TCcQ/hXXVXfkFF2A.jpg?size=415x383&quality=96&sign=de78da1bc1a16891a4bf12e5fd406521&type=album"
                        alt={task.name}
                      />
                    )}
                  </div>

                  <div class="card-content">
                    <div class="card-title">{task.title}</div>
                    <div class="card-description">
                      Описание проекта: {task.description}
                    </div>
                    <div class="card-goal"> Цель проекта: {task.goal}</div>
                    <div class="card-deadline">
                      Проект необходимо выполнить до: {task.deadline}
                    </div>
                    <Link to={`/${teamId}/project/`} class="link-button">
                      Перейти
                    </Link>
                  </div>
                  <div class="card-status"> ☆{task.priority}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="project-params">
            <MyTitle>
              Информация <br /> о проекте
            </MyTitle>
          </div>
          <div className="project-members">
            <MyTitle>Участники</MyTitle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

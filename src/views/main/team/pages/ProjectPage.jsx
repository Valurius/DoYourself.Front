import React, { useCallback, useEffect, useState } from "react";
import "../styles/project.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/RoleContext";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { Link, useParams } from "react-router-dom";
import { fetchTasks, createTask } from "../../../../api/TaskApi";
import { fetchProjectById } from "../../../../api/ProjectApi";
import { fetchTeamTitleById } from "../../../../api/TeamApi";

const ProjectPage = () => {
  const { teamId } = useParams();
  const { projectId } = useParams();
  const { userRole } = useRoleContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamTitle, setTeamTitle] = useState("");
  const [project, setProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersData, setMembersData] = useState({});
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
      const projectData = await fetchProjectById(projectId);
      setProject(projectData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  }, [teamId, projectId]);

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
    [taskData, loadTasks, closeModal]
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
                id="deadline"
                value={taskData.deadline}
                name="deadline"
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
                  <div class="card-content">
                    <div class="card-title">{task.title}</div>
                    <div class="card-description">
                      Описание задачи: {task.description}
                    </div>
                    <div class="card-deadline">
                      Задачу необходимо выполнить до:{" "}
                      {new Date(task.deadline).toLocaleDateString("ru-RU")}
                    </div>
                    <div className="link-button-container">
                      <Link to={`/${teamId}/task/`} class="link-button">
                        Перейти
                      </Link>
                    </div>
                  </div>
                  <div
                    className={
                      task.priority === "Высокий"
                        ? "card-status-high"
                        : task.priority === "Средний"
                        ? "card-status-medium"
                        : "card-status-low"
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
              </div>
            ))}
          </div>
          <div className="project-params">
            <MyTitle>Информация</MyTitle>
            <div className="project-param">Название: {project.title}</div>
            <div className="project-param">Цель: {project.goal}</div>
            <div className="project-param">Описание: {project.description}</div>
            <div className="project-param">Бюджет: {project.budget}</div>
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

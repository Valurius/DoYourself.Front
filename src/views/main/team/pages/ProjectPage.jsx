import React, { useCallback, useEffect, useState } from "react";
import "../styles/project.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { Link, useParams } from "react-router-dom";
import { createTask, fetchTasksByProjectId } from "../../../../api/TaskApi";
import {
  addUserForProject,
  fetchProjectById,
  fetchProjectUsersByProjectId,
  updateProject,
} from "../../../../api/ProjectApi";
import MyText from "../../../../components/myUi/MyText/MyText";
import { fetchTeamMembersById } from "../../../../api/TeamApi";
import { fetchUserById } from "../../../../api/UserApi";
import { addTagForTask, fetchTags } from "../../../../api/TagsApi";

const ProjectPage = () => {
  const { teamId, projectId } = useParams();
  const userRole = localStorage.getItem("permission");
  const [editing, setEditing] = useState(false);
  const [project, setProject] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [taskData, setTaskData] = useState({
    projectId: projectId,
    userId: "",
    title: "",
    description: "",
    priority: "Низкий",
    Deadline: "2024-04-25",
    tags: [],
  });

  const [projectData, setProjectData] = useState({
    title: project.title,
    goal: project.goal,
    priority: project.priority,
    description: project.description,
    budget: project.budget,
  });

  // Функция для загрузки данных
  const loadData = useCallback(async () => {
    try {
      const [projectUsers, membersOfTeam, tasksData, projectData, tagsData] =
        await Promise.all([
          fetchProjectUsersByProjectId(projectId),
          fetchTeamMembersById(teamId),
          fetchTasksByProjectId(projectId),
          fetchProjectById(projectId),
          fetchTags(),
        ]);

      setProjectMembers(projectUsers);
      setMembers(membersOfTeam);
      setTasks(tasksData);
      setProject(projectData);
      setTags(tagsData);
      const tasksWithAdditionalInfo = await Promise.all(
        tasksData.map(async (task) => {
          try {
            const userData = await fetchUserById(task.userId);
            return {
              ...task,
              projectName: projectData?.title, // Используйте опциональный оператор цепочки
              userName: userData?.name, // Используйте опциональный оператор цепочки
            };
          } catch (taskError) {
            console.error(
              `Ошибка при загрузке данных для задачи ${task.id}:`,
              taskError
            );
            return task; // Возвращаем исходную задачу, если произошла ошибка
          }
        })
      );

      setTasks(tasksWithAdditionalInfo);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }, [projectId, teamId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Обработчики событий
  // Состояния и функции для управления первым модальным окном
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const toggleFirstModal = useCallback(() => {
    setFirstModalOpen((prev) => !prev);
  }, []);

  // Состояния и функции для управления вторым модальным окном
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const toggleSecondModal = useCallback(() => {
    setSecondModalOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleInputManyChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const newTags = [...taskData.tags];
      if (event.target.checked) {
        // Добавляем тег, если чекбокс отмечен
        newTags.push(value);
      } else {
        // Удаляем тег, если чекбокс не отмечен
        const index = newTags.indexOf(value);
        if (index > -1) {
          newTags.splice(index, 1);
        }
      }
      setTaskData((prevData) => ({ ...prevData, [name]: newTags }));
    },
    [taskData.tags]
  );

  const handleInputChangeProject = useCallback((event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  // Создание и обновление задач и проектов
  const handleCreateTask = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await createTask(taskData, teamId);
        const responseData = await response.json(); // Обработка JSON-ответа
        const taskId = responseData.taskId; // Извлечение taskId из ответа

        if (taskId) {
          for (const tagId of taskData.tags) {
            await addTagForTask(taskId, tagId);
          }
          toggleFirstModal();
          loadData();
        } else {
          console.error(
            "Не удалось получить идентификатор задачи из ответа сервера"
          );
        }
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
      }
    },
    [taskData, loadData, toggleFirstModal, teamId]
  );

  const handleAddUser = useCallback(
    async (event, userId) => {
      event.preventDefault();
      try {
        console.log(userId, projectId);
        await addUserForProject(userId, projectId);
        toggleSecondModal();
        loadData();
      } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);
      }
    },
    [loadData, toggleSecondModal, projectId]
  );

  const handleSaveClick = async () => {
    try {
      const updatedProjectData = await updateProject(projectId, projectData);
      setProject(updatedProjectData);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении проекта:", error);
    }
  };

  // Дополнительные функции для редактирования
  const handleEditClick = () => {
    setProjectData({
      title: project.title,
      goal: project.goal,
      description: project.description,
      budget: project.budget,
      priority: project.priority,
    });
    setEditing(true);
  };

  return (
    <div className="projects-page">
      <MyModal isOpen={isFirstModalOpen} onToggle={toggleFirstModal}>
        <div className="modal-content">
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
                <label htmlFor="userId">Ответственный:</label>
                <select
                  id="userId"
                  name="userId"
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Ответственный</option>
                  {projectMembers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
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
              <div className="form-group">
                <label>Теги:</label>
                {tags.map((tag) => (
                  <div key={tag.id} className="many">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      name="tags"
                      value={tag.id}
                      checked={taskData.tags.includes(tag.id)}
                      onChange={handleInputManyChange}
                    />
                    <label htmlFor={`tag-${tag.id}`}>
                      {tag.title} ({tag.points} очков)
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <strong>Выбранные теги:</strong>
                <ul>
                  {taskData.tags &&
                    taskData.tags.map((tagId) => {
                      const tag = tags.find((t) => t.id === tagId);
                      return <li key={tagId}>{tag?.title}</li>;
                    })}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="submit">Добавить задачу</button>
                <button type="button" onClick={toggleFirstModal}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      </MyModal>

      <MyModal isOpen={isSecondModalOpen} onToggle={toggleSecondModal}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="members-list">
              <MyTitle>Список работников</MyTitle>
              {members.map((member) => (
                <div key={member.id} className="member-card">
                  {member.picture ? (
                    <img
                      src={member.picture}
                      alt={member.name}
                      className="member-icon"
                    />
                  ) : (
                    <img
                      src="https://sun9-46.userapi.com/impg/aLcIsmmt6Zvgr5tyCY68krWL6QJr8o9w2qhTrw/k9sU8l05H60.jpg?size=2048x1290&quality=96&sign=e9f338a2b74c4e35d98013db0c9c650f&type=album"
                      alt={member.name}
                      className="member-icon"
                    />
                  )}
                  <div className="member-info">
                    <h2 className="member-name">{member.name}</h2>
                    <MyText>{member.desk}</MyText>
                  </div>
                  <MyButton
                    type="button"
                    onClick={(event) => handleAddUser(event, member.id)}
                  >
                    Добавить
                  </MyButton>
                </div>
              ))}
            </div>
            <button type="button" onClick={toggleSecondModal}>
              Отмена
            </button>
          </div>
        </div>
      </MyModal>

      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="project-content">
        <div>
          <MyLink to={`/${teamId}/projects/`}>Назад</MyLink>
        </div>
        <MyTitle>Проект "{project.title}"</MyTitle>
        {userRole === "Админ" ? (
          <div>
            <MyLink to={`/${teamId}/${projectId}/tags/`}>Тэги</MyLink>
            <MyButton onClick={toggleFirstModal}>Добавить</MyButton>
          </div>
        ) : (
          ""
        )}
        <div className="project-info">
          <div className="project-tasks">
            {tasks.length === 0 ? (
              <div>
                <MyTitle>Задачи проекта</MyTitle>
                <p className="noTasks">Задач нет</p>
              </div>
            ) : (
              <>
                <MyTitle>Задачи проекта</MyTitle>
                <input
                  type="text"
                  placeholder="Поиск по названию..."
                  value={searchQuery}
                  className="search-input"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {tasks
                  .filter((task) =>
                    task.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((task) => (
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
                            ? "☆☆☆"
                            : task.priority === "Средний"
                            ? "☆☆"
                            : "☆"}
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
                        <div className="card-deadline">
                          Задачу необходимо выполнить до:{" "}
                          {new Date(task.deadline).toLocaleDateString("ru-RU")}
                        </div>
                        <div className="link-button-container">
                          <Link
                            to={`/${teamId}/${projectId}/${task.id}/`}
                            className="link-button"
                          >
                            Перейти
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
          <div className="project-params">
            <MyTitle>Информация</MyTitle>
            <div className="project-params-card">
              {editing ? (
                <div className="form-group">
                  <label htmlFor="title">Название проекта</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={projectData.title}
                    onChange={handleInputChangeProject}
                    placeholder={project.title}
                  />
                </div>
              ) : (
                <div className="project-param">Название: {project.title}</div>
              )}

              {editing ? (
                <div className="form-group">
                  <label htmlFor="goal">Цель</label>
                  <input
                    id="goal"
                    name="goal"
                    type="text"
                    value={projectData.goal}
                    onChange={handleInputChangeProject}
                    placeholder={project.goal}
                  />
                </div>
              ) : (
                <div className="project-param">Цель: {project.goal}</div>
              )}

              {editing ? (
                <div className="form-group">
                  <label htmlFor="description">Описание</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={projectData.description}
                    onChange={handleInputChangeProject}
                    placeholder={project.description}
                  />
                </div>
              ) : (
                <div className="project-param">
                  Описание: {project.description}
                </div>
              )}

              {editing ? (
                <div className="form-group">
                  <label htmlFor="budget">Бюджет</label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    value={projectData.budget}
                    onChange={handleInputChangeProject}
                    placeholder={project.budget}
                  />
                </div>
              ) : (
                <div className="project-param">Бюджет: {project.budget}</div>
              )}

              {editing ? (
                <div className="form-group">
                  <label htmlFor="priority">Приоритет:</label>
                  <select
                    id="priority"
                    name="priority"
                    value={projectData.priority}
                    onChange={handleInputChangeProject}
                  >
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                  </select>
                </div>
              ) : (
                <div className="project-param">
                  Приоритет: {project.priority}
                </div>
              )}
            </div>
            {editing ? (
              <MyButton onClick={handleSaveClick}>Сохранить</MyButton>
            ) : (
              userRole === "Админ" && (
                <MyButton onClick={handleEditClick}>Редактировать</MyButton>
              )
            )}
          </div>
          <div className="project-members">
            <MyTitle>Участники</MyTitle>
            <div className="add">
              <MyButton onClick={toggleSecondModal}>Добавить</MyButton>
            </div>
            <div className="members-pag">
              <div className="members-list">
                {projectMembers.length > 0 ? (
                  projectMembers.map((member) => (
                    <div key={member.id} className="member-card">
                      {member.picture ? (
                        <img
                          src={member.picture}
                          alt={member.name}
                          className=" member-icon"
                        />
                      ) : (
                        <img
                          src="https://sun9-46.userapi.com/impg/aLcIsmmt6Zvgr5tyCY68krWL6QJr8o9w2qhTrw/k9sU8l05H60.jpg?size=2048x1290&quality=96&sign=e9f338a2b74c4e35d98013db0c9c650f&type=album"
                          alt={member.name}
                          className=" member-icon"
                        />
                      )}
                      <div className="member-info">
                        <h2 className="member-name">{member.name}</h2>
                        <h2 className="member-name">{member.surname}</h2>
                        <MyText>{member.position}</MyText>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-members">
                    <MyText>Участников нет</MyText>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

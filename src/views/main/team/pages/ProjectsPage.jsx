import React, { useEffect, useState, useCallback } from "react";
import "../styles/projects.css";
import "../styles/card.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { Link, useParams } from "react-router-dom";
import { fetchProjects, createProject } from "../../../../api/ProjectApi";
import { fetchTeamTitleById } from "../../../../api/TeamApi";

const ProjectsPage = () => {
  const { teamId } = useParams();
  const [teamTitle, setTeamTitle] = useState("");
  const userRole = localStorage.getItem("permission");
  const [isModalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [projectData, setProjectData] = useState({
    teamId,
    title: "",
    image: "",
    goal: "",
    description: "",
    priority: "Низкий",
    deadline: "2024-04-25",
  });

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      const projectsData = await fetchProjects(teamId);
      const filteredProjects = projectsData.filter(
        (project) => project.teamId === teamId
      );
      setProjects(filteredProjects);
    } catch (error) {
      console.error("Ошибка при загрузке проектов:", error);
    }
  }, [teamId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const title = await fetchTeamTitleById(teamId);
        setTeamTitle(title);
        await loadProjects();
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    loadData();
  }, [teamId, loadProjects]);

  const handleCreateProject = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await createProject(projectData);
        closeModal();
        await loadProjects();
      } catch (error) {
        console.error("Ошибка при создании проекта:", error);
      }
    },
    [projectData, loadProjects, closeModal]
  );

  return (
    <div className="projects-page">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Создание проекта</MyTitle>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateProject}>
            <div className="form-group">
              <label htmlFor="title">Название проекта:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleInputChange}
                placeholder="Название"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Цель проекта:</label>
              <input
                type="text"
                id="goal"
                name="goal"
                value={projectData.goal}
                onChange={handleInputChange}
                placeholder="Цель"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание проекта:</label>
              <textarea
                id="description"
                value={projectData.description}
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
                value={projectData.priority}
                onChange={handleInputChange}
              >
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="needToBeDoneAt">Дедлайн выполнения:</label>
              <input
                type="date"
                id="deadline"
                value={projectData.deadline}
                name="deadline"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="submit">Создать проект</button>
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
      <div className="team-projects">
        <MyTitle>Проекты команды "{teamTitle}"</MyTitle>
        {userRole === "Админ" ? (
          <div>
            <MyButton onClick={openModal}>Добавить проект</MyButton>
          </div>
        ) : (
          ""
        )}
        <div className="search">
          <input
            type="text"
            placeholder="Поиск по названию проекта..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input" // Добавьте этот класс для стилей
          />
        </div>
        {projects.length > 0 ? (
          projects
            .filter((project) =>
              project.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((project) => (
              <div key={project.id} className="card">
                <div className="card-header">
                  <div className="card-title">{project.title}</div>

                  <div
                    className={
                      project.priority === "Высокий"
                        ? "card-priority-high"
                        : project.priority === "Средний"
                        ? "card-priority-medium"
                        : "card-priority-low"
                    }
                  >
                    {project.priority === "Высокий"
                      ? "☆☆☆ "
                      : project.priority === "Средний"
                      ? "☆☆ "
                      : "☆ "}
                    {project.priority}
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-description">
                    Описание проекта: {project.description}
                  </div>
                  <div className="card-goal">Цель проекта: {project.goal}</div>
                  <div className="card-deadline">
                    Проект необходимо выполнить до:{" "}
                    {new Date(project.deadline).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="link-button-container">
                    <Link
                      to={`/${teamId}/${project.id}/`}
                      className="link-button"
                    >
                      Перейти
                    </Link>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="noTasks">Проектов нет</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;

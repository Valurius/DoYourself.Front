import React, { useEffect, useState, useCallback } from "react";
import "../styles/projects.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/RoleContext";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { useParams } from "react-router-dom";
import { fetchProjects, createProject } from "../../../../api/ProjectApi";
import { fetchTeamTitleById } from "../../../../api/TeamApi";

const ProjectsPage = () => {
  const { teamId } = useParams();
  const [teamTitle, setTeamTitle] = useState("");
  const { userRole } = useRoleContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    teamId,
    title: "",
    image: "",
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
      setProjects(projectsData);
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
    [projectData, loadProjects]
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
              <label htmlFor="image">Фото:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={projectData.image}
                onChange={handleInputChange}
                placeholder="Адрес фото"
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
                id="needToBeDoneAt"
                value={projectData.needToBeDoneAt}
                name="needToBeDoneAt"
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
        {userRole === "admin" ? (
          <div>
            <MyButton onClick={openModal}>Добавить проект</MyButton>
            <MyLink to={`/${teamId}/tasks/`}>Задачи проекта</MyLink>
          </div>
        ) : (
          <MyLink to={`/${teamId}/tasks/`}>Задачи проекта</MyLink>
        )}

        {projects.map((project) => (
          <div key={project.id}>
            <div className="project">
              <div className="project-icon">
                <img
                  src={
                    "https://zendiar.com/wp-content/uploads/2023/06/planeta-venera-atmosfera-poverhnost-interesnye-fakty-foto-i-video-16ddeb3.jpg"
                  }
                  alt={project.name}
                />
              </div>
              <h2 className="name">{project.name}</h2>
              <div className="project-content">
                <div className="project-description">
                  <MyText>Проект: {project.title}</MyText>
                  <MyText>Цель: {project.goal}</MyText>
                  <MyText>Описание: {project.description}</MyText>
                  <MyText>Приоритет: {project.priority}</MyText>
                  <MyText>Крайний срок: {project.deadline}</MyText>
                </div>
              </div>
              <div>
                <MyLink to={`/${teamId}/project/`}>Перейти</MyLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;

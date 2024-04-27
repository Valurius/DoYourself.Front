import React, { useEffect, useState } from "react";
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
import MyLoader from "../../../../components/myUi/MyLoader/MyLoader";

const ProjectsPage = () => {
  const { teamId } = useParams();
  const [teamTitle, setTeamTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useRoleContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [projects, setprojects] = useState([]);
  const [projectData, setprojectData] = useState({
    teamId: teamId,
    title: "",
    description: "",
    priority: "Низкий",
    deadline: "2024-04-25",
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setprojectData({ ...projectData, [name]: value });
  };

  const loadprojects = async () => {
    try {
      const projectsData = await fetchProjects();
      setprojects(projectsData);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const title = await fetchTeamTitleById(teamId);
        setTeamTitle(title);
        const projectsData = await fetchProjects();
        setprojects(projectsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
      setIsLoading(false);
    };

    loadData();
  }, [teamId]);

  const handleCreateproject = async (event) => {
    event.preventDefault();
    try {
      await createProject(projectData);
      closeModal();
      await loadprojects();
    } catch (error) {
      console.error("Ошибка при создании команды:", error);
    }
  };
  if (isLoading) {
    return (
      <div className="projects-page">
        <MenuBar />
        <MyLoader></MyLoader>;
      </div>
    );
  }

  return (
    <div className="projects-page">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Создание проекта"</MyTitle>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateproject}>
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
                id="needToBeDoneAt"
                value={projectData.needToBeDoneAt}
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
      <div className="team-projects">
        <MyTitle>Проекты команды "{teamTitle}"</MyTitle>
        {userRole === "admin" ? (
          <div>
            <MyButton onClick={openModal}>Добавить</MyButton>
            <MyLink to={`/${teamId}/tasks/`}>Задачи проекта</MyLink>
          </div>
        ) : (
          <MyLink to={`/${teamId}/tasks/`}>Задачи проекта</MyLink>
        )}

        {projects.map((project) => (
          <div key={project.id}>
            <div className="project">
              <div className="project-icon">
                <img src={project.img} alt={project.name} />
              </div>
              <h2 className="name">{project.name}</h2>
              <div className="project-content">
                <div className="project-description">
                  <MyText>Задача: {project.title}</MyText>
                  <MyText>Описание: {project.description}</MyText>
                  <MyText>Проект: {project.project}</MyText>
                </div>
                <div>
                  <MyLink to={`/${teamId}/project/`}>Перейти</MyLink>
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

export default ProjectsPage;

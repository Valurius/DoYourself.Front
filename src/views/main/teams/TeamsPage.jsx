import React, { useState, useEffect, useCallback } from "react";
import "../teams/teams.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyLink from "../../../components/myUi/MyLink/MyLink";
import MyButton from "../../../components/myUi/MyButton/MyButton";
import MyModal from "../../../components/myUi/MyModal/MyModal";
import { fetchTeamsByUserId, createTeam } from "../../../api/TeamApi"; // Импорт обновленной функции
import MyText from "../../../components/myUi/MyText/MyText";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamData, setTeamData] = useState({ title: "" });
  const userRole = localStorage.getItem("permission");
  const userId = localStorage.getItem("userId"); // Получаем userId из localStorage

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  // Обновленная функция loadTeams для загрузки команд пользователя
  const loadTeams = useCallback(async () => {
    try {
      const teamsData = await fetchTeamsByUserId(userId); // Вызов функции с userId
      setTeams(teamsData);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  }, [userId]); // Добавляем userId в список зависимостей

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setTeamData((prevTeamData) => ({ ...prevTeamData, [name]: value }));
  }, []);

  const handleCreateTeam = useCallback(async () => {
    try {
      await createTeam(teamData);
      closeModal();
      await loadTeams(); // Перезагрузка команд после создания новой
    } catch (error) {
      console.error("Ошибка при создании команды:", error);
    }
  }, [teamData, loadTeams]);

  return (
    <div className="team-list">
      <MyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="custom-modal"
      >
        <div className="modal-content">
          <MyText>Создание новой команды</MyText>
          <input
            type="text"
            name="title"
            value={teamData.title}
            onChange={handleInputChange}
            placeholder="Название команды"
            className="modal-input"
          />
          <MyButton onClick={handleCreateTeam} className="modal-button">
            Создать
          </MyButton>
        </div>
      </MyModal>
      <div className="title">
        <MyTitle>Мои команды</MyTitle>
      </div>
      <ul className="team-ul">
        {teams.map((team) => (
          <li className="team-li" key={team.id}>
            <MyLink to={`/${team.id}/projects/`} className="team-link">
              <p className="my-text">{team.title}</p>
            </MyLink>
          </li>
        ))}
        {userRole === "Админ" ? (
          <li className="team-li">
            <button onClick={openModal} className="newTeam">
              +
            </button>
          </li>
        ) : (
          <li className="team-li">
            <button onClick={openModal} className="newTeam">
              <MyText>Войти по коду</MyText>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TeamsPage;

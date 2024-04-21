import React, { useState, useEffect } from "react";
import "../teams/teams.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyLink from "../../../components/myUi/MyLink/MyLink";
import MyText from "../../../components/myUi/MyText/MyText";
import MyModal from "../../../components/myUi/MyModal/MyModal";
// Создаем компонент TeamList
const TeamsPage = () => {
  const [teams, setTeams] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [teamTitle, setTeamTitle] = useState("");

  // Функция для загрузки команд с API
  const fetchTeams = async () => {
    try {
      const response = await fetch("https://localhost:44305/api/Team");
      if (!response.ok) {
        throw new Error("Команды не найдены.");
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Ошибка при получении команд:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const response = await fetch("https://localhost:44305/api/Team", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          title: teamTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании команды");
      }
      setModalOpen(false);
      fetchTeams();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Используем useEffect для загрузки команд при монтировании компонента
  useEffect(() => {
    fetchTeams();
  }, []);

  // Возвращаем JSX код с списком команд
  return (
    <div className="team-list">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <input
          type="text"
          value={teamTitle}
          onChange={(e) => setTeamTitle(e.target.value)}
          placeholder="Название команды"
        />
        <button onClick={handleCreateTeam}>Создать</button>
      </MyModal>
      <div className="title">
        <MyTitle>Мои команды</MyTitle>
      </div>
      <ul className="team-ul">
        {teams.map((team) => (
          <li className="team-li" key={team.id}>
            <MyLink to={`/${team.id}/tasks/`} className="team-link">
              <MyText>{team.title}</MyText>
            </MyLink>
          </li>
        ))}
        <li className="team-li">
          <button onClick={openModal} className="newTeam">
            dsfdffdsfd
          </button>
        </li>
      </ul>
    </div>
  );
};

// Экспортируем компонент TeamList по умолчанию
export default TeamsPage;

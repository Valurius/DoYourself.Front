import React, { useState, useEffect } from "react";
import "../teams/teams.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyLink from "../../../components/myUi/MyLink/MyLink";
import MyButton from "../../../components/myUi/MyButton/MyButton";
import MyModal from "../../../components/myUi/MyModal/MyModal";
import { fetchTeams, createTeam, deleteTeam } from "./TeamApi";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamTitle, setTeamTitle] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const loadTeams = async () => {
    try {
      const teamsData = await fetchTeams();
      setTeams(teamsData);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreateTeam = async () => {
    try {
      await createTeam(teamTitle);
      closeModal();
      await loadTeams();
    } catch (error) {
      console.error("Ошибка при создании команды:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      await loadTeams();
    } catch (error) {
      console.error("Ошибка при удалении команды:", error);
    }
  };

  return (
    <div className="team-list">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <input
          type="text"
          value={teamTitle}
          onChange={(e) => setTeamTitle(e.target.value)}
          placeholder="Название команды"
        />
        <MyButton onClick={handleCreateTeam}>Создать</MyButton>
      </MyModal>
      <div className="title">
        <MyTitle>Мои команды</MyTitle>
      </div>
      <ul className="team-ul">
        {teams.map((team) => (
          <li className="team-li" key={team.id}>
            <button
              className="close-btn"
              onClick={() => handleDeleteTeam(team.id)}
            >
              &times;
            </button>
            <MyLink to={`/${team.id}/tasks/`} className="team-link">
              <p className="my-text">{team.title}</p>
            </MyLink>
          </li>
        ))}
        <li className="team-li">
          <button onClick={openModal} className="newTeam">
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeamsPage;

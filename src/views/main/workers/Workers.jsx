import React, { useState, useEffect, useCallback } from "react";
import "../workers/workers.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyText from "../../../components/myUi/MyText/MyText";
import { fetchUsers } from "../../../api/UserApi";
import MyButton from "../../../components/myUi/MyButton/MyButton";
import MyModal from "../../../components/myUi/MyModal/MyModal";
import { addTeamMember, fetchTeams } from "../../../api/TeamApi";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const toggleModal = useCallback((userId) => {
    setSelectedUserId(userId);
    setSecondModalOpen((prevState) => !prevState);
  }, []);

  const loadTeams = useCallback(async () => {
    try {
      const teamsData = await fetchTeams();
      setTeams(teamsData);
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
    }
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers();
      const filteredUsers = usersData.filter(
        (user) => user.permission === "Юзер"
      );
      setWorkers(filteredUsers);
    } catch (error) {
      console.error("Ошибка при получении данных о работниках:", error);
    }
  };
  useEffect(() => {
    loadTeams();
    loadUsers();
  }, [loadTeams]);

  const handleAddUser = useCallback(
    async (event, userId) => {
      event.preventDefault();
      try {
        console.log(userId, selectedUserId);
        await addTeamMember(userId, selectedUserId);
        toggleModal();
        loadTeams();
      } catch (error) {
        console.error("Ошибка при создании hghfgачи:", error);
      }
    },
    [toggleModal, loadTeams, selectedUserId]
  );
  return (
    <div className="workers-page">
      <MyModal isOpen={isSecondModalOpen} onToggle={toggleModal}>
        <div className="modal-content">
          <div className="modal-header">
            <MyTitle>Добавление задачи</MyTitle>
          </div>
          <div className="modal-body">
            <div className="teams-list">
              <MyTitle>Список команд</MyTitle>
              {teams.map((team) => (
                <div key={team.id} className="team-card">
                  <img src={team.img} alt={team.name} className="team-icon" />
                  <div className="team-info">
                    <h2 className="team-name">{team.name}</h2>
                    <MyText>{team.desk}</MyText>
                  </div>
                  <MyButton
                    type="button"
                    onClick={(event) => handleAddUser(event, team.id)}
                  >
                    Добавить
                  </MyButton>
                </div>
              ))}
            </div>
            <button type="button" onClick={toggleModal}>
              Отмена
            </button>
          </div>
        </div>
      </MyModal>

      <div className="workers-list">
        <MyTitle>Список работников</MyTitle>
        {workers.map((worker) => {
          return (
            <div key={worker.id} className="worker-card">
              {worker.picture ? (
                <img
                  src={worker.picture}
                  alt={worker.name}
                  className="worker-icon"
                />
              ) : (
                <img
                  src={require("../team/styles/img/NoPhoto.jpg")}
                  alt={worker.name}
                  className="worker-icon"
                />
              )}
              <div className="worker-info">
                <MyText className="worker-name">{worker.name}</MyText>
                <MyText className="worker-name">{worker.surname}</MyText>
                <MyText className="worker-name">{worker.surname}</MyText>
                <MyButton onClick={() => toggleModal(worker.id)}>
                  Добавить в команду
                </MyButton>
                <MyText>{worker.position}</MyText>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workers;

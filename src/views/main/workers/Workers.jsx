import React, { useState, useEffect } from "react";
import "../workers/workers.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyText from "../../../components/myUi/MyText/MyText";
import { fetchUsers } from "../../../api/UserApi"; // Предполагается, что путь к файлу верный

const Workers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        // Фильтрация пользователей с permission равным "Юзер"
        const filteredUsers = usersData.filter(
          (user) => user.permission === "Юзер"
        );
        setWorkers(filteredUsers);
      } catch (error) {
        console.error("Ошибка при получении данных о работниках:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="workers-page">
      <div className="workers-list">
        <MyTitle>Список работников</MyTitle>
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card">
            <img
              src={worker.picture}
              alt={worker.name}
              className="worker-icon"
            />
            <div className="worker-info">
              <h2 className="worker-name">{worker.name}</h2>
              <MyText>{worker.position}</MyText>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workers;

import React, { useState } from "react";
import "../teams/teams.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyLink from "../../../components/myUi/MyLink/MyLink";
import MyText from "../../../components/myUi/MyText/MyText";

// Создаем компонент TeamList
const TeamsPage = () => {
  // Создаем состояние для хранения массива команд
  const [teams] = useState([
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team B" },
    { id: 4, name: "Team B" },
    { id: 5, name: "Team B" },
  ]);

  // Возвращаем JSX код с списком команд
  return (
    <div className="team-list">
      <MyTitle>Мои команды</MyTitle>
      <ul className="team-ul">
        {teams.map((team) => (
          <li className="team-li" key={team.id}>
            <MyLink to={`/team/${team.id}`} className="team-link">
              <MyText>{team.name}</MyText>
            </MyLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Экспортируем компонент TeamList по умолчанию
export default TeamsPage;

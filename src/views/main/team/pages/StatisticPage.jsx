import React, { useState } from "react";
import "../styles/statistics.css";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";

const StatisticPage = () => {
  const [statistics] = useState([
    {
      id: 1,
      name: "Мартиросян Гарегин",
      desk: "Разработчик",
      points: 100,
      tasksDone: 5,
      img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663637190_10-mykaleidoscope-ru-p-uspeshnie-molodie-lyudi-vkontakte-10.jpg",
    },
    {
      id: 2,
      name: "Василий Петров",
      desk: "Дружок",
      points: 100,
      tasksDone: 5,
      img: "https://geniy1s.ru/wp-content/uploads/2022/08/15d04cb6c97336bb90dcf65811978a71.jpg",
    },
    {
      id: 3,
      name: "Петр Васильев",
      desk: "Пирожок",
      points: 100,
      tasksDone: 5,
      img: "https://geniy1s.ru/wp-content/uploads/2022/08/15d04cb6c97336bb90dcf65811978a71.jpg",
    },
  ]);

  return (
    <div className="statistics-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-statistics">
        <div className="stats">dsasf</div>
        <div>
          <MyTitle>Лидерборд</MyTitle>
          {statistics.map((statistic) => (
            <div key={statistic.id}>
              <div className="statistic">
                <div className="statistic-icon">
                  <img src={statistic.img} alt={statistic.name} />
                </div>
                <h2 className="name">{statistic.name}</h2>
                <div className="statistic-description">
                  <MyText>{statistic.desk}</MyText>
                  <MyText>Очки: {statistic.points}</MyText>
                  <MyText>Задач сделано: {statistic.tasksDone}</MyText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;

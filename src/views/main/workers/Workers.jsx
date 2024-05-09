import React, { useState } from "react";
import "../workers/workers.css";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyText from "../../../components/myUi/MyText/MyText";

const Workers = () => {
  // Здесь может быть логика для получения данных о работниках

  const [workers] = useState([
    {
      id: 1,
      name: "Алексей Иванов",
      position: "Фронтенд-разработчик",
      img: "https://74foto.ru/800/600/http/cdn1.flamp.ru/bc57c2126b20646180c92643db78d9f0.jpg",
    },
    {
      id: 2,
      name: "Мария Петрова",
      position: "Дизайнер",
      img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663258653_39-mykaleidoscope-ru-p-spokoinii-muzhchina-instagram-42.jpg",
    },
    {
      id: 3,
      name: "Игорь Смирнов",
      position: "Бэкенд-разработчик",
      img: "/images/worker3.jpg",
    },
  ]);

  return (
    <div className="workers-page">
      <div className="workers-list">
        <MyTitle>Список работников</MyTitle>
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card">
            <img src={worker.img} alt={worker.name} className="worker-icon" />
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

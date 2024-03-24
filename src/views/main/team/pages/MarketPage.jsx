import React, { useState } from "react";
import "../styles/members.css"; // Убедитесь, что CSS файл импортирован
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";

const MarketPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках

  const [members] = useState([
    {
      id: 1,
      name: "Мартиросян Гарегин",
      desk: "Разработчик",
      img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663637190_10-mykaleidoscope-ru-p-uspeshnie-molodie-lyudi-vkontakte-10.jpg",
    },
    {
      id: 2,
      name: "Василий Петров",
      desk: "Дружок",
      img: "https://geniy1s.ru/wp-content/uploads/2022/08/15d04cb6c97336bb90dcf65811978a71.jpg",
    },
    {
      id: 3,
      name: "Петр Васильев",
      desk: "Пирожок",
      img: "https://geniy1s.ru/wp-content/uploads/2022/08/15d04cb6c97336bb90dcf65811978a71.jpg",
    },
  ]);

  return (
    <div className="members-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-members">
        <MyTitle>Задачи команды</MyTitle>
        {members.map((member) => (
          <div key={member.id}>
            <div className="member">
              <div className="member-icon">
                <img src={member.img} alt={member.name} />
              </div>
              <h2 className="name">{member.name}</h2>
              <div className="member-description">
                <MyText>{member.desk}</MyText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;

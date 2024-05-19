import React, { useEffect, useState } from "react";
import "../profile/profile.css";
import MyText from "../../../components/myUi/MyText/MyText";
import { fetchUserById } from "../../../api/UserApi";
import MyTitle from "../../../components/myUi/MyTitle/MyTitle";
import MyButton from "../../../components/myUi/MyButton/MyButton";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const getUser = async () => {
      const userf = await fetchUserById(userId);
      setUser(userf);
      console.log(userf);
    };
    getUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-photo">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="user-icon" />
          ) : (
            <img
              src={require("../team/styles/img/NoPhoto.jpg")}
              alt={user.name}
              className="user-icon"
            />
          )}
        </div>
        <div className="profile-info">
          <MyTitle>Профиль пользователя</MyTitle>
          <MyText>Имя: {user.name}</MyText>
          <MyText>Фамилия: {user.surname}</MyText>
          <MyText>Email: {user.email}</MyText>
          <form action="https://web.telegram.org/a/#7194534654" target="_blank">
            <MyButton type="submit">Подключить уведомления Телеграм</MyButton>
            <MyButton type="submit">Редактировать профиль</MyButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

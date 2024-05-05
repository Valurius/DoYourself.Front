import React from "react";
import "../profile/profile.css";
import MyText from "../../../components/myUi/MyText/MyText";

const ProfilePage = () => {
  return (
    <div className="userTasks-page">
      <div className="userTasks">
        <MyText>Профиль пользователя</MyText>
        <MyText>Имя:</MyText>
        <MyText>Email:</MyText>
        <MyText>Роль:</MyText>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import "../profile/profile.css";
import MyText from "../../../components/myUi/MyText/MyText";
import { fetchUserById } from "../../../api/UserApi";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const getUser = async () => {
      {
        const userf = await fetchUserById(userId);
        setUser(userf);
      }
    };
    getUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-photo">
          <img
            src={
              user.photoUrl ||
              "https://pichold.ru/wp-content/uploads/2021/04/picture-1-1.jpg"
            }
            alt="Фото профиля"
          />
        </div>
        <div className="profile-info">
          <MyText>Профиль пользователя</MyText>
          <MyText>Имя: {user.name}</MyText>
          <MyText>Email: {user.email}</MyText>
          <MyText>Роль: {user.permition}</MyText>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

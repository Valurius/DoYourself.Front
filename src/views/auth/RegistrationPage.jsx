import React, { useState } from "react";
import "../../styles/viewStyles/Auth.css";
import MyLink from "../../components/myUi/MyLink/MyLink";
import MyText from "../../components/myUi/MyText/MyText";
import MyButton from "../../components/myUi/MyButton/MyButton";
import MyTitle from "../../components/myUi/MyTitle/MyTitle";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://localhost:44305/api/Auth/Register",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Ответ сервера: ", response.data);
    } catch (error) {
      console.error(
        "Ошибка при регистрации:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="form-page">
      <MyTitle className="auth-h2">Регистрация</MyTitle>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            className="auth-input"
            placeholder="Имя пользователя"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autocomplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            className="auth-input"
            placeholder="Почта"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autocomplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            className="auth-input"
            placeholder="Пароль"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autocomplete="new-password"
          />
        </div>
        <MyButton className="auth-button" type="submit">
          Зарегистрироваться
        </MyButton>
        <MyText className="auth-p">
          Уже есть аккаунт? <MyLink to="/login">Войти</MyLink>
        </MyText>
      </form>
    </div>
  );
};

export default RegistrationPage;

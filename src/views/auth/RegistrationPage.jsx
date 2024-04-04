import React, { useState } from "react";
import "../../styles/viewStyles/Auth.css";
import MyLink from "../../components/myUi/MyLink/MyLink";
import MyText from "../../components/myUi/MyText/MyText";
import MyButton from "../../components/myUi/MyButton/MyButton";
import MyTitle from "../../components/myUi/MyTitle/MyTitle";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для отправки данных на сервер или другие действия
    console.log("Form submitted:", formData);
  };

  return (
    <div className="form-page">
      <MyTitle className="auth-h2">Регистрация</MyTitle>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            className="auth-input"
            placeholder="Имя пользователя"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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

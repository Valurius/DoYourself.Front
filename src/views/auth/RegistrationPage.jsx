﻿import React, { useState } from "react";
import "../../styles/viewStyles/Auth.css";
import MyLink from "../../components/myUi/MyLink/MyLink";
import MyText from "../../components/myUi/MyText/MyText";
import MyButton from "../../components/myUi/MyButton/MyButton";
import MyTitle from "../../components/myUi/MyTitle/MyTitle";
import { loginUser, registerUser } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegistrationPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
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
      await registerUser(formData);
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      const userData = await loginUser(loginData);
      await login(userData.token, userData.userId);
      navigate("/teams");
    } catch (error) {
      console.error(
        "Ошибка при регистрации:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="form-page">
      <div className="auth-h2">Регистрация</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone"></label>
          <input
            className="auth-input"
            placeholder="Номер телефона с 7"
            id="phone"
            name="phone"
            pattern="[7]{1}[0-9]{10}"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="new-password"
          />
        </div>
        <MyButton className="auth-button" type="submit">
          Зарегистрироваться
        </MyButton>
        <MyText className="auth-p">Уже есть аккаунт?</MyText>
        <MyLink to="/login">Войти</MyLink>
      </form>
    </div>
  );
};

export default RegistrationPage;

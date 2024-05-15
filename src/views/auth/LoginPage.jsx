import React, { useState } from "react";
import "../../styles/viewStyles/Auth.css";
import MyLink from "../../components/myUi/MyLink/MyLink";
import MyText from "../../components/myUi/MyText/MyText";
import MyButton from "../../components/myUi/MyButton/MyButton";
import MyTitle from "../../components/myUi/MyTitle/MyTitle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/AuthApi";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      const userData = await loginUser(formData);
      await login(userData.token, userData.userId);
      navigate("/teams");
    } catch (error) {
      console.error(
        "Ответ сервера:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="form-page">
      <MyTitle className="auth-h2">Вход</MyTitle>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="auth-label" htmlFor="email"></label>
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
          <label className="auth-label" htmlFor="password"></label>
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
          Войти
        </MyButton>
        <MyText className="link-desc">Нет аккаунта?</MyText>
        <MyLink to="/registration">Регистрация</MyLink>
      </form>
    </div>
  );
};

export default LoginPage;

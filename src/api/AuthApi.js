// api.js
import axios from "axios";

export const loginUser = async (formData) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://doyourself.ddns.net/api/Auth/login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://doyourself.ddns.net/api/Auth/Register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};

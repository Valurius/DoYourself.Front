export const fetchUsers = async () => {
  try {
    const response = await fetch("https://109.161.71.21/api/User");
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении команд:", error);
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`https://109.161.71.21/api/User/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении юзера:", error);
    return null;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/User/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении юзера:", error);
    return null;
  }
};

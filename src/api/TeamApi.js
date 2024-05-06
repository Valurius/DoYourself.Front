export const fetchTeams = async () => {
  try {
    const response = await fetch("https://localhost:44305/api/Team");
    if (response.status === 404 || !response.ok) {
      return [];
    }
    return await response.json(); // Предполагаем, что ответ в формате JSON
  } catch (error) {
    console.error("Ошибка при получении команд:", error);
  }
};

export const fetchTeamById = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Team/${id}`);
    if (response.status === 404 || !response.ok) {
      throw new Error("Команда не найдена");
    }
    return await response.json(); // Предполагаем, что ответ в формате JSON
  } catch (error) {
    console.error("Ошибка при получении команды:", error);
    return null; // Возвращаем null или другое значение, указывающее на ошибку
  }
};

export const fetchTeamTitleById = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Team/${id}`);
    if (response.status === 404 || !response.ok) {
      throw new Error("Команда не найдена");
    }
    const data = await response.json();
    return data.title; // Предполагаем, что ответ в формате JSON
  } catch (error) {
    console.error("Ошибка при получении команды:", error);
    return null; // Возвращаем null или другое значение, указывающее на ошибку
  }
};

export const createTeam = async (teamData) => {
  try {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const response = await fetch(
      `https://localhost:44305/api/Team?userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const updateTeam = async (id, teamData) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Team/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Ошибка при обновлении команды:", error);
    throw error;
  }
};

export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Team/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text(); // Возвращает текстовое сообщение об успешном удалении
  } catch (error) {
    console.error("Ошибка при удалении команды:", error);
    throw error; // Передает ошибку дальше для обработки на фронте
  }
};

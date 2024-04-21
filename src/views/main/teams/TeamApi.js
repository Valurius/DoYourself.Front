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

export const createTeam = async (teamTitle) => {
  try {
    const response = await fetch("https://localhost:44305/api/Team", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        title: teamTitle,
      }),
    });

    if (!response.ok) {
      // Если ответ не OK, пробуем получить текст ошибки
      const errorText = await response.text();
      throw new Error(errorText);
    }
    // Если ответ OK, но не JSON, получаем текст сообщения
    const textResponse = await response.text();
    return textResponse; // Возвращаем текстовое сообщение
  } catch (error) {
    console.error("Ошибка:", error);
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
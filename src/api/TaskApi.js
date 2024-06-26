export const fetchTasks = async () => {
  try {
    const response = await fetch("https://doyourself.ddns.net/api/Task");
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении команд:", error);
  }
};

export const fetchTasksByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Task/${projectId}`
    );
    if (response.status === 404 || !response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
  }
};

export const fetchTasksByTeamId = async (teamId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Task/TeamTasks/${teamId}`
    );
    if (response.status === 404 || !response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задач по ID команды:", error);
  }
};

export const fetchTaskById = async (id) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Task/getTask/${id}`
    );
    if (response.status === 404 || !response.ok) {
      throw new Error("Задача не найдена");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задачи:", error);
    return null;
  }
};

export const fetchTeamUserTasks = async (userId, teamId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/TeamUser/teamUser/task/${userId}/${teamId}`
    );
    if (response.status === 404 || !response.ok) {
      throw new Error("Задачи для данного пользователя не найдены");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задач пользователя:", error);
    return null;
  }
};

export const createTask = async (taskData, teamId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Task/${teamId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response; // Убедитесь, что возвращается объект response
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const updateTeamMemberScore = async (teamId, userId, points) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/TeamUser/${teamId}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(points),
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось обновить счет пользователя в команде");
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`https://doyourself.ddns.net/api/Task/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text();
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Task/status/${id}/?status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text();
  } catch (error) {
    console.error("Ошибка при обновлении статуса задачи:", error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await fetch("https://localhost:44305/api/Project");
    if (response.status === 404 || !response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении команд:", error);
  }
};

export const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Project/${id}`);
    if (response.status === 404 || !response.ok) {
      throw new Error("Задача не найдена");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задачи:", error);
    return null;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch("https://localhost:44305/api/Project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

// export const updateTeam = async (id, teamData) => {
//   try {
//     const response = await fetch(`https://localhost:44305/api/Project/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(teamData),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//   } catch (error) {
//     console.error("Ошибка при обновлении команды:", error);
//     throw error;
//   }
// };

export const deleteProject = async (id) => {
  try {
    const response = await fetch(`https://localhost:44305/api/Project/${id}`, {
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
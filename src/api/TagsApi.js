export const fetchTags = async () => {
  try {
    const response = await fetch("https://doyourself.ddns.net/api/Tags");
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении тегов:", error);
  }
};

export const fetchTagById = async (id) => {
  try {
    const response = await fetch(`https://doyourself.ddns.net/api/Tags/${id}`);
    if (response.status === 404 || !response.ok) {
      throw new Error("Тег не найден");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении тега:", error);
    return null;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await fetch(`https://doyourself.ddns.net/api/Tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при создании тега:", error);
    throw error;
  }
};

export const updateTag = async (id, tagData) => {
  try {
    const response = await fetch(`https://doyourself.ddns.net/api/Tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Ошибка при обновлении тега:", error);
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    const response = await fetch(`https://doyourself.ddns.net/api/Tags/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text();
  } catch (error) {
    console.error("Ошибка при удалении тега:", error);
    throw error;
  }
};

export const addTagForTask = async (taskId, tagId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Tags/${taskId}/${tagId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
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

export const fetchTaskTagsByTaskId = async (taskId) => {
  try {
    const response = await fetch(
      `https://doyourself.ddns.net/api/Tags/Task/${taskId}`
    );
    if (response.status === 404 || !response.ok) {
      throw new Error("Задача не найдена");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении проекта:", error);
    return null;
  }
};

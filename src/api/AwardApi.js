export const fetchAwards = async () => {
  try {
    const response = await fetch("https://doyourself.ddns.net/api/Award");
    if (!response.ok) {
      throw new Error("Ошибка при получении наград");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении наград:", error);
    throw error;
  }
};

// Функция для создания новой награды
export const createAward = async (awardData) => {
  try {
    const response = await fetch("https://doyourself.ddns.net/api/Award", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(awardData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка при создании награды");
    }
  } catch (error) {
    console.error("Ошибка при создании награды:", error);
    throw error;
  }
};

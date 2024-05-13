import React, { useState, useEffect, useCallback } from "react";
import "../styles/tags.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import { useParams } from "react-router-dom";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import { createTag, deleteTag, fetchTags } from "../../../../api/TagsApi";
import MyButton from "../../../../components/myUi/MyButton/MyButton";

const Team = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const { teamId, projectId } = useParams();
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const userRole = localStorage.getItem("permission");

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setTagsData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const loadTags = useCallback(async () => {
    try {
      const tagsData = await fetchTags();
      setTags(tagsData);
    } catch (error) {
      console.error("Ошибка при загрузке проектов:", error);
    }
  }, []);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const handleCreateTag = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await createTag(tagsData);
        closeModal();
        loadTags();
      } catch (error) {
        console.error("Ошибка при создании задачи:", error);
      }
    },
    [loadTags, closeModal, tagsData]
  );

  const handleDeleteTag = useCallback(
    async (id) => {
      try {
        await deleteTag(id);
        loadTags();
      } catch (error) {
        console.error("Ошибка при удалении тега:", error);
      }
    },
    [loadTags]
  );

  return (
    <div className="tags-page">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Создание проекта</MyTitle>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateTag}>
            <div className="form-group">
              <label htmlFor="title">Название метки:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={tagsData.title}
                onChange={handleInputChange}
                placeholder="Название"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Фото:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={tagsData.image}
                onChange={handleInputChange}
                placeholder="Фото"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="points">Награда метки:</label>
              <input
                type="number"
                id="points"
                name="points"
                value={tagsData.points}
                onChange={handleInputChange}
                placeholder="Награда"
                required
              />
            </div>

            <div className="modal-footer">
              <button type="submit">Создать метку</button>
              <button type="button" onClick={closeModal}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      </MyModal>
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="tags-info">
        <div className="tags-list">
          <div>
            <MyLink to={`/${teamId}/${projectId}/`}>Назад</MyLink>
          </div>
          <MyTitle>Метки задач</MyTitle>
          {userRole === "Админ" && (
            <div>
              <MyButton onClick={openModal}>Добавить тэг</MyButton>
            </div>
          )}

          {tags.length > 0 ? (
            tags.map((tag) => (
              <div key={tag.id} className="tag-card">
                <button
                  className="close-button"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  ×
                </button>
                <img src={tag.image} alt={tag.title} className="tag-icon" />
                <div className="tag-info">
                  <MyTitle className="tag-name">{tag.title}</MyTitle>
                  <MyText> Цена: {tag.points}</MyText>
                </div>
              </div>
            ))
          ) : (
            <p className="noTasks">Тэгов нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;

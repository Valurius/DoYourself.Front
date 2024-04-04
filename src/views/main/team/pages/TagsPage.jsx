import React, { useCallback, useState } from "react";
import "../styles/tags.css";
import "../../../../styles/componentStyles/Modal.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/context";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyModal from "../../../../components/myUi/MyModal/MyModal";

const TagsPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках
  const { userRole } = useRoleContext();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [tags, settags] = useState([
    {
      id: 1,
      name: "Обычная задача",
      desk: "+5 очков",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 2,
      name: "Сложная задача",
      desk: "+10 очков",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
    {
      id: 3,
      name: "Срочная задача",
      desk: "+7 очков",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
  ]);

  const handleToggle = useCallback(
    (id) => {
      const newtags = [...tags];
      const index = newtags.findIndex((tag) => tag.id === id);
      newtags[index].done = !newtags[index].done;
      settags(newtags);
    },
    [tags]
  );

  return (
    <div className="tags-page">
      <MyModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-header">
          <MyTitle>Добавление метки</MyTitle>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="tagName">Название метки:</label>
              <input type="text" id="tagName" name="tagName" required />
            </div>
            <div className="form-group">
              <label htmlFor="tagDescription">Описание метки:</label>
              <textarea
                id="tagDescription"
                name="tagDescription"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="tagDescription">Стоимость метки:</label>
              <input id="tagDescription" type="number"></input>
            </div>
            <div className="modal-footer">
              <button type="submit">Добавить метку</button>
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
      <div className="team-tags">
        <MyLink to="/1/tasks/">Назад</MyLink>
        <MyTitle>метки команды</MyTitle>
        {userRole === "admin" ? (
          <MyButton onClick={openModal}>Добавить</MyButton>
        ) : (
          ""
        )}

        {tags.map((tag) => (
          <div key={tag.id}>
            <div className="tag">
              <div className="tag-icon">
                <img src={tag.img} alt={tag.name} />
              </div>
              <h2 className="name">{tag.name}</h2>
              <div className="tag-content">
                <div className="tag-description">
                  <MyText>Награда: {tag.desk}</MyText>
                </div>
                <div>
                  <MyLink to="/1/tag/">Перейти</MyLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;

import React, { useCallback, useEffect, useState } from "react";
import "../styles/market.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { Link, useParams } from "react-router-dom";
import { createAward, fetchAwards } from "../../../../api/AwardApi";
import MyModal from "../../../../components/myUi/MyModal/MyModal";
import MyText from "../../../../components/myUi/MyText/MyText";
const MarketPage = () => {
  const userRole = localStorage.getItem("permission");
  const { teamId } = useParams();

  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    picture: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAward(newProduct);
      const updatedAwards = await fetchAwards();
      setProducts(updatedAwards);
      setModalOpen(false);
    } catch (error) {
      console.error("Ошибка при добавлении награды:", error);
    }
  };

  useEffect(() => {
    const getAwards = async () => {
      try {
        const awards = await fetchAwards();
        setProducts(awards);
      } catch (error) {
        console.error("Не удалось загрузить награды:", error);
      }
    };

    getAwards();
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="products-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-products">
        <MyTitle>Призы</MyTitle>
        {userRole === "Админ" ? (
          <MyButton onClick={openModal}>Добавить награду</MyButton>
        ) : (
          ""
        )}

        <MyModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Название проекта:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Название"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Описание</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Описание"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Изображение</label>
                <input
                  type="text"
                  name="picture"
                  value={newProduct.picture}
                  onChange={handleInputChange}
                  placeholder="Название"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Цена</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Цена"
                  required
                />
              </div>

              <button type="submit">Добавить товар</button>
            </form>
          </div>
        </MyModal>

        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="card">
              <div className="card-body">
                <div className="card-body-market">
                  <div className="card-image">
                    <img src={product.picture} alt=""></img>
                  </div>
                  <div className="card-desc-body">
                    <div className="card-description">
                      <MyText>{product.name}</MyText>
                    </div>
                    <MyText>{product.desk}</MyText>
                    <MyText>Стоимость: {product.price} очков</MyText>
                    <div className="link-button-container">
                      <Link
                        to={`/${teamId}/${product.projectId}/${product.id}/`}
                        className="link-button"
                      >
                        Перейти
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="noTasks">Продуктов нет</p>
        )}
      </div>
    </div>
  );
};

export default MarketPage;

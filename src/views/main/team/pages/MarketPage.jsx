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
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // Открыть модальное окно или показать детали продукта
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
        <div className="products-cards">
          <div className="products">
            <MyTitle>Награды</MyTitle>
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
                        <MyText>{product.description}</MyText>
                        <MyText>
                          Стоимость: <br></br>
                          {product.price} очков
                        </MyText>
                        <div className="link-button-container">
                          <MyButton onClick={() => handleProductClick(product)}>
                            Приобрести
                          </MyButton>
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
          <div className="purchased-products">
            <MyTitle>Купленные награды</MyTitle>
            {selectedProduct ? (
              // Отображение выбранной карточки товара
              <div key={selectedProduct.id} className="card">
                <div className="card-body">
                  <div className="card-body-market">
                    <div className="card-image">
                      <img
                        src={selectedProduct.picture}
                        alt={selectedProduct.name}
                      ></img>
                    </div>
                    <div className="card-desc-body">
                      <div className="card-description">
                        <MyText>{selectedProduct.name}</MyText>
                      </div>

                      <MyText>
                        Стоимость: <br></br>
                        {selectedProduct.price} очков
                      </MyText>
                      <MyText>Приобрел: Илья Халезин</MyText>
                      <div className="link-button-container">
                        <MyButton
                          onClick={() => handleProductClick(selectedProduct)}
                        >
                          Выдать
                        </MyButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Сообщение, если ничего не выбрано
              <p className="noTasks">Купленных наград нет</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;

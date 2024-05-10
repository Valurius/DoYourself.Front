import React, { useState } from "react";
import "../styles/market.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/RoleContext";
import { Link } from "react-router-dom";
const MarketPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках
  const { userRole } = localStorage.getItem("permission");
  const [products] = useState([
    {
      id: 1,
      name: "Ноутбук",
      desk: "Игровой ноутбук",
      price: 9999,
      img: "https://cdn.rbt.ru/images/gen/item_image/image/8825/24/882447_r575.jpg",
    },
  ]);

  return (
    <div className="products-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-products">
        <MyTitle>Призы</MyTitle>
        {userRole === "admin" ? <MyButton>Добавить</MyButton> : ""}
        {products.map((product) => (
          <div key={product.id} className="card-product">
            <h2 className="card-product-title">
              <MyTitle>{product.name}</MyTitle>
            </h2>
            <div className="card-product-content">
              <div className="card-product-image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="card-product-description">
                <div className="card-product-description">{product.desk}</div>
                <div className="card-product-description">
                  {product.price} очков
                </div>
              </div>
              <div className="link-button-container">
                <Link href="#" className="link-button">
                  Купить
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;

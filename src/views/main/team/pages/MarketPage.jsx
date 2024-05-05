import React, { useState } from "react";
import "../styles/market.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/RoleContext";
import { Link } from "react-router-dom";
const MarketPage = () => {
  // Здесь может быть логика для получения данных о команде и участниках
  const { userRole } = useRoleContext();
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
          <div key={product.id} className="card">
            <div className="card-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="card-content">
              <h2 className="card-title">{product.name}</h2>
              <div className="card-description">{product.desk}</div>
              <div className="card-description">{product.price} очков</div>
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

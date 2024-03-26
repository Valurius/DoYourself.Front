import React, { useState } from "react";
import "../styles/market.css"; // Убедитесь, что CSS файл импортирован
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useRoleContext } from "../../../../context/context";
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
        <MyTitle>Задачи команды</MyTitle>
        {userRole === "admin" ? <MyButton>Добавить</MyButton> : ""}
        {products.map((product) => (
          <div key={product.id}>
            <div className="product">
              <div className="product-icon">
                <img src={product.img} alt={product.name} />
              </div>
              <h2 className="name">{product.name}</h2>
              <div className="product-description">
                <MyText>{product.desk}</MyText>
                <MyText>{product.price} очков</MyText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;

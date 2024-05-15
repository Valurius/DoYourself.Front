import React, { useState } from "react";
import "../styles/market.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { Link, useParams } from "react-router-dom";
const MarketPage = () => {
  const { userRole } = localStorage.getItem("permission");
  const { teamId } = useParams();

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
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="card">
              <div className="card-body">
                <div className="card-body-market">
                  <div className="card-image">
                    <img
                      src="https://i.ebayimg.com/00/s/MTEyNVgxNTAw/z/absAAOSwWUtbYQPf/$_57.JPG?set_id=8800005007"
                      alt=""
                    ></img>
                  </div>
                  <div className="card-desc-body">
                    <div className="card-description">{product.name}</div>
                    <div className="card-description">{product.desk}</div>
                    <div className="card-deadline">
                      Стоимость: {product.price} бонусов
                    </div>
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
          <p className="noTasks">У вас нет задач</p>
        )}
      </div>
    </div>
  );
};

export default MarketPage;

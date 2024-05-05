import React, { useState } from "react";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyButton from "../../../../components/myUi/MyButton/MyButton";

const MyTasksPage = () => {
  const [tasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно .",
      member: "Мартиросян Гарегин",
      img: "https://gas-kvas.com/uploads/posts/2023-03/1678093105_gas-kvas-com-p-fon-prirodi-dlya-risunka-krasivii-18.jpg",
    },
  ]);

  return (
    <div className="tasks-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-tasks">
        <MyTitle>Мои задачи в команде</MyTitle>
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="task">
              <div className="task-icon">
                <img src={task.img} alt={task.name} />
              </div>
              <h2 className="name">{task.name}</h2>
              <div className="task-content">
                <div className="task-description">
                  <MyText>{task.desk}</MyText>
                  <MyText>{task.member}</MyText>
                  <MyText>{task.project}</MyText>
                </div>
                <div>
                  <MyButton>Перейти</MyButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasksPage;

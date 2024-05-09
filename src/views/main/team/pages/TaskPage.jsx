import React, { useState } from "react";
import "../styles/task.css";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import { useParams } from "react-router-dom";

const TasksPage = () => {
  const { teamId, projectId } = useParams();
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // Добавлено состояние для имени файла

  // Функция для добавления нового комментария с файлом
  const addComment = (text, file, fileName) => {
    const newComment = { text, file, fileName }; // Добавлено имя файла в объект комментария
    setComments([...comments, newComment]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Сохраняем имя файла
      setFile(file);
    }
  };
  const handleSubmission = (text) => {
    if (text && !file) {
      // Если есть текст и нет файла, добавляем только комментарий
      addComment(text, null, null);
    } else if (file && !text) {
      // Если есть файл и нет текста, добавляем только файл
      const fileUrl = URL.createObjectURL(file);
      addComment("", fileUrl, fileName);
    }
    // Очищаем состояния после отправки
    setFile(null);
    setFileName("");
  };

  const [tasks] = useState([
    {
      id: 1,
      name: "Дизайн сайта",
      desk: "Нужно разработать новый дизайн для проекта 'Венера'.",
      member: "Мартиросян Гарегин",
      project: "Венера",
      img: "",
    },
    // Другие задачи...
  ]);

  return (
    <div className="task-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="task-window">
        <div>
          <MyLink to={`/${teamId}/${projectId}/`}>Назад</MyLink>
        </div>
        {tasks.map((task) => (
          <div key={task.id} className="task-page-content">
            <div className="task-details">
              <h2 className="name">{task.name}</h2>
              <MyText>{task.desk}</MyText>
              <MyText>{`Ответственный: ${task.member}`}</MyText>
              <MyText>{`Проект: ${task.project}`}</MyText>
            </div>
          </div>
        ))}
        <div className="comments-section">
          <MyText>Комментарии</MyText>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <MyText>{comment.text}</MyText>
              {comment.file || (
                <a
                  href={comment.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {comment.fileName}
                </a>
              )}
              {
                <img
                  src={
                    "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666389923_30-mykaleidoscope-ru-p-klassnaya-priroda-oboi-32.jpg"
                  }
                  alt="Фото комментария"
                  className="comment-icon"
                />
              }
            </div>
          ))}
          <div className="comment-input">
            <input
              type="text"
              placeholder="Напишите комментарий..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmission(e.target.value);
                  e.target.value = ""; // Очистить поле ввода после отправки комментария
                }
              }}
            />
            <input
              type="file"
              name="file"
              onChange={(e) => {
                handleFileChange(e);
                if (e.target.files[0]) {
                  handleSubmission(""); // Отправить файл без комментария
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

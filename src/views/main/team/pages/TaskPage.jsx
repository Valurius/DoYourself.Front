import React, { useState } from "react";
import "../styles/task.css";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useParams } from "react-router-dom";

const TasksPage = () => {
  const { teamId, projectId } = useParams();
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [commentText, setCommentText] = useState(""); // Добавлено состояние для текста комментария

  // Функция для добавления нового комментария
  const addComment = (text, file, fileName) => {
    const newComment = { text, file, fileName };
    setComments([...comments, newComment]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  // Обработчик для кнопки отправки комментария
  const handleSubmission = () => {
    if (file || commentText) {
      const fileUrl = file ? URL.createObjectURL(file) : null;
      addComment(commentText, fileUrl, fileName);
      setFile(null);
      setFileName("");
      setCommentText("");
    }
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
              <div className="comment-text">
                <MyText>{comment.text}</MyText>
              </div>
              {comment.file && (
                <a
                  href={comment.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {comment.fileName}
                </a>
              )}
              {comment.file && (
                <img
                  src={
                    "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666389923_30-mykaleidoscope-ru-p-klassnaya-priroda-oboi-32.jpg"
                  }
                  alt="Фото комментария"
                  className="comment-icon"
                />
              )}
            </div>
          ))}
          <div className="comment-input">
            <div className="comment-input-both">
              <input
                type="text"
                placeholder="Напишите комментарий..."
                value={commentText}
                onChange={handleTextChange}
              />
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
            <div className="comment-submit">
              <MyButton onClick={handleSubmission}>Отправить</MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

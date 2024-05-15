import React, { useCallback, useEffect, useState } from "react";
import "../styles/task.css";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import MyLink from "../../../../components/myUi/MyLink/MyLink";
import MyButton from "../../../../components/myUi/MyButton/MyButton";
import { useParams } from "react-router-dom";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import { fetchTaskById, updateTaskStatus } from "../../../../api/TaskApi";
import { fetchUserById } from "../../../../api/UserApi";
import { fetchProjectById } from "../../../../api/ProjectApi";

const TasksPage = () => {
  const { teamId, projectId, taskId } = useParams();
  const [comments, setComments] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [task, setTask] = useState([]); // Изменено на использование состояния
  const [project, setProject] = useState([]); // Изменено на использование состояния
  const [user, setUser] = useState([]); // Изменено на использование состояния
  const [status, setStatus] = useState("");

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

  const handleSubmission = () => {
    if (file || commentText) {
      const fileUrl = file ? URL.createObjectURL(file) : null;
      addComment(commentText, fileUrl, fileName);
      setFile(null);
      setFileName("");
      setCommentText("");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const taskData = await fetchTaskById(taskId);
      if (taskData) {
        const [userData, projectData] = await Promise.all([
          fetchUserById(taskData.userId),
          fetchProjectById(taskData.projectId),
        ]);

        setTask([taskData]);
        setUser(userData || {});
        setProject(projectData || {});
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }, [taskId]);
  useEffect(() => {
    fetchData();
  }, [taskId, fetchData]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    console.log(newStatus);
    setStatus(newStatus);
    try {
      await updateTaskStatus(taskId, newStatus);
      fetchData();
      console.log("Статус задачи успешно обновлен");
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
    }
  };

  return (
    <div className="task-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="task-window">
        <div>
          <MyLink to={`/${teamId}/${projectId}/`}>Назад</MyLink>
        </div>
        {task.map((task) => (
          <div key={task.id} className="task-page-content">
            <MyTitle>{task.title}</MyTitle>
            <div className="task-details">
              <div className="task-details-text">
                <MyText>{task.description}</MyText>
                <MyText>{`Ответственный: ${user.name}`}</MyText>
                <MyText>{`Проект: ${project.title}`}</MyText>
              </div>
              <div className="select-task">
                <select
                  id="status"
                  name="status"
                  value={task.status}
                  defaultValue={status}
                  onChange={handleStatusChange}
                  className="select"
                >
                  <option className="option" value="Новая">
                    Новая
                  </option>
                  <option className="option" value="В работе">
                    В работе
                  </option>
                  <option className="option" value="Выполнено">
                    Выполнено
                  </option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <div className="comments-section">
          <MyTitle>Комментарии</MyTitle>
          {comments.map((comment, index) => (
            <div className="comments">
              <div key={index} className="comment">
                <div className="comment-photo">
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
                <div className="comment-text">
                  <MyText>{comment.text}</MyText>
                </div>
                <div className="comment-file">
                  {comment.file && (
                    <a
                      href={comment.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {comment.fileName}
                    </a>
                  )}
                </div>
              </div>
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

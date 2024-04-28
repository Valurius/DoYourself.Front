import React, { useState } from "react";
import "../styles/settings.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTeam, updateTeam } from "../../../../api/TeamApi";
import { useParams, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamImage, setTeamImage] = useState("");

  const { teamId } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "teamName") {
      setTeamName(value);
    } else if (id === "teamDescription") {
      setTeamDescription(value);
    } else if (id === "teamImage") {
      setTeamImage(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const teamData = {
        title: teamName,
        description: teamDescription,
        image: teamImage,
      };
      await updateTeam(teamId, teamData);
      console.log("Команда обновлена");
    } catch (error) {
      console.error("Ошибка при обновлении команды:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      navigate("/teams");
    } catch (error) {
      console.error("Ошибка при удалении команды:", error);
    }
  };

  return (
    <div className="settings-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="settings-window">
        <MyTitle>Настройки</MyTitle>
        <div className="settings-content">
          <div className="settings-details">
            <div className="settings-team">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="teamName">Название команды</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teamName"
                    onChange={handleInputChange}
                    placeholder="Введите название команды"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Сохранить
                </button>
              </form>
            </div>
            <div className="buttons">
              <button className="button quit-button" title="Выйти из команды">
                <MeetingRoomIcon />
              </button>
              <button
                className="button delete-button"
                title="Удалить команду"
                onClick={() => handleDeleteTeam(teamId)}
              >
                <DeleteForeverIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

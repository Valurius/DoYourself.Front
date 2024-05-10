import React, { useState } from "react";
import "../styles/settings.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTeam, updateTeam } from "../../../../api/TeamApi";
import { useParams, useNavigate } from "react-router-dom";
import MyText from "../../../../components/myUi/MyText/MyText";

const SettingsPage = () => {
  const [teamName, setTeamName] = useState("");

  const { teamId } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTeamName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const teamData = {
        title: teamName,
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
                  <label htmlFor="teamName">
                    <MyText>Название команды</MyText>
                  </label>
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

import React, { useState, useEffect } from "react";
import "../styles/members.css";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MenuBar from "../../../../components/Menu";
import MyText from "../../../../components/myUi/MyText/MyText";
import { fetchTeamMembersById } from "../../../../api/TeamApi";
import { useParams } from "react-router-dom";

const Team = () => {
  const [members, setMembers] = useState([]);
  const { teamId } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersOfTeam = await fetchTeamMembersById(teamId);
        setMembers(membersOfTeam);
      } catch (error) {
        console.error("Ошибка при получении участников команды:", error);
      }
    };

    fetchMembers();
  }, [teamId]);

  return (
    <div className="members-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="members-info">
        <div className="members-list">
          <MyTitle>Список работников</MyTitle>
          {members.map((member) => (
            <div key={member.id} className="member-card">
              <img src={member.img} alt={member.name} className="member-icon" />
              <div className="member-info">
                <MyText className="member-name">{member.name}</MyText>
                <MyText>{member.desk}</MyText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

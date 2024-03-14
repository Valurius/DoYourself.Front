import RegistrationPage from "../views/auth/RegistrationPage";
import LoginPage from "../views/auth/LoginPage";
import WelcomePage from "../views/WelcomePage";
import TasksPage from "../views/main/tasks/UserTasksPage";
import TeamsPage from "../views/main/teams/TeamsPage";
import TeamPage from "../views/main/team/TasksPage";
import Members from "../views/main/team/MembersPage";

export const publicRoutes = [
  { path: "/", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/teams", element: <TeamsPage /> },
  { path: "/team/:teamId", element: <TeamPage /> },
  { path: "/members", element: <Members /> },
];

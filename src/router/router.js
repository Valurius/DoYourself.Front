import RegistrationPage from "../views/auth/RegistrationPage";
import LoginPage from "../views/auth/LoginPage";
import WelcomePage from "../views/WelcomePage";
import TasksPage from "../views/main/tasks/TasksPage";
import TeamsPage from "../views/main/teams/TeamsPage";
import TeamPage from "../views/main/team/TeamPage";
import Team from "../views/main/team/Team";

export const publicRoutes = [
  { path: "/", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/teams", element: <TeamsPage /> },
  { path: "/team/:teamId", element: <TeamPage /> },
  { path: "/teamT", element: <Team /> },
];

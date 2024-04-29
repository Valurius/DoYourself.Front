import RegistrationPage from "../views/auth/RegistrationPage";
import LoginPage from "../views/auth/LoginPage";
import WelcomePage from "../views/WelcomePage";
import UserTasksPage from "../views/main/tasks/UserTasksPage";
import TeamsPage from "../views/main/teams/TeamsPage";
import TaskPage from "../views/main/team/pages/TaskPage";
import TasksPage from "../views/main/team/pages/TasksPage";
import MembersPage from "../views/main/team/pages/MembersPage";
import MarketPage from "../views/main/team/pages/MarketPage";
import StatisticPage from "../views/main/team/pages/StatisticPage";
import MyTasksPage from "../views/main/team/pages/MyTasksPage";
import TagsPage from "../views/main/team/pages/TagsPage";
import SettingsPage from "../views/main/team/pages/SettingsPage";
import ProjectsPage from "../views/main/team/pages/ProjectsPage";
import ProjectPage from "../views/main/team/pages/ProjectPage";

export const publicRoutes = [
  { path: "/", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/userTasks", element: <UserTasksPage /> },
  { path: "/teams", element: <TeamsPage /> },
  { path: "/:teamId/task", element: <TaskPage /> },
  { path: "/:teamId/tasks", element: <TasksPage /> },
  { path: "/:teamId/members", element: <MembersPage /> },
  { path: "/:teamId/market", element: <MarketPage /> },
  { path: "/:teamId/statistics", element: <StatisticPage /> },
  { path: "/:teamId/myTasks", element: <MyTasksPage /> },
  { path: "/:teamId/tags", element: <TagsPage /> },
  { path: "/:teamId/settings", element: <SettingsPage /> },
  { path: "/:teamId/projects", element: <ProjectsPage /> },
  { path: "/:teamId/:projectId", element: <ProjectPage /> },
];

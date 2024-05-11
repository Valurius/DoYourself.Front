import RegistrationPage from "../views/auth/RegistrationPage";
import LoginPage from "../views/auth/LoginPage";
import WelcomePage from "../views/WelcomePage";
import Workers from "../views/main/workers/Workers";
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
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Импортируйте контекст аутентификации
import ProfilePage from "../views/main/profile/ProfilePage";

// Защищенный маршрут, который проверяет, авторизован ли пользователь
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Защищенные маршруты
export const privateRoutes = [
  {
    path: "/workers",
    element: (
      <RequireAuth>
        <Workers />
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  {
    path: "/teams",
    element: (
      <RequireAuth>
        <TeamsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/:projectId/:taskId",
    element: (
      <RequireAuth>
        <TaskPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/tasks",
    element: (
      <RequireAuth>
        <TasksPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/members",
    element: (
      <RequireAuth>
        <MembersPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/market",
    element: (
      <RequireAuth>
        <MarketPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/statistics",
    element: (
      <RequireAuth>
        <StatisticPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/myTasks",
    element: (
      <RequireAuth>
        <MyTasksPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/tags",
    element: (
      <RequireAuth>
        <TagsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/settings",
    element: (
      <RequireAuth>
        <SettingsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/projects",
    element: (
      <RequireAuth>
        <ProjectsPage />
      </RequireAuth>
    ),
  },
  {
    path: "/:teamId/:projectId",
    element: (
      <RequireAuth>
        <ProjectPage />
      </RequireAuth>
    ),
  },
];
export const publicRoutes = [
  { path: "/", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/registration", element: <RegistrationPage /> },
];

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/statistics.css";
import MenuBar from "../../../../components/Menu";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MyText from "../../../../components/myUi/MyText/MyText";

// Данные для диаграмм
const dataProjects = [
  { name: "Проекты", value: 240 },
  { name: "Задачи", value: 1600 },
];

const dataProgress = [
  { name: "Проект 1", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Проект 2", uv: 3000, pv: 1398, amt: 2210 },
  // Добавьте дополнительные проекты здесь
];

const dataDeadlines = [
  { name: "В срок", value: 85 },
  { name: "С опозданием", value: 15 },
];

const dataPriorities = [
  { name: "Высокий", value: 400 },
  { name: "Средний", value: 300 },
  { name: "Низкий", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Компонент страницы статистики
const StatisticsPage = () => (
  <div className="statistics-page">
    <div className="left_menu">
      <MenuBar />
    </div>
    <div className="team-statistics">
      <MyTitle>Статистика проектов</MyTitle>
      <div className="chart-container">
        <MyText>Статистика задач</MyText>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataProjects}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {dataProjects.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataDeadlines}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {dataDeadlines.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataPriorities}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {dataPriorities.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <MyText>Прогресс Проектов</MyText>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataProgress}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="amt" fill="#ff2600" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default StatisticsPage;

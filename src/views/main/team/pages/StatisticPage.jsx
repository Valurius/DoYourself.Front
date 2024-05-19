import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/statistics.css";
import MenuBar from "../../../../components/Menu";
import MyTitle from "../../../../components/myUi/MyTitle/MyTitle";
import MyText from "../../../../components/myUi/MyText/MyText";
import { fetchTasksByTeamId } from "../../../../api/TaskApi";
import { useParams } from "react-router-dom";

// Компонент страницы статистики
const StatisticsPage = () => {
  const COLORS = ["#ff4252", "#FFBB28", "#00C49F", "#FF8042"];

  const [tasks, setTasks] = useState([]);
  const { teamId } = useParams();

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await fetchTasksByTeamId(teamId);
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [teamId]);

  // Подготовка данных для диаграммы задач
  const dataProjects = tasks.reduce(
    (acc, task) => {
      // Увеличиваем счетчик для соответствующего статуса задачи
      if (task.status === "Новая") {
        acc[0].value += 1;
      } else if (task.status === "В работе") {
        acc[1].value += 1;
      } else if (task.status === "Выполнено") {
        acc[2].value += 1;
      }
      return acc;
    },
    [
      { name: "Новая", value: 0 },
      { name: "В работе", value: 0 },
      { name: "Выполнено", value: 0 },
    ]
  );
  // Подготовка данных для диаграммы приоритетов
  const dataDeadlines = [
    { name: "С опозданием", value: 0 },
    { name: "В срок", value: tasks.length },
  ];

  // Подготовка данных для диаграммы приоритетов
  const dataPriorities = tasks.reduce(
    (acc, task) => {
      const index = acc.findIndex((p) => p.name === task.priority);
      if (index !== -1) {
        acc[index].value += 1; // Увеличиваем количество задач с данным приоритетом
      }
      return acc;
    },
    [
      { name: "Высокий", value: 0 },
      { name: "Средний", value: 0 },
      { name: "Низкий", value: 0 },
    ]
  );
  const filteredDataProjects = dataProjects.filter((item) => item.value > 0);
  const filteredDataDeadlines = dataDeadlines.filter((item) => item.value > 0);
  const filteredDataPriorities = dataPriorities.filter(
    (item) => item.value > 0
  );

  const totalTasks = tasks.length;
  const newTasks = tasks.filter((task) => task.status === "Новая").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "В работе"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Выполнено"
  ).length;

  const chartData = [
    {
      name: "Задачи",
      Всего: totalTasks,
      Новая: newTasks,
      "В работе": inProgressTasks,
      Выполнено: completedTasks,
    },
  ];

  return (
    <div className="statistics-page">
      <div className="left_menu">
        <MenuBar />
      </div>
      <div className="team-statistics">
        <MyTitle>Статистика задач</MyTitle>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <MyText>По статусам</MyText>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={filteredDataProjects}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {filteredDataProjects.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <MyText>По срокам</MyText>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={filteredDataDeadlines}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {dataDeadlines.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <MyText>По приоритетам</MyText>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={filteredDataPriorities}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {filteredDataPriorities.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-statistic">
          <div className="chart-container">
            <MyText>Прогресс задач</MyText>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Всего" fill="#8884d8" />
                <Bar dataKey="Новая" fill="#ff4252" />
                <Bar dataKey="В работе" fill="#ffc658" />
                <Bar dataKey="Выполнено" fill="#a4de6c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

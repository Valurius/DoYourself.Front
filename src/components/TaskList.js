import React, { useState, useEffect } from 'react';
import '../styles/componentStyles/TaskList.css'
const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the API
        fetch('https://localhost:44305/api/task')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="task-list-container">
            <div className="task-list-frame">
                <h2 className="task-list-title">My Tasks</h2>
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <li key={index}>{task.name}/{task.temperatureCelsius}</li>
                    ))}
                </ul>
            </div>
            </div>
    );
};
export default TaskList;

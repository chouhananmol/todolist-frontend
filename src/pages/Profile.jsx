import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
    const { isAuthenticated, user, setUser } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`${server}/task/mytask`, {
                withCredentials: true,
            });
            setTasks(response.data.tasks);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <p>Please log in to view your profile.</p>;
    }

    if (loading) {
        return <Loader />;
    }

    const completedTasks = tasks.filter((task) => task.isCompleted);
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);

    return (
        <div className="profile-container">
            <h2 className="profile-heading">Profile</h2>
            <div className="profile-info">
                <h3 className="profile-subheading">User Information:</h3>
                <p className="profile-data">
                    <span className="profile-label">Name: </span> {user.name}
                </p>
                <p className="profile-data">
                    <span className="profile-label">Email: </span> {user.email}
                </p>
            </div>
            <div className="profile-tasks">
                <h3 className="profile-subheading">Tasks:</h3>
                {incompleteTasks.length > 0 ? (
                    <div className="task-list">
                        <h4 className="task-list-heading">Incomplete Tasks:</h4>
                        <ul className="task-list-items">
                            {incompleteTasks.map((task) => (
                                <button key={task._id} className="task-item">
                                    {task.title}
                                </button>
                            ))}
                        </ul>
                    </div>
                ) : null}
                {completedTasks.length > 0 ? (
                    <div className="task-list">
                        <h4 className="task-list-heading">Completed Tasks:</h4>
                        <ul className="task-list-items">
                            {completedTasks.map((task) => (
                                <li key={task._id} className="task-item completed-task">
                                    {task.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
                    <p className="no-tasks">No tasks found.</p>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
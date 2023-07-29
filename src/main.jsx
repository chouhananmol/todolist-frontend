import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss';
import { createContext } from "react";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

  return (
    <Context.Provider value={{
      isAuthenticated, SetIsAuthenticated,
      loading, setLoading,
      user, setUser,
      tasks, setTasks
    }} >
      <App />
    </Context.Provider>
  )
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
// export const server = "https://todolist-backend-v6tx.onrender.com/api/v1";
export const server = "http://localhost:5000/api/v1";
import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Tasks from "./components/tasks/Tasks";

function App() {
  const [user, setUser] = useState({});
  const [view, setView] = useState("login");
  const [message, setMessage] = useState({type: "success", message: ""});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleUser = (user) => {
    setUser(user);
  };

  const handleView = (page) => {
    setView(page);
  };

  const handleClick = () => {
    setOpen(true);
  };

  switch (view) {
    case "tasks":
      return (
        <div className="container">
          <Tasks user={user} handleMessage={handleMessage} handleClick={handleClick} message={message}/>

        </div>
      );
    case "register":
      return (
        <div className="container">
          <Register
            handleMessage={handleMessage}
            handleView={handleView}
            handleUser={handleUser}
          />
        </div>
      );
    case "login":
      return (
        <div className="container">
          <Login
            handleMessage={handleMessage}
            handleView={handleView}
            handleUser={handleUser}
            handleClick={handleClick}
          />
          
        </div>
      );
    default:
  }
}
export default App;

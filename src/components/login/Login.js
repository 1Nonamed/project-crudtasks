import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

function Login({ handleMessage, handleView, handleUser, handleClick }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/login`, user);
      console.log(res);
      handleUser(res.data.results);
      handleMessage(res.data.message);
      handleView("tasks");
      setOpen(true);
      // setAlertMessage("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Hi, I'm Login</div>
      <form onInput={handleInput} onSubmit={logIn}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Log In</button>
        <button type="button" onClick={() => handleView("register")}>
          Sign Up
        </button>
      </form>
      <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={"Funciona"}
          />
    </div>
  );
}

export default Login;

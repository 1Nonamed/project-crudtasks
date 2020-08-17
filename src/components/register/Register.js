import React, { useState } from "react";
import axios from "axios";

function Register({ handleMessage, handleView, handleUser }) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/register`, user);
      console.log(res);
      handleUser(res.data.results);
      handleMessage(res.data.message);
      handleView("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Hi, I'm Login</div>
      <form onInput={handleInput} onSubmit={registerUser}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="lastname" placeholder="lastname" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => handleView("login")}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Register;

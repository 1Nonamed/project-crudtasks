import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../App.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Popper from "@material-ui/core/Popper";

function Tasks({ handleMessage, handleView, handleUser, message }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [editTask, setEditTask] = useState({});
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      let url = `/tasks?page=1&limit=20`;
      const res = await axios.get(url);
      setTasks(res.data.results);
    } catch (error) {
      console.log("No hay tareas :/");
    }
  };

  const createTask = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`/tasks`, task);
      setOpen(true);
      const message = {
        type: "success",
        message: res.data.message,
      };
      handleMessage(message);
      getTasks();
    } catch (error) {
      setOpen(true);
      handleMessage({
        type: "error",
        message: "Hay datos inválidos o campos vacíos",
      });
    }
  };

  const deleteTask = async (taskId) => {
    const res = await axios.delete(`/tasks/${taskId}`);
    console.log(res);
    setOpen(true);
    handleMessage({
      type: "info",
      message: res.data.message,
    });
    getTasks();
  };

  const updateTask = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`/tasks/${editTask._id}`, task);
      setOpen(true);
      handleMessage({
        type: "info",
        message: "La tarea se ha actualizado correctamente",
      });
      // Error en el mensaje de la API, mal redactado
      getTasks();
    } catch (error) {
      setOpen(true);
      handleMessage({
        type: "warning",
        message: "Hay datos inválidos o campos vacíos",
      });
    }
  };

  const getTask = (task) => {
    setEditTask(task);
  };

  const handleInputTask = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputEditTask = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity={message.type}>
          {message.message}
        </Alert>
      </Snackbar>
      <div>Hi, I'm tasks</div>
      <form onSubmit={createTask} onInput={handleInputTask}>
        <input type="text" name="content" placeholder="Tarea" />
        <input type="date" name="date" />
        <button type="submit">Enviar</button>
      </form>

      <div>Update Task</div>
      <form onInput={handleInputEditTask} onSubmit={updateTask}>
        <input
          type="text"
          name="content"
          placeholder="Tarea"
          defaultValue={editTask.content}
        ></input>
        <input
          type="date"
          name="date"
          defaultValue={moment(editTask.date).add(1, "h").format("YYYY-MM-DD")}
        ></input>
        <button type="submit">Update</button>
      </form>
      <div>
        {tasks.map((task, i) => {
          return (
            <div key={i} className="d-flex">
              <div>{task.content}</div>
              <div>{moment(task.date).format("YYYY-MM-DD")}</div>
              <button variant="contained" onClick={() => getTask(task)}>
                {" "}
                Editar
              </button>
              <button onClick={() => deleteTask(task._id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Tasks;

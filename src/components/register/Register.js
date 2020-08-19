import React, { useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Snackbar,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #6C91C2 50%, #FFFFF3 0%)",
  },
  paper: {
    minHeight: 450,
    maxWidth: 300,
    margin: "auto",
    padding: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  title: {
    fontWeight: 100,
  },
  button: {
    textTransform: "none",
  },
}));

function Register({ handleMessage, handleView, handleUser }) {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/register`, user);
      console.log(res);
      handleUser(res.data.results);
      // setOpen(true)
      // const message = {
      //   type: "success",
      //   message: res.data.message,
      // };
      // handleMessage(res.data.message);
      handleView("login");
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} sm={4} md={3} lg={4}>
          <Paper elevation={5} className={classes.paper}>
            <Box mt={1}>
              <Typography
                color="primary"
                align="center"
                variant="h6"
                component="h3"
                gutterBottom={true}
              >
                Task Manager
              </Typography>
              <Typography
                className={classes.title}
                variant="h4"
                component="h1"
                gutterBottom={true}
              >
                Create your Account
              </Typography>
              <Typography
                variant="subtitle1"
                component="h2"
                gutterBottom={true}
              >
                to continue to Task Manager
              </Typography>
            </Box>
            <form onInput={handleInput} onSubmit={registerUser}>
              <Box my={1} display="flex">
                <Box mr={1}>
                  <TextField
                    type="text"
                    name="name"
                    label="Name"
                    variant="outlined"
                    margin="dense"
                  />
                </Box>
                <Box ml={1}>
                  <TextField
                    type="text"
                    name="lastname"
                    label="Lastname"
                    variant="outlined"
                    margin="dense"
                  />
                </Box>
              </Box>
              <Box my={1}>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  helperText="You can use letters, numbers and periods"
                />
              </Box>
              <Box my={1}>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  helperText="Use 6 or more characters with a mix of letters, numbers & symbols"
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt={5}>
                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  type="button"
                  onClick={() => handleView("login")}
                >
                  Sign in instead
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={"Funciona"}
      />
    </div>
  );
}

export default Register;

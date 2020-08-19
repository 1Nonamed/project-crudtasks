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

function Login({ handleMessage, handleView, handleUser, handleClick }) {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/login`, user);
      console.log(res);
      handleUser(res.data.results);
      handleMessage(res.data.message);
      // setOpen(true);
      handleView("tasks");
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
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Paper elevation={5} className={classes.paper}>
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
              Sign in
            </Typography>
            <Typography variant="subtitle1" component="h2" gutterBottom={true}>
              to continue to Task Manager
            </Typography>
            <form onInput={handleInput} onSubmit={logIn}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
                <Button
                  className={classes.button}
                  type="button"
                  color="primary"
                >
                  Forgot email?
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <TextField
                  type="password"
                  name="password"
                  label="Enter your password"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
                <Button
                  className={classes.button}
                  type="button"
                  color="primary"
                >
                  Forgot password?
                </Button>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={5}>
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>
                <Button
                  className={classes.button}
                  type="button"
                  color="primary"
                  onClick={() => handleView("register")}
                >
                  Create account
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

export default Login;

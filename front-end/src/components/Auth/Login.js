import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../assets/logo-colorida.png";

import Footer from "../Utils/Footer";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "80vh",
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: "150%",
    color: "#1E2134",
  },
  paper: {
    padding: 24,
  },
  field: {
    marginTop: 24,
  },
  button: {
    marginTop: 24,
  },
});

const Login = (props) => {
  const classes = useStyles(props);
  // const handleSubmit = (values) => {
  //   console.log(values);
  // };

  const validationLogin = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLogin,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md={3}>
        <img src={logo} />
      </Grid>
      <Grid item md={7}>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container direction="column" alignItems="flex-start">
            <Typography className={classes.title}>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className={classes.field}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                id="filled-email-input"
                name="email"
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
              />

              <TextField
                className={classes.field}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                id="filled-password-input"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />

              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Login;

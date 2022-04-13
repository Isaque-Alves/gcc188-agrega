import React from "react";
import { makeStyles } from "@material-ui/styles";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Avatar,
  TextField,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";

import logo from "../../assets/logo-colorida.png";
import Footer from "../Utils/Footer";

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  root: {
    width: "100vw",
    minHeight: "80vh",
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
    marginTop: 80,
    padding: 24,
  },
  field: {
    marginTop: 24,
  },
  button: {
    marginTop: 24,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  text: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "166%",
    color: "#506176",
  },
});

export default function Login(props) {
  const classes = useStyles(props);

  const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .min(3, "Its too short")
      .required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string("Enter your password")
      .oneOf([yup.ref("password")], "Password not matched")
      .required("Is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
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
      <Grid item md="3">
        <img src={logo} />
      </Grid>
      <Grid item md="7">
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid container>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item className={classes.grid}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <Button variant="outlined" size="small" component="span">
                      Upload Avatar
                    </Button>
                  </label>
                  <Typography className={classes.text}>
                    Dimensões recomendadas: 200x200, tamanho máximo: 5MB
                  </Typography>
                </Grid>
              </Grid>

              <TextField
                className={classes.field}
                id="input-name"
                fullWidth
                label="Nome completo"
                type="text"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                className={classes.field}
                id="filled-email-input"
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                className={classes.field}
                id="filled-password-input"
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                className={classes.field}
                id="filled-password-input"
                fullWidth
                label="Confirmar senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Registrar
              </Button>
            </Grid>
          </form>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

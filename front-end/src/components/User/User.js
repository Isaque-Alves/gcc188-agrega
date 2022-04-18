import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { styled } from "@mui/material/styles";
import { Grid, TextField, Paper, Button, Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { putUser, getUser, putUserSenha } from "../../services/api/Auth";

import Footer from "../Utils/Footer";

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [data, setData] = useState({ name: "", email: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .min(3, "Its too short")
      .required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    oldPassword: yup
      .string("Enter your old password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Old Password is required"),
    newPassword: yup
      .string("Enter your new password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("New Password is required"),
  });

  useEffect(() => {
    getUser()
      .then((resp) => {
        setData({ name: resp.data.nome, email: resp.data.email });

        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      oldPassword: "",
      newPassword: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        nome: values.name,
        email: values.email,
      };
      putUser(data)
        .then((resp) => {
          const data2 = {
            senha: values.newPassword,
            senhaAntiga: values.oldPassword,
          };
          putUserSenha(data2)
            .then(() => {
              setMessage("Registro realizado com sucesso");
              setType("success");
              setOpen(true);
            })
            .catch((err) => {
              setMessage(err.response.data.msg);
              setType("error");
              setOpen(true);
            });
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setMessage(err.response.data.msg);
          setType("error");
          setOpen(true);
        });
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={"top" + "right"}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>

      <Grid item md="7">
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" alignItems="flex-start">
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
                label="Senha Antiga"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
              />
              <TextField
                className={classes.field}
                id="filled-password-input"
                fullWidth
                label="Nova senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Salvar Alterações
              </Button>
            </Grid>
          </form>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Dialog, Grid, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles(() => ({
  modal: {
    padding: 32,
    minWidth: 450,
    maxWidth: 550,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 30,
    marginBottom: 8,
  },
  description: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  buttons: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  button: {
    width: 180,
  },
  buttonSecond: {
    width: 180,
    marginLeft: 16,
  },
  textDescription: {
    fontSize: 18,
  },
  field: {
    marginTop: 16,
  },
}));

export default function Modal(props) {
  const classes = useStyles();
  const {
    valueName,
    valueEmail,
    isOpen,
    title,
    handleCloseModalProps,
    handleSubmitProps,
  } = props;

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
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
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: valueName,
      email: valueEmail,
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitModal(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    handleCloseModalProps();
  };

  const handleSubmitModal = (values) => {
    formik.resetForm();
    handleSubmitProps(values);
    handleCloseModalProps();
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Dialog
        PaperProps={{
          style: { borderRadius: 7 },
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            className={classes.modal}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.title}>{title}</Typography>
            <Grid container item md={12}>
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
            </Grid>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              md={12}
              className={classes.buttons}
            >
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleClose}
              >
                CANCELAR
              </Button>
              <Button
                className={classes.buttonSecond}
                variant="contained"
                type="button"
                type="submit"
              >
                EDITAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </Grid>
  );
}

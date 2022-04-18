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
    children,
    valueNome,
    valueUrl,
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
    nome: yup.string("Enter your name link").required("Name is required"),
    url: yup
      .string()
      .test("is-url-valid", "URL is not valid", (value) => isValidUrl(value)),
  });

  const formik = useFormik({
    initialValues: {
      url: valueUrl,
      nome: valueNome,
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
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
                id="filled-email-input"
                name="nome"
                fullWidth
                label="Nome do Link"
                type="text"
                variant="outlined"
              />
              <TextField
                className={classes.field}
                value={formik.values.url}
                onChange={formik.handleChange}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
                id="filled-email-input"
                name="url"
                fullWidth
                label="URL do Link"
                type="text"
                variant="outlined"
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

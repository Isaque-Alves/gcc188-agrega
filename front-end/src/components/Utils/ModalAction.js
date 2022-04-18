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
  field: {},
}));

export default function Modal(props) {
  const classes = useStyles();
  const {
    label = "Texto",
    value,
    isOpen,
    title,
    handleCloseModalProps,
    handleSubmitProps,
  } = props;

  const validationSchema = yup.object({
    nome: yup
      .string("Digite algo")
      .min(3, "Name should be of minimum 3 characters length")
      .required("Is required"),
  });

  const formik = useFormik({
    initialValues: {
      nome: value,
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
                name="nome"
                fullWidth
                label={label}
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

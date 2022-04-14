import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { getGrupos, registerGrupo } from "../../services/api/Grupos";

import Footer from "../Utils/Footer";
import Card from "./Card";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "80vh",
    marginTop: 80,
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: "150%",
    color: "#1E2134",
    marginTop: 24,
  },
  paper: {
    padding: 32,
    marginTop: 15,
  },
  button: {
    marginLeft: 36,
    height: "3.5vw",
    backgroundColor: "#003ECB",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  field: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "166%",
    color: "#506176",
    width: "80%",
    height: "3.5vw",
  },
});

export default function Grupos(props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [groups, setGroups] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getGrupos()
      .then((resp) => {
        console.log(resp);
        setGroups(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string("Enter your group name")
      .min(3, "Name should be of minimum 3 characters length")
      .required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerGrupo(values)
        .then((resp) => {
          setMessage("Grupo cadastrado com sucesso");
          setType("success");
          setOpen(true);
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
      <Grid item md="10">
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>Bem vindo!</Typography>
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="flex-start">
              <TextField
                className={classes.field}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                id="filled-email-input"
                name="name"
                fullWidth
                label="Novo Grupo"
                type="text"
                variant="outlined"
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Adicionar
              </Button>
            </Grid>
          </form>
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container direction="column" alignItems="flex-start">
            {groups.map((group) => (
              <Card group={group} />
            ))}
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

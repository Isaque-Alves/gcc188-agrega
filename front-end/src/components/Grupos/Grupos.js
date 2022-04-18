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
import {
  getGrupos,
  registerGrupo,
  deleteGrupo,
  putGrupo,
  getGruposAdmin,
  deleteGrupoAdmin,
  putGrupoAdmin,
} from "../../services/api/Grupos";

import Footer from "../Utils/Footer";
import Card from "./Card";
import Modal from "../Utils/ModalAction";
import { useParams } from "react-router-dom";

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
  const [openModal, setOpenModal] = useState(false);
  const [group, setGroup] = useState();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [groups, setGroups] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    if (id) {
      getGruposAdmin(id)
        .then((resp) => {
          console.log(resp);
          setGroups(resp.data);
        })
        .catch((err) => console.log(err));
    } else {
      getGrupos()
        .then((resp) => {
          console.log(resp);
          setGroups(resp.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const validationSchema = yup.object({
    nome: yup
      .string("Enter your group name")
      .min(3, "Name should be of minimum 3 characters length")
      .required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerGrupo(values)
        .then((resp) => {
          setMessage("Grupo cadastrado com sucesso");
          setType("success");
          setOpen(true);
          formik.resetForm();
          getGrupos()
            .then((resp) => {
              setGroups(resp.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setMessage(err.response.data.msg);
          setType("error");
          setOpen(true);
        });
    },
  });

  const handleEdit = (group) => {
    setGroup(group);
    setOpenModal(true);
  };

  const handleDelete = (group) => {
    setGroup(group);
    console.log(id);
    const request = id
      ? deleteGrupoAdmin(id, group.gid)
      : deleteGrupo(group.gid);

    request
      .then((resp) => {
        setMessage("Grupo excluido com sucesso");
        setType("success");
        setOpen(true);
        const request2 = id ? getGruposAdmin(id) : getGrupos();
        request2
          .then((resp) => {
            setGroups(resp.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.msg);
        setType("error");
        setOpen(true);
      });
  };

  const handleSubmitEdit = (value) => {
    console.log(value);
    const request = id
      ? putGrupoAdmin(id, group.gid, value)
      : putGrupo(group.gid, value);
    request
      .then((resp) => {
        setMessage("Grupo editado com sucesso");
        setType("success");
        setOpen(true);
        const request2 = id ? getGruposAdmin(id) : getGrupos();
        request2
          .then((resp) => {
            setGroups(resp.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.msg);
        setType("error");
        setOpen(true);
      });
  };

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
      <Modal
        isOpen={openModal}
        title="Editar Grupo"
        label="Novo Grupo"
        value={group && group.nome}
        handleCloseModalProps={() => setOpenModal(false)}
        handleSubmitProps={handleSubmitEdit}
      />

      <Grid item md={10}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>Bem vindo!</Typography>
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="flex-start">
              <TextField
                className={classes.field}
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
                id="filled-email-input"
                name="nome"
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
              <Card
                group={group}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

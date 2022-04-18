import React, { useEffect, useState } from "react";
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
import CardComentario from "./CardComentario";
import Footer from "../Utils/Footer";

import { useFormik } from "formik";
import * as yup from "yup";
import { getLink } from "../../services/api/Links";
import { getGrupo } from "../../services/api/Grupos";
import {
  getComentarios,
  comentar,
  deleteComentario,
  putComentar,
} from "../../services/api/Comentarios";
import { useParams } from "react-router-dom";
import Modal from "../Utils/ModalAction";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
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

  subtitle: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 18,
    lineHeight: "150%",
    color: "#1E2134",
    marginTop: 24,
  },
  paper: {
    padding: 24,
    marginTop: 15,
    // height: 224,
  },
  button: {
    marginLeft: 36,
    height: "3.5vw",
    backgroundColor: "#003ECB",
  },
  field: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "166%",
    color: "#506176",
  },
  containerButton: {
    marginTop: 24,
  },
});

export default function Comentarios(props) {
  const classes = useStyles(props);
  const { id, lid } = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [link, setLink] = useState();
  const [nomeGrupo, setNomeGrupo] = useState();
  const [comentario, setComentario] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getLink(id, lid)
      .then((resp) => setLink(resp.data))
      .catch((err) => console.log(err));

    getGrupo(id)
      .then((resp) => {
        setNomeGrupo(resp.data.nome);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
    getComentarios(lid)
      .then((resp) => setComentarios(resp.data))
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = yup.object({
    texto: yup.string("Enter your text").required("Text is required"),
  });

  const formik = useFormik({
    initialValues: {
      texto: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      comentar(lid, values)
        .then((resp) => {
          setMessage("comentario feito com sucesso");
          setType("success");
          setOpen(true);
          formik.resetForm();
          getComentarios(lid)
            .then((resp) => setComentarios(resp.data))
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

  const handleDelete = (cid) => {
    deleteComentario(lid, cid)
      .then((resp) => {
        setMessage("comentario deletado com sucesso");
        setType("success");
        setOpen(true);
        formik.resetForm();
        getComentarios(lid)
          .then((resp) => setComentarios(resp.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setMessage(err.response.data.msg);
        setType("error");
        setOpen(true);
      });
  };

  const handleEdit = (comentario) => {
    console.log(comentario);
    setComentario(comentario);
    setOpenModal(true);
  };

  const handleSubmitEdit = (value) => {
    console.log("valor", value);
    const data = { texto: value.nome };
    putComentar(lid, comentario.cid, data)
      .then((resp) => {
        setMessage("Comentário editado com sucesso");
        setType("success");
        setOpen(true);
        getComentarios()
          .then((resp) => {
            setComentarios(resp.data);
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
        title="Editar Comentário"
        value={comentario && comentario.texto}
        handleCloseModalProps={() => setOpenModal(false)}
        handleSubmitProps={handleSubmitEdit}
      />
      <Grid item md={10}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>{nomeGrupo}</Typography>
          <Typography className={classes.subtitle}>
            {link && link.nome} -{" "}
            <a href={link && link.url} target="_blank">
              {link && link.url}
            </a>
          </Typography>
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="flex-start">
              <TextField
                className={classes.field}
                value={formik.values.texto}
                onChange={formik.handleChange}
                error={formik.touched.texto && Boolean(formik.errors.texto)}
                helperText={formik.touched.texto && formik.errors.texto}
                id="filled-email-input"
                name="texto"
                fullWidth
                label="Adicione um comentario"
                type="text"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent="flex-end"
              className={classes.containerButton}
            >
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Comentar
              </Button>
            </Grid>
          </form>
        </Paper>
        {comentarios.map((comentario) => (
          <CardComentario
            comentario={comentario}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}

        <Footer />
      </Grid>
    </Grid>
  );
}

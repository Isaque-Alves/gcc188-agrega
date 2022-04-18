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
import Footer from "../Utils/Footer";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "../Utils/ModalLinkAction";

import { useFormik } from "formik";
import * as yup from "yup";
import { getGrupo } from "../../services/api/Grupos";
import {
  getLinks,
  registerLink,
  putLink,
  deleteLink,
} from "../../services/api/Links";
import { useNavigate, useParams } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "data", label: "Data", minWidth: 170 },
  { id: "acoes", label: "Ações", minWidth: 170 },
];

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
  tabela: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "150%",
    color: "#1E2134",
  },
  tabelaItens: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "150%",
    color: "#1E2134",
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
    marginBottom: 8,
  },
  button1: {
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "#F48927",
    "&:hover": {
      backgroundColor: "#F48927",
    },
    width: "7vw",
  },
  button2: {
    marginTop: 5,
    marginLeft: 5,
    background: "#003ECB",
    width: "7vw",
  },
  button3: {
    marginTop: 5,
    marginLeft: 5,
    background: "#E31B0C",
    "&:hover": {
      background: "#E31B0C",
    },
    width: "7vw",
  },
});

export default function Grupos(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles(props);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [link, setLink] = useState();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [rows, setRows] = useState([]);
  const [nomeGroup, setNomeGroup] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getLinks(id)
      .then((resp) => {
        setRows(formatData(resp.data));
        console.log(resp.data);
      })
      .catch((err) => console.log(err));

    getGrupo(id)
      .then((resp) => {
        setNomeGroup(resp.data.nome);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const actions = (row) => {
    return (
      <Grid>
        <Button
          className={classes.button1}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            handleClickAcessar(row.lid);
          }}
        >
          Acessar
        </Button>
        <Button
          className={classes.button2}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(row);
          }}
        >
          Editar
        </Button>
        <Button
          className={classes.button3}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row);
          }}
        >
          Excluir
        </Button>
      </Grid>
    );
  };

  const formatData = (rows) => {
    const data = rows.map((row) => {
      return {
        name: row.nome,
        data: new Date(row.updatedAt).toLocaleDateString(),
        gid: row.gid,
        lid: row.lid,
        id: row.id,
        url: row.url,
        acoes: actions(row),
      };
    });
    return data;
  };

  const validationSchema = yup.object({
    nome: yup.string("Enter your name link").required("Name is required"),
    url: yup
      .string()
      .test("is-url-valid", "URL is not valid", (value) => isValidUrl(value)),
  });

  const formik = useFormik({
    initialValues: {
      url: "",
      nome: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerLink(id, values)
        .then((resp) => {
          setMessage("link cadastrado com sucesso");
          setType("success");
          setOpen(true);
          formik.resetForm();
          getLinks(id)
            .then((resp) => {
              setRows(formatData(resp.data));
              console.log(resp.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickAcessar = (lid) => {
    console.log(lid);
    navigate(`/grupo/${id}/link/${lid}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (link) => {
    setLink(link);
    setOpenModal(true);
  };

  const handleDelete = (link) => {
    setLink(link);
    deleteLink(link.lid)
      .then((resp) => {
        setMessage("Link excluido com sucesso");
        setType("success");
        setOpen(true);
        getLinks(id)
          .then((resp) => {
            setRows(formatData(resp.data));
            console.log(resp.data);
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
    putLink(link.lid, value)
      .then((resp) => {
        setMessage("Link editado com sucesso");
        setType("success");
        setOpen(true);
        getLinks(id)
          .then((resp) => {
            setRows(formatData(resp.data));
            console.log(resp.data);
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
        title="teste"
        valueNome={link && link.nome}
        valueUrl={link && link.url}
        buttonTitle="testeButton"
        handleCloseModalProps={() => setOpenModal(false)}
        handleSubmitProps={handleSubmitEdit}
      />
      <Grid item md={10}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>{nomeGroup}</Typography>
          <Typography className={classes.subtitle}>
            Acompanhe todos os links
          </Typography>
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
          <Grid container alignItems="flex-start">
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        className={classes.tabela}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.lid}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            console.log(row);
                            return (
                              <TableCell
                                className={classes.tabelaItens}
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  window.open(row.url, "_blank");
                                }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

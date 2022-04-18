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
import Modal from "../Utils/ModalUserAction";

import {
  getUserAdmin,
  getUsersAdmin,
  putUserAdmin,
  putUserSenha,
  deleteUserAdmin,
} from "../../services/api/Auth";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
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
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    //   PEGAR USUARIOS
    getUsersAdmin()
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.response));
    // getLinks(id)
    //   .then((resp) => {
    //     setRows(formatData(resp.data));
    //     console.log(resp.data);
    //   })
    //   .catch((err) => console.log(err));
    // getGrupo(id)
    //   .then((resp) => {
    //     setNomeGroup(resp.data.nome);
    //     console.log(resp.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  //   const isValidUrl = (url) => {
  //     try {
  //       new URL(url);
  //     } catch (e) {
  //       return false;
  //     }
  //     return true;
  //   };

  const actions = (row) => {
    return (
      <Grid>
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (user) => {
    setUser(user);
    setOpenModal(true);
  };

  const handleDelete = (user) => {
    setUser(user);
    // DELETAR USUARIO
    // deleteLink(user.id)
    //   .then((resp) => {
    //     setMessage("Link excluido com sucesso");
    //     setType("success");
    //     setOpen(true);
    //     // PEGAR USUARIOS
    //     getLinks(id)
    //       .then((resp) => {
    //         setRows(formatData(resp.data));
    //         console.log(resp.data);
    //       })
    //       .catch((err) => console.log(err));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setMessage(err.response.data.msg);
    //     setType("error");
    //     setOpen(true);
    //   });
  };

  const handleSubmitEdit = (value) => {
    console.log(value);
    // EDITAR USUARIO
    // putLink(user.id, value)
    //   .then((resp) => {
    //     setMessage("Link editado com sucesso");
    //     setType("success");
    //     setOpen(true);
    //     // PEGAR USUARIOS
    //     getLinks(id)
    //       .then((resp) => {
    //         setRows(formatData(resp.data));
    //         console.log(resp.data);
    //       })
    //       .catch((err) => console.log(err));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setMessage(err.response.data.msg);
    //     setType("error");
    //     setOpen(true);
    //   });
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
        valueName={user && user.nome}
        valueEmail={user && user.email}
        handleCloseModalProps={() => setOpenModal(false)}
        handleSubmitProps={handleSubmitEdit}
      />
      <Grid item md={10}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>
            Bem vindo, Administrador!
          </Typography>
          <Typography className={classes.subtitle}>
            Acompanhe todos os usuários
          </Typography>
        </Grid>
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

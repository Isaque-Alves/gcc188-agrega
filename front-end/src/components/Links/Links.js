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

import { useFormik } from "formik";
import * as yup from "yup";
import { getLinks, registerLink } from "../../services/api/Links";
import { useParams } from "react-router-dom";

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
    height: "3.5vw",
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
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getLinks(id)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = yup.object({
    link: yup
      .string("Enter your link")
      .required("Link is required")
      .matches(/[\w+{3,25}](\w+)/g, "Formato inválido"),
  });

  const formik = useFormik({
    initialValues: {
      link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const name = values.link.substring(
        values.link.indexOf("[") + 1,
        values.link.lastIndexOf("]")
      );
      const url = values.link.substring(
        values.link.indexOf("(") + 1,
        values.link.lastIndexOf(")")
      );

      const data = {
        name,
        url,
      };
      console.log(data);
      registerLink(id, data)
        .then((resp) => {
          setMessage("link cadastrado com sucesso");
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

  const rows = [
    {
      name: "Link X",
      data: "21 Jun 2021 - 17H",
      acoes: (
        <Grid>
          <Button className={classes.button1} variant="contained" type="">
            Acessar
          </Button>
          <Button className={classes.button2} variant="contained" type="">
            Editar
          </Button>
          <Button className={classes.button3} variant="contained" type="">
            Excluir
          </Button>
        </Grid>
      ),
    },
    {
      name: "Link X",
      data: "21 Jun 2021 - 17H",
      acoes: (
        <Grid>
          <Button className={classes.button1} variant="contained" type="">
            Acessar
          </Button>
          <Button className={classes.button2} variant="contained" type="">
            Editar
          </Button>
          <Button className={classes.button3} variant="contained" type="">
            Excluir
          </Button>
        </Grid>
      ),
    },
    {
      name: "Link X",
      data: "21 Jun 2021 - 17H",
      acoes: (
        <Grid>
          <Button className={classes.button1} variant="contained" type="">
            Acessar
          </Button>
          <Button className={classes.button2} variant="contained" type="">
            Editar
          </Button>
          <Button className={classes.button3} variant="contained" type="">
            Excluir
          </Button>
        </Grid>
      ),
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Grid item md="10">
        <Grid container direction="column" alignItems="flex-start">
          <Typography className={classes.title}>Nome do grupo</Typography>
          <Typography className={classes.subtitle}>
            Acompanhe todos os links
          </Typography>
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="flex-start">
              <TextField
                className={classes.field}
                value={formik.values.link}
                onChange={formik.handleChange}
                error={formik.touched.link && Boolean(formik.errors.link)}
                helperText={formik.touched.link && formik.errors.link}
                id="filled-email-input"
                name="link"
                fullWidth
                label="Novo Link - Formato: [Nome do Link](URL do Link)"
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
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                className={classes.tabelaItens}
                                key={column.id}
                                align={column.align}
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

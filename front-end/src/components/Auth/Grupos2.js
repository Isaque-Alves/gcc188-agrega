import { makeStyles } from "@material-ui/styles";
import {Grid,
  TextField,
  Paper,
  Button,
  Typography,} from "@mui/material";
import Footer from "../Utils/Footer";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'data', label: 'Data', minWidth: 170 },
  { id: 'acoes', label: 'Ações', minWidth: 170 },
  
];

function createData(name, data) {
    return { name, data };
  }
  

const rows = [
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
    createData('Link X', "21 Jun 2021 - 17H"),
  ];


const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "80vh",
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
  tabela:{
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "150%",
    color: "#1E2134",
  },
  tabelaItens:{
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
});

export default function Grupos(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  const classes = useStyles(props);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md="10">
        <Grid container direction="column" alignItems="flex-start">    
          <Typography className={classes.title}>Nome do grupo</Typography> 
          <Typography className={classes.subtitle}>Acompanhe todos os links</Typography> 
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container  alignItems="flex-start"> 
            <TextField
                className={classes.field}
                id="filled-email-input"
                fullWidth
                label="Novo Link - Formato: [Nome do Link](URL do Link)"
                type="text"
                variant="outlined"
            />
            <Button className={classes.button} variant="contained" type="">
              Adicionar
            </Button>
          </Grid>
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container  alignItems="flex-start"> 
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow >
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell className={classes.tabelaItens} key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
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

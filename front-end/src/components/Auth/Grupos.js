import { makeStyles } from "@material-ui/styles";
import {Grid,
  TextField,
  Paper,
  Button,
  Typography,} from "@mui/material";
import Footer from "../Utils/Footer";
import CardLuis from "./CardLuis";

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
          <Typography className={classes.title}>Bem vindo, Isaque!</Typography> 
        </Grid>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container  alignItems="flex-start"> 
            <TextField
                className={classes.field}
                id="filled-email-input"
                fullWidth
                label="Novo Grupo"
                type="text"
                variant="outlined"
            />
            <Button className={classes.button} variant="contained" type="">
              Adicionar
            </Button>
          </Grid>
        </Paper>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container direction="column" alignItems="flex-start">   
            <CardLuis />
            <CardLuis />
            <CardLuis />
          </Grid>
          </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

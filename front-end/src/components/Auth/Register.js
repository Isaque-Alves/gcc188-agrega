import { makeStyles } from "@material-ui/styles";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Avatar,
  TextField,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo-colorida.png";

import Footer from "../Utils/Footer";

const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  root: {
    width: "100vw",
    minHeight: "80vh",
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: "150%",
    color: "#1E2134",
  },
  paper: {
    marginTop: 80,
    padding: 24,
  },
  field: {
    marginTop: 24,
  },
  button: {
    marginTop: 24,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  text: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "166%",
    color: "#506176",
  },
});

export default function Login(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md="3">
        <img src={logo} />
      </Grid>
      <Grid item md="7">
        <Paper variant="outlined" className={classes.paper}>
          <Grid container direction="column" alignItems="flex-start">
            <Grid container>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item className={classes.grid}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="outlined" size="small" component="span">
                    Upload Avatar
                  </Button>
                </label>
                <Typography className={classes.text}>
                  Dimensões recomendadas: 200x200, tamanho máximo: 5MB
                </Typography>
              </Grid>
            </Grid>

            <TextField
              className={classes.field}
              id="filled-email-input"
              fullWidth
              label="Nome completo"
              type="text"
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="filled-email-input"
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="filled-password-input"
              fullWidth
              label="Senha"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="filled-password-input"
              fullWidth
              label="Confirmar senha"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <Button className={classes.button} variant="contained" type="">
              Registrar
            </Button>
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

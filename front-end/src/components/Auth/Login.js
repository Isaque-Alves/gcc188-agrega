import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import logo from "../../assets/logo-colorida.png";

import Footer from "../Utils/Footer";

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
  },
  paper: {
    padding: 24,
  },
  field: {
    marginTop: 24,
  },
  button: {
    marginTop: 24,
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
            <Typography className={classes.title}>Login</Typography>
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
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <Button className={classes.button} variant="contained">
              Login
            </Button>
          </Grid>
        </Paper>
        <Footer />
      </Grid>
    </Grid>
  );
}

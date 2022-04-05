import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, TextField, Paper, Button } from "@mui/material";
import logo from "../../assets/logo-colorida.png";

const useStyles = makeStyles({
  root: {
    position: "static",
    background: "#F5F5F5",
    marginTop: 24,
    padding: 24,
  },
  textSecondary: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "143%",
    letterSpacing: 0.15,
    color: "#506176",
  },
  textAbout: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "143%",
    letterSpacing: 0.15,
    color: "#1E2134",
    marginLeft: 16,
  },
});

export default function Footer(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Typography className={classes.textSecondary}>© 2022 Agrega</Typography>
      <Typography className={classes.textAbout}>Sobre nós</Typography>
    </Grid>
  );
}

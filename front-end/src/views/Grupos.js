import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Utils/Navbar";
import { Grid } from "@mui/material";
import TelaGrupos from "../components/Auth/Grupos";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});

export default function Grupos() {
  return (
    <Grid container>
      <Navbar />
      <TelaGrupos />
    </Grid>
  );
}

import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Utils/Navbar";
import { Grid } from "@mui/material";
import TelaGrupos2 from "../components/Auth/Grupos2";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});

export default function Grupos() {
  return (
    <Grid container>
      <Navbar />
      <TelaGrupos2 />
    </Grid>
  );
}

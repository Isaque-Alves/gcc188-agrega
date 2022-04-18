import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Utils/Navbar";
import { Grid } from "@mui/material";
import Comentarios from "../components/Comentarios/Comentarios";
import Sidebar from "../components/Utils/Sidebar/Sidebar";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});

export default function ComentariosView() {
  return (
    <Grid container>
      <Navbar />
      <Sidebar />
      <Comentarios />
    </Grid>
  );
}

import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Utils/Navbar";
import { Grid } from "@mui/material";
import RegisterForm from "../components/Auth/Register";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});

export default function Register() {
  return (
    <Grid container>
      <Navbar />
      <RegisterForm />
    </Grid>
  );
}

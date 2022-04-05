import { makeStyles } from "@material-ui/styles";
import Navbar from "../components/Utils/Navbar";
import { Grid } from "@mui/material";
import LoginForm from "../components/Auth/Login";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});

export default function Login() {
  return (
    <Grid container>
      <Navbar />
      <LoginForm />
    </Grid>
  );
}

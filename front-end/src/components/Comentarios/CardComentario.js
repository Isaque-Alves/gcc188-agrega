import { makeStyles } from "@material-ui/styles";
import { Grid, Avatar, Typography, Paper, Button } from "@mui/material";

const useStyles = makeStyles({
  comentario: {
    marginTop: 24,
    padding: 24,
  },
  buttons: {
    padding: 24,
    paddingTop: 0,
  },
  buttonEdit: {
    background: "#003ECB",
    "&:hover": {
      background: "#003ECB",
    },
    marginRight: 16,
    borderRadius: 24,
  },
  buttonExcluir: {
    background: "#E31B0C",
    "&:hover": {
      background: "#E31B0C",
    },
    borderRadius: 24,
  },
  comentarioText: {
    wordBreak: "break-word",
  },
});

export default function CardComentario(props) {
  const classes = useStyles(props);
  const { comentario, handleDelete } = props;

  const handleDeleteComentario = () => {
    handleDelete(comentario.cid);
  };
  console.log(comentario);
  return (
    <Paper elevation={3}>
      <Grid container className={classes.comentario}>
        <Grid item md={1}>
          <Avatar alt="User" />
        </Grid>
        <Grid item md={11}>
          <Typography>usuário</Typography>
          <Grid container>
            <Typography className={classes.comentarioText}>
              {comentario.texto}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        className={classes.buttons}
      >
        {/* <Button variant="contained" className={classes.buttonEdit}>
          Editar
        </Button> */}
        <Button
          variant="contained"
          className={classes.buttonExcluir}
          onClick={handleDeleteComentario}
        >
          Excluir
        </Button>
      </Grid>
    </Paper>
  );
}

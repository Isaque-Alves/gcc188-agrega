import { makeStyles } from "@material-ui/styles";
import { Grid, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import icone from "../../assets/Avatar.png";

const useStyles = makeStyles({
  icone: {
    marginTop: "3.5vw",
  },
  texto: {
    marginTop: "2.5vw",
  },
  button1: {
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "#F48927",
    "&:hover": {
      backgroundColor: "#F48927",
    },
    width: "7vw",
  },
  button2: {
    marginTop: 5,
    marginLeft: 5,
    background: "#003ECB",
    width: "7vw",
  },
  button3: {
    marginTop: 5,
    marginLeft: 5,
    background: "#E31B0C",
    "&:hover": {
      background: "#E31B0C",
    },
    width: "7vw",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  cards: {
    padding: 15,
    width: "96%",
    margin: 10,
  },
});

export default function CardLuis(props) {
  const classes = useStyles(props);
  const { group, handleEdit, handleDelete } = props;
  const navigate = useNavigate();

  const handleClickAcessar = () => {
    navigate(`/grupo/${group.gid}`);
  };

  const handleClickEditar = () => {
    handleEdit(group);
  };

  const handleClickDeletar = () => {
    handleDelete(group);
  };

  return (
    <Card className={classes.cards} sx={{ display: "flex" }}>
      <Grid
        className={classes.icone}
        container
        direction="column"
        alignItems="center"
        item
        md="1"
      >
        <img src={icone} />
      </Grid>
      <Grid
        Grid
        container
        direction="column"
        alignItems="flex-start"
        item
        md="9"
      >
        <CardContent className={classes.texto} sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="subtitle1"
            color="text.secondary"
          >
            {group && group.nome}
          </Typography>
          {/* <Typography variant="subtitle1" component="div">
            30 Links
          </Typography> */}
        </CardContent>
      </Grid>
      <Grid Grid container direction="column" alignItems="center" item md="1">
        <CardContent>
          <Button
            className={classes.button1}
            variant="contained"
            onClick={handleClickAcessar}
          >
            Acessar
          </Button>
          <Button
            className={classes.button2}
            variant="contained"
            onClick={handleClickEditar}
          >
            Editar
          </Button>
          <Button
            className={classes.button3}
            variant="contained"
            onClick={handleClickDeletar}
          >
            Excluir
          </Button>
        </CardContent>
      </Grid>
    </Card>
  );
}

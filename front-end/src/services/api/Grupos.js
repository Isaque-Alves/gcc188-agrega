import Api from "./Api";

const getGrupos = () => {
  return Api().get("/usuario/grupos");
};

const registerGrupo = (dados) => {
  return Api().post("/usuario/grupo", dados);
};

export { getGrupos, registerGrupo };

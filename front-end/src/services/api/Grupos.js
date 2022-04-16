import Api from "./Api";

const getGrupos = () => {
  return Api().get("/usuario/grupos");
};

const getGrupo = (id) => {
  return Api().get(`/usuario/grupo/${id}`);
};

const registerGrupo = (dados) => {
  return Api().post("/usuario/grupo", dados);
};

const putGrupo = (id, dados) => {
  return Api().put(`/usuario/grupo/${id}`, dados);
};

const deleteGrupo = (id) => {
  return Api().delete(`/usuario/grupo/${id}`);
};

export { getGrupos, getGrupo, registerGrupo, putGrupo, deleteGrupo };

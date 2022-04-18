import Api from "./Api";

const getGrupos = () => {
  return Api().get("/usuario/grupos");
};

const getGruposAdmin = (id) => {
  return Api().get(`admin/usuario/${id}/grupos`);
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

const putGrupoAdmin = (id, gid, dados) => {
  return Api().put(`/admin/usuario/${id}/grupo/${gid}`, dados);
};

const deleteGrupo = (id) => {
  return Api().delete(`/usuario/grupo/${id}`);
};

const deleteGrupoAdmin = (id) => {
  return Api().delete(`/admin/usuario/grupo/${id}`);
};

export {
  getGrupos,
  getGrupo,
  registerGrupo,
  putGrupo,
  deleteGrupo,
  getGruposAdmin,
  deleteGrupoAdmin,
  putGrupoAdmin,
};

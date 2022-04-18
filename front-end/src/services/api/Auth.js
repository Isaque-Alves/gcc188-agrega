import Api from "./Api";

const login = (dados) => {
  return Api().post("/login", dados);
};

const register = (dados) => {
  return Api().post("/registrar", dados);
};

const getUser = () => {
  return Api().get("/usuario");
};

const putUser = (dados) => {
  return Api().put("/usuario", dados);
};

const putUserSenha = (dados) => {
  return Api().put("/usuario/senha", dados);
};

const getUsersAdmin = () => {
  return Api().get("/admin/usuarios");
};

const getUserAdmin = (id) => {
  return Api().get(`/admin/usuario/${id}`);
};

const putUserAdmin = (id, dados) => {
  return Api().put(`admin/usuario/${id}`, dados);
};

const putUserSenhaAdmin = (id, dados) => {
  return Api().put(`admin/usuario/${id}/senha`, dados);
};

const deleteUserAdmin = (id) => {
  return Api().delete(`admin/usuario/${id}`);
};

export {
  login,
  register,
  putUser,
  getUser,
  putUserSenha,
  getUserAdmin,
  getUsersAdmin,
  putUserAdmin,
  putUserSenhaAdmin,
  deleteUserAdmin,
};

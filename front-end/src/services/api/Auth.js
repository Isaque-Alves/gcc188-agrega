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

export { login, register, putUser, getUser, putUserSenha };

import Api from "./Api";

const login = (dados) => {
  return Api().post("/login", dados);
};

const register = (dados) => {
  return Api().post("/registrar", dados);
};

const putUser = (dados) => {
  return Api().put("/registrar", dados);
};

export { login, register, putUser };

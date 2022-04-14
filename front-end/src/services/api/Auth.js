import Api from "./Api";

const login = (dados) => {
  return Api().post("/login", dados);
};

const register = (dados) => {
  return Api().post("/registrar", dados);
};

export { login, register };

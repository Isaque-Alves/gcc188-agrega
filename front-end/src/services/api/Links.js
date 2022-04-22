import Api from "./Api";

const getLinks = (id) => {
  return Api().get(`/grupo/${id}/links`);
};

const registerLink = (id, dados) => {
  return Api().post(`/grupo/${id}/link`, dados);
};

export { getLinks, registerLink };

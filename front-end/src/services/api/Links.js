import Api from "./Api";

const getLinks = (id) => {
  return Api().get(`usuario/grupo/${id}/links`);
};

const getLink = (id, lid) => {
  return Api().get(`/link/${lid}`);
};

const registerLink = (id, dados) => {
  return Api().post(`usuario/grupo/${id}/link`, dados);
};

const putLink = (id, dados) => {
  return Api().put(`usuario/link/${id}`, dados);
};

const deleteLink = (id) => {
  return Api().delete(`usuario/link/${id}`);
};

export { getLinks, getLink, registerLink, putLink, deleteLink };

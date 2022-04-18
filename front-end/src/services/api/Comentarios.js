import Api from "./Api";

const getComentarios = (lid) => {
  return Api().get(`/link/${lid}/comentarios`);
};

const comentar = (id, dados) => {
  return Api().post(`/usuario/link/${id}/comentario`, dados);
};

const deleteComentario = (lid, cid) => {
  return Api().delete(`usuario/link/${lid}/comentario/${cid}`);
};

export { getComentarios, comentar, deleteComentario };

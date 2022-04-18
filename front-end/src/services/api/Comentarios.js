import Api from "./Api";

const getComentarios = (lid) => {
  return Api().get(`/link/${lid}/comentarios`);
};

const comentar = (id, dados) => {
  return Api().post(`/usuario/link/${id}/comentario`, dados);
};

const putComentar = (lid,cid, dados) => {
  return Api().put(`/usuario/link/${lid}/comentario/${cid}`, dados);
};

const deleteComentario = (lid, cid) => {
  return Api().delete(`usuario/link/${lid}/comentario/${cid}`);
};

export { getComentarios, comentar, deleteComentario, putComentar };

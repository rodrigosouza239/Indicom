import Api from '../../services/Api';

export const getUser = (id) => {
  return Api.get(`users/${id}`);
};

export const sendComentario = (comentario) => {
  return Api.post('comments', { ...comentario });
};

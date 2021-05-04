import Api from '../../services/Api';

export const atualizarInteresse = async (id, meusInteresses) => {
  const response = await Api.post(`v1/users/${id}/interests`, {
    interests: meusInteresses,
  });
  // console.log(response.status, response.data);
  if (response.status !== 200) return false;
  return { ...response.dataValues };
};

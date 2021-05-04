import Api from '../../services/Api';

export const cadastrar = async (user) => {
  const response = await Api.post('users', user);
  return response;
};

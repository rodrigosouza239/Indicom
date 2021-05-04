import Api from '../../services/Api';

export const atualizarInformacoesGerais = async (user) => {
  const response = await Api.put(`users/${user.id}`, {
    ...user,
    id: undefined,
  });
  return response;
};

export const atualizarInteresse = async (user) => {
  const { meusInteresses } = user;
  const response = await Api.put(`users/${user.id}`, { meusInteresses });
  return response;
};

export const atualizarAtividades = async (user) => {
  const { atividades } = user;
  const response = await Api.put(`users/${user.id}`, { atividades });
  return response;
};

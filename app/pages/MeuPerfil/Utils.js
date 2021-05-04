import Api from '../../services/Api';

export const atualizarInformacoesGerais = async (user) => {
  const newUser = {
    type: user.tipoPessoa,
    activityBranchId: user.ramoAtividade
      ? parseInt(user.ramoAtividade, 10)
      : null,
    companyName: user.nomeEmpresa !== '' ? user.nomeEmpresa : null,
    economicActivityId: user.atividadeEconomica
      ? parseInt(user.atividadeEconomica, 10)
      : null,
    whatsapp: user.celular !== '' ? user.celular : null,
    website: user.website !== '' ? user.website : null,
    facebook: user.facebook !== '' ? user.facebook : null,
  };
  const response = await Api.put(`v1/users/${user.id}`, {
    ...newUser,
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

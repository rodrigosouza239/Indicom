import Api from '../../../services/Api';

export const cadastrar = async (user) => {
  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
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
    activities: user.ramoAtividades,
  };
  const response = await Api.post('v1/users', { ...newUser });
  if (response.status !== 201) return false;
  return { ...response.dataValues };
};

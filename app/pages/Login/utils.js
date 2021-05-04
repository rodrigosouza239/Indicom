import Api from '../../services/Api';

export const checkPassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  if (password.length > 50) {
    return false;
  }
  if (password.search(/\d/) === -1) {
    return false;
  }
  if (password.search(/[a-zA-Z]/) === -1) {
    return false;
  }
  return true;
};

export const checkEmail = async (email) => {
  const responseEmail = await Api.post('v1/check-email', { email });
  if (responseEmail.status === 409) return false;
  return true;
};

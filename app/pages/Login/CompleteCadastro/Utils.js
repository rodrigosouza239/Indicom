export const phoneMaskInput = (value) => {
  const x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  return !x[2] ? x[1] : `(${x[1]}) ${x[2] + (x[3] ? `-${x[3]}` : '')}`;
};

export const getEnv = (prodEnv, devEnv) => {
  if (!prodEnv) {
    return devEnv;
  }
  return prodEnv;
};

export const getEnvironment = (prodEnv, devEnv) => {
  if (!prodEnv) {
    return devEnv;
  }
  return prodEnv;
};

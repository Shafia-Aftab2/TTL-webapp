const copy = async (text) => {
  let isSuccessfull = false;

  await navigator.clipboard.writeText(text).then(() => {
    isSuccessfull = true;
  });

  return isSuccessfull;
};

export { copy };

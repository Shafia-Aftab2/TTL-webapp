function isValidId(string = "") {
  return string?.match(/^[0-9a-fA-F]{24}$/);
}

export default isValidId;

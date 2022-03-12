function isValidURL(url = "") {
  return url?.match(
    /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g
  );
}

export default isValidURL;

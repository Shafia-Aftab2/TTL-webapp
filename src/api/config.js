const TALKIE_MONO_API_BASE_URL =
  process?.env?.VUE_APP_TALKIE_MONO_API_BASE_URL ||
  // "https://demos-talkie-api.techchaps.net/v1";
  "http://localhost:3000/v1";

export { TALKIE_MONO_API_BASE_URL };

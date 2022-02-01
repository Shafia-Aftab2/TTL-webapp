import HTTPClient from "../HTTPClient";

export default class AssetRoutes {
  static async GetEmojis() {
    return HTTPClient.get(`/emojis`);
  }
}

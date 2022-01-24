import HTTPClient from "../HTTPClient";

export default class SubscriptionRoutes {
  static async CreateSubscription() {
    return HTTPClient.post(`/subscriptions`);
  }

  static async RemoveSubscription() {
    return HTTPClient.delete(`/subscriptions`);
  }

  static async GetMySubscription() {
    return HTTPClient.get(`/subscriptions`);
  }
}

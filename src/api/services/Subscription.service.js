import HTTPClient from "../HTTPClient";

export default class SubscriptionRoutes {
  static async CreateSubscription(query = {}) {
    return HTTPClient.post(
      `/subscriptions?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        ?.join("")}`
    );
  }

  static async RemoveSubscription() {
    return HTTPClient.delete(`/subscriptions`);
  }

  static async GetMySubscription() {
    return HTTPClient.get(`/subscriptions`);
  }
}

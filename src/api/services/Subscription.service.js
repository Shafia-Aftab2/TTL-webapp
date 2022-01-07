import HTTPClient from "../HTTPClient";

export default class SubscriptionRoutes {
  static async CreateSubscription() {
    return HTTPClient.post(`/subscriptions`);
  }
}

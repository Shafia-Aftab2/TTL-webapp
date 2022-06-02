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

  static async GetBillingHistory() {
    return HTTPClient.get(`/subscriptions/billing-history`);
  }

  static async CancelSubscription(payload) {
    return HTTPClient.delete(`/subscriptions`, payload);
  }

  static async ChangeSubscriptionStatus(payload) {
    return HTTPClient.patch(`/subscriptions/status`, payload);
  }

  static async ChangeSubscriptionPlan(query) {
    return HTTPClient.put(
      `/subscriptions/change-plan?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        ?.join("")}`
    );
  }
}

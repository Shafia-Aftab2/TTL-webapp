import { SubscriptionService } from "@/api/services";

export default {
  methods: {
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    async getSubscriptionStatus() {
      if (!this.$store.state.currentSubscription) {
        const response = await SubscriptionService.GetMySubscription().catch(
          () => null
        );

        if (response?.data) {
          this.handleStoreMutation(
            "userIsSubscribed",
            true // TODO: check for inactive subscriptions
          );

          const periods = { monthly: "month", annually: "year" };
          const currentSubscription = {
            period: periods[response?.data?.planName],
            plan: response?.data?.priceName
              ?.toLowerCase()
              ?.split("-")
              ?.join(" "),
          };

          this.handleStoreMutation("currentSubscription", currentSubscription);
        }
      }
    },
  },
};

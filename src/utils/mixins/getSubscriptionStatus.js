import { SubscriptionService } from "@/api/services";

export default {
  methods: {
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    async getSubscriptionStatus() {
      const response = await SubscriptionService.GetMySubscription().catch(
        () => null
      );

      if (response.data) this.handleStoreMutation("userIsSubscribed", true);
    },
  },
};

import { SubscriptionService } from "@/api/services";
import { pricingPlans } from "../constants";

export default {
  data() {
    return {
      plansAllowingDownloads: [
        pricingPlans.planNames.BUDDING_SPEAKERS,
        pricingPlans.planNames.LONG_HAUL,
      ]?.map((x) => x?.toLowerCase()?.split("-")?.join(" ")),
      canDownloadContent: false,
    };
  },
  async created() {
    // get user subscription
    const subscription = await this.getMySubscription();

    const planName = subscription?.priceName
      ?.toLowerCase()
      ?.split("-")
      ?.join(" ");

    if (planName && this.plansAllowingDownloads?.includes(planName)) {
      this.canDownloadContent = true;
    }
  },
  methods: {
    async getMySubscription() {
      const response = await SubscriptionService.GetMySubscription().catch(
        () => null
      );

      return response?.data || null;
    },
  },
};

import { SubscriptionService, ClassService } from "@/api/services";
import { pricingPlans } from "../constants";

export default {
  data() {
    return {
      plansAllowingDownloads: [
        pricingPlans.planNames.BUDDING_SPEAKERS,
        pricingPlans.planNames.LONG_HAUL,
      ]?.map((x) => x?.toLowerCase()?.split("-")?.join(" ")),
      plansAllowingUnlimitedClasses: [pricingPlans.planNames.LONG_HAUL]?.map(
        (x) => x?.toLowerCase()?.split("-")?.join(" ")
      ),
      canDownloadContent: false,
      canCreateUnlimitedClasses: false,
      maxClassCount: 8,
      currentClassCount: 0 /*** NOTE: this line is to be removed, and related data has to come from api ***/,
    };
  },
  async created() {
    // get user subscription
    const subscription = await this.getMySubscription();

    const planName = subscription?.priceName
      ?.toLowerCase()
      ?.split("-")
      ?.join(" ");

    // check if user can download content
    if (planName && this.plansAllowingDownloads?.includes(planName)) {
      this.canDownloadContent = true;
    }

    // check if user can create unlimited classes
    if (planName && this.plansAllowingUnlimitedClasses?.includes(planName)) {
      this.canCreateUnlimitedClasses = true;
    }

    /*** NOTE: this block is to be removed, and related data has to come from api ***/
    // get the number of classes user has created
    const currentClassCount = ((await this.getMyClasses()) || Array.length(8))
      ?.length;
    this.currentClassCount = currentClassCount;
  },
  methods: {
    async getMySubscription() {
      const response = await SubscriptionService.GetMySubscription().catch(
        () => null
      );

      return response?.data || null;
    },
    async getMyClasses() {
      const response = await ClassService.GetMyClasses().catch(() => null);

      return response?.data || null;
    },
  },
};

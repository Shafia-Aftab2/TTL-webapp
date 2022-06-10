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
      maxClassCount: 0,
      currentClassCount: 0 /*** NOTE: this line is to be removed, and related data has to come from api ***/,
    };
  },
  computed: {
    computedSubscription() {
      return this.$store.state.subscription;
    },
  },
  async created() {
    // get user subscription
    const planName = await (async () => {
      let _name = null;

      if (this.computedSubscription.isTrial) {
        _name = pricingPlans.planNames.FREE_TRIAL;
      } else {
        const subscription = await this.getMySubscription();
        _name = subscription?.priceName;
      }

      return _name?.toLowerCase()?.split("-")?.join(" ");
    })();

    // check if user can download content
    if (planName && this.plansAllowingDownloads?.includes(planName)) {
      this.canDownloadContent = true;
    }

    // check if user can create unlimited classes
    if (planName && this.plansAllowingUnlimitedClasses?.includes(planName)) {
      this.canCreateUnlimitedClasses = true;
    }

    // set max class count for current subscription plan
    if (
      planName ===
      pricingPlans.planNames.FREE_TRIAL?.toLowerCase()?.split("-")?.join(" ")
    ) {
      this.maxClassCount = 4;
    } else {
      this.maxClassCount = 8;
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

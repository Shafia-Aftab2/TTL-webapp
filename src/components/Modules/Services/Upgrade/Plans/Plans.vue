<template>
  <div class="upgrade-wrapper">
    <div class="upgrade-header-wrapper">
      <h2 class="h2">⏰ Early-bird offer!</h2>
      <p class="p">
        Available until end of October 2022.
        <br />
        Choose a plan that works best for you and your students.
        <br />
        Don’t worry, you can always switch plans anytime.
      </p>
    </div>

    <div class="upgrade-plan-timeline-selectors">
      <talkie-tab
        :label="'Monthly'"
        :active="activePlanTimeline === planTimelines.MONTH"
        :onClick="() => handlePlanTimelineChange(planTimelines.MONTH)"
      />
      <talkie-tab
        :label="'Annually - save 10%!'"
        :active="activePlanTimeline === planTimelines.YEAR"
        :onClick="() => handlePlanTimelineChange(planTimelines.YEAR)"
      />
    </div>

    <!-- Cards -->
    <div class="upgrade-plan-cards-wrapper">
      <template v-for="plan in plans" :key="plan">
        <!-- hide free plan for user, he is already subscribed -->
        <talkie-price-plan-card
          v-if="computedUser ? plan.name !== 'FREE TRIAL' : true"
          :name="plan.name"
          :price="
            plan?.prices[activePlanTimeline === planTimelines.MONTH ? 0 : 1]
              ?.price
          "
          :payPeriod="
            plan?.prices[activePlanTimeline === planTimelines.MONTH ? 0 : 1]
              ?.showPeriod
              ? `/${
                  plan?.prices[
                    activePlanTimeline === planTimelines.MONTH ? 0 : 1
                  ]?.period
                }`
              : ''
          "
          :description="plan.description"
          :features="plan.features"
          :ctaText="
            computedCurrentSubscription?.plan &&
            computedCurrentSubscription?.period
              ? computedCurrentSubscription?.plan
                  ?.toLowerCase()
                  ?.split('-')
                  ?.join(' ') ===
                  plan?.name?.toLowerCase()?.split('-')?.join(' ') &&
                computedCurrentSubscription?.period === activePlanTimeline
                ? 'Your current plan'
                : 'Choose plan'
              : plan.cta.text
          "
          :ctaAction="() => onPlanSelected(plan.name)"
          :ctaDisabled="
            computedCurrentSubscription?.plan
              ?.toLowerCase()
              ?.split('-')
              ?.join(' ') ===
              plan?.name?.toLowerCase()?.split('-')?.join(' ') &&
            computedCurrentSubscription?.period === activePlanTimeline
          "
          :variant="plan.theme"
          :expandable="isMobileScreen ? true : false"
          :defaultExpanded="false"
        />
      </template>
    </div>
  </div>
  <!-- Terms and Conditions -->
  <div class="terms-and-conditions">
    <p>
      By choosing a plan, you agree to our
      <a href="https://talktolearn.cc/Ts&Cs.html" target="_blank"
        >Terms and Conditions</a
      >.
    </p>
  </div>
</template>

<script>
import { TalkieTab } from "@/components/UICore";
import { TalkiePricePlanCard } from "@/components/SubModules/Cards";
import authUser from "@/utils/helpers/auth";
import { pricingPlans } from "@/utils/constants";
import isMobileScreen from "../_common/mixins/isMobileScreen";
import { SubscriptionService } from "@/api/services";

export default {
  name: "ServicesUpgradePlans",
  mixins: [isMobileScreen],
  components: { TalkieTab, TalkiePricePlanCard },
  data() {
    return {
      user: null,
      plans: pricingPlans?.planData,
      activePlanTimeline: "month",
      planTimelines: {
        MONTH: "month",
        YEAR: "year",
        TRIAL: "",
      },
      currentSubscription: {},
    };
  },
  computed: {
    computedUser() {
      return this.user;
    },
    computedCurrentSubscription() {
      return this.currentSubscription;
    },
  },
  async created() {
    // get auth user data
    const user = authUser.getUser();
    this.user = user;

    // get subscription status if user is logged in
    if (user) await this.getSubscriptionStatus();
  },
  methods: {
    async getSubscriptionStatus() {
      const response = await SubscriptionService.GetMySubscription().catch(
        () => null
      );

      if (response?.data) {
        const periods = { monthly: "month", annually: "year" };
        const currentSubscription = {
          period: periods[response?.data?.planName],
          plan: response?.data?.priceName?.toLowerCase()?.split("-")?.join(" "),
        };

        this.currentSubscription = currentSubscription;
      }
    },
    handlePlanTimelineChange(newTimeline) {
      this.activePlanTimeline = newTimeline;
    },
    onPlanSelected(planName) {
      const requiresContact =
        planName?.toUpperCase()?.trim() === "SCHOOL PLAN" ||
        planName?.toUpperCase()?.trim() === "ACADEMY PLAN";

      // check if the custom plan is selected
      if (requiresContact) {
        this.$router.push(`/contact`);
        return;
      }

      // redirect to signup if there is logged in user
      if (!this.user) {
        this.$router.push(
          `/auth/signup/?redirect_route=${window.location.pathname}`
        );
        return;
      }

      // redirect to upgrade page with selected plan
      const baseRoute = `/services/upgrade?plan=${planName}&period=${this.activePlanTimeline}`;
      this.$router.push(
        this.computedCurrentSubscription?.plan &&
          this.computedCurrentSubscription?.period
          ? `${baseRoute}&changeMode=true`
          : baseRoute
      );
    },
  },
};
</script>

<style scoped>
.terms-and-conditions {
  text-align: center;
  margin-top: var(--t-space-24);
  font-size: var(--t-font-size-14);
}
.terms-and-conditions a {
  color: var(--t-primary-color);
  text-decoration: underline;
}
.upgrade-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.upgrade-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.25;
}
.upgrade-plan-timeline-selectors {
  display: flex;
  justify-content: center;
  align-items: center;
}
.upgrade-plan-cards-wrapper {
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
}

/* Responsive variants */
@media (max-width: 599px) {
  .upgrade-wrapper {
    padding: var(--t-space-40) 0;
    padding-bottom: var(--t-space-50);
    gap: var(--t-space-24);
  }
  .upgrade-header-wrapper {
    gap: var(--t-space-10);
  }
  .upgrade-plan-timeline-selectors {
    gap: var(--t-space-20);
  }
  .upgrade-plan-cards-wrapper {
    grid-template-rows: 1fr 1fr 1fr;
    gap: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .upgrade-wrapper {
    padding: var(--t-space-40) 0;
    padding-bottom: var(--t-space-70);
    gap: var(--t-space-36);
  }
  .upgrade-header-wrapper {
    gap: var(--t-space-24);
  }
  .upgrade-plan-timeline-selectors {
    gap: var(--t-space-24);
  }
  .upgrade-plan-cards-wrapper {
    grid-template-rows: 1fr 1fr 1fr;
    gap: var(--t-space-24);
  }
}
@media (min-width: 900px) {
  .upgrade-plan-cards-wrapper {
    grid-template-rows: initial;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--t-space-24);
  }
}
@media (min-width: 1200px) {
}
</style>

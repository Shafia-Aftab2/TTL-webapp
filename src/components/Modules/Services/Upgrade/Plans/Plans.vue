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
          :features="plan.features"
          :description="plan.description"
          :ctaText="plan.cta.text"
          :variant="plan.theme"
          :expandable="isMobileScreen ? true : false"
          :defaultExpanded="false"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { TalkieTab } from "@/components/UICore";
import { TalkiePricePlanCard } from "@/components/SubModules/Cards";
import authUser from "@/utils/helpers/auth";
import { pricingPlans } from "@/utils/constants";

export default {
  name: "ServicesUpgradePlans",
  components: { TalkieTab, TalkiePricePlanCard },
  data() {
    const mobileSize = 900;
    const _isMobileScreen = window.innerWidth < mobileSize;

    return {
      user: null,
      plans: pricingPlans?.planData,
      activePlanTimeline: "month",
      planTimelines: {
        MONTH: "month",
        YEAR: "year",
        TRIAL: "",
      },
      mobileSize: mobileSize,
      isMobileScreen: _isMobileScreen,
    };
  },
  computed: {
    computedUser() {
      return this.user;
    },
  },
  async created() {
    // get auth user data
    const user = authUser.getUser();
    this.user = user;
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onWindowResize);
    });
  },
  methods: {
    handlePlanTimelineChange(newTimeline) {
      this.activePlanTimeline = newTimeline;
    },
    onWindowResize() {
      this.isMobileScreen = window.innerWidth < this.mobileSize;
    },
  },
};
</script>

<style scoped>
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
    grid-template-columns: 1fr 1fr 1fr;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--t-space-24);
  }
}
@media (min-width: 1200px) {
}
</style>

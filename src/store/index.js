import { createStore } from "vuex";
import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";
import moment from "moment";

export default createStore({
  state: {
    user: {},
    sidebar: {
      hasBackLink: true,
    },
    subscription: {
      // isTrial: false,
      // isTrialOver: false,
      // hideTrialBar: false,
      // remainingTrialDays: 0,
      // isCalculated: false,
      // isRequired: false,
      // isSubscribed: true,
      // plan: "budding-speakers",
      // period: "month",
    },
  },
  mutations: {
    calculateSubscription(state) {
      // only proceed if not calculated once
      if (state?.subscription?.isCalculated) return;
      const subscription = { isCalculated: true, isRequired: true };

      // only teachers are required to be subscribed
      const user = authUser.getUser();
      if (user?.role?.toLowerCase() !== roles.TEACHER) {
        subscription.isRequired = false;
        state.subscription = { ...subscription };
        return;
      }

      // if user is not subscribed calculate trial period
      if (!user?.subscription) {
        subscription.isTrial = true;

        // get remaining trial days
        const trialStartDate = moment(new Date(user?.createdAt));
        const trialEndDate = moment(trialStartDate).add(30, "days");
        const remainingTrialDays = moment(trialEndDate).diff(
          moment(new Date()),
          "days"
        );

        // set trial over status
        if (remainingTrialDays <= 0) {
          subscription.isTrialOver = true;
          state.subscription = { ...subscription };
          return;
        }

        // set remaining trial days
        subscription.remainingTrialDays = remainingTrialDays;
        state.subscription = { ...subscription };
        return;
      }

      // user is a subscriber
      subscription.isSubscribed = true;
      state.subscription = { ...subscription };
    },
    unsetSubscriptionCalculatedStatus(state) {
      state.subscription = { ...state.subscription, isCalculated: false };
    },
    hideSubscriptionDaysTrialBar(state) {
      state.subscription = { ...state.subscription, hideTrialBar: true };
    },
    hideSubscriptionTrialOverModal(state) {
      state.subscription = { ...state.subscription, isTrialOver: false };
    },
  },
  actions: {
    calculateSubscription(context) {
      context.commit("calculateSubscription");
    },
    unsetSubscriptionCalculatedStatus(context) {
      context.commit("unsetSubscriptionCalculatedStatus");
    },
    hideSubscriptionDaysTrialBar(context) {
      context.commit("hideSubscriptionDaysTrialBar");
    },
    hideSubscriptionTrialOverModal(context) {
      context.commit("hideSubscriptionTrialOverModal");
    },
  },
  modules: {},
});

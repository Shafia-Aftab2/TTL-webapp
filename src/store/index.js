import { createStore } from "vuex";
import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";

export default createStore({
  state: {
    user: {},
    sidebar: {
      hasBackLink: true,
    },
    hasClosedModal: false,
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

      // if teacher does not require subscription
      subscription.isRequired = user?.accessMode?.isSubscriptionRequired;
      if (!subscription.isRequired) {
        state.subscription = { ...subscription };
        return;
      }

      // if teacher is already subscribed
      if (user?.accessMode?.isSubscribed) {
        subscription.isSubscribed = true;
        state.subscription = { ...subscription };
        return;
      }

      // if teacher is not subscribed
      subscription.isTrial = user?.accessMode?.isTrial;
      subscription.remainingTrialDays = user?.accessMode?.remainingTrialDays;
      subscription.isTrialOver = user?.accessMode?.isTrialOver;

      // return subscription status
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

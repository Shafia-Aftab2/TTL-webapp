import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    sidebar: {
      hasBackLink: true,
    },
    isTrialOver: false,
    userIsSubscribed: false,
    currentSubscription: {},
  },
  mutations: {},
  actions: {},
  modules: {},
});

import { createStore } from "vuex";

export default createStore({
  state: {
    sidebar: {
      items: [
        {
          name: "Lucy M",
          isActive: true,
          hasRightIcon: true,
          onClick: () => {},
        },
        {
          name: "Nathan C",
          hasRightIcon: true,
        },
      ],
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});

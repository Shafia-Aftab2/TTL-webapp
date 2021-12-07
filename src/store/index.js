import { createStore } from "vuex";

export default createStore({
  state: {
    // Sample data for sidebar
    sidebar: {
      hasBackLink: true,
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
        {
          name: "Nathan C",
          hasRightIcon: true,
        },
      ],
      // checkboxes: [
      //   {
      //     label: "Your ideal holiday",
      //     onToggle: () => {},
      //     isActive: true,
      //     disabled: false,
      //   },
      //   {
      //     label: "Fave App",
      //     onToggle: () => {},
      //     disabled: false,
      //   },
      //   {
      //     label: "Least Fave App",
      //     onToggle: () => {},
      //     disabled: false,
      //   },
      //   {
      //     label: "Climate Change",
      //     onToggle: () => {},
      //     disabled: false,
      //   },
      //   {
      //     label: "Ideal Career",
      //     onToggle: () => {},
      //     disabled: false,
      //   },
      //   {
      //     label: "What you like most/least...",
      //     onToggle: () => {},
      //     disabled: false,
      //   },
      // ],
      buttons: [
        {
          text: "+ New Class",
          type: "button",
          variant: "primary",
          size: "small",
          outlined: true,
          loading: false,
          disabled: false,
          onClick: () => console.log("Button Clicked"),
        },
        {
          text: "+ New Class",
          type: "button",
          variant: "primary",
          size: "small",
          outlined: true,
          loading: false,
          disabled: true,
          onClick: () => console.log("Button Clicked"),
        },
      ],
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});

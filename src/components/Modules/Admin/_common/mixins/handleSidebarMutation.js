export default {
  created() {
    const sidebarItems = [
      {
        name: "Users",
        hasRightIcon: true,
        link: `/admin/users`,
        onClick: () => this.$router.push(`/admin/users`),
        isActive: this.$route.path === `/admin/users`,
      },
      {
        name: "Quizzes",
        hasRightIcon: true,
        link: `/admin/quizzes`,
        onClick: () => this.$router.push(`/admin/quizzes`),
        isActive: this.$route.path === `/admin/quizzes`,
      },
    ];

    this.handleSidebarMutation({
      items: sidebarItems,
    });
  },
  methods: {
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    handleSidebarMutation(data) {
      const sidebar = this.$store.state.sidebar;
      const updatedData = {
        hasBackLink: data.hasOwnProperty("hasBackLink")
          ? data.hasBackLink
          : sidebar.hasBackLink,
        items: data.hasOwnProperty("items") ? data.items : sidebar.items,
        checkboxes: data.hasOwnProperty("checkboxes")
          ? data.checkboxes
          : sidebar.checkboxes,
        buttons: data.hasOwnProperty("buttons")
          ? data.buttons
          : sidebar.buttons,
      };

      this.handleStoreMutation(
        "sidebar",
        Object.assign({}, { ...updatedData })
      );
    },
  },
};

import hanldeSidebarMutation from "@/utils/mixins/handleSidebarMutation";

export default {
  mixins: [hanldeSidebarMutation],
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
};

<template>
  <div class="summary-wrapper">
    <h1>Teachers - Paid</h1>
    <div class="boxes-1">
      <div class="box-1">
        <div class="summary-number">
          <p>28</p>
        </div>
        <div class="summary-text">
          <p>Paid users</p>
        </div>
      </div>
      <div class="box-2">
        <div class="summary-number">
          <p>+2</p>
        </div>
        <div class="summary-text">
          <p>since last week / month</p>
        </div>
      </div>
    </div>
    <div class="boxes-2">
      <div class="box-3">
        <div class="summary-number">
          <p>21</p>
        </div>
        <div class="summary-text">
          <p>Active users</p>
        </div>
      </div>
      <div class="box-4">
        <div class="summary-number">
          <p>7</p>
        </div>
        <div class="summary-text">
          <p>Inactive users</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TeachersPaid",
  created() {
    // NOTE: myClasses variable here contains hardcoded/static data.
    // Ideally this data should come from an api.
    // But we can skip that for now and use hardcoded data instead.
    const myClasses = [
      {
        name: "Home",
        id: "class id 1 from api",
      },
      {
        name: "Users",
        id: "class id 2 from api",
      },
      {
        name: "Topics",
        id: "class id 3 from api",
      },
      {
        name: "Quizzes",
        id: "class id 4 from api",
      },
    ];

    // sidebar data
    const sidebarItems = myClasses.map((x) => ({
      name: x.name,
      hasRightIcon: true,
      link: `/classes/${x.id}`,
      onClick: () => this.$router.push(`/classes/${x.id}`),
    }));
    const sidebarButtons = [
      {
        text: "+ New Class",
        type: "button",
        variant: "primary",
        size: "small",
        outlined: true,
        loading: false,
        disabled: false,
        onClick: () => this.$router.push("/classes/create"),
      },
    ];
    this.handleSidebarMutation({
      items: sidebarItems,
    });
  },
  methods: {
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
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
  },
};
</script>
<style scoped>
.summary-wrapper {
  margin-top: 160px;
  margin-left: 70px;
  width: 140%;
}
.boxes-1 {
  display: flex;
  gap: 10px;
  margin-top: 70px;
}
.boxes-2 {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.box-1 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-2 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-3 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-4 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.summary-number {
  margin-left: 50px;
  margin-top: 45px;
  font-size: 40px;
  font-weight: bolder;
}
.summary-text {
  margin-bottom: 50px;
  margin-left: 50px;
  font-size: 28px;
}
</style>

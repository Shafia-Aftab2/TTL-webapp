<template>
  <div class="student-home-wrapper">
    <h3 class="h3 student-home-header">
      Hello, {{ studentName }}
      <br />
      What would you like to do today?
    </h3>
    <div class="student-home-content-wrapper">
      <div class="student-home-content-item">
        <talkie-button
          type="button"
          class="student-home-content-item-button-primary"
          :onClick="handleClassModeButtonClick"
        >
          Enter
        </talkie-button>
        <p class="student-home-content-item-header">Class Mode</p>
        <p class="student-home-content-item-description">
          You have <strong>3 new </strong>tasks
        </p>
      </div>
      <div class="student-home-content-item">
        <talkie-button
          class="student-home-content-item-button-secondary"
          :variant="'secondary'"
          :outlined="true"
          :disabled="true"
        >
          Coming Soon
        </talkie-button>
        <p class="student-home-content-item-header">Practice Mode</p>
        <p class="student-home-content-item-description">
          Do you own thing here. Always remember Little, but often
        </p>
      </div>
    </div>
    <talkie-button :outlined="true">View my Inbox</talkie-button>
    <talkie-button :outlined="true">View my Stats</talkie-button>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";

export default {
  name: "StudentHome",
  components: { TalkieButton },
  data() {
    return {
      studentName: null,
    };
  },
  created() {
    // get auth user
    const user = authUser.getUser();

    // redirect to login if no auth user
    if (!user) {
      this.$router.push("/auth/login");
      return;
    }

    // get student name from auth user
    this.studentName = user?.name;
  },
  methods: {
    handleClassModeButtonClick() {
      this.$router.push(`/classes/tasks/inbox`);
    },
  },
};
</script>

<style scoped>
.student-home-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--t-space-20);
  font-size: var(--t-fs-small);
}
.student-home-header {
  line-height: 1.2;
}
.student-home-content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.student-home-content-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--t-white);
  border-style: solid;
  border-color: var(--t-primary);
  border-radius: var(--t-space-20);
}
.student-home-content-item-button-primary,
.student-home-content-item-button-secondary {
  border-radius: 100% !important;
}
.student-home-content-item-button-secondary {
  border: none !important;
  background-color: var(--t-secondary) !important;
}
.student-home-content-item-header {
  font-family: var(--t-ff-bold);
  font-size: var(--t-fs-base);
}
.student-home-content-item-description {
  line-height: 1.3;
  word-spacing: var(--t-space-1);
}

/* Responsive variants */
@media (max-width: 599px) {
  .student-home-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--t-space-16);
  }
  .student-home-content-item {
    width: 100%;
    border-width: var(--t-space-2);
    padding: var(--t-space-24);
    gap: var(--t-space-16);
  }
  .student-home-content-item-button-primary,
  .student-home-content-item-button-secondary {
    padding: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .student-home-content-wrapper {
    gap: var(--t-space-24);
  }
  .student-home-content-item {
    width: 50%;
    height: 60vh;
    border-width: var(--t-space-3);
    gap: var(--t-space-16);
  }
  .student-home-content-item-button-primary,
  .student-home-content-item-button-secondary {
    padding: var(--t-space-36);
  }
}
@media (min-width: 900px) {
  .student-home-content-wrapper {
    gap: var(--t-space-30);
  }
  .student-home-content-item {
    width: 70%;
    padding: var(--t-space-24);
  }
  .student-home-content-item-button-primary,
  .student-home-content-item-button-secondary {
    padding: var(--t-space-44);
  }
}
</style>

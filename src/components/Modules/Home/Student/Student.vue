<template>
  <div class="student-home-wrapper">
    <h3 class="h3 student-home-header">
      Hello, {{ studentName }}!
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
          <!-- You have <strong>3 new </strong>tasks -->
          <!-- You may have due tasks -->
          Q&amp;A
        </p>
      </div>
      <div class="student-home-content-item">
        <talkie-button
          type="button"
          class="student-home-content-item-button-primary"
          :onClick="handlePracticeModeButtonClick"
        >
          Enter
        </talkie-button>
        <!-- <p class="student-home-content-item-header">Practice Mode</p> -->
        <p class="student-home-content-item-header">Quiz Mode</p>
        <p class="student-home-content-item-description">
          Do your own thing here.<br />Always remember: <br />Little, but often
        </p>
      </div>
    </div>
    <talkie-button :outlined="true" :onClick="handleStatsLinkClick">
      View my Stats
    </talkie-button>
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

    // check if user has joined a class
    const hasJoinedAClass =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;

    // redirect to join class if not have already
    if (!hasJoinedAClass) {
      return this.$router.push(`/classes/join`);
    }

    // redirect to login if no auth user
    if (!user) {
      this.$router.push("/auth/login");
      return;
    }

    // get student name from auth user
    this.studentName = user?.name;
  },
  methods: {
    redirectToCommingSoonPage() {
      this.$router.push(`/coming-soon`);
    },
    handleClassModeButtonClick() {
      this.$router.push(`/classes/tasks/inbox`);
    },
    handlePracticeModeButtonClick() {
      this.$router.push(`/classes/practice`);
    },
    handleStatsLinkClick() {
      this.$router.push(`/classes/stats`);
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
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--t-white);
  border-style: solid;
  border-color: var(--t-primary);
  border-radius: var(--t-space-20);
}
.student-home-content-item-button-primary {
  font-family: var(--t-ff-bold);
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
    min-width: 100%;
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
    min-width: 80%;
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
    min-width: 70%;
    padding: var(--t-space-24);
  }
  .student-home-content-item-button-primary,
  .student-home-content-item-button-secondary {
    padding: var(--t-space-44);
  }
}
</style>

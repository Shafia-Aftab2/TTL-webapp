<template>
  <div class="student-home-wrapper">
    <h3>
      Hello, Mohsin!
      <br />
      What would you like to do today?
    </h3>
    <div class="student-home-content-wrapper">
      <div class="student-home-content-item">
        <talkie-button type="button" class="home-btn">Enter</talkie-button>
        <p><strong>Class Mode</strong></p>
        <p>You have <strong>3 new </strong>tasks</p>
      </div>
      <div class="student-home-content-item">
        <talkie-button
          class="home-btn-secondary"
          variant="secondary"
          :outlined="true"
          disabled
        >
          Coming Soon
        </talkie-button>
        <p><strong>Practice Mode</strong></p>
        <p>Do you own thing here. Always remember Little, but often</p>
      </div>
    </div>
    <talkie-button :outlined="true">View my Inbox</talkie-button>
    <talkie-button :outlined="true">View my Stats</talkie-button>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "StudentHome",
  components: { TalkieButton },
};
</script>

<style scoped>
.student-home-wrapper {
  padding: var(--t-space-32);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
}
.student-home-content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}
.student-home-content-item {
  background-color: var(--t-white);
  border: 2px solid var(--t-primary);
  width: 35%;
  height: 60vh;
  padding: var(--t-space-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  gap: 30px;
}
.home-btn {
  border-radius: 100% !important;
}
.home-btn-secondary {
  border: none !important;
  background-color: var(--t-secondary) !important;
  border-radius: 100% !important;
}
@media (max-width: 599px) {
  .student-home-content-wrapper {
    display: flex;
    flex-direction: column;
  }
  .student-home-wrapper {
    padding: var(--t-space-30);
  }
  .student-home-content-item {
    width: 100%;
    padding: var(--t-space-10);
  }
}

@media (min-width: 600px) {
  .student-home-content-item {
    width: 50%;
    padding: var(--t-space-10);
  }
}

@media (min-width: 900px) {
  .student-home-content-item {
    width: 35%;
    padding: var(--t-space-50);
  }
}

@media (min-width: 1200px) {
}
</style>

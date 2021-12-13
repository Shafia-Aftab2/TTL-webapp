<template>
  <div class="teachers-class-join-wrapper">
    <div class="teachers-class-join-content-wrapper">
      <h3 class="h3">
        You are now a member of
        <a class="teachers-class-join-content-class-name">Spanish 10A</a>
      </h3>

      <talkie-button>Go To Class</talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "ClassJoin",
  components: {
    TalkieButton,
  },
};
</script>

<style scoped>
.teachers-class-join-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
  transition: 0.2s ease;
  min-height: 80vh;
  gap: var(--t-space-36);
}
.teachers-class-join-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  gap: var(--t-space-16);
}
.teachers-class-join-content-class-name {
  color: var(--t-secondary);
}
.teachers-class-join-loading-wrapper {
  margin: auto;
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

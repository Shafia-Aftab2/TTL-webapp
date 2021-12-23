<template>
  <div class="class-tasks-inbox-wrapper">
    <div class="class-tasks-inbox-header-wrapper">
      <h2 class="h2">Speaking Portfolio</h2>
      <div class="class-tasks-inbox-header-select-wrapper">
        <talkie-select :placeholder="'Filter by question type'" />
      </div>
    </div>
    <div class="class-tasks-inbox-items-wrapper"></div>
  </div>
</template>

<script>
import { TalkieSelect } from "@/components/UICore";

export default {
  name: "TasksInbox",
  components: {
    TalkieSelect,
  },
};
</script>

<style>
.class-tasks-inbox-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.class-tasks-inbox-items-wrapper {
  display: flex;
  flex-direction: column;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-24);
    margin-bottom: var(--t-space-24);
    padding: 0 var(--t-space-12);
    gap: var(--t-space-24);
  }
  .class-tasks-inbox-header-wrapper {
    gap: var(--t-space-16);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 70%;
  }
  .class-tasks-inbox-items-wrapper {
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-36);
    margin-bottom: var(--t-space-36);
    padding: 0 var(--t-space-24);
    gap: var(--t-space-28);
  }
  .class-tasks-inbox-header-wrapper {
    gap: var(--t-space-20);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 50%;
  }
  .class-tasks-inbox-items-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-50);
    margin-bottom: var(--t-space-50);
    gap: var(--t-space-24);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 40%;
  }
}
</style>

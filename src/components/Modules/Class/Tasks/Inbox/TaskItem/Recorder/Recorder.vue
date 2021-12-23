<template>
  <div class="class-tasks-inbox-task-item-audio-recorder-wrapper">
    <div class="class-tasks-inbox-task-item-audio-recorder-buttons-wrapper">
      <talkie-icon
        :name="'arrow-rounded-left'"
        :isActive="true"
        :variant="'secondary'"
        :size="30"
      />
      <talkie-icon
        :name="'mike-unmuted'"
        :isActive="true"
        :variant="'secondary'"
        :size="50"
      />
      <talkie-icon
        :name="'send'"
        :isActive="true"
        :variant="'secondary'"
        :size="30"
      />
    </div>
  </div>
</template>

<script>
import { TalkieIcon } from "@/components/UICore";

export default {
  name: "TasksInboxTaskItemRecorder",
  components: {
    TalkieIcon,
  },
};
</script>

<style>
.class-tasks-inbox-task-item-audio-recorder-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
  margin: auto;
  display: flex;
  align-items: center;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-task-item-audio-recorder-wrapper {
    gap: var(--t-space-8);
  }

  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-task-item-audio-recorder-wrapper {
    gap: var(--t-space-12);
  }
  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-50);
  }
}
</style>

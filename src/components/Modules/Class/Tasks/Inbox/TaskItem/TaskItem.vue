<template>
  <div class="class-tasks-inbox-task-item">
    <div class="class-tasks-inbox-task-item-header-wrapper">
      <div class="class-tasks-inbox-task-item-header">
        <p class="p" v-if="title">{{ title }}</p>
        <p class="p" v-if="topic">{{ topic }}</p>
      </div>
      <div
        class="class-tasks-inbox-task-item-header-status"
        v-if="!isRead"
      ></div>
    </div>
    <div class="class-tasks-inbox-task-item-audio-responses-wrapper"></div>
  </div>
</template>

<script>
import { TalkieLoader, TalkieAlert } from "@/components/UICore";

export default {
  name: "TasksInboxTaskItem",
  components: {
    TalkieLoader,
    TalkieAlert,
  },
  props: {
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.class-tasks-inbox-task-item {
  display: flex;
  flex-direction: column;
  background: var(--t-white);
  cursor: pointer;
  gap: var(--t-space-16);
  border-radius: var(--t-br-large);
  padding: var(--t-space-24);
}
.class-tasks-inbox-task-item-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-tasks-inbox-task-item-spacer {
  height: var(--t-space-2);
  width: 100%;
  background: var(--t-gray-75);
}
.class-tasks-inbox-task-item-header {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-8);
}
.class-tasks-inbox-task-item-header-status {
  display: block;
  border-radius: 50%;
  background: var(--t-primary);
  width: var(--t-space-16);
  height: var(--t-space-16);
}
.class-tasks-inbox-task-item-audio-responses-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-12);
  padding: var(--t-space-12) 0;
}
.class-tasks-inbox-task-item-audio-message-centered {
  margin: auto;
}
.class-tasks-inbox-task-item-audio-message-right {
  margin-left: auto;
}
</style>

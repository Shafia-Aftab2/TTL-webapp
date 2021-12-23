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
  margin-top: var(--t-space-50);
  margin-bottom: var(--t-space-50);
  padding: 0 var(--t-space-24);
  gap: var(--t-space-24);
}
.class-tasks-inbox-header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--t-space-20);
}

.class-tasks-inbox-header-select-wrapper {
  min-width: 40%;
}
.class-tasks-inbox-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-16);
}

.bar-bottom {
  margin-top: 60px;
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.messege-bar {
  margin-bottom: 20px;
}
.bar-content {
  display: grid;
  gap: 10px;
  padding: var(--t-space-18);
}
.bar {
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.bar-inline {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
}
@media (min-width: 600px) {
}
@media (min-width: 900px) {
}
@media (min-width: 1200px) {
  .back {
    position: absolute;
    left: var(--t-space-50);
  }
}
</style>

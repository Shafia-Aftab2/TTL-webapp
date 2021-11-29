<template>
  <div class="teachers-class-start-convo-wrapper">
    <h2 class="teachers-class-start-convo-header h2">
      Start a conversation now?
    </h2>
    <div class="teachers-class-start-convo-form">
      <talkie-select :placeholder="'Choose topic'" />
      <talkie-input :placeholder="'Title (required)'" />
      <talkie-input :placeholder="'Question text (optional)'" />
    </div>
    <div class="teachers-class-start-convo-form-options-wrapper">
      <div class="teachers-class-start-convo-form-options">
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
  </div>
</template>

<script>
import { TalkieInput, TalkieSelect, TalkieIcon } from "../../../UICore";

export default {
  name: "TeacherStartConvo",
  components: { TalkieInput, TalkieSelect, TalkieIcon },
};
</script>

<style>
/* TODO: temp, move body color to wrappers with in views */
body {
  background: var(--t-gray-100);
}

.teachers-class-start-convo-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
  border-radius: var(--t-br-large);
  max-width: 80%;
  padding: var(--t-space-48);
  padding-bottom: calc(var(--t-space-48) * 2);
  margin-top: var(--t-space-48);
}
.teachers-class-start-convo-header {
  text-align: center;
  font-size: var(--font-size);
}
.teachers-class-start-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: var(--t-space-24);
  width: 70%;
}
.teachers-class-start-convo-form-options-wrapper {
  position: relative;
}
.teachers-class-start-convo-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 60%);
  gap: var(--t-space-48);
}
</style>

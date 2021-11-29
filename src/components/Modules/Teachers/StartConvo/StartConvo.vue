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
}
.teachers-class-start-convo-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.teachers-class-start-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.teachers-class-start-convo-form-options-wrapper {
  position: relative;
}
.teachers-class-start-convo-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: calc(var(--t-space-32) * 1.5);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 20%);
    gap: var(--t-space-36);
  }
}
@media (min-width: 600px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: calc(var(--t-space-32) * 2);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 30%);
    gap: var(--t-space-40);
  }
}
@media (min-width: 900px) {
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-48);
    padding-bottom: calc(var(--t-space-48) * 2);
    margin-top: var(--t-space-48);
  }
  .teachers-class-start-convo-header {
    font-size: var(--font-size);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 60%);
    gap: var(--t-space-48);
  }
}
</style>

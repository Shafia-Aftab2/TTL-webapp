<template>
  <talkie-back-drop>
    <div :class="['talkie-modal-content', customClass.toString()]">
      <!-- Custom Dialog -->
      <slot v-if="type === 'default'" />

      <!-- Confirm Dialog -->
      <p class="talkie-confirm-modal-text" v-if="type === 'confirm' && text">
        {{ text }}
      </p>
      <div
        class="talkie-confirm-modal-action-buttons"
        v-if="type === 'confirm'"
      >
        <talkie-button variant="transparent" :onClick="onDismiss" :size="size"
          >Cancel</talkie-button
        >
        <talkie-button
          variant="primary"
          :loading="false"
          :onClick="onContinue"
          :size="size"
          >Continue</talkie-button
        >
      </div>
    </div>
  </talkie-back-drop>
</template>

<script>
import TalkieBackDrop from "./BackDrop.vue";
import TalkieButton from "./Button.vue";

export default {
  name: "TalkieModal",
  components: { TalkieBackDrop, TalkieButton },
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val) => ["default"].includes(val),
    },
    customClass: {
      type: String,
      default: "",
    },
    // Confirm variant props
    text: {
      type: String,
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    onContinue: {
      type: Function,
      default: () => {},
    },
    onDismiss: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.talkie-modal-content {
  display: flex;
  flex-direction: column;
  background-color: var(--t-white);
  z-index: var(--t-zindex-70);
  max-width: 445px;
  width: 100%;
}

/* Confirm Dialog */
.talkie-confirm-modal-text {
  color: var(--t-black-100);
}
.talkie-confirm-modal-action-buttons {
  margin: auto;
  display: flex;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-modal-content {
    border-radius: var(--t-br-medium);
    gap: var(--t-space-16);
    padding: var(--t-space-30) var(--t-space-36);
  }
  .talkie-confirm-modal-text {
    line-height: 1.3;
    font-size: calc(var(--t-fs-h3) * 0.7);
    word-spacing: var(--t-space-1);
  }
  .talkie-confirm-modal-action-buttons {
    gap: var(--t-space-4);
  }
}
@media (min-width: 600px) {
  .talkie-modal-content {
    border-radius: var(--t-br-large);
    gap: var(--t-space-20);
    padding: var(--t-space-34) var(--t-space-38);
  }
  .talkie-confirm-modal-text {
    line-height: 1.4;
    font-size: calc(var(--t-fs-h3) * 0.9);
    word-spacing: var(--t-space-1);
  }
  .talkie-confirm-modal-action-buttons {
    gap: var(--t-space-6);
  }
}
@media (min-width: 1200px) {
  .talkie-modal-content {
    gap: var(--t-space-24);
    padding: var(--t-space-36) var(--t-space-40);
  }
  .talkie-confirm-modal-text {
    line-height: 1.5;
    font-size: var(--t-fs-h3);
    word-spacing: var(--t-space-2);
  }
  .talkie-confirm-modal-action-buttons {
    gap: var(--t-space-8);
  }
}
</style>

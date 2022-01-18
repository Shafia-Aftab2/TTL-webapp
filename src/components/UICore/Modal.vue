<template>
  <talkie-back-drop>
    <div
      class="talkie-modal-content-wrapper"
      :style="`--max-width: ${maxWidth}px`"
    >
      <!-- Close Icon -->
      <div
        :class="['talkie-modal-content-header']"
        v-if="type === 'confirm' || closeButton"
      >
        <talkie-icon
          :name="'x-mark'"
          :iconToSizeRatio="1.5"
          :onClick="onClose"
        />
      </div>

      <div
        :class="[
          'talkie-modal-content',
          centered && 'talkie-modal-content-centered',
          contentPadded && 'talkie-modal-content-padded',
          (type === 'confirm' || closeButton) &&
            'talkie-modal-content-pad-bottom',
          !closeButton && 'talkie-modal-content-top-rounding',
          customClass.toString(),
        ]"
      >
        <!-- Custom Dialog -->
        <slot v-if="type === 'default'" />

        <!-- Confirm Dialog -->
        <h3 class="h3" v-if="type === 'confirm' && title">
          {{ title }}
        </h3>
        <p class="p" v-if="type === 'confirm' && description">
          {{ description }}
        </p>
        <div
          class="talkie-confirm-modal-action-buttons"
          v-if="type === 'confirm'"
        >
          <talkie-button
            variant="danger"
            :noHighlights="true"
            :onClick="onConfirm"
            :size="size"
          >
            {{ confirmButtonText }}
          </talkie-button>
        </div>
      </div>
      <div class="talkie-modal-content-footer-wrapper">
        <template v-for="_button in buttonsOutSideModal" :key="_button">
          <talkie-button
            :onClick="_button.onClick"
            :noHighlights="true"
            :variant="_button.variant || 'primary'"
            :size="_button.size || 'medium'"
          >
            {{ _button.text }}
          </talkie-button>
        </template>
      </div>
    </div>
  </talkie-back-drop>
</template>

<script>
import TalkieBackDrop from "./BackDrop.vue";
import TalkieButton from "./Button.vue";
import TalkieIcon from "./Icon.vue";

export default {
  name: "TalkieModal",
  components: { TalkieBackDrop, TalkieButton, TalkieIcon },
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val) => ["default", "confirm"].includes(val),
    },
    buttonsOutSideModal: {
      type: Array,
      default: () => [],
    },
    centered: {
      type: Boolean,
    },
    closeButton: {
      type: Boolean,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    contentPadded: {
      type: Boolean,
    },
    maxWidth: {
      type: Number,
      default: 445,
    },
    customClass: {
      type: String,
      default: "",
    },
    // Confirm variant props
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    confirmButtonText: {
      type: String,
      default: "Delete",
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.talkie-modal-content-wrapper {
  display: flex;
  flex-direction: column;
  z-index: var(--t-zindex-70);
  max-width: var(--max-width);
  width: 100%;
}
.talkie-modal-content-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--t-white);
  width: 100%;
  padding: var(--t-space-5);
}
.talkie-modal-content {
  display: flex;
  flex-direction: column;
  background-color: var(--t-white);
  max-width: var(--max-width);
  width: 100%;
}
.talkie-modal-content-centered {
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.talkie-modal-content-footer-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  max-width: var(--max-width);
  gap: var(--t-space-16);
}

/* Confirm Dialog */
.talkie-confirm-modal-description {
  color: var(--t-black-100);
}
.talkie-confirm-modal-action-buttons {
  margin: auto;
  display: flex;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-modal-content-header {
    border-top-left-radius: var(--t-br-medium);
    border-top-right-radius: var(--t-br-medium);
  }
  .talkie-modal-content {
    border-bottom-left-radius: var(--t-br-medium);
    border-bottom-right-radius: var(--t-br-medium);
  }
  .talkie-modal-content-padded {
    gap: var(--t-space-12);
    padding: var(--t-space-30) var(--t-space-36);
  }
  .talkie-modal-content-pad-bottom {
    padding-bottom: var(--t-space-44);
  }
  .talkie-modal-content-top-rounding {
    border-top-left-radius: var(--t-br-medium);
    border-top-right-radius: var(--t-br-medium);
  }
  .talkie-confirm-modal-description {
    line-height: 1.3;
    font-size: calc(var(--t-fs-h3) * 0.7);
    word-spacing: var(--t-space-1);
  }
  .talkie-confirm-modal-action-buttons {
    margin-top: var(--t-space-16);
    gap: var(--t-space-4);
  }
  .talkie-modal-content-footer-wrapper {
    width: 50%;
    margin-top: var(--t-space-36);
  }
}
@media (min-width: 600px) {
  .talkie-modal-content-header {
    border-top-left-radius: var(--t-br-large);
    border-top-right-radius: var(--t-br-large);
  }
  .talkie-modal-content {
    border-bottom-left-radius: var(--t-br-large);
    border-bottom-right-radius: var(--t-br-large);
  }
  .talkie-modal-content-padded {
    gap: var(--t-space-12);
    padding: var(--t-space-34) var(--t-space-38);
  }
  .talkie-modal-content-pad-bottom {
    padding-bottom: var(--t-space-48);
  }
  .talkie-modal-content-top-rounding {
    border-top-left-radius: var(--t-br-large);
    border-top-right-radius: var(--t-br-large);
  }
  .talkie-confirm-modal-description {
    line-height: 1.4;
    font-size: calc(var(--t-fs-h3) * 0.9);
    word-spacing: var(--t-space-1);
  }
  .talkie-confirm-modal-action-buttons {
    margin-top: var(--t-space-24);
    gap: var(--t-space-6);
  }
  .talkie-modal-content-footer-wrapper {
    width: 60%;
    margin-top: var(--t-space-36);
  }
}
@media (min-width: 1200px) {
  .talkie-modal-content-padded {
    gap: var(--t-space-16);
    padding: var(--t-space-36) var(--t-space-40);
  }
  .talkie-modal-content-pad-bottom {
    padding-bottom: var(--t-space-50);
  }
  .talkie-confirm-modal-description {
    line-height: 1.5;
    font-size: var(--t-fs-h3);
    word-spacing: var(--t-space-2);
  }
  .talkie-confirm-modal-action-buttons {
    gap: var(--t-space-8);
  }
  .talkie-modal-content-footer-wrapper {
    width: 80%;
    margin-top: var(--t-space-48);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

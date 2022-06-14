<template>
  <span @click="handleBackDropClick">
    <talkie-back-drop v-if="showDropDown" />
  </span>
  <div class="talkie-button-drop-down-wrapper">
    <talkie-button
      :type="'button'"
      :variant="variant"
      :size="size"
      :noHighlights="true"
      :fullWidth="fullWidth"
      :disabled="disabled"
      :customClass="customClass"
      :onClick="handleButtonClick"
    >
      <slot />
    </talkie-button>
    <ul
      class="talkie-button-drop-down-items-wrapper"
      v-if="showDropDown && dropDownItems && dropDownItems.length > 0"
    >
      <li
        :class="[
          'talkie-button-drop-down-item',
          `talkie-button-drop-down-item-${size.toString()}`,
          `talkie-button-drop-down-item-${variant.toString()}`,
        ]"
        @click="_item.onClick"
        v-for="_item in dropDownItems"
        :key="_item"
      >
        {{ _item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import TalkieButton from "./Button.vue";
import TalkieBackDrop from "./BackDrop.vue";

export default {
  name: "TalkieButtonDropDown",
  data() {
    return {
      showDropDown: false,
    };
  },
  components: { TalkieButton, TalkieBackDrop },
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (val) =>
        ["primary", "secondary", "success", "danger", "light", "dark"].includes(
          val
        ),
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    customClass: {
      type: String,
      default: "",
    },
    dropDownItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleButtonClick() {
      this.showDropDown = !this.showDropDown;
      this.onClick && this.onClick();
    },
    handleBackDropClick() {
      this.showDropDown = !this.showDropDown;
    },
  },
};
</script>

<style scoped>
.talkie-button-drop-down-wrapper {
  position: relative;
  width: fit-content;
  z-index: var(--t-zindex-70);
}
.talkie-button-drop-down-items-wrapper {
  color: var(--t-black-100);
  font-family: var(--t-ff-regular);
  width: 100%;
  position: absolute;
  top: 120%;
}
.talkie-button-drop-down-item {
  cursor: pointer;
}

/* Color variants */
.talkie-button-drop-down-item-primary {
  background-color: var(--t-white);
}
.talkie-button-drop-down-item-primary:hover {
  background-color: var(--t-primary);
}
.talkie-button-drop-down-item-secondary {
  background-color: var(--t-white);
}
.talkie-button-drop-down-item-secondary:hover {
  background-color: var(--t-secondary);
}
.talkie-button-drop-down-item-success {
  background-color: var(--t-white);
}
.talkie-button-drop-down-item-success:hover {
  background-color: var(--t-green);
}
.talkie-button-drop-down-item-danger {
  background-color: var(--t-white);
}
.talkie-button-drop-down-item-danger:hover {
  background-color: var(--t-orange);
}
.talkie-button-drop-down-item-light {
  background-color: var(--t-white);
}
.talkie-button-drop-down-item-light:hover {
  filter: opacity(0.8);
}
.talkie-button-drop-down-item-dark {
  background-color: var(--t-black);
  color: var(--t-white);
}
.talkie-button-drop-down-item-dark:hover {
  filter: opacity(0.8);
}

/* Size variants */
.talkie-button-drop-down-item-small {
  --item-size: var(--t-space-10);
  --font-size: var(--t-fs-base);
}
.talkie-button-drop-down-item-medium {
  --item-size: var(--t-space-14);
  --font-size: var(--t-fs-body);
}
.talkie-button-drop-down-item-large {
  --item-size: var(--t-space-16);
  --font-size: var(--t-fs-sub);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-button-drop-down-item {
    padding: calc(var(--item-size) / 2) calc((var(--item-size) / 2) * 3);
    font-size: calc(var(--font-size) / 1.35);
  }
  .talkie-button-drop-down-item:first-of-type {
    border-top-left-radius: var(--t-br-small);
    border-top-right-radius: var(--t-br-small);
  }
  .talkie-button-drop-down-item:last-of-type {
    border-bottom-left-radius: var(--t-br-small);
    border-bottom-right-radius: var(--t-br-small);
  }
}
@media (min-width: 600px) {
  .talkie-button-drop-down-item {
    padding: calc(var(--item-size) / 1.5) calc((var(--item-size) / 1.5) * 3);
    font-size: calc(var(--font-size) / 1.2);
  }
  .talkie-button-drop-down-item:first-of-type {
    border-top-left-radius: var(--t-br-medium);
    border-top-right-radius: var(--t-br-medium);
  }
  .talkie-button-drop-down-item:last-of-type {
    border-bottom-left-radius: var(--t-br-medium);
    border-bottom-right-radius: var(--t-br-medium);
  }
}
@media (min-width: 1200px) {
  .talkie-button-drop-down-item {
    padding: calc(var(--item-size)) calc((var(--item-size)) * 3);
    font-size: calc(var(--font-size));
  }
}
</style>

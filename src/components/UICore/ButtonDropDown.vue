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
        :class="['talkie-button-drop-down-item']"
        @click="_item.onClick"
        v-for="_item in dropDownItems"
        :key="_item * Math.random() * 9641631"
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
  z-index: var(--t-zindex-20);
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
  background-color: var(--t-white);
  padding: var(--t-space-16) var(--t-space-48);
  font-size: var(--t-fs-sub);
}
.talkie-button-drop-down-item:hover {
  background-color: var(--t-primary);
}
.talkie-button-drop-down-item:first-of-type {
  border-top-left-radius: var(--t-br-medium);
  border-top-right-radius: var(--t-br-medium);
}
.talkie-button-drop-down-item:last-of-type {
  border-bottom-left-radius: var(--t-br-medium);
  border-bottom-right-radius: var(--t-br-medium);
}
</style>

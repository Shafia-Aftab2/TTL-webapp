<template>
  <div class="talkie-select-wrapper">
    <select
      :name="name"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      :class="[
        'talkie-select',
        `talkie-select-${size.toString()}`,
        hint && hint.type && `talkie-select-${hint.type.toString()}`,
        disabled && `talkie-select-disabled`,
        customClass.toString(),
      ]"
    >
      <option class="talkie-select-option" value="">
        {{ placeholder || "Choose an option" }}
      </option>
      <option
        v-for="option in options"
        :key="Math.random() * 1651566514 * option"
        class="talkie-select-option"
      >
        {{ option }}
      </option>
    </select>
    <p
      v-if="hint && hint.type && hint.message"
      :class="[
        `talkie-select-message`,
        hint && hint.type && `talkie-select-${hint.type.toString()}-message`,
      ]"
    >
      {{ hint.message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TalkieSelect",
  components: {},
  props: {
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
    },
    options: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    hint: {
      type: Object,
      default: () => ({
        type: null,
        message: null,
      }),
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.talkie-select {
  display: block;
  display: flex;
  align-items: center;
  width: 100%;
  border: var(--t-space-2) solid transparent;
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  justify-content: space-between;
  text-transform: capitalize;
  cursor: pointer;
  /* Hide Default Right Icon */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* Custom Right Icon */
  background-image: url("../../assets/images/selectBoxIcon.png");
  background-position: 98%;
  background-repeat: no-repeat;
}
.talkie-select:focus {
  border: var(--t-space-2) solid var(--t-black-100);
}
.talkie-select-option {
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  text-transform: capitalize;
}

/* Size variants */
.talkie-select-small {
  --size: var(--t-space-12);
  --font-size: var(--t-fs-base);
}
.talkie-select-medium {
  --size: var(--t-space-16);
  --font-size: var(--t-fs-body);
}
.talkie-select-large {
  --size: var(--t-space-20);
  --font-size: var(--t-fs-sub);
}

/* Hint variants */
.talkie-select-message {
  margin-top: var(--t-space-3);
  font-size: var(--t-fs-small);
}
.talkie-select-success {
  border-color: var(--t-green) !important;
}
.talkie-select-success-message {
  color: var(--t-green);
}
.talkie-select-error {
  border-color: var(--t-red) !important;
}
.talkie-select-error-message {
  color: var(--t-red);
}
.talkie-select-warning {
  border-color: var(--t-primary) !important;
}
.talkie-select-warning-message {
  color: var(--t-primary);
}
.talkie-select-info {
  border-color: var(--t-black-100) !important;
}
.talkie-select-info-message {
  color: var(--t-black-100);
}

/* Disabled variant */
.talkie-select-disabled {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
  cursor: not-allowed;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-select {
    border-radius: calc(var(--t-br-small) * 0.7);
    padding: calc(var(--size) / 1.75);
    font-size: calc(var(--font-size) / 1.35);
    background-size: var(--t-space-20) var(--t-space-10);
  }
}
@media (min-width: 600px) {
  .talkie-select {
    border-radius: var(--t-br-small);
    padding: calc(var(--size) / 1.5);
    font-size: calc(var(--font-size) / 1.2);
    background-size: var(--t-space-22) var(--t-space-11);
  }
}
@media (min-width: 1200px) {
  .talkie-select {
    padding: var(--size);
    font-size: var(--font-size);
    background-size: var(--t-space-24) var(--t-space-12);
  }
}
</style>

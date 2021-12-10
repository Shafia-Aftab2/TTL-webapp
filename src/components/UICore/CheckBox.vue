<template>
  <div
    :class="[
      'talkie-checkbox-wrapper',
      disabled && 'talkie-checkbox-wrapper-disabled',
    ]"
    :key="Math.random() * 5616316256464"
  >
    <label>
      <input
        :id="'talkie-checkbox-' + Math.random() * 5616316256464"
        type="checkbox"
        :checked="isChecked"
        @click="handleToggle"
        :disabled="disabled"
      />
      <span
        :class="[
          'talkie-checkbox-material',
          disabled && 'talkie-checkbox-material-disabled',
        ]"
      >
        <span
          :class="['talkie-checkmark', disabled && 'talkie-checkmark-disabled']"
        ></span>
        <span v-if="label" :class="['talkie-checkbox-label']">{{ label }}</span>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "TalkieCheckBox",
  components: {},
  props: {
    label: {
      type: String,
    },
    onToggle: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    hanldeToggle() {
      this.isChecked = !this.isChecked;
      this.onToggle && this.onToggle(this.isChecked);
    },
  },
};
</script>

<style scoped>
.talkie-checkbox-wrapper {
  --checkbox-size: var(--t-space-20);
  --checkbox-animation-ripple: 700ms;
  --checkbox-animation-check: 0.2s;
  --lightbg-text: rgba(0, 0, 0, 0.84);
  --checked-colour: var(--t-gray-50);
  --checked-colour-main: var(--t-secondary);
  --checkbox-label-font-size: var(--t-fs-base);
  display: inline-block;
  transform: translateZ(0);
  width: fit-content;
}
.talkie-checkbox-wrapper:hover {
  --checked-colour: var(--t-secondary);
}
.talkie-checkbox-wrapper-disabled {
  --checked-colour: var(--t-gray-50);
}
.talkie-checkbox-wrapper-disabled:hover {
  --checked-colour: var(--t-gray-50);
}
.talkie-checkbox-wrapper label {
  cursor: pointer;
  padding-left: 0;
}
.talkie-checkbox-wrapper-disabled label {
  cursor: not-allowed;
}
.talkie-checkbox-wrapper input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 0;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
  left: 0;
  pointer-events: none;
  cursor: pointer;
}
.talkie-checkbox-wrapper input[type="checkbox"]:checked {
  --checked-colour: var(--t-secondary);
}
.talkie-checkbox-wrapper .talkie-checkbox-material {
  vertical-align: middle;
  position: relative;
  top: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-10);
}
.talkie-checkbox-wrapper .talkie-checkbox-material:before {
  position: absolute;
  left: 8px;
  top: 30%;
  content: "";
  background-color: rgba(0, 0, 0, 0.5);
  height: 4px;
  width: 4px;
  border-radius: 100%;
  z-index: 1;
  opacity: 0;
  margin: 0;
}
.talkie-checkbox-wrapper .talkie-checkbox-material .talkie-checkmark {
  position: relative;
  display: inline-block;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 2px solid;
  border-radius: 2px;
  overflow: hidden;
  z-index: 1;
}
.talkie-checkbox-wrapper .talkie-checkbox-material .talkie-checkmark:before {
  position: absolute;
  content: "";
  transform: rotate(45deg);
  display: block;
  margin-top: -4px;
  margin-left: 6px;
  width: 0;
  height: 0;
  box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0,
    0 0 0 0 inset;
  animation: checkbox-off var(--checkbox-animation-check) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:focus
  + .talkie-checkbox-material
  .talkie-checkmark:after {
  opacity: 0.2;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:checked
  + .talkie-checkbox-material
  .talkie-checkmark:before {
  box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--t-space-20),
    0px 32px 0 var(--t-space-20), -5px 5px 0 10px,
    var(--t-space-20) -12px 0 11px;
  animation: checkbox-on var(--checkbox-animation-check) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:not(:checked)
  + .talkie-checkbox-material:before {
  animation: rippleOff var(--checkbox-animation-ripple) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:checked
  + .talkie-checkbox-material:before {
  animation: rippleOn var(--checkbox-animation-ripple) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:not(:checked)
  + .talkie-checkbox-material
  .talkie-checkmark:after {
  animation: rippleOff var(--checkbox-animation-ripple) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"]:checked
  + .talkie-checkbox-material
  .talkie-checkmark:after {
  animation: rippleOn var(--checkbox-animation-ripple) forwards ease-out;
}
.talkie-checkbox-wrapper
  input[type="checkbox"][disabled]:not(:checked)
  ~ .talkie-checkbox-material
  .talkie-checkmark:before,
.talkie-checkbox-wrapper input[type="checkbox"][disabled] + .circle {
  opacity: 0.5;
}
.talkie-checkbox-wrapper
  input[type="checkbox"][disabled]
  + .talkie-checkbox-material
  .talkie-checkmark:after {
  background-color: var(--lightbg-text);
  transform: rotate(-45deg);
}
.talkie-checkbox-material .talkie-checkmark {
  color: var(--checked-colour);
}
.talkie-checkbox-material:before {
  background-color: var(--checked-colour);
}
input[type="checkbox"]:checked + .talkie-checkbox-material .talkie-checkmark {
  color: var(--checked-colour-main);
}
input[type="checkbox"]:checked
  + .talkie-checkbox-material-disabled
  .talkie-checkmark-disabled {
  color: var(--t-gray-50);
}
@keyframes checkbox-on {
  0% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px, 15px 2px 0 11px;
  }
  50% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px,
      var(--checkbox-size) 2px 0 11px;
  }
  100% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px,
      var(--checkbox-size) -12px 0 11px;
  }
}
@keyframes checkbox-off {
  0% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px,
      var(--checkbox-size) -12px 0 11px, 0 0 0 0 inset;
  }
  25% {
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px,
      var(--checkbox-size) -12px 0 11px, 0 0 0 0 inset;
  }
  50% {
    transform: rotate(45deg);
    margin-top: -4px;
    margin-left: 6px;
    width: 0px;
    height: 0px;
    box-shadow: 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 var(--checkbox-size),
      0px 32px 0 var(--checkbox-size), -5px 5px 0 10px, 15px 2px 0 11px,
      0 0 0 0 inset;
  }
  51% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0,
      0px 0px 0 10px inset;
  }
  100% {
    transform: rotate(0deg);
    margin-top: -2px;
    margin-left: -2px;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    box-shadow: 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0,
      0px 0px 0 0px inset;
  }
}
@keyframes rippleOn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(13, 13);
  }
}
@keyframes rippleOff {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(13, 13);
  }
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-checkbox-label {
    font-size: calc(var(--checkbox-label-font-size) * 0.9);
  }
}
@media (min-width: 600px) {
  .talkie-checkbox-label {
    font-size: calc(var(--checkbox-label-font-size) * 0.95);
  }
}
@media (min-width: 1200px) {
  .talkie-checkbox-label {
    font-size: var(--checkbox-label-font-size);
  }
}
</style>

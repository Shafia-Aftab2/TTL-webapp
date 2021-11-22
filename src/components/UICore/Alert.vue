<template>
  <div
    :class="[
      'talkie-alert-wrapper',
      `talkie-alert-${variant.toString()}-wrapper`,
      `talkie-alert-${size.toString()}-wrapper`,
      customClass.toString()
    ]"
  >
    <div :class="['talkie-alert-icon-wrapper']">
      <AlertSuccessSVG
        v-if="variant === 'success'"
        customClass="talkie-alert-icon"
      />
      <AlertErrorSVG
        v-if="variant === 'error'"
        customClass="talkie-alert-icon"
      />
      <AlertWarningSVG
        v-if="variant === 'warning'"
        customClass="talkie-alert-icon"
      />
      <AlertInfoSVG v-if="variant === 'info'" customClass="talkie-alert-icon" />
    </div>
    <div :class="['talkie-alert-body-wrapper']">
      <span :class="[animateEllipse && 'ellipses-animation']">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
import {
  AlertInfo as AlertInfoSVG,
  AlertError as AlertErrorSVG,
  AlertWarning as AlertWarningSVG,
  AlertSuccess as AlertSuccessSVG
} from "../SVGs";

export default {
  name: "TalkieAlert",
  components: {
    AlertSuccessSVG,
    AlertErrorSVG,
    AlertWarningSVG,
    AlertInfoSVG
  },
  props: {
    text: {
      type: String,
      default: "Alert"
    },
    variant: {
      type: String,
      default: "info",
      validator: val => ["success", "error", "warning", "info"].includes(val)
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    animateEllipse: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-alert-wrapper {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: var(--t-white-100);
  font-family: var(--t-ff-regular);
  width: 100%;
}
.talkie-alert-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  padding: var(--size) 0;
  margin-right: calc((var(--size) * 3) - (var(--size) / 1.2));
}
.talkie-alert-icon-wrapper > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.talkie-alert-icon {
  fill: currentColor;
  display: inline-block;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}

/* Color variants */
.talkie-alert-success-wrapper {
  background: var(--t-green);
}
.talkie-alert-error-wrapper {
  background: var(--t-red);
}
.talkie-alert-warning-wrapper {
  color: var(--t-black-100);
  background: var(--t-primary);
}
.talkie-alert-info-wrapper {
  color: var(--t-black-100);
  background: var(--t-white-200);
}

/* Size variants */
.talkie-alert-small-wrapper {
  --size: var(--t-space-5);
  --font-size: var(--t-fs-small);
}
.talkie-alert-medium-wrapper {
  --size: var(--t-space-6);
  --font-size: var(--t-fs-body);
}
.talkie-alert-large-wrapper {
  --size: var(--t-space-7);
  --font-size: var(--t-fs-sub);
}

/* Ellipse Animation */
.ellipses-animation::after {
  display: inline-block;
  animation: ellipses steps(1, end) 1s infinite;
  content: "";
}
@keyframes ellipses {
  0% {
    content: ".";
  }
  25% {
    content: "..";
  }
  50% {
    content: "...";
  }
  100% {
    content: "";
  }
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-alert-wrapper {
    padding: calc(var(--size) * 0.5) calc(((var(--size) * 0.5) * 3));
    font-size: calc(var(--font-size) / 1.35);
    border-radius: var(--t-br-small);
  }
  .talkie-alert-icon {
    width: calc((var(--size)) * 3) !important;
    height: calc((var(--size)) * 3) !important;
    font-size: calc((var(--size)) * 3) !important;
  }
}
@media (min-width: 600px) {
  .talkie-alert-wrapper {
    padding: calc(var(--size) * 0.8) calc(((var(--size) * 0.8) * 3));
    font-size: calc(var(--font-size) / 1.2);
    border-radius: var(--t-br-medium);
  }
  .talkie-alert-icon {
    width: calc((var(--size)) * 3.5) !important;
    height: calc((var(--size)) * 3.5) !important;
    font-size: calc((var(--size)) * 3.5) !important;
  }
}
@media (min-width: 1200px) {
  .talkie-alert-wrapper {
    padding: var(--size) calc(var(--size) * 3);
    font-size: calc(var(--font-size));
  }
  .talkie-alert-icon {
    width: calc((var(--size)) * 4) !important;
    height: calc((var(--size)) * 4) !important;
    font-size: calc((var(--size)) * 4) !important;
  }
}
</style>

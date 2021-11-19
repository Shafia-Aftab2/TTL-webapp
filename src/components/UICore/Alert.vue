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
      <alert-success-svg
        v-if="variant === 'success'"
        customClass="talkie-alert-icon"
      />
      <alert-error-svg
        v-if="variant === 'error'"
        customClass="talkie-alert-icon"
      />
      <alert-warning-svg
        v-if="variant === 'warning'"
        customClass="talkie-alert-icon"
      />
      <alert-info-svg
        v-if="variant === 'info'"
        customClass="talkie-alert-icon"
      />
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
  border-radius: var(--t-br-medium);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: var(--t-white-100);
  font-family: "Inter";
  width: 100%;
}
.talkie-alert-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  padding: var(--t-space-8) 0;
  font-size: var(--t-space-22);
  margin-right: var(--t-space-12);
}
.talkie-alert-icon-wrapper > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.talkie-alert-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
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
  padding: var(--t-space-5) var(--t-space-16);
  font-size: var(--t-fs-base);
}
.talkie-alert-medium-wrapper {
  padding: var(--t-space-5) var(--t-space-16);
  font-size: var(--t-fs-body);
}
.talkie-alert-large-wrapper {
  padding: var(--t-space-5) var(--t-space-16);
  font-size: var(--t-fs-sub);
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
</style>

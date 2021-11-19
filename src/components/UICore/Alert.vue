<template>
  <div
    :class="[
      'talkie-alert-wrapper',
      `talkie-alert-${variant.toString()}-wrapper`
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
      <span>
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
</style>

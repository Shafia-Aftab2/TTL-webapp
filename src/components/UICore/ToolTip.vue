<template>
  <span class="tooltip-wrapper">
    <slot />
    <span class="tooltip-content" v-html="tooltip" :position="position"> </span>
  </span>
</template>

<script>
export default {
  name: "TalkieToolTip",
  props: {
    tooltip: {
      type: String,
      default: "ToolTip",
    },
    position: {
      type: String,
      default: "bottom-left",
      validator: (val) => ["top", "bottom", "left", "right"].includes(val),
    },
  },
};
</script>

<style scoped>
.tooltip-wrapper {
  width: fit-content;
  position: relative;
}
.tooltip-content {
  display: inherit;
  display: none;
  position: absolute;
  min-width: 21em;
  max-width: 21em;
  max-height: 21em;
  z-index: var(--t-zindex-70);
  padding: 1ch 1.5ch;
  box-shadow: 0 var(--t-space-1) var(--t-space-3) rgba(0, 0, 0, 0.12),
    0 var(--t-space-1) var(--t-space-2) rgba(0, 0, 0, 0.24);
  border-radius: 0.3ch;
  overflow: scroll;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: var(--t-white);
  color: var(--t-black);
  border: var(--t-space-1) solid var(--t-gray-50);
  border-radius: var(--t-br-small);
  line-height: 1.5;
}
.tooltip-wrapper:hover .tooltip-content {
  display: inherit;
}

/* Hide empty tooltips */
[tooltip=""]::before,
[tooltip=""] {
  display: none !important;
}

/* Positioning */

/* top */
.tooltip-content:not([position]),
.tooltip-content[position^="top"] {
  bottom: calc(100% + var(--t-space-5));
  left: 50%;
  transform: translate(-58%, -1%);
}

/* bottom */
.tooltip-content[position^="bottom"] {
  top: calc(100% + var(--t-space-5));
  left: 50%;
  transform: translate(-58%, -1%);
}

/* bottom left */
.tooltip-content[position^="bottom-left"] {
  top: calc(100% + var(--t-space-5));
  left: -50%;
  transform: translate(-58%, -1%);
}

/* Left */
.tooltip-content[position^="left"] {
  top: 50%;
  right: calc(100% + var(--t-space-5));
  transform: translate(0, -50%);
}

/* Right */
.tooltip-content[position^="right"] {
  top: 50%;
  left: calc(100% + var(--t-space-5));
  transform: translate(0, -50%);
}
</style>

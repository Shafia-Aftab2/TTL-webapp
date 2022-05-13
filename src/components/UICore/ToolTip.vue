<template>
  <span :tooltip="tooltip" :position="position">
    <slot />
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
[tooltip] {
  position: relative;
}
[tooltip]::before,
[tooltip]::after {
  text-transform: none;
  line-height: 1;
  position: absolute;
  display: none;
  opacity: 0;
  /* user-select: none;
  pointer-events: none; */
  /* display: block;
  opacity: 1; */
}
[tooltip]::before {
  content: "";
  border: var(--t-space-5) solid transparent;
  z-index: var(--t-zindex-90);
}
[tooltip]::after {
  content: attr(tooltip);
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
  /* text-align: center; */
  /* white-space: wrap; */
  /* text-overflow: ellipsis; */
}
[tooltip]:hover::before,
[tooltip]:hover::after {
  display: block;
}
[tooltip]::before:hover,
[tooltip]::after:hover {
  display: block;
}

/* Hide empty tooltips */
[tooltip=""]::before,
[tooltip=""]::after {
  display: none !important;
}

/* Positioning */

/* top */
[tooltip]:not([position])::before,
[tooltip][position^="top"]::before {
  bottom: 100%;
  border-bottom-width: 0;
  border-top-color: var(--t-white);
}
[tooltip]:not([position])::after,
[tooltip][position^="top"]::after {
  bottom: calc(100% + var(--t-space-5));
}
[tooltip]:not([position])::before,
[tooltip]:not([position])::after,
[tooltip][position^="top"]::before,
[tooltip][position^="top"]::after {
  left: 50%;
  transform: translate(-50%, -0.5em);
}

/* bottom */
[tooltip][position^="bottom"]::before {
  top: 100%;
  border-top-width: 0;
  border-bottom-color: var(--t-white);
}
[tooltip][position^="bottom"]::after {
  top: calc(100% + var(--t-space-5));
}
[tooltip][position^="bottom"]::before,
[tooltip][position^="bottom"]::after {
  left: 50%;
  transform: translate(-50%, 0.5em);
}

/* bottom left */
[tooltip][position^="bottom-left"]::before {
  top: 100%;
  border-top-width: 0;
  border-bottom-color: var(--t-white);
}
[tooltip][position^="bottom-left"]::after {
  top: calc(100% + var(--t-space-5));
}
[tooltip][position^="bottom-left"]::before,
[tooltip][position^="bottom-left"]::after {
  transform: translate(-50%, 0.5em);
  left: -50%;
}

/* Left */
[tooltip][position^="left"]::before {
  top: 50%;
  border-right-width: 0;
  border-left-color: var(--t-white);
  left: calc(0em - var(--t-space-5));
  transform: translate(-0.5em, -50%);
}
[tooltip][position^="left"]::after {
  top: 50%;
  right: calc(100% + var(--t-space-5));
  transform: translate(-0.5em, -50%);
}

/* Right */
[tooltip][position^="right"]::before {
  top: 50%;
  border-left-width: 0;
  border-right-color: var(--t-white);
  right: calc(0em - var(--t-space-5));
  transform: translate(0.5em, -50%);
}
[tooltip][position^="right"]::after {
  top: 50%;
  left: calc(100% + var(--t-space-5));
  transform: translate(0.5em, -50%);
}

/* Animation */
@keyframes tooltips-vert {
  to {
    opacity: 0.9;
    transform: translate(-58%, -1%);
  }
}
@keyframes tooltips-horz {
  to {
    opacity: 0.9;
    transform: translate(0, -50%);
  }
}
[tooltip]:not([position]):hover::before,
[tooltip]:not([position]):hover::after,
[tooltip][position^="top"]:hover::before,
[tooltip][position^="top"]:hover::after,
[tooltip][position^="bottom"]:hover::before,
[tooltip][position^="bottom"]:hover::after,
[tooltip][position^="bottom-left"]:hover::before,
[tooltip][position^="bottom-left"]:hover::after {
  animation: tooltips-vert 300ms ease-out forwards;
}

[tooltip][position^="left"]:hover::before,
[tooltip][position^="left"]:hover::after,
[tooltip][position^="right"]:hover::before,
[tooltip][position^="right"]:hover::after {
  animation: tooltips-horz 300ms ease-out forwards;
}
</style>

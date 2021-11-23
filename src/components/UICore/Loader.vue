<template>
  <div
    :class="[
      `talkie-loader`,
      `talkie-loader-${size.toString()}`,
      customClass.toString(),
    ]"
  ></div>
</template>

<script>
export default {
  name: "TalkieLoader",
  components: {},
  props: {
    size: {
      type: String,
      default: "small",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.talkie-loader {
  border-radius: 50%;
  border: var(--t-space-3) solid var(--t-white);
  border-top: var(--t-space-3) solid var(--t-black-50);
  border-width: var(--border-width);
  /* Animation */
  animation: talkie-spinner 0.5s linear infinite;
  -webkit-animation: talkie-spinner 0.5s linear infinite; /* Animation (for Safari) */
}

/* Size Variants */
.talkie-loader-small {
  --size: var(--t-space-20);
  --border-width: var(--t-space-2);
}
.talkie-loader-medium {
  --size: var(--t-space-22);
  --border-width: var(--t-space-2);
}
.talkie-loader-large {
  --size: var(--t-space-28);
  --border-width: var(--t-space-3);
}

/* Spinner */
@keyframes talkie-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Spinner (for Safari) */
@-webkit-keyframes talkie-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-loader {
    width: calc(var(--size) / 1.25);
    height: calc(var(--size) / 1.25);
  }
}
@media (min-width: 600px) {
  .talkie-loader {
    width: calc(var(--size) / 1.15);
    height: calc(var(--size) / 1.15);
  }
}
@media (min-width: 1200px) {
  .talkie-loader {
    width: var(--size);
    height: var(--size);
  }
}
</style>

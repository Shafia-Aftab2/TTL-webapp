<template>
  <div
    :class="[
      `talkie-loader`,
      `talkie-loader-${size.toString()}`,
      customClass.toString()
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
      validator: val => ["small", "medium", "large"].includes(val)
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-loader {
  border-radius: 50%;
  border: var(--t-space-3) solid var(--t-white);
  border-top: var(--t-space-3) solid var(--t-black-50);
  /* Animation */
  animation: talkie-spinner 0.5s linear infinite;
  -webkit-animation: talkie-spinner 0.5s linear infinite; /* Animation (for Safari) */
}

/* Size Variants */
.talkie-loader-small {
  width: var(--t-space-20);
  height: var(--t-space-20);
  border-width: var(--t-space-2);
}
.talkie-loader-medium {
  width: var(--t-space-22);
  height: var(--t-space-22);
  border-width: var(--t-space-2);
}
.talkie-loader-large {
  width: var(--t-space-28);
  height: var(--t-space-28);
  border-width: var(--t-space-3);
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
</style>

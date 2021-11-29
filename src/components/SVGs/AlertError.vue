<template>
  <svg
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    :class="['alert-icon', customClass.toString()]"
  >
    <path
      d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "AlertError",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.alert-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}
</style>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#18191F"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    :class="['talkie-svg-icon-arrow-head-right', customClass.toString()]"
  >
    <path d="M10 18L16 12L10 6" />
  </svg>
</template>

<script>
export default {
  name: "IconArrowHeadRight",
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
.talkie-svg-icon-arrow-head-right {
  fill: none !important;
}
</style>

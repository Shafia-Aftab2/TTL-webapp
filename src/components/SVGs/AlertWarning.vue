<template>
  <svg
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    :class="['alert-icon', customClass.toString()]"
  >
    <path
      d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "AlertWarning",
  components: {},
  props: {
    customClass: {
      type: String,
      default: ""
    }
  }
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

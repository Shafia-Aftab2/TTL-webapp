<template>
  <svg
    stroke="#000000"
    fill="#000000"
    stroke-width="0"
    viewBox="0 0 16 16"
    height="2em"
    width="2em"
    :class="[customClass.toString()]"
  >
    <path
      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
      stroke="none"
    />
  </svg>
</template>

<script>
export default {
  name: "IconCheckMark",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

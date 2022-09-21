<template>
  <svg
    stroke="#000000"
    fill="#000000"
    stroke-width="0"
    viewBox="0 0 16 16"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"
      stroke="none"
    />
    <path
      d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"
      stroke="none"
    />
  </svg>
</template>

<script>
export default {
  name: "IconDoubleCheckMark",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

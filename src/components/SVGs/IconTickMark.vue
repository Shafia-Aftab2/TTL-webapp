<template>
  <svg
    width="27"
    height="20"
    viewBox="0 0 27 20"
    fill="#86CF74"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M8.54143 15.7793L2.2761 9.56003L0.142578 11.6629L8.54143 20L26.5712 2.10291L24.4527 0L8.54143 15.7793Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconTickMark",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <svg
    width="62"
    height="63"
    viewBox="0 0 62 63"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M26.9999 4V48.68L7.47988 29.16C5.91988 27.6 3.35988 27.6 1.79988 29.16C0.239883 30.72 0.239883 33.24 1.79988 34.8L28.1599 61.16C29.7199 62.72 32.2399 62.72 33.7999 61.16L60.1599 34.8C61.7199 33.24 61.7199 30.72 60.1599 29.16C58.5999 27.6 56.0799 27.6 54.5199 29.16L34.9999 48.68V4C34.9999 1.8 33.1999 0 30.9999 0C28.7999 0 26.9999 1.8 26.9999 4Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconArrowBottom",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

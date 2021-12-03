<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="#FFA15F"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <rect x="0.400024" y="0.399902" width="40" height="40" rx="2" />
  </svg>
</template>

<script>
export default {
  name: "IconSquare",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="#6B6B6B"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM21 15.4H15.4V21H12.6V15.4H7V12.6H12.6V7H15.4V12.6H21V15.4Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconPlusRounded",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

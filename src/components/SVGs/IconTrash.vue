<template>
  <svg
    width="21"
    height="25"
    viewBox="0 0 21 25"
    fill="#6B6B6B"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M2.25 22.125C2.25 23.6375 3.4875 24.875 5 24.875H16C17.5125 24.875 18.75 23.6375 18.75 22.125V5.625H2.25V22.125ZM20.125 1.5H15.3125L13.9375 0.125H7.0625L5.6875 1.5H0.875V4.25H20.125V1.5Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconTrash",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

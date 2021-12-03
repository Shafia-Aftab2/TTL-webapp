<template>
  <svg
    width="39"
    height="47"
    viewBox="0 0 39 47"
    fill="#F7D41E"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M0.828613 3.91518V43.158C0.828613 46.1504 4.09154 47.9686 6.60438 46.3398L37.1334 26.7184C39.4587 25.2411 39.4587 21.832 37.1334 20.3169L6.60438 0.733335C4.09154 -0.895469 0.828613 0.922731 0.828613 3.91518Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconPlay",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

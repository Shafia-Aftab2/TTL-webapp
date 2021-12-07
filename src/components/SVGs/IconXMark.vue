<template>
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="#E14E0F"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M20.7143 2.08622L18.6281 0L10.3571 8.27092L2.08622 0L0 2.08622L8.27092 10.3571L0 18.6281L2.08622 20.7143L10.3571 12.4434L18.6281 20.7143L20.7143 18.6281L12.4434 10.3571L20.7143 2.08622Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconXMark",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

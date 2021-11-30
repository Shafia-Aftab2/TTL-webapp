<template>
  <svg
    width="30"
    height="27"
    viewBox="0 0 30 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M16.1053 26.0501L29.4349 2.57331C30.0513 1.48039 29.071 0.189355 27.8527 0.489528L1.65847 7.0243C0.661652 7.26344 0.256302 8.4461 0.866852 9.25017L4.8198 14.4795C5.24977 15.0458 6.03856 15.2146 6.6564 14.8526L24.2837 4.84215L9.89834 19.122C9.39229 19.6313 9.34304 20.4364 9.773 21.0027L13.7486 26.2148C14.3592 27.0189 15.6072 26.9461 16.1053 26.0501V26.0501Z"
      fill="#FFA15F"
    />
  </svg>
</template>

<script>
export default {
  name: "IconSend",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <svg
    width="127"
    height="85"
    viewBox="0 0 127 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M102.394 32.1282C98.7954 13.8719 82.7617 0.166504 63.5 0.166504C48.2071 0.166504 34.925 8.84484 28.3104 21.5448C12.3825 23.2382 0 36.7319 0 53.0832C0 70.5986 14.2346 84.8332 31.75 84.8332H100.542C115.147 84.8332 127 72.9798 127 58.3748C127 44.4048 116.152 33.0807 102.394 32.1282ZM74.0833 47.7915V68.9582H52.9167V47.7915H37.0417L63.5 21.3332L89.9583 47.7915H74.0833Z"
      fill-opacity="0.17"
    />
  </svg>
</template>

<script>
export default {
  name: "IconUpload",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

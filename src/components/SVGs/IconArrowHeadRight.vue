<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill-rule="evenodd"
    fill="#000000"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M9.533 4.575c-.241.079-.416.197-.63.426-.292.312-.362.502-.363.979 0 .697-.204.445 2.754 3.41L13.899 12l-2.605 2.61c-2.957 2.964-2.754 2.712-2.754 3.41 0 .356.012.425.11.624.132.268.475.606.74.728.157.073.262.088.61.088.376 0 .443-.011.64-.109.183-.09.763-.652 3.445-3.34C17.73 12.359 17.46 12.68 17.46 12c0-.68.27-.359-3.375-4.011-3.633-3.641-3.397-3.438-4.023-3.457-.226-.007-.424.009-.529.043"
    />
  </svg>
</template>

<script>
export default {
  name: "IconArrowHeadRight",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="#FFA15F"
    xmlns="http://www.w3.org/2000/svg"
    :class="[customClass.toString()]"
  >
    <path
      d="M0 15.8339V20H4.16609L16.4533 7.71282L12.2872 3.54673L0 15.8339ZM19.675 4.49104C20.1083 4.05777 20.1083 3.35787 19.675 2.92459L17.0754 0.324955C16.6421 -0.108318 15.9422 -0.108318 15.509 0.324955L13.4759 2.35801L17.642 6.52409L19.675 4.49104Z"
    />
  </svg>
</template>

<script>
export default {
  name: "IconPencil",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

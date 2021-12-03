<template>
  <svg
    height="50"
    width="50"
    fill="#000000"
    viewBox="0 0 500 500"
    :class="[customClass.toString()]"
  >
    <g id="XMLID_1_">
      <path
        id="XMLID_5_"
        d="M152.1,500h-39.3c-21.8,0-39.5-17.7-39.5-39.5v-421C73.4,17.7,91,0,112.9,0h39.3
		c21.8,0,39.5,17.7,39.5,39.5v421C191.6,482.3,173.9,500,152.1,500z"
      />
      <path
        id="XMLID_4_"
        d="M387.1,500h-39.3c-21.8,0-39.5-17.7-39.5-39.5v-421c0-21.8,17.7-39.5,39.5-39.5h39.3
		c21.8,0,39.5,17.7,39.5,39.5v421C426.6,482.3,409,500,387.1,500z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconPause",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

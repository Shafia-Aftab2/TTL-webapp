<template>
  <svg
    height="50"
    width="50"
    fill="#000000"
    viewBox="0 0 500 500"
    :class="[customClass.toString()]"
  >
    <g id="XMLID_5_">
      <path
        id="XMLID_3_"
        d="M476.4,112.4H23.5c-13,0-23.6-10.5-23.6-23.6V70c0-13,10.5-23.6,23.6-23.6h452.9
		c13,0,23.6,10.5,23.6,23.6v18.8C500,101.8,489.5,112.4,476.4,112.4z"
      />
      <path
        id="XMLID_2_"
        d="M476.4,283.2H23.5c-13,0-23.6-10.5-23.6-23.6v-18.8c0-13,10.5-23.6,23.6-23.6h452.9
		c13,0,23.6,10.5,23.6,23.6v18.8C500,272.7,489.5,283.2,476.4,283.2z"
      />
      <path
        id="XMLID_1_"
        d="M476.4,454.1H23.5c-13,0-23.6-10.5-23.6-23.6l0-18.8c0-13,10.5-23.6,23.6-23.6h452.9
		c13,0,23.6,10.5,23.6,23.6v18.8C500,443.5,489.5,454.1,476.4,454.1z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconHamburger",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

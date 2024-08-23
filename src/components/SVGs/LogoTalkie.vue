<template>
  <!-- <div class="logo"> -->
  <img
    :src="logo"
    :class="customClass"
    style="width: 80%; margin-left: -30px"
    alt="Navbar logo"
  />
  <!-- </div> -->
</template>

<script>
import logo from "@/assets/TTL/TTLNlogo.png"; // Adjust the path according to your project structure

export default {
  name: "LogoTalkie",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

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

<style scoped>
.logo-container {
  width: 250px;
  height: 60px;
  overflow: hidden; /* Ensures that only the part of the image within these dimensions is shown */
}

.logo-image {
  width: 70%;
  height: 100%;
  object-fit: contain; /* Ensures the logo fits within the container */
}
</style>

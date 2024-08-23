<template>
  <div class="logo-container">
    <img
      src="/ttllogo.png"
      alt="Logo"
      :class="[customClass.toString()]"
      class="logo-image"
    />
  </div>
</template>

<script>
export default {
  name: "LogoTalkie",
  props: {
    customClass: {
      type: String,
      default: "",
    },
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

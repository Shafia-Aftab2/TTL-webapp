<template>
  <img :src="logo" :class="customClass" alt="Teacher Signup Logo" />
</template>

<script>
import logo from "@/assets/TTL/TTLSlogo.png"; // Adjust the path according to your project structure

export default {
  name: "LogoTeacherSignup",
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

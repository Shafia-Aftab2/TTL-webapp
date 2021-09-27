<template>
<div>
  <nav>

    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'teacher-login' }">Teacher Login</router-link>
    <router-link :to="{ name: 'teacher-onboarding-1' }">Teacher Onboarding 1</router-link>
    <router-link :to="{ name: 'student-login' }">Student Login</router-link>
    <router-link :to="{ name: 'student-onboarding-1' }">Student Onboarding 1</router-link>

  </nav>
  <router-view></router-view>
</div>

</template>

<script>
export default {
  name: 'PublicLayout',
};
</script>

<style>
</style>

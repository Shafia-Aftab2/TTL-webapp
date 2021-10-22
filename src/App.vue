<template>
  <div id="app">
     <Talkieheader></Talkieheader>
    <router-view />
  </div>
</template>

<script>
// import TalkieHeader from '../layouts/Talkie-header.vue'
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: 'Inter';
  src: local('Inter'), url(./assets/fonts/Inter-Regular.ttf) format('truetype');
}

#app {
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
<div class="section">
<div class="align-center">
  <h1>Invite Your students</h1>
  <h3>Copy and Paste url Below</h3>
  <br>
  <input class="text-input" type="text" placeholder="Url here" v-model="studentUrl">
  <br>
  <button class="btn" type="submit">Copy</button>
   <br>
  <button class="btn" type="submit">Next</button>
</div>
</div>
</template>
<script>
export default {
  data() {
    return (
      {
        studentUrl: '',
      });
  },

};
</script>

<style>
.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.align-center {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
}
.text-input {
    height: 33px;
    width: 20vw;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    background-color:rgb(250, 244, 244);
  }
  .btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: rgb(243, 243, 3);
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: 1px solid $logo-color;
  position: relative;
  margin: 10px 0;
}
</style>

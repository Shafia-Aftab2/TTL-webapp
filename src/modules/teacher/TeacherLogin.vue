<template>
  <div class="section">
    <div class="left-container">
         <img src="../../assets/Group 949.png" alt="" srcset="" />
    </div>
    <div class="right-container" >
    <h1>Teacher Login Page</h1>
    <div>
      <input class="text-input" type="text" placeholder="email">
    </div>
    <br>
    <div>
      <input  class="text-input" type="password">
    </div>
    <br>
    <div class="align-center">
    <button class="btn" type="submit">Login</button>
    </div>
    <br>
    <br>

    <p>
      <router-link :to="{ name: 'home' }">Home</router-link> |
    </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

<style  scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
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
.left-container {
  width: 50vw;
  align-items: center;
  justify-content: center;
  margin-right: 2%;
}
.right-container {
  display: flex;
  flex-direction: column;
  width: 39%;
}
.align-center {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  h1{
    font-size: 22px;
  }
</style>

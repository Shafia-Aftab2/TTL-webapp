<template>
  <div>
    <Main-navbar></Main-navbar>
    <div class="section">
      <div class="left-container">
           <img src="../../assets/Group 949.png" width="500px" height="400px" alt="" srcset="" />
      </div>
      <div class="right-container" >
      <h3>Student Login </h3>
      <div>
        <input class="text-input" type="text" placeholder="Email">
      </div>
      <br>
      <div>
        <input  class="text-input" type="password" placeholder="Password">
      </div>
      <br>
      <div class="align-center">
      <button class="btn" type="submit">Login</button>
      </div>
      <br>
      <br>
      <p>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </p>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar';

export default {
  name: 'login',
  components: {
    MainNavbar,
  },
};
</script>

<style  scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: #F7D41E;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  align-items: center;
  font-size: 15px;
  outline: none;
  position: relative;
  margin: 10px 0;
}
.left-container {
  width: 50vw;
  height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-container {
  width: 50vw;
  display: flex;
  flex-direction: column;
}
.align-center {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.text-input {
    height: 63px;
    width: 400px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    padding-left: 20px;
    background-color:#F9F9F9
  }
  h1{
    font-size: 22px;
  }
   h3{
    height: 28px;
    text-align: center;
  }
  @media (max-width: 870px) {
    .left-container{
      display: none;
    }
    .right-container{
      padding: 0;
      width: 100%
    }
    .text-input{
      width: calc(100% - 70px);
    }
  }
</style>

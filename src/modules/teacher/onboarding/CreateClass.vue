<template>
  <div class="section">
    <div class="left-container">
      <h2>iHola, MS. Joyce! </h2>
      <p>Lets's create your first class...</p>
      <br>
      <br>
      <input class ="text-input" type="text" placeholder="Class Name" v-model="firstName">
      <br>
      <br>
      <input class ="text-input" type="text" placeholder="I teach" v-model="firstName">
      <br>
      <br>
      <button  class="btn" type="submit" @click="createAccount">Next</button>
      </div>
      <div class="right-container" >
       <br>
       <br>
      <img  class="center-text" src="../../../assets/man_group947_group_946.png" alt="" srcset="" />
      <img  class="center-text" src="../../../assets/create_class.png" alt="" srcset="" />
      </div>
    </div>
</template>

<script>
export default {

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
.left-container {
 padding-left: 81px;
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: left;
  justify-content: left;
  margin-right: 2%;
}
.right-container {
  height: 84px;
  width: 592px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
}
.text-input {
    height: 63px;
    width: 400px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    padding-left: 20px;
    background-color:#F9F9F9;
  }
  .btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: #F7D41E;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  align-items: left;
  font-size: 15px;
  outline: none;
  border: 1px solid $logo-color;
  position: relative;
  margin: 10px 0;
}
h2{
  text-align: left;
  font-weight: bold;
}
p{
  text-align: left;
  font-weight: bold;
}
</style>


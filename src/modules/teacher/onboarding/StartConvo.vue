<template>
  <div>
    <MainNavbar></MainNavbar>
    <div class="big__section">
    <div class="section">
    <div class="align-center">
        <h1>start a conversation now ? </h1>
        <div class="input__box">
        <select class="text-input">
        <option selected>Choose topic</option>
        <option>Apples</option>
        <option>Chocklate</option>
        <option>Pancakes</option>
    </select>
      <input class ="text-input" type="text" placeholder="Title(required)" v-model="title">
      <br>
      <textarea class ="text-input m_line" rows="4" cols="50" placeholder="Question text(optional)"  v-model="question">
      </textarea>
      </div>
      <div class="buttons">
        <button class=""><img  class="redo" src="../../../assets/Redo.png" alt="" srcset="" /></button>
        <button class=""><img  class="mic" src="../../../assets/Mic.png" alt="" srcset="" /></button>
        <button class=""><img  class="send" src="../../../assets/Send.png" alt="" srcset="" /></button>
    </div>
    </div>
        <router-link class="link" :to="{ name: 'teacher-onboarding-1' }"> not now </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar';

export default {
  data() {
    return (
      {
        topic: '',
        title: '',
        question: '',
      }
    );
  },
  components: {
    MainNavbar,
  },
};
</script>
<style>
.big__section {
  flex-direction: column;
  height: 100vh;
}
.section {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #E5E5E5;
}
h1 {
  font-style: normal;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight:700;
  color: #000000;
}
.input__box {
  margin-top: 51px;
}
h2{
  font-size: 32px;
  width: 409px;
  height: 39px;
}
.text-input {
  width: 474px;
  height: 61px;
  font-weight: 400;
  border-radius: 8px;
  border-style: none;
  padding-left: 40px;
  background-color:#F9F9F9;
  font-size: 17px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-bottom: 31px;
}

/* dropdown */

select {
  width: 514px !important;
  height: 61px;
  /* margin-left: -36px; */
  font-size: 16px;
  border: 1px solid #F9F9F9;
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #000000;
  background: url(../../../assets/Vector.png) 96% / 15% no-repeat #eee;
  background-size: 20.12px 10.25px;
}

/* dropdown */

.m_line{
  width: 474px;
  height: 160px;
  padding: 20px;
}
.align-center {
  margin-top: 114px;
  height: 644px;
  width: 50%;
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  padding-top: 66px;
}
.buttons {
  position: relative;
  bottom: -36px;
}
button {
  border: none;
  background: transparent;
}
.redo{
  width: 70px;
  height: 70px;
  padding: 40px;
}
.mic{
  width: 120px;
  height: 120px;
}
.send{
  width: 70px;
  height: 70px;
  padding: 40px;
}
.link {
  margin-top: 124px;
  margin-bottom: 60px;
}
@media (max-width:1120px){
  .align-center {
    width: 80% !important;
  }
}
@media (max-width:720px){
  .input__box select{
    width: 343px !important;
  }
  .text-input {
    width: 300px;
    margin: 25px auto;
  }
  .m_line{
    width: 300px;
  }
}
@media (max-width:600px){
  .redo, .send {
    width: 40px;
    height: 40px;
    padding: 0 16px;
  }
  .mic {
    width: 60px;
    height: 60px;
  }
  .buttons {
    bottom: -10px;
    }
  .link {
    margin-top: 60px;
    margin-bottom: 6px;
  }
}
@media (max-width:500px){
  h1{
    font-size: 22px;
  }
}
@media (max-width:435px){
  .input__box select{
    width: 266px !important;
  }
  .text-input {
    width: 226px;
  }
}
@media (max-width:343px){
  h1 {
    font-size: 18px;
  }
  .input__box select {
    width: 230px !important;
    }
  .text-input {
    width: 187px;
    margin: 8px auto;
  }
}
@media (max-width:300px) {
  .redo, .send {
    width: 30px;
    height: 30px;
    padding: 0px 8px;
  }
  .mic {
    width: 40px;
    height: 40px;
  }
}
</style>


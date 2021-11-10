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
              <textarea class ="text-input m_line"
              rows="4" cols="50" placeholder="Question text(optional)"  v-model="question">
              </textarea>
            </div>
            <div class="buttons">
              <button class=""><img  class="redo" src="../../../assets/Redo.png" alt="" srcset="" /></button>
              <button class="modal-btn" @click="showModal = true">
                <img  class="mic" src="../../../assets/Mic.png" alt="" srcset="" />
              </button>
              <transition name="fade" appear>
                <div class="modal-overlay" v-if="showModal">
                  <div class="modal__box">
                    <div class="desert__box">
                      <button>
                        <img src="../../../assets/Play.png" alt="" srcset="">
                      </button>
                      <div class="modal__text">
                        <h3>Desert island</h3>
                        <span>Topic:  🎲 Miscellaneous </span>
                      </div>
                    </div>
                    <div class="modal__buttons">
                      <button class="button__back" @click="showModal = false">Back</button>
                      <button class="button__send">Send</button>
                    </div>
                  </div>
                </div>
              </transition>
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
        showModal: false,
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
.modal__box {
  width: 445px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.desert__box {
  width: 445px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 16px;
}
.desert__box button img {
  background: transparent;
  height: 84px;
  width: 84px;
  border-radius: 0px;
}
.modal__text h3 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: #18191F;
}
.modal__text span {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 0px;
  color: #18191F;
  padding-left: 40px;
}
.modal__text {
  flex-direction: column;
}
.modal__buttons {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button__back {
  margin-right: 5px;
  padding: 15px 50px;
  width: 142px;
  height: 49px;
  background: #FFFFFF;
  color: #18191F;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}
.button__send {
  margin-left: 5px;
  padding: 15px 50px;
  width: 143px;
  height: 49px;
  background: #F7D41E;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}
.modal-btn{
  cursor: pointer;
}
.modal-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, .3);
}
.big__section {
  flex-direction:column;
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
  .section{
    background-color: #fff;
  }
  .align-center{
    margin: 0;
  }
  .input__box{
    margin: 0;
  }
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
  .modal__box {
    width: 300px;
  }
  .desert__box {
    width: 300px;
    height: 150px;
  }
  .button__back, .button__send{
    width: 70px;
    height: 25px;
    font-size: 12px;
    padding: 0;
  }
  .desert__box button img {
    width: 64px;
    height: 64px;
  }
  .modal__text h3 {
    font-size: 16px;
  }
  .modal__text span {
    font-size: 12px;
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

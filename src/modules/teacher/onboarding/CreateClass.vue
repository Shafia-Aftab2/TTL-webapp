<template>
  <div>
    <MainNavbar></MainNavbar>
      <div class="wrapper">
        <div class="border-left">
          <div>
            <div class="">
              <h1 class="text">iHola, Ms.Joyse!</h1>
              <p class="text-type">Lets's create your first class...</p>
            </div>
            <input  class="input" type="text" placeholder="Class ame">
            <input  class="input-search" type="text" placeholder="I teach...">
            <button class="btn">Next</button>
          </div>
        </div>
      <div class="border-right">
    <div>
        <div class="right-img">
        <img class="rotate" src="./onboard_png/approveche.png" alt="">
        <img class="rotate1" src="./onboard_png/Man.png" alt="">
        <img class="rotate2" src="./onboard_png/profit.png" alt="">
        </div>
        <p class="btn_text">PS. You have 2 weeks to trial Talkie. You and your students
              get full access in these 2 weeks after which you have to
              upgrade to get them speaking for the year!
        </p>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import MainNavbar from '@/components/Navbar';

export default {
  name: 'create-class',
  components: {
    MainNavbar,
  },
};
</script>

<style scoped>
.wrapper{
  text-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
}
.text{
    font-size: 32px;
}

.text-type{
    font-size: 21px;
    font-weight: 500;
    color: #000;
}
.border-left{
    width: 42vw;
    display: flex;
    padding-left:81px;
}
.border-right{
    width: 58vw;
    display: flex;

}

.input {
    display: flex;
    width: 472px;
    justify-content: center;
    align-items: center;
    height: 63px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    background-color:#F9F9F9;
    margin-top: 20px;
    padding-left: 20px;
}
.input-search{
    padding-left: 20px;
    width: 472px;
    height: 63px;
    margin-top: 30px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    background-color:#F9F9F9;
}

@media (max-width: 560px) {
    .input{
       width: calc(100% - 20%)
    }
 }

 @media (max-width: 560px) {
    .input-search{
       width: calc(100% - 20%)
    }
 }

.btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 50px;
    width: 143px;
    height: 49px;
    background: #F7D41E;
    border-radius: 10px;
    margin-top: 30px;
    border: none;
}
.border-right{
    margin-top: -50px;
    min-width: 472px;
}

.btn_text{
    width:550px;
    padding-top: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 28px;
    color: #000000;
    padding-right: 90px;
    padding-left: 61px;
}

.right-img{
  padding-left:61px;
}

.rotate {
  margin-left: 5px;
  width: 190px;
  transform: rotate(-14.04deg);
}

.rotate1 {
  padding: 0 31px;
}

.rotate2 {
  width: 190px;
  transform: rotate(14.04deg);
}

@media (max-width: 486px) {
    .btn_text{
        width: calc(100% - 40%);
    }
 }

@media (max-width: 1030px){
    .wrapper{
        flex-direction: column;
    }
    .border-left{
        width: 100%;
    }
    .border-right{
        margin-top: 100px;
        width: 100%;
    }
}

@media (max-width: 486px) {
    .border-right img:not(:nth-child(2)){
        width: 160px;
    }
 }

 @media (max-width: 420px) {
    .border-right img:not(:nth-child(2)){
        width: 140px;
    }
    .border-right img:nth-child(2){
        width: 60px;
    }
 }
</style>


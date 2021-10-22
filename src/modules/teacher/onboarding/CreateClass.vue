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
          <div> 
              <input  class="input" type="text" placeholder="Class ame"> 
          </div> 
          <div> 
              <input  class="input-search" type="text" placeholder="I teach..."> 
          </div> 
          <button class="btn">Next</button>
        </div>
      </div>
      
      <div class="border-right">
          <div>
              <img src="./onboard_png/approveche.png" alt="">
          <img src="./onboard_png/Man.png" alt="">
          <img src="./onboard_png/profit.png" alt="">
          <p class="btn_text">PS. You have 2 weeks to trial Talkie. You and your students <br>
              get full access in these 2 weeks after which you have to <br>
              upgrade to get them speaking for the year!</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainNavbar from '@/components/Navbar'
export default {
  name: 'create-class',
  components: {
    MainNavbar,
  }
};
</script>

<style scoped>
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.text{
    font-size: 32px;
}

.text-type{
    font-size: 21px;
}
.border-left{
    width: 50vw;
    display: flex;
    justify-content: center;
}
.border-right{
    width: 50vw;
    display: flex;
    justify-content: center;
}

.input { 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
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
    width: 450px;
    height: 63px;
    margin-top: 30px;
    font-size: 14px; 
    font-weight: 300; 
    border-radius: 5px; 
    border-style: none; 
    background-color:#F9F9F9; 
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
}

.btn_text{
    padding-top: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 28px;
    color: #000000;
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


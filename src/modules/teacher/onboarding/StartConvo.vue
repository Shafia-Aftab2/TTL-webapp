<template>
<div class="section">
<div class="align-center">
    <h1>start a conversation now ? </h1>
  <input class ="text-input" type="text" placeholder="Choose topic " v-model="topic">
  <br>
  <input class ="text-input" type="text" placeholder="Title(required)" v-model="title">
  <br>
  <textarea class ="text-input m_line"   rows="4" cols="50" placeholder="Question text(optional)"  v-model="question">
  </textarea>
  <br>
  <br>
  <div>
    <img  class="redo" src="../../../assets/Redo.png" alt="" srcset="" />
    <img  class="mic" src="../../../assets/Mic.png" alt="" srcset="" />
    <img  class="send" src="../../../assets/Send.png" alt="" srcset="" />
    <br>
    <br>
    <br>
    <br>
    <router-link :to="{ name: 'teacher-onboarding-1' }"> not now </router-link>
</div>
</div>

</div>
</template>

<script>
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
h2{
    font-size: 32px;
    width: 409px;
    height: 39px;
}
.text-input {
    height: 63px;
    width: 474px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 8px;
    border-style: none;
    padding-left: 20px;
    background-color:#F9F9F9
  }
  .m_line{
   height: 160px;
   width: 474px;
   padding: 20px;
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

</style>

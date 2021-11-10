/* eslint-disable */
<template>
  <div>
    <MainNavbar></MainNavbar>
    <div class="section">
      <div class="left-container" >
        <div>
          <h1 class="h1-topic">Choose topics </h1>
          <p class="p-topic">
            select as many topics as you want for class.
            <br>
            <br>
            This way, we get to tailor the quizzes.
          </p>
        </div>
      </div>
        <div class="right-container" >
          <div>
            <h1 class="topic-title firts-title">Beginners/Intermediate </h1>
            <p class="p1-subjects">GCSE LEVEL </p>
            <div class="list-items">
              <ul v-for="topic in gcse_level" :key="topic.id">
                <li>
                  <input type="checkbox"  >{{ topic.topic }}
                </li>
              </ul>
            </div>
            <br>
            <h1 class="topic-title last-title">Beginners </h1>
            <p class="p1-subjects">KS3 LEVEL </p>
            <div class="list-items">
              <ul v-for="topic in kse3_level" :key="topic.id">
                <li>
                  <input type="checkbox"  >{{ topic.topic }}
                </li>
              </ul>
            </div>
           <br>
           <button class="btn" type="submit">Next</button>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar';

export default {
  name: 'choosetopic',
  data() {
    return ({
      gcse_level: [
        {
          id: 1,
          topic: '⚽️free time activities',
        },
        {
          id: 2,
          topic: '✈️Travel and Tourism',
        },
        {
          id: 3,
          topic: '🍔food and drink',
        },
        {
          id: 4,
          topic: '📱science and technology',
        },
        {
          id: 5,
          topic: 'sports',
        },
      ],
      kse3_level: [
        {
          id: 1,
          topic: '🏡My family and friends',
        },
        {
          id: 2,
          topic: '🐶Where i live',
        },
        {
          id: 3,
          topic: '🤸🏻clothing',
        },
        {
          id: 4,
          topic: '⛸pets',
        },
      ],
    });
  },
  components: {
    MainNavbar,
  },
};

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.section {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 222px;
}
.right-container {
  text-align: center;
  display: flex;
  width: 60vw;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  height: calc(100vh - 40px);
  text-align: start;
}
.left-container {
  width: 40vw;
  display: flex;
  justify-content: center;
  height: calc(100vh - 120px);
  align-items: center;
  padding-left:40px;
  text-align: start;
}

.h1-topic{
font-style: normal;
font-weight: bold;
font-size: 32px;
line-height: 39px;
color: #000000;
text-align: start;
}
.p-topic{
  margin-top: 15px;
font-style: normal;
font-weight: 500;
font-size: 21px;
line-height: 18px;
}
.topic-title {
font-style: normal;
font-weight: bold;
font-size: 21px;
line-height: 28px;
color: #000000;
}
.last-title{
  margin-top: 75px;
}
.p1-subjects{
 font-size: 10px;
text-align: left;
 font-weight: bold;
}
.list-items{
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  font-size: 17px;
  line-height: 21px;
}
.list-items ul{
  list-style: none;
}
.list-items ul li{
  font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 21px;
margin-top: 15px;
}
.list-items ul li input{
  margin-right: 10px;
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
  margin: 86px 0;
}
@media (max-width:870px){
  .section {
    flex-direction: column;
    margin: 0;
  }
  .left-container{
   width: 100%;
  }
  .right-container{
    width: 100%;
  }
  .h1-topic{
    text-align: center;
  }
  .firts-title{
margin-top: 86px;
}
}

@media (max-width:475px){
.firts-title{
margin-top: 86px;
}
  .p-topic{
    font-size: 14px;
    line-height: 12px;
  }
}

</style>

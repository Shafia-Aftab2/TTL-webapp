<template>
<div class="section">
<div class="left-container" >
  <h1 class="h1-topic">choose topics </h1>
  <p class="p-topic"> select as many topics as you want for class.<br><br>This way, we get to tailor the quizzes.</p>
  </div>
   <div class="right-container" >
       <h1 class="h1-topic">Beginners/Intermediate </h1>
       <p class="p1-subjects">GCSE LEVEL </p>
       <div class="list-items">
        <ul v-for="topic in gcse_level" :key="topic.id">
      <li>
        <input type="checkbox"  >{{ topic.topic }}
  </li>
</ul>
       </div>
       <br>
        <h1 class="h1-topic">Beginners </h1>
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
</template>

<script>
export default {
  name: 'choosetopic',
  data() {
    return ({
      gcse_level: [
        {
          id: 1,
          topic: 'free time activities',
        },
        {
          id: 2,
          topic: 'Travel and Tourism',
        },
        {
          id: 3,
          topic: 'food and drink',
        },
        {
          id: 4,
          topic: 'science and technology',
        },
        {
          id: 5,
          topic: 'sports',
        },
      ],
      kse3_level: [
        {
          id: 1,
          topic: 'My family and friends',
        },
        {
          id: 2,
          topic: 'Where i live',
        },
        {
          id: 3,
          topic: 'clothing',
        },
        {
          id: 4,
          topic: 'pets',
        },
      ],
    });
  },
};

</script>

<style scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.right-container {
  display: flex;
  flex-direction: column;
  width: 39%;
}
.left-container {
  width: 50vw;
  align-items: center;
  justify-content: center;
  margin-right: 2%;
}
.h1-topic{
 text-align: left;
 font-size: 20px;
 font-weight: bold;
}
.p-topic{
text-align: left;
font-size: 12px;
font-weight: bold;
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
}
.btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: #F7D41E;
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

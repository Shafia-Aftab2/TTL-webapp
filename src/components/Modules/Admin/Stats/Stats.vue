<template>
  <div class="summary-wrapper">
    <h1>Quiz stats</h1>
    <div class="boxes-1">
      <div class="box-1">
        <div class="summary-number">
          <p>39</p>
        </div>
        <div class="summary-text">
          <p>Q/A</p>
        </div>
      </div>
      <div class="box-2">
        <div class="summary-number">
          <p>27</p>
        </div>
        <div class="summary-text">
          <p>Caption This</p>
        </div>
      </div>
    </div>
    <div class="boxes-2">
      <div class="box-3">
        <div class="summary-number">
          <p>49</p>
        </div>
        <div class="summary-text">
          <p>Emoji Stories</p>
        </div>
      </div>
      <div class="box-4">
        <div class="summary-number">
          <p>68</p>
        </div>
        <div class="summary-text">
          <p>Translathon</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuizStats",
};
</script>
<style scoped>
.summary-wrapper {
  margin-top: 160px;
  margin-left: 70px;
  width: 140%;
}
.boxes-1 {
  display: flex;
  gap: 10px;
  margin-top: 70px;
}
.boxes-2 {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.box-1 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-2 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-3 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-4 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.summary-number {
  margin-left: 50px;
  margin-top: 45px;
  font-size: 40px;
  font-weight: bolder;
}
.summary-text {
  margin-bottom: 50px;
  margin-left: 50px;
  font-size: 28px;
}
</style>

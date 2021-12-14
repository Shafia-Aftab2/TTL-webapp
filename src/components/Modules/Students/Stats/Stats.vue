<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
      <div>
        <h3>My Stats</h3>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <div>
          <img
            src="../../../../assets/images/Ellipse_56.png"
            alt="Image here"
            width="50"
            height="50"
          />
        </div>
        <h2>Yasmin D</h2>
        <div>
          <h2 class="text-style">Shy Speaker</h2>
        </div>
      </div>
      <div class="bar-outline text-center">
        <div>
          <p>Total Number of Points</p>
        </div>
        <div>
          <h2 class="text-style">75</h2>
        </div>
      </div>
      <div class="bar-outline text-center">
        <div>
          <p>Current Run Streak</p>
        </div>
        <div>
          <h2 class="text-style">5 Days</h2>
        </div>
      </div>
      <div class="text-center">
        <Button size="medium">View LeaderBoard</Button>
      </div>
      <div class="text-center">
        <Button size="medium" disabled>Go to Quizzes</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../../UICore/Button.vue";
export default {
  name: "StudentStatistics",
  components: { Button },
};
</script>
<style scoped>
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-header {
  display: grid;
  gap: 10px;
}
.box-head {
  display: flex;
  justify-content: space-between;
}
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.text-center {
  text-align: center;
}
.text-style {
  font-size: 20px;
  color: var(--t-secondary);
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .content {
    width: 50%;
    padding: var(--t-space-10);
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}

@media (min-width: 900px) {
  .content {
    width: 35%;
    padding: var(--t-space-50);
  }
}

@media (min-width: 1200px) {
  .back-default {
    position: absolute;
    left: 160px;
  }
}
</style>

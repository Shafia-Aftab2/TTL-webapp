<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
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

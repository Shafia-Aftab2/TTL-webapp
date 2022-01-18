<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="title">
        <p>My Stats</p>
      </div>
      <div class="overview">
        <div class="ellipse">
          <img
            src="../../../../assets/images/Ellipse_55.png"
            alt="Image here"
          />
        </div>
        <div class="title-name">
          <p>Yasmin D</p>
        </div>
        <div class="class-name orange">
          <p>Spanish 10C</p>
        </div>
      </div>
      <div class="box bar-outline">
        <div class="box-text">
          <p>TOTAL NO. OF POINTS</p>
        </div>
        <div class="title-no orange">
          <p>0</p>
        </div>
      </div>
      <div class="box bar-outline">
        <div class="box-text">
          <p>CURRENT RUN STREAK</p>
        </div>
        <div class="title-no orange">
          <p>0</p>
        </div>
      </div>
      <talkie-button> View leaderboard </talkie-button>
      <talkie-button> View my portfolio </talkie-button>
    </div>
  </div>
</template>
<script>
import { TalkieButton } from "@/components/UICore";
export default {
  name: "Stats",
  components: { TalkieButton },
};
</script>
<style scoped>
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.box {
  margin: 20px;
  border-radius: 16px;
  padding: 10px;
  width: 100%;
}
.box-text {
  margin-left: 325px;
  margin-top: 20px;
}
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  display: grid;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-70);
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}
.class-name {
  font-size: 34px;
  font-weight: bolder;
  gap: 10px;
  margin-left: -36px;
}
.ellipse {
  margin-top: 20px;
  position: relative;
  left: 14px;
}
.talkie-button {
  margin-left: 340px;
  margin-top: 20px;
}
.title {
  font-size: 28px;
  font-weight: bolder;
  gap: 10px;
  margin-top: 20px;
  margin-left: 375px;
}
.title-name {
  font-size: 28px;
  font-weight: bolder;
  gap: 10px;
  margin-top: 20px;
}
.title-no {
  font-size: 28px;
  font-weight: bolder;
  gap: 20px;
  margin-top: 20px;
  margin-left: 400px;
  margin-bottom: 20px;
}
.orange {
  color: #ffa15f;
}
.overview {
  margin-left: 375px;
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
    left: 5px;
  }
}
</style>

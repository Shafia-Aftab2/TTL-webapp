<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <p></p>
        <p></p>
        <p></p>
        <h1>Upgrade - Pricing</h1>
        <p></p>
        <p>When you upgrade your account, you get to:</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p>>Create up to 8 classes (max of 32 students)</p>
        <p></p>
        <p>>Access all features</p>
        <p></p>
        <p>>Set an unlimited number of questions accross all topics</p>
        <p></p>
        <p>>Students get unlimited access to all quizzes (March 2022)</p>
        <p></p>
        <div class="yellow-text">
          <p>Limited Offer</p>
        </div>
        <div class="annual">
          <h2>£30 individual teacher / annual</h2>
        </div>
        <h1>£2.50/month</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesUpgrade",
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
.yellow-text {
  color: rgb(255, 174, 0);
  font-size: 20px;
  font-weight: bold;
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

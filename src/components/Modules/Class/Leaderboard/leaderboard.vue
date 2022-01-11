<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <div class="ellipse">
          <img
            src="../../../../assets/images/Ellipse_55.png"
            alt="Image here"
          />
        </div>
        <br />
        <br />
        <div class="student-box">
          <div class="student_name">
            <p>Harris D</p>
          </div>
          <div class="points">
            <p>1432</p>
          </div>
        </div>
        <br />
        <div class="trophy">
          <img src="../../../../assets/images/trophy.png" alt="Image here" />
        </div>
        <div class="box-1">
          <img
            src="../../../../assets/images/Ellipse_56.png"
            alt="Image here"
          />
        </div>
        <div class="box-2">
          <img src="../../../../assets/images/icon2.png" alt="Image here" />
        </div>
        <div class="box-3">
          <img src="../../../../assets/images/icon3.png" alt="Image here" />
        </div>
        <div class="box-4">
          <img src="../../../../assets/images/icon4.png" alt="Image here" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LeaderboardClasses",
};
</script>
<style scoped>
.box-1 {
  margin: 20px;
  position: relative;
  border-radius: 16px;
  background: #f9e5d6;
  padding: 10px;
}
.box-2 {
  margin: 20px;
  position: relative;
  border-radius: 16px;
  background: #fbf6de;
  padding: 10px;
}
.box-3 {
  margin: 20px;
  position: relative;
  border-radius: 16px;
  padding: 10px;
}
.box-4 {
  margin: 20px;
  position: relative;
  border-radius: 16px;
  padding: 10px;
}
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
  width: 100%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-70);
  gap: 10px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
}
.back {
  text-decoration: none;
}
.student-box {
  display: grid;
  width: 100%;
  background-color: white;
  border-radius: var(--t-br-medium);
  align-items: center;
  justify-content: center;
  text-align: center;
}
.student_name {
  font-size: 30px;
  font-weight: bold;
}
.points {
  font-size: 30px;
  font-weight: bold;
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
  .back-default {
    position: absolute;
    left: 160px;
  }
}
@media (min-width: 900px) {
}
@media (min-width: 1200px) {
  .back-default {
    position: absolute;
    left: 5px;
  }
}
</style>

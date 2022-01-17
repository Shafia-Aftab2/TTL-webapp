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
        <div class="title">
          <p>Yasmin D</p>
        </div>
        <div class="class-name orange">
          <p>Spanish 10C</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Stats",
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
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-70);
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  justify-content: center;
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
.title {
  font-size: 28px;
  font-weight: bolder;
  gap: 10px;
  margin-top: 20px;
}
.orange {
  color: #ffa15f;
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

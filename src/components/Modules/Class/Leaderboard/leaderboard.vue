<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <div>
          <img
            src="../../../../assets/images/Ellipse_55.png"
            alt="Image here"
          />
        </div>
        <div>
          <img src="../../../../assets/images/trophy.png" alt="Image here" />
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
  justify-content: center;
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
    left: 160px;
  }
}
</style>

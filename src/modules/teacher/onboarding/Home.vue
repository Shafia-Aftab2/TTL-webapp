<template>
  <div>
    <MainNavbar></MainNavbar>
    <div class="home-section">
      <div class="sidebar">
        <div class="sidebar-title">
          <h3 class="sidebar-title-text">Nathan</h3>
          <button class="sidebar-add">+ New class</button>
        </div>
      </div>
      <div class="right-section">
        <div class="right-section-head">
          <h3>10A Spanish</h3>
          <div class="icons">
            <span>
              <img width="30px" class="head-icon head-icons" height="30px" src="../../../modules/Trophy.png" alt="" />
            </span>
            <span>
              <img width="30px" class="head-icons" height="30px" src="../../../modules/Settings.png" alt="" />
            </span>
          </div>
        </div>
        <div class="right-section-typs">
          <button class="right-section-typs-btn active">Questions</button>
          <button class="right-section-typs-btn">Students</button>
        </div>
        <div class="section-right-task">
          <div class="custom-select">
            <select :style="{ 'background-image': 'url(' + require('@/assets/Vector.png') + ')' }">
              <option value="0">Filter by topic</option>
            </select>
          </div>
          <button class="new-task">+ New task</button>
        </div>
        <div class="question-card">
          <div class="card-in">
            <div class="play-btn">
              <img src="@/assets/Play.png" alt="" />
            </div>
            <div class="card-text">
              <h3>Desert Island</h3>
              <p>Topic: 🎲 Miscellaneous</p>
            </div>
          </div>
          <div class="card-btn">
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar';

export default {
  name: 'Teache-home',
  components: {
    MainNavbar,
  },
};
</script>
<style scoped>
.play-btn {
  width: 84px;
  height: 84px;
  margin-right: 19px;
}
.question-card {
  width: 400px;
  height: 150px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 23px 31px 23px;
}
.btn-edit {
  background: #f0f0f0;
}
.btn-delete {
  background: #f9e5d6;
}
.card-btn button {
  padding: 12px 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 0px;
  color: #18191f;
  border-radius: 10px;
  border: none;
  margin: 44px 31px 0 0;
}
.card-btn {
  text-align: start;
}
.card-in {
  display: flex;
}
.card-text h3 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: #18191f;
}
.card-text p {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 0px;
  color: #18191f;
}
.section-right-task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 75px 0 49px 0;
}
.new-task {
  background: #f7d41e;
  border-radius: 10px;
  border: none;
  width: 143px;
  height: 49px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #18191f;
}
.custom-select select {
  width: 445px;
  height: 61px;
  border: none;
  background: none;
  position: relative;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  color: #18191f;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-repeat: no-repeat;
  background-size: 24px 12px;
  background-position: 96% 24px;
  outline: none;
}
.head-icon {
  margin-right: 31px;
}
.right-section-typs-btn {
  padding-bottom: 15px;
  margin-right: 59px;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  color: #18191f;
  border: none;
  background: none;
}
.active {
  border-bottom: 3px solid #f3d34b;
}
.right-section-typs {
  text-align: left;
}
.icons {
  position: absolute;
  right: 0;
}
.sidebar {
  padding-top: 228px;
  width: 382px;
  display: flex;
  justify-content: center;
  background-color: white;
}
.right-section {
  padding: 56px 99px 40px 56px;
  width: 100%;
  height: calc(100vh - 77px);
  background-color: #f9f9f9;
}
.right-section-head {
  position: relative;
}
.right-section-head h3 {
  margin-bottom: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 39px;
  color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-section {
  display: flex;
}
.sidebar-title-text {
  color: #18191f;
  margin-bottom: 50px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
}
.sidebar-add {
  font-size: 16px;
  width: 143px;
  height: 49px;
  background: #ffffff;
  border: 1px solid #f7d41e;
  border-radius: 10px;
}
h3 {
  text-align: start;
}
@media (max-width: 1200px) {
  .right-section {
    padding: 4% 8% 40px 56px;
  }
  .custom-select select {
    width: 40vw;
  }
}
@media (max-width: 992px) {
  .right-section {
    padding: 4% 8% 40px 56px;
  }
  .custom-select select {
    width: 35vw;
  }
}
@media (max-width: 480px) {
  .right-section {
    padding: 4% 8% 40px 56px;
  }
  .custom-select select {
    width: 70vw;
  }
  .section-right-task {
    flex-direction: column;
  }
  .question-card {
    width: 80vw;
  }
  @media (max-width: 400px) {
    .right-section-typs-btn {
      font-size: 12px;
      padding-bottom: 0;
    }
    .head-icons {
      width: 25px;
      height: 25px;
    }
  }
}
@media (max-width: 342px) {
  .card-text p {
    font-size: 12px;
  }
  .play-btn img {
    width: 50px;
  }
  .card-text h3 {
    margin-top: 6px;
  }
  .card-btn button {
    margin: 0;
  }
}
@media (max-width: 950px) {
  .new-task {
    margin-top: 18px;
  }
}
@media (max-width: 720px) {
  .sidebar {
    display: none;
  }
}
</style>

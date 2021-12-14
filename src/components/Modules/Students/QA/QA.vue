<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
      <div>
        <h3>Q&A</h3>
      </div>
    </div>
    <div class="box-content">
      <div class="qa">
        <small>Technology and Media</small>
        <h2>Fave App</h2>
        <p>This is translation</p>
        <div class="talkie-icon-bar">
          <div class="messege-bar">
            <p>Audios</p>
          </div>
          <div class="bar-icons-pg">
            <talkie-icon
              :name="'arrow-rounded-left'"
              :isActive="true"
              :variant="'secondary'"
              :size="30"
            />
            <talkie-icon
              :name="'mike-unmuted'"
              :isActive="true"
              :variant="'secondary'"
              :size="50"
            />
            <talkie-icon
              :name="'send'"
              :isActive="true"
              :variant="'secondary'"
              :size="30"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TalkieIcon } from "../../../UICore";
export default {
  name: "StudentQA",
  components: { TalkieIcon },
};
</script>
<style scoped>
.talkie-icon-bar {
  position: relative;
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.messege-bar {
  margin-bottom: 20px;
}
.bar-icons-pg {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20px;
  left: 30%;
}
.qa {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

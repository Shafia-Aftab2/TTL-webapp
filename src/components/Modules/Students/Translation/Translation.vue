<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
      <div>
        <h3>Translation</h3>
      </div>
    </div>
    <div class="translation-content">
      <div class="translation-box-1">
        <div>
          <small>Topic: Travel and Tourism</small>
        </div>
        <h2>I cannot live without my phone and the internet.</h2>
      </div>
      <div class="translation-box-2">
        <div style="position: absolute; right: 25px; top: 15px">
          <small>
            <strong>
              <a>Instructions</a>
            </strong>
          </small>
        </div>
        <div>
          <p>This is column 2</p>
        </div>
      </div>
      <div class="translation-icon-bar">
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
      <!-- <div class="caption">
        <div class="box-head">
          <div>
            <small>Topic: Travel and Tourism</small>
          </div>
          <div>
            <small>
              <strong>
                <a>Instructions</a>
              </strong>
            </small>
          </div>
        </div>
          <div class="talkie-icon-bar">
            <div class="messege-bar">
              <img alt="Image here" />
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
      </div> -->
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
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.translation-content {
  position: relative;
  display: flex;
  width: auto;
  background-color: white;
  border-radius: var(--t-br-medium);
}
.translation-box-1 {
  display: flex;
  flex-direction: column;
  background-color: var(--t-gray-home);
  width: 50%;
  padding: 170px var(--t-space-20);
  border-radius: var(--t-br-medium);
  word-wrap: break-word;
  gap: 10px;
}
.translation-box-2 {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 170px var(--t-space-20);
  word-wrap: break-word;
  gap: 10px;
}
.translation-icon-bar {
  position: absolute;
  left: 30%;
  bottom: 5%;
  padding: var(--t-space-24);
}
.bar-icons-pg {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20px;
  left: 30%;
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
  .translation-content {
    width: auto;
  }
  .translation-icon-bar {
    left: 20%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}
@media (min-width: 600px) {
  .translation-content {
    margin-bottom: 18px;
    width: auto;
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}
@media (min-width: 900px) {
  .translation-content {
    width: 70%;
    margin-bottom: 18px;
  }
}
@media (min-width: 1200px) {
  .translation-content {
    margin-bottom: 9px;
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}
</style>

<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
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
<style>
.qa {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

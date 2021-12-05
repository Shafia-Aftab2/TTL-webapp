<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
      </div>
      <div>
        <h3>Caption This</h3>
      </div>
    </div>
    <div class="box-content">
      <div class="caption">
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
.caption {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

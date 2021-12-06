<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a><span>&#8592; </span>back</a>
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
<style></style>

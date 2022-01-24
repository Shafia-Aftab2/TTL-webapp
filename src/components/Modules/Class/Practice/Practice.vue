<template>
  <div class="class-practice-wrapper">
    <div class="class-practice-header-wrapper">
      <a class="class-practice-header-wrapper-link">&#8592; Exit</a>
      <h4 class="h4">Caption This</h4>
      <a class="class-practice-header-wrapper-link">Finish &#8594;</a>
    </div>
    <div class="class-practice-body-wrapper">
      <div class="class-practice-body-head-wrapper">
        <p class="p">Topic: ✈️ Travel and tourism</p>
        <talkie-tool-tip :tooltip="'A very long text'">
          <h5 class="h5 class-practice-body-head-wrapper-instructions">
            <p class="p">Instructions</p>
          </h5>
        </talkie-tool-tip>
      </div>
      <div class="class-practice-body-content-wrapper">
        <img
          :src="require(`@/assets/images/caption-this.png`)"
          class="class-practice-body-content-wrapper-caption-image"
        />
      </div>

      <div class="class-practice-body-footer-wrapper">
        <div class="class-practice-body-footer-wrapper-options">
          <div class="class-practice-body-footer-wrapper-options-item">
            <talkie-icon
              :name="'arrow-rounded-left'"
              :isActive="true"
              :variant="'secondary'"
              :size="30"
            />
          </div>
          <div class="class-practice-body-footer-wrapper-options-item">
            <talkie-icon
              :name="'mike-unmuted'"
              :isActive="true"
              :variant="'secondary'"
              :size="50"
            />
          </div>
          <div class="class-practice-body-footer-wrapper-options-item">
            <talkie-icon
              :type="'submit'"
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
import { TalkieToolTip, TalkieIcon } from "@/components/UICore";

export default {
  name: "ClassPractice",
  components: {
    TalkieToolTip,
    TalkieIcon,
  },
};
</script>

<style scoped>
.class-practice-wrapper {
  width: 100%;
  margin-top: var(--t-space-50);
  margin-bottom: calc(var(--t-space-70) * 2);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-16);
}
.class-practice-header-wrapper {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
.class-practice-header-wrapper-link {
  text-decoration: none;
}
.class-practice-body-wrapper {
  background: var(--t-white);
  border-radius: var(--t-br-large);
  padding: var(--t-space-64);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-36);
}
.class-practice-body-head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-head-wrapper-instructions {
  text-decoration: underline;
  text-underline-offset: var(--t-space-3);
  cursor: pointer;
}
.class-practice-body-content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 500px;
}
.class-practice-body-content-wrapper-caption-image {
  flex: none;
  width: 100%;
  height: 100%;
}
.class-practice-body-footer-wrapper {
  position: relative;
}
.class-practice-body-footer-wrapper-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.class-practice-body-footer-wrapper-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-footer-wrapper-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.class-practice-body-footer-wrapper-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.class-practice-body-footer-wrapper-options-item-label-error {
  color: var(--t-red);
}
.class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.class-practice-body-footer-wrapper-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
}
@media (min-width: 600px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
}
@media (min-width: 1200px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
</style>

<template>
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ setValue, triggerFormSubmit }"
      :onSubmit="handleSubmit"
      :customClass="'box-container'"
    >
      <h3>Q&A</h3>
      <span hidden>
        <!-- TODO: updated these states via a handler -->
        {{ (this.setFormValue = setValue) }}
        {{ (this.triggerFormSubmission = triggerFormSubmit) }}
      </span>
      <talkie-modal
        v-if="modalPreview"
        :contentPadded="true"
        :buttonsOutSideModal="modalPreviewButtons"
        :type="'Confirm'"
        :title="'Press Send to Continue'"
      >
      </talkie-modal>
      <talkie-audio-recorder
        v-slot="{ startRecording, stopRecording, isRecording }"
        :onRecordingStopped="handleRecordedItem"
      >
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
                  :onClick="handleRecordedItemReset"
                  :variant="'secondary'"
                  :size="30"
                />
                <talkie-icon
                  :name="'mike-unmuted'"
                  :isActive="true"
                  :variant="'secondary'"
                  :onClick="startRecording"
                  :size="50"
                  v-if="!isRecording && !currentRecording"
                />
                <talkie-icon
                  :name="'square'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="50"
                  :iconToSizeRatio="1.5"
                  :customClass="'class-start-convo-form-options-stop-recording-button'"
                  :onClick="stopRecording"
                  v-if="isRecording && !currentRecording"
                />
                <talkie-icon
                  :name="'play'"
                  :isActive="true"
                  :variant="'primary'"
                  :size="50"
                  :onClick="handleAudioPlayerToggle"
                  v-if="!isRecording && !isAudioPlaying && currentRecording"
                />
                <talkie-icon
                  :name="'pause'"
                  :isActive="true"
                  :variant="'primary'"
                  :size="50"
                  :onClick="handleAudioPlayerToggle"
                  v-if="!isRecording && isAudioPlaying && currentRecording"
                />
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
      </talkie-audio-recorder>
      <div class="recording">
        <talkie-audio-player
          v-slot="{
            isPlaying,
            togglePlayer,
            currentAudioPercentage,
            updateAudioPercentage,
            totalAudioPlaybackTime,
            currentAudioPlaybackTime,
          }"
          :recording="currentRecording"
          v-if="currentRecording"
        >
          <span hidden>
            <!-- TODO: updated these states via a handler -->
            {{ (this.isAudioPlaying = isPlaying) }}
            {{ (this.handleAudioPlayerToggle = togglePlayer) }}
          </span>
          <div class="class-start-convo-form-options-audio-player-wrapper">
            <talkie-audio-timeline
              :percentage="currentAudioPercentage"
              :onHeadChange="updateAudioPercentage"
            />
            <span class="class-start-convo-form-options-audio-player-timestamps"
              >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
            </span>
          </div>
        </talkie-audio-player>
      </div>
    </talkie-form>
  </template>
  <template v-if="computedPageLoading">
    <div class="class-start-convo-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>
<script>
import {
  TalkieIcon,
  TalkieForm,
  TalkieLoader,
  TalkieModal,
} from "../../../UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";

export default {
  name: "StudentQA",
  components: {
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieForm,
    TalkieLoader,
    TalkieModal,
  },
};
</script>
<style scoped>
.recording {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  padding: 100px 0 var(--t-space-50) 0;
}
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
  justify-content: center;
  gap: 20px;
  width: 100%;
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
.class-start-convo-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.class-start-convo-form-options-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.class-start-convo-form-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}
.class-start-convo-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
@media (max-width: 599px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}

@media (min-width: 900px) {
  .class-start-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}

@media (min-width: 1200px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
}
</style>

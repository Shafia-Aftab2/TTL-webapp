<template>
  <div class="teachers-class-start-convo-wrapper">
    <h2 class="teachers-class-start-convo-header h2">
      Start a conversation now?
    </h2>
    <talkie-audio-recorder
      v-slot="{ startRecording, stopRecording, isRecording }"
      :onRecordingStopped="handleRecordedItem"
    >
      <div class="teachers-class-start-convo-form">
        <talkie-select :placeholder="'Choose topic'" />
        <talkie-input :placeholder="'Title (required)'" />
        <talkie-input :placeholder="'Question text (optional)'" />
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
            {{ (this.toggleAudioPlayerState = togglePlayer) }}
          </span>
          <talkie-audio-timeline
            :percentage="currentAudioPercentage"
            :onHeadChange="updateAudioPercentage"
          />
          {{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
        </talkie-audio-player>
      </div>
      <div class="teachers-class-start-convo-form-options-wrapper">
        <div class="teachers-class-start-convo-form-options">
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
            :onClick="startRecording"
            v-if="!isRecording && !currentRecording"
          />
          <talkie-icon
            :name="'square'"
            :isActive="true"
            :variant="'secondary'"
            :size="50"
            :iconToSizeRatio="1.5"
            :customClass="'teachers-class-start-convo-form-options-stop-recording-button'"
            :onClick="stopRecording"
            v-if="isRecording && !currentRecording"
          />
          <talkie-icon
            :name="'play'"
            :isActive="true"
            :variant="'primary'"
            :size="50"
            :onClick="toggleAudioPlayerState"
            v-if="!isRecording && !isAudioPlaying && currentRecording"
          />
          <talkie-icon
            :name="'pause'"
            :isActive="true"
            :variant="'primary'"
            :size="50"
            :onClick="toggleAudioPlayerState"
            v-if="!isRecording && isAudioPlaying && currentRecording"
          />
          <talkie-icon
            :name="'send'"
            :isActive="true"
            :variant="'secondary'"
            :size="30"
          />
        </div>
      </div>
    </talkie-audio-recorder>
  </div>
</template>

<script>
import { TalkieInput, TalkieSelect, TalkieIcon } from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";

export default {
  name: "TeacherStartConvo",
  data() {
    return {
      currentRecording: null,
      isAudioPlaying: null,
      toggleAudioPlayerState: () => {},
    };
  },
  components: {
    TalkieInput,
    TalkieSelect,
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
    },
  },
};
</script>

<style scoped>
/* TODO: temp, move body color to wrappers with in views */
body {
  background: var(--t-gray-100);
}

.teachers-class-start-convo-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.teachers-class-start-convo-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.teachers-class-start-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.teachers-class-start-convo-form-options-wrapper {
  position: relative;
}
.teachers-class-start-convo-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.teachers-class-start-convo-form-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: calc(var(--t-space-32) * 1.5);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 20%);
    gap: var(--t-space-36);
  }
  .teachers-class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
}
@media (min-width: 600px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: calc(var(--t-space-32) * 2);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 30%);
    gap: var(--t-space-40);
  }
  .teachers-class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
}
@media (min-width: 900px) {
  .teachers-class-start-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .teachers-class-start-convo-wrapper {
    padding: var(--t-space-48);
    padding-bottom: calc(var(--t-space-48) * 2);
    margin-top: var(--t-space-48);
  }
  .teachers-class-start-convo-header {
    font-size: var(--font-size);
  }
  .teachers-class-start-convo-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .teachers-class-start-convo-form-options {
    transform: translate(-50%, 60%);
    gap: var(--t-space-48);
  }
}
</style>

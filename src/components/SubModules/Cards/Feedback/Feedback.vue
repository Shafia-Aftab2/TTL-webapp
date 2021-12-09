<template>
  <div
    :class="[
      'talkie-feedback-card-wrapper',
      fullWidth && 'talkie-feedback-card-fullwidth-wrapper',
    ]"
  >
    <div class="talkie-feedback-card-input-wrapper">
      <talkie-input :placeholder="inputPlaceholder" />
    </div>

    <!-- Recorder -->
    <div class="talkie-feedback-card-options">
      <talkie-audio-recorder
        v-slot="{ startRecording, stopRecording, isRecording }"
        :onRecordingStopped="handleRecordedItem"
        v-if="!currentRecording"
      >
        <talkie-icon
          :name="'mike-unmuted'"
          :isActive="true"
          :variant="'secondary'"
          :size="40"
          :iconToSizeRatio="1.1"
          :onClick="startRecording"
          v-if="!isRecording"
        />
        <talkie-icon
          :name="'square'"
          :isActive="true"
          :variant="'secondary'"
          :size="40"
          :iconToSizeRatio="1.5"
          :customClass="'talkie-feedback-card-stop-recording-button'"
          :onClick="stopRecording"
          v-if="isRecording"
        />
      </talkie-audio-recorder>
      <!-- Player -->
      <talkie-audio-player
        v-slot="{
          isPlaying,
          togglePlayer,
          totalAudioPlaybackTime,
          currentAudioPlaybackTime,
        }"
        :recording="currentRecording"
        v-if="currentRecording"
      >
        <span class="talkie-feedback-card-options-audio-timestamps">
          {{ currentAudioPlaybackTime }} /
          {{ totalAudioPlaybackTime }}
        </span>
        <span class="talkie-feedback-card-options-audio-player-icons">
          <talkie-icon
            :name="'play'"
            :isActive="true"
            :variant="'primary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="togglePlayer"
            v-if="!isPlaying"
          />
          <talkie-icon
            :name="'pause'"
            :isActive="true"
            :variant="'primary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="togglePlayer"
            v-if="isPlaying"
          />
          <talkie-icon
            :name="'arrow-rounded-left'"
            :isActive="true"
            :variant="'secondary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="handleRecordingReset"
          />
          <talkie-icon
            :name="'send'"
            :isActive="true"
            :variant="'secondary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="onFeedbackSendClick"
          />
        </span>
      </talkie-audio-player>
    </div>
  </div>
</template>

<script>
import { TalkieIcon, TalkieInput } from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
} from "@/components/SubModules/AudioManager";

export default {
  name: "FeedbackCard",
  data() {
    return {
      currentRecording: null,
    };
  },
  components: {
    TalkieIcon,
    TalkieInput,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
  },
  props: {
    inputPlaceholder: {
      type: String,
      default: "Whole class feedback",
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    onFeedbackRecording: {
      type: Function,
      default: () => {},
    },
    onFeedbackRecordingDiscard: {
      type: Function,
      default: () => {},
    },
    onFeedbackSendClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
      this.onFeedbackRecording && this.onFeedbackRecording(recording);
    },
    handleRecordingReset() {
      this.currentRecording = null;
      this.onFeedbackRecordingDiscard && this.onFeedbackRecordingDiscard();
    },
  },
};
</script>

<style>
.talkie-feedback-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--t-white);
  width: fit-content;
  padding: var(--t-space-16);
  gap: var(--t-space-16);
  border-radius: var(--t-br-large);
}
.talkie-feedback-card-fullwidth-wrapper {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.talkie-feedback-card-input-wrapper {
  width: 100%;
}
.talkie-feedback-card-input-wrapper * {
  background: transparent !important;
}
.talkie-feedback-card-options {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
.talkie-feedback-card-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
  border-width: var(--t-space-3);
}
.talkie-feedback-card-options-audio-timestamps {
  background: var(--t-primary);
  padding: var(--t-space-3) var(--t-space-5);
  border-radius: var(--t-br-medium);
  text-align: center;
  white-space: nowrap;
  font-size: var(--t-fs-small);
}
.talkie-feedback-card-options-audio-player-icons {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
</style>

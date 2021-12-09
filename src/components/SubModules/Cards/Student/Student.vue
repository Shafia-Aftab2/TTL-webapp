<template>
  <div
    :class="[
      'talkie-student-card-wrapper',
      fullWidth && 'talkie-student-card-fullwidth-wrapper',
    ]"
  >
    <!-- Left Content -->
    <div class="talkie-student-card-details-wrapper">
      <!-- Feedback Mode -->
      <template v-if="mode === 'feedback'">
        <img
          class="talkie-student-card-details-image"
          :src="studentAvatar"
          v-if="studentAvatar"
        />
        <p class="p" style="margin-bottom: 0 !important" v-if="studentName">
          {{ studentName }}
        </p>
      </template>
    </div>

    <!-- Right Content -->
    <div class="talkie-student-card-options">
      <!-- Feedback Mode -->
      <template v-if="mode === 'feedback'">
        <!-- Source Record || Player -->
        <talkie-audio-player
          v-slot="{ isPlaying, startPlayer, stopPlayer }"
          :source="studentResponseAudio"
          v-if="studentResponseAudio"
        >
          <span class="talkie-student-card-options-audio-player-icons">
            <talkie-icon
              :name="'play'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="startPlayer"
              v-if="!isPlaying"
            />
            <talkie-icon
              :name="'pause'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="stopPlayer"
              v-if="isPlaying"
            />
          </span>
        </talkie-audio-player>
        <!-- New Recording || Recorder, Player, Reset And Send -->
        <div
          class="talkie-student-card-options-spacer"
          v-if="currentRecording"
        ></div>
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
            :customClass="'talkie-student-card-stop-recording-button'"
            :onClick="stopRecording"
            v-if="isRecording"
          />
        </talkie-audio-recorder>
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
          <span class="talkie-student-card-options-audio-timestamps">
            {{ currentAudioPlaybackTime }} /
            {{ totalAudioPlaybackTime }}
          </span>
          <span class="talkie-student-card-options-audio-player-icons">
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
        <div
          class="talkie-student-card-options-spacer"
          v-if="currentRecording"
        ></div>
        <!-- Feedback Stars -->
        <talkie-icon
          :name="'star'"
          :isActive="true"
          :variant="'primary'"
          :size="40"
          :iconToSizeRatio="1.1"
          :onClick="onRatingStarClick"
        />
      </template>
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
    mode: {
      type: String,
      validator: (val) => ["feedback"].includes(val),
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    // feedback
    studentName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
    studentResponseAudio: {
      type: String,
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
    onRatingStarClick: {
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
.talkie-student-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--t-white);
  width: fit-content;
  border-radius: var(--t-br-large);
  padding: var(--t-space-16);
  gap: var(--t-space-16);
}
.talkie-student-card-fullwidth-wrapper {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.talkie-student-card-details-wrapper {
  display: flex;
  align-items: center;
  gap: var(--t-space-24);
}
.talkie-student-card-details-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--t-space-70);
  min-width: var(--t-space-70);
  height: var(--t-space-70);
  width: var(--t-space-70);
}
.talkie-student-card-options {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
.talkie-student-card-options-spacer {
  background: var(--t-primary);
  border-radius: var(--t-br-large);
  height: var(--t-space-50);
  width: var(--t-space-5);
}
.talkie-student-card-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
  border-width: var(--t-space-3);
}
.talkie-student-card-options-audio-timestamps {
  background: var(--t-primary);
  padding: var(--t-space-3) var(--t-space-5);
  border-radius: var(--t-br-medium);
  text-align: center;
  white-space: nowrap;
  font-size: var(--t-fs-small);
}
.talkie-student-card-options-audio-player-icons {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
</style>

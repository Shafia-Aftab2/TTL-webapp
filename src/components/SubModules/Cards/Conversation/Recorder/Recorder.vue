<template>
  <div class="talkie-conversation-card-recorder-wrapper">
    <talkie-audio-recorder
      v-slot="{ startRecording, stopRecording, isRecording }"
      :onRecordingStopped="handleRecordedItem"
    >
      <!-- Player Timeline/Progress  -->
      <div
        class="talkie-conversation-card-player-timeline-wrapper"
        v-if="currentRecording"
      >
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
        >
          <span hidden>
            <!-- TODO: updated these states via a handler -->
            {{ (this.isAudioPlaying = isPlaying) }}
            {{ (this.handleAudioPlayerToggle = togglePlayer) }}
          </span>
          <talkie-audio-timeline
            :percentage="currentAudioPercentage"
            :onHeadChange="updateAudioPercentage"
          />
          <span class="talkie-conversation-card-player-timestamps"
            >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
          </span>
        </talkie-audio-player>
      </div>

      <!-- Record Buttons -->
      <div class="talkie-conversation-card-recorder-buttons-wrapper">
        <talkie-icon
          :name="'arrow-rounded-left'"
          :isActive="true"
          :variant="'secondary'"
          :size="30"
          :onClick="handleRecordedItemReset"
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
          :customClass="'talkie-conversation-card-options-stop-recording-button'"
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
          :name="'send'"
          :isActive="true"
          :variant="'secondary'"
          :size="30"
          :onClick="handleRecordingSendClick"
        />
      </div>
    </talkie-audio-recorder>
  </div>
</template>

<script>
import { TalkieIcon } from "@/components/UICore";
import {
  TalkieAudioPlayer,
  TalkieAudioRecorder,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";

export default {
  name: "TasksInboxTaskItemRecorder",
  components: {
    TalkieIcon,
    TalkieAudioTimeline,
    TalkieAudioPlayer,
    TalkieAudioRecorder,
  },
  props: {
    onRecordingSendClick: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isAudioPlaying: false,
      handleAudioPlayerToggle: () => {},
      currentRecording: null,
    };
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
    },
    async handleRecordingSendClick() {
      this.onRecordingSendClick &&
        (await this.onRecordingSendClick(this.currentRecording));
      this.currentRecording = null;
    },
  },
};
</script>

<style>
.talkie-conversation-card-recorder-wrapper {
  display: flex;
  flex-direction: column;
}
.talkie-conversation-card-player-timeline-wrapper {
  margin: auto;
}
.talkie-conversation-card-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.talkie-conversation-card-recorder-buttons-wrapper {
  margin: auto;
  display: flex;
  align-items: center;
}
.talkie-conversation-card-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-conversation-card-recorder-wrapper {
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-player-timeline-wrapper {
    width: 100%;
  }
  .talkie-conversation-card-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .talkie-conversation-card-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
  .talkie-conversation-card-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
}
@media (min-width: 600px) {
  .talkie-conversation-card-recorder-wrapper {
    gap: var(--t-space-12);
  }
  .talkie-conversation-card-player-timeline-wrapper {
    width: 65%;
  }
  .talkie-conversation-card-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .talkie-conversation-card-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
  .talkie-conversation-card-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
}
@media (min-width: 1200px) {
  .talkie-conversation-card-player-timeline-wrapper {
    width: 55%;
  }
  .talkie-conversation-card-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .talkie-conversation-card-recorder-buttons-wrapper {
    gap: var(--t-space-50);
  }
}
</style>

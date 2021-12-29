<template>
  <div class="class-tasks-inbox-task-item-audio-recorder-wrapper">
    <talkie-audio-recorder
      v-slot="{ startRecording, stopRecording, isRecording }"
      :onRecordingStopped="handleRecordedItem"
    >
      <!-- Player Timeline/Progress  -->
      <div
        class="class-tasks-inbox-task-item-audio-player-timeline-wrapper"
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
          <span class="class-tasks-inbox-task-item-audio-player-timestamps"
            >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
          </span>
        </talkie-audio-player>
      </div>

      <!-- Record Buttons -->
      <div class="class-tasks-inbox-task-item-audio-recorder-buttons-wrapper">
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
.class-tasks-inbox-task-item-audio-recorder-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-audio-player-timeline-wrapper {
  margin: auto;
}
.class-tasks-inbox-task-item-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
  margin: auto;
  display: flex;
  align-items: center;
}
.class-start-convo-form-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-task-item-audio-recorder-wrapper {
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-audio-player-timeline-wrapper {
    width: 100%;
  }
  .class-tasks-inbox-task-item-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-task-item-audio-recorder-wrapper {
    gap: var(--t-space-12);
  }
  .class-tasks-inbox-task-item-audio-player-timeline-wrapper {
    width: 65%;
  }
  .class-tasks-inbox-task-item-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-36);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-task-item-audio-player-timeline-wrapper {
    width: 55%;
  }
  .class-tasks-inbox-task-item-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-tasks-inbox-task-item-audio-recorder-buttons-wrapper {
    gap: var(--t-space-50);
  }
}
</style>

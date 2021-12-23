<template>
  <div
    :class="[
      'class-tasks-inbox-task-item-audio-response',
      `class-tasks-inbox-task-item-audio-response-${alignment}`,
    ]"
  >
    <talkie-audio-player
      :source="responseAudio"
      v-slot="{
        totalAudioPlaybackTime,
        startPlayer,
        stopPlayer,
        isPlaying,
        updateAudioPercentage,
        currentAudioPercentage,
      }"
    >
      <talkie-icon
        :name="'play'"
        :variant="'primary'"
        :onClick="startPlayer"
        v-if="!isPlaying"
      />
      <talkie-icon
        :name="'pause'"
        :variant="'primary'"
        :onClick="stopPlayer"
        v-if="isPlaying"
      />
      <talkie-audio-timeline
        :percentage="currentAudioPercentage"
        :onHeadChange="updateAudioPercentage"
      />
      <span class="class-tasks-inbox-task-item-audio-response-timestamps">
        {{ totalAudioPlaybackTime }}
      </span>
    </talkie-audio-player>
  </div>
</template>

<script>
import { TalkieIcon } from "@/components/UICore";
import {
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";

export default {
  name: "TasksInboxTaskItemResponse",
  props: {
    alignment: {
      type: String,
      validator: (val) => ["left", "right"].includes(val),
    },
    responseAudio: { type: String },
  },
  components: {
    TalkieIcon,
    TalkieAudioTimeline,
    TalkieAudioPlayer,
  },
};
</script>

<style>
.class-tasks-inbox-task-item-audio-response {
  display: flex;
  align-items: center;
  width: 100%;
}
.class-tasks-inbox-task-item-audio-response-left {
  margin-right: auto;
}
.class-tasks-inbox-task-item-audio-response-right {
  margin-left: auto;
}
.class-tasks-inbox-task-item-audio-response-timestamps {
  color: var(--t-black-100);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-task-item-audio-response {
    max-width: 75%;
    gap: var(--t-space-5);
  }
  .class-tasks-inbox-task-item-audio-response-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-task-item-audio-response {
    max-width: 60%;
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-audio-response-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-task-item-audio-response {
    max-width: 50%;
  }
  .class-tasks-inbox-task-item-audio-response-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
</style>

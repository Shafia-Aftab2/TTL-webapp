<template>
  <div
    :class="[
      'talkie-conversation-card-message',
      `talkie-conversation-card-message-${alignment}`,
    ]"
  >
    <talkie-icon
      :name="'download'"
      :variant="'secondary'"
      :onClick="onDownloadClick"
      :iconToSizeRatio="0.75"
      v-if="isDownloadable"
    />
    <talkie-audio-player
      :source="messageAudio"
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
      <span class="talkie-conversation-card-message-timestamps">
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
import contentDownloadMixin from "@/utils/mixins/contentDownloadMixin";

export default {
  name: "ConversationCardMessage",
  mixins: [contentDownloadMixin],
  props: {
    alignment: {
      type: String,
      validator: (val) => ["left", "right"].includes(val),
    },
    messageAudio: { type: String },
    isDownloadable: { type: Boolean, default: false },
  },
  components: {
    TalkieIcon,
    TalkieAudioTimeline,
    TalkieAudioPlayer,
  },
  methods: {
    onDownloadClick() {
      if (this.messageAudio) {
        this.downloadDocument("audioFile", this.messageAudio); // TODO: add correct name
      }
    },
  },
};
</script>

<style>
.talkie-conversation-card-message {
  display: flex;
  align-items: center;
  width: 100%;
}
.talkie-conversation-card-message-left {
  margin-right: auto;
}
.talkie-conversation-card-message-right {
  margin-left: auto;
}
.talkie-conversation-card-message-timestamps {
  color: var(--t-black-100);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-conversation-card-message {
    max-width: 75%;
    gap: var(--t-space-5);
  }
  .talkie-conversation-card-message-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
}
@media (min-width: 600px) {
  .talkie-conversation-card-message {
    max-width: 60%;
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-message-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
}
@media (min-width: 1200px) {
  .talkie-conversation-card-message {
    max-width: 50%;
  }
  .talkie-conversation-card-message-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
</style>

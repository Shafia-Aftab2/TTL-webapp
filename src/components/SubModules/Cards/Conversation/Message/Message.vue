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
    <!-- Photo Message -->
    <img
      v-if="messagePhoto"
      :src="messagePhoto"
      class="talkie-conversation-message-photo"
    />

    <!-- Text message -->
    <talkie-chip
      v-if="messageText"
      :label="messageText"
      :variant="'neutral'"
      :class="alignment === 'right' ? 'ml-auto' : ''"
    />

    <!-- Emoji(s) message -->
    <div
      v-if="messageEmojis"
      :class="[
        'talkie-conversation-message-emojis-wrapper',
        alignment === 'right' ? 'ml-auto' : '',
      ]"
    >
      <img
        v-for="emoji in messageEmojis"
        :key="emoji"
        :src="emoji"
        :alt="'Talkie Emoji'"
        class="talkie-conversation-message-emoji"
      />
    </div>

    <!-- Audio Message -->
    <talkie-audio-player
      v-if="messageAudio"
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
import { TalkieIcon, TalkieChip } from "@/components/UICore";
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
    messagePhoto: { type: String },
    messageText: { type: String },
    messageEmojis: { type: String },
    isDownloadable: { type: Boolean, default: false },
  },
  components: {
    TalkieIcon,
    TalkieChip,
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
.talkie-conversation-message-photo {
  max-width: 100%;
  border-radius: var(--t-br-small);
  object-fit: contain;
}
.talkie-conversation-message-emojis-wrapper {
  display: flex;
  flex-direction: column;
  flex-direction: row;
  flex-wrap: wrap;
}
.talkie-conversation-card-message-timestamps {
  color: var(--t-black-100);
}

.ml-auto {
  margin-left: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-conversation-card-message {
    max-width: 75%;
    gap: var(--t-space-5);
  }
  .talkie-conversation-message-emojis-wrapper {
    gap: var(--t-space-12);
  }
  .talkie-conversation-message-emoji {
    height: var(--t-space-36);
    width: var(--t-space-36);
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
  .talkie-conversation-message-emojis-wrapper {
    gap: var(--t-space-10);
  }
  .talkie-conversation-message-emoji {
    height: var(--t-space-50);
    width: var(--t-space-50);
  }
  .talkie-conversation-card-message-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
}
@media (min-width: 1200px) {
  .talkie-conversation-card-message {
    max-width: 50%;
  }
  .talkie-conversation-message-emoji {
    height: var(--t-space-58);
    width: var(--t-space-58);
  }
  .talkie-conversation-card-message-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
</style>

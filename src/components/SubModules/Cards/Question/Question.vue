<template>
  <div
    :class="[
      'talkie-question-card-wrapper',
      hoverAnimation && 'talkie-question-card-hover-wrapper',
      fullWidth && 'talkie-question-card-fullwidth-wrapper',
      centered && 'talkie-question-card-centered-wrapper',
    ]"
    @click="handleQuestionCardClick"
  >
    <div
      class="talkie-question-card-details-wrapper"
      @click="handleQuestionCardClick"
    >
      <img
        class="talkie-question-card-image"
        :src="image"
        :alt="imageAlt"
        v-if="image && !(audioSource || audioRecording)"
      />
      <talkie-audio-player
        v-slot="{ startPlayer, stopPlayer, isPlaying }"
        :recording="audioRecording"
        :source="audioSource"
        v-if="!image && (audioSource || audioRecording)"
      >
        <talkie-icon
          :name="'play'"
          :variant="'primary'"
          :isActive="true"
          :size="50"
          :iconToSizeRatio="1.2"
          v-if="!isPlaying"
          :onClick="startPlayer"
          :noHighlights="true"
        />
        <talkie-icon
          :name="'pause'"
          :variant="'primary'"
          :isActive="true"
          :size="50"
          :iconToSizeRatio="1.2"
          v-if="isPlaying"
          :onClick="stopPlayer"
          :noHighlights="true"
        />
      </talkie-audio-player>
      <div
        class="talkie-question-card-details-header-wrapper"
        @click="handleQuestionCardClick"
      >
        <p
          class="p"
          :style="'--paragraph-font-size: var(--t-fs-small)'"
          v-if="topic"
        >
          {{ topic }}
        </p>
        <h3 class="h3" v-if="title">{{ title }}</h3>
      </div>
    </div>
    <!-- <p class="p" v-if="description">{{ description }}</p> -->
    <question-card-expand-content
      :translation="expandContent.translation"
      :emojis="expandContent.emojis"
      :onCardExpandStateChange="onCardExpandStateChange"
      v-if="!fullWidth"
    />
    <div
      class="talkie-question-card-footer-wrapper"
      v-if="manageModeOptions"
      @click="handleQuestionCardClick"
    >
      <talkie-chip
        :label="'Edit'"
        :variant="'neutral'"
        :onClick="onEditClick"
        v-if="manageModeOptions.canEdit"
      />
      <talkie-chip
        :label="'Delete'"
        :variant="'danger'"
        :onClick="onDeleteClick"
        v-if="manageModeOptions.canDelete"
      />
      <talkie-chip
        :label="'Download'"
        :variant="'primary'"
        :onClick="onDownloadClick"
        v-if="manageModeOptions.canDownload"
      />
      <talkie-chip
        :label="'Practice Mode'"
        :variant="'neutral'"
        v-if="manageModeOptions.isForPractice"
      />
      <slot name="action-buttons"></slot>
    </div>
    <question-card-expand-content
      :translation="expandContent.translation"
      :onCardExpandStateChange="onCardExpandStateChange"
      v-if="fullWidth"
    />
  </div>
</template>

<script>
import { TalkieIcon, TalkieChip } from "@/components/UICore";
import { TalkieAudioPlayer } from "@/components/SubModules/AudioManager";
import QuestionCardExpandContent from "./ExpandContent";
import contentDownloadMixin from "@/utils/mixins/contentDownloadMixin";

export default {
  name: "QuestionCard",
  mixins: [contentDownloadMixin],
  components: {
    TalkieIcon,
    TalkieChip,
    TalkieAudioPlayer,
    QuestionCardExpandContent,
  },
  props: {
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageAlt: {
      type: String,
      default: "Card Image",
    },
    audioSource: {
      type: String,
    },
    audioRecording: {
      type: Object,
    },
    hoverAnimation: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    expandContent: {
      type: Object,
      default: () => ({
        translation: {
          textToTranslate: null,
          translatedText: null,
        },
        emojis: [],
      }),
    },
    manageModeOptions: {
      type: Object,
      default: () => ({
        canEdit: false,
        canDelete: false,
        canDownload: false,
        isForPractice: false,
      }),
    },
    onCardBodyClick: {
      type: Function,
      default: () => {},
    },
    onEditClick: {
      type: Function,
      default: () => {},
    },
    onDeleteClick: {
      type: Function,
      default: () => {},
    },
    onCardExpandStateChange: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    async handleQuestionCardClick(e) {
      if (e.target === e.currentTarget) {
        this.onCardBodyClick && (await this.onCardBodyClick());
      }
    },
    onDownloadClick() {
      if (this.audioSource) {
        this.downloadDocument(this.title, this.audioSource);
      }
    },
  },
};
</script>

<style scoped>
.talkie-question-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: var(--t-white);
  width: 100%;
  transition: 0.1s ease;
  border-color: var(--t-gray-75);
  border-style: solid;
}
.talkie-question-card-hover-wrapper:hover {
  border-width: var(--t-space-1);
  transform: scale(0.99);
}
.talkie-question-card-fullwidth-wrapper {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.talkie-question-card-centered-wrapper {
  align-items: center;
}
.talkie-question-card-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
  box-shadow: inset 0 0 0 calc(var(--image-size) / 10) var(--t-secondary);
}
.talkie-question-card-details-wrapper {
  display: flex;
  align-items: center;
}
.talkie-question-card-details-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.talkie-question-card-footer-wrapper {
  display: flex;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-question-card-wrapper {
    border-radius: var(--t-br-small);
    padding: var(--t-space-16) var(--t-space-20);
    gap: var(--t-space-16);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-16);
  }
  .talkie-question-card-image {
    --image-size: var(--t-space-70);
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-5);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-12);
    margin-top: var(--t-space-5);
  }
}
@media (min-width: 600px) {
  .talkie-question-card-wrapper {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-20) var(--t-space-32);
    gap: var(--t-space-20);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-20);
  }
  .talkie-question-card-image {
    --image-size: 78.75px;
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-5);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-16);
    margin-top: var(--t-space-5);
  }
}
@media (min-width: 900px) {
  .talkie-question-card-wrapper {
    border-radius: var(--t-br-large);
  }
}
@media (min-width: 1200px) {
  .talkie-question-card-wrapper {
    padding: var(--t-space-24) var(--t-space-36);
    gap: var(--t-space-20);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-24);
  }
  .talkie-question-card-image {
    --image-size: calc(var(--t-space-70) * 1.25);
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-5);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-24);
    margin-top: var(--t-space-8);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

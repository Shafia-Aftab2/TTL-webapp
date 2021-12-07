<template>
  <div
    :class="[
      'talkie-question-card-wrapper',
      fullWidth && 'talkie-question-card-fullwidth-wrapper',
      centered && 'talkie-question-card-centered-wrapper',
    ]"
  >
    <div class="talkie-question-card-details-wrapper">
      <img
        class="talkie-question-card-image"
        :src="image"
        :alt="imageAlt"
        v-if="image && !audioSource"
      />
      <talkie-audio-player
        v-slot="{ startPlayer, stopPlayer, isPlaying }"
        :source="audioSource"
        v-if="!image && audioSource"
      >
        <talkie-icon
          :name="'play'"
          :variant="'primary'"
          :isActive="true"
          :size="40"
          :iconToSizeRatio="1.2"
          v-if="!isPlaying"
          :onClick="startPlayer"
        />
        <talkie-icon
          :name="'pause'"
          :variant="'primary'"
          :isActive="true"
          :size="40"
          :iconToSizeRatio="1.2"
          v-if="isPlaying"
          :onClick="stopPlayer"
        />
      </talkie-audio-player>
      <div class="talkie-question-card-details-header-wrapper">
        <h5 class="h5" v-if="title">{{ title }}</h5>
        <p class="p" v-if="topic">Topic: {{ topic }}</p>
      </div>
    </div>
    <p class="p" v-if="description">{{ description }}</p>
    <div class="talkie-question-card-footer-wrapper" v-if="manageMode">
      <talkie-chip
        :label="'Edit'"
        :variant="'neutral'"
        :onClick="onEditClick"
      />
      <talkie-chip
        :label="'Delete'"
        :variant="'danger'"
        :onClick="onDeleteClick"
      />
    </div>
  </div>
</template>

<script>
import { TalkieIcon, TalkieChip } from "@/components/UICore";
import { TalkieAudioPlayer } from "@/components/SubModules/AudioManager";

export default {
  name: "QuestionCard",
  components: {
    TalkieIcon,
    TalkieChip,
    TalkieAudioPlayer,
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
    fullWidth: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    manageMode: {
      type: Boolean,
      default: false,
    },
    onEditClick: {
      type: Function,
      default: () => {},
    },
    onDeleteClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.talkie-question-card-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--t-white);
  width: 100%;
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
    padding: var(--t-space-12);
    gap: var(--t-space-12);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-8);
  }
  .talkie-question-card-image {
    --image-size: var(--t-space-56);
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-8);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-8);
  }
}
@media (min-width: 600px) {
  .talkie-question-card-wrapper {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-16);
    gap: var(--t-space-16);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-10);
  }
  .talkie-question-card-image {
    --image-size: var(--t-space-63);
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-10);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-10);
  }
}
@media (min-width: 900px) {
  .talkie-question-card-wrapper {
    border-radius: var(--t-br-large);
  }
}
@media (min-width: 1200px) {
  .talkie-question-card-wrapper {
    padding: var(--t-space-16);
    gap: var(--t-space-16);
  }
  .talkie-question-card-details-wrapper {
    gap: var(--t-space-16);
  }
  .talkie-question-card-image {
    --image-size: var(--t-space-70);
  }
  .talkie-question-card-details-header-wrapper {
    gap: var(--t-space-16);
  }
  .talkie-question-card-footer-wrapper {
    gap: var(--t-space-16);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

<template>
  <div
    class="talkie-question-card-expand-content-toggle-wrapper"
    v-if="
      emojis.length > 0 ||
      (translation && translation.textToTranslate && translation.translatedText)
    "
  >
    <!-- <span class="talkie-question-card-expand-content-toggle-button">
      <talkie-icon
        :name="'arrow-head-top'"
        :variant="'success'"
        :isActive="true"
        :iconToSizeRatio="0.8"
        :size="15"
        :onClick="() => handleQuestionCardExpand(false)"
        v-if="cardExpanded"
      />
      <talkie-icon
        :name="'arrow-head-bottom'"
        :variant="'success'"
        :isActive="true"
        :iconToSizeRatio="0.8"
        :size="15"
        :onClick="() => handleQuestionCardExpand(true)"
        v-if="!cardExpanded"
      />
    </span> -->
  </div>
  <div
    class="talkie-question-card-expand-content-wrapper"
    v-if="
      cardExpanded &&
      translation &&
      translation.textToTranslate &&
      translation.translatedText &&
      emojis &&
      emojis.length === 0
    "
    @click="handleQuestionCardClick"
  >
    <talkie-chip
      :label="`Question: ${translation.textToTranslate}`"
      :variant="'neutral'"
    />
    <talkie-chip
      :label="`Answer: ${translation.translatedText}`"
      :variant="'neutral'"
    />
  </div>
  <div
    :class="[
      'talkie-question-card-expand-content-wrapper',
      'talkie-question-card-expand-content-inline-wrapper',
    ]"
    v-if="cardExpanded && emojis && emojis.length > 0"
    @click="handleQuestionCardClick"
  >
    <template v-for="emoji in emojis" :key="emoji">
      <img
        :src="emoji"
        :alt="'Talkie Emoji'"
        class="talkie-question-card-expand-content-image-wrapper"
      />
    </template>
  </div>
</template>

<script>
import {
  // TalkieIcon,
  TalkieChip,
} from "@/components/UICore";

export default {
  name: "QuestionCardExpandContent",
  components: {
    // TalkieIcon,
    TalkieChip,
  },
  data() {
    return {
      cardExpanded: true,
    };
  },
  props: {
    translation: {
      type: Object,
      default: () => ({
        textToTranslate: null,
        translatedText: null,
      }),
    },
    emojis: {
      type: Array,
      default: () => [],
    },
    onCardExpandStateChange: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleQuestionCardExpand(shouldExpand) {
      this.cardExpanded = shouldExpand;
      this.onCardExpandStateChange(shouldExpand);
    },
  },
};
</script>

<style scoped>
.talkie-question-card-expand-content-toggle-wrapper {
  width: 100%;
  height: var(--t-space-1);
  background-color: var(--t-gray-75);
  position: relative;
}
.talkie-question-card-expand-content-toggle-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.talkie-question-card-expand-content-wrapper {
  display: flex;
  flex-direction: column;
  border-bottom: var(--t-space-1) solid var(--t-gray-75);
}
.talkie-question-card-expand-content-inline-wrapper {
  flex-direction: row;
  flex-wrap: wrap;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-question-card-expand-content-toggle-button {
    right: var(--t-space-12);
  }
  .talkie-question-card-expand-content-wrapper {
    gap: var(--t-space-12);
    padding-bottom: var(--t-space-12);
  }
  .talkie-question-card-expand-content-image-wrapper {
    height: var(--t-space-36);
    width: var(--t-space-36);
  }
}
@media (min-width: 600px) {
  .talkie-question-card-expand-content-toggle-button {
    right: var(--t-space-16);
  }
  .talkie-question-card-expand-content-wrapper {
    gap: var(--t-space-10);
    padding-bottom: var(--t-space-16);
  }
  .talkie-question-card-expand-content-image-wrapper {
    height: var(--t-space-50);
    width: var(--t-space-50);
  }
}
@media (min-width: 1200px) {
  .talkie-question-card-expand-content-image-wrapper {
    height: var(--t-space-58);
    width: var(--t-space-58);
  }
}
</style>

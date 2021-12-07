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
        v-if="image"
      />
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
import { TalkieChip } from "@/components/UICore";

export default {
  name: "QuestionCard",
  components: {
    TalkieChip,
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
  border-radius: var(--t-br-large);
  padding: var(--t-space-16);
  gap: var(--t-space-16);
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
  min-height: var(--t-space-70);
  min-width: var(--t-space-70);
  height: var(--t-space-70);
  width: var(--t-space-70);
  box-shadow: inset 0 0 0 calc(var(--t-space-70) / 10) var(--t-secondary);
}
.talkie-question-card-details-wrapper {
  display: flex;
  align-items: center;
  gap: var(--t-space-16);
}
.talkie-question-card-details-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--t-space-16);
}
.talkie-question-card-footer-wrapper {
  display: flex;
  gap: var(--t-space-16);
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

<template>
  <div class="talkie-feedback-card-wrapper">
    <div class="talkie-feedback-card-input-wrapper">
      <talkie-input :placeholder="inputPlaceholder" />
    </div>

    <div class="talkie-feedback-card-options">
      <talkie-icon
        :name="'mike-unmuted'"
        :isActive="true"
        :variant="'secondary'"
        :size="40"
        :iconToSizeRatio="1.1"
      />
      <talkie-icon
        :name="'play'"
        :isActive="true"
        :variant="'primary'"
        :size="40"
        :iconToSizeRatio="1.1"
      />
    </div>
  </div>
</template>

<script>
import { TalkieIcon, TalkieInput } from "@/components/UICore";

export default {
  name: "FeedbackCard",
  components: {
    TalkieIcon,
    TalkieInput,
  },
  props: {
    inputPlaceholder: {
      type: String,
      default: "Whole class feedback",
    },
  },
};
</script>

<style>
.talkie-feedback-card-wrapper {
  display: flex;
  background-color: var(--t-white);
  width: fit-content;
  padding: var(--t-space-16);
  gap: var(--t-space-16);
  border-radius: var(--t-br-large);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.talkie-feedback-card-input-wrapper {
  width: 100%;
}
.talkie-feedback-card-input-wrapper * {
  background: transparent !important;
}
.talkie-feedback-card-options {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
</style>

<template>
  <div
    :class="[
      'talkie-student-card-wrapper',
      fullWidth && 'talkie-student-card-fullwidth-wrapper',
    ]"
  >
    <!-- Left Content -->
    <div class="talkie-student-card-details-wrapper">
      <!-- Feedback Mode -->
      <template v-if="mode === 'feedback'">
        <img
          class="talkie-student-card-details-image"
          :src="studentAvatar"
          v-if="studentAvatar"
        />
        <p class="p" style="margin-bottom: 0 !important" v-if="studentName">
          {{ studentName }}
        </p>
      </template>
    </div>

    <!-- Right Content -->
    <div class="talkie-student-card-options">
      <!-- Feedback Mode -->
      <template v-if="mode === 'feedback'">
        <talkie-icon
          :name="'play'"
          :isActive="true"
          :variant="'primary'"
          :size="40"
          :iconToSizeRatio="1.1"
        />
        <talkie-icon
          :name="'mike-unmuted'"
          :isActive="true"
          :variant="'secondary'"
          :size="40"
          :iconToSizeRatio="1.1"
        />
        <talkie-icon
          :name="'star'"
          :isActive="true"
          :variant="'primary'"
          :size="40"
          :iconToSizeRatio="1.1"
        />
      </template>
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
    mode: {
      type: String,
      validator: (val) => ["feedback"].includes(val),
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    // feedback
    studentName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
  },
};
</script>

<style>
.talkie-student-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--t-white);
  width: fit-content;
  border-radius: var(--t-br-large);
  padding: var(--t-space-16);
  gap: var(--t-space-16);
}
.talkie-student-card-fullwidth-wrapper {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.talkie-student-card-details-wrapper {
  display: flex;
  align-items: center;
  gap: var(--t-space-24);
}
.talkie-student-card-details-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--t-space-70);
  min-width: var(--t-space-70);
  height: var(--t-space-70);
  width: var(--t-space-70);
}
.talkie-student-card-options {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
</style>

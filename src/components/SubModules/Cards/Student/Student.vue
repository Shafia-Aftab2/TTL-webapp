<template>
  <div
    :class="[
      'talkie-student-card-wrapper',
      fullWidth && 'talkie-student-card-fullwidth-wrapper',
      computedShouldWrap && 'talkie-student-card-wrap-content-wrapper',
      customClass.toString(),
    ]"
  >
    <!-- Left Content -->
    <div class="talkie-student-card-details-wrapper">
      <!-- Feedback Mode | Info Mode | Manage Mode | Points Mode -->
      <template
        v-if="
          mode === 'feedback' ||
          mode === 'info' ||
          mode === 'manage' ||
          mode === 'points'
        "
      >
        <img
          class="talkie-student-card-details-image"
          :src="require(`@/assets/images/person-placeholder-image.png`)"
          v-if="!isValidAvatar(studentAvatar)"
        />
        <span
          class="talkie-student-card-details-image"
          v-if="isValidAvatar(studentAvatar)"
          v-html="studentAvatar"
        >
        </span>
        <div class="talkie-student-card-details-title">
          <p class="p" style="margin-bottom: 0 !important" v-if="studentName">
            {{ studentName }}
          </p>
          <p
            class="p talkie-student-card-details-subtitle"
            style="margin-bottom: 0 !important"
            v-if="studentSchoolName"
          >
            {{ studentSchoolName }}
          </p>
        </div>
      </template>

      <!-- Add Mode -->
      <template v-if="mode === 'add'">
        <p
          class="p talkie-student-card-details-title"
          style="margin-bottom: 0 !important"
        >
          Add Student
        </p>
      </template>

      <!-- Question Mode -->
      <template v-if="mode === 'question'">
        <p
          class="p talkie-student-card-details-title"
          style="margin-bottom: 0 !important"
          v-if="questionText"
        >
          {{ questionText }}
        </p>
      </template>
    </div>

    <!-- Right Content -->
    <div
      :class="[
        'talkie-student-card-options',
        currentRecording && 'talkie-student-card-options-wrap-content',
      ]"
      v-if="actionButton"
    >
      <!-- Feedback Mode || Question Mode -->
      <template v-if="mode === 'feedback' || mode === 'question'">
        <!-- Source Record || Player -->
        <talkie-audio-player
          v-slot="{ isPlaying, startPlayer, stopPlayer }"
          :source="studentResponseAudio"
          v-if="studentResponseAudio"
        >
          <span class="talkie-student-card-options-audio-player-icons">
            <talkie-icon
              :name="'play'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="startPlayer"
              v-if="!isPlaying"
            />
            <talkie-icon
              :name="'pause'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="stopPlayer"
              v-if="isPlaying"
            />
          </span>
        </talkie-audio-player>
        <!-- New Recording || Recorder, Player, Reset And Send -->
        <div
          class="talkie-student-card-options-spacer"
          v-if="currentRecording"
        ></div>
        <talkie-audio-recorder
          v-slot="{ startRecording, stopRecording, isRecording }"
          :onRecordingStopped="handleRecordedItem"
          v-if="!currentRecording"
        >
          <talkie-icon
            :name="'mike-unmuted'"
            :isActive="true"
            :variant="'secondary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="startRecording"
            v-if="!isRecording"
          />
          <talkie-icon
            :name="'square'"
            :isActive="true"
            :variant="'secondary'"
            :size="40"
            :iconToSizeRatio="1.5"
            :customClass="'talkie-student-card-stop-recording-button'"
            :onClick="stopRecording"
            v-if="isRecording"
          />
        </talkie-audio-recorder>
        <talkie-audio-player
          v-slot="{
            isPlaying,
            togglePlayer,
            totalAudioPlaybackTime,
            currentAudioPlaybackTime,
          }"
          :recording="currentRecording"
          v-if="currentRecording"
        >
          <span class="talkie-student-card-options-audio-timestamps">
            {{ currentAudioPlaybackTime }} /
            {{ totalAudioPlaybackTime }}
          </span>
          <span class="talkie-student-card-options-audio-player-icons">
            <talkie-icon
              :name="'play'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="togglePlayer"
              v-if="!isPlaying"
            />
            <talkie-icon
              :name="'pause'"
              :isActive="true"
              :variant="'primary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="togglePlayer"
              v-if="isPlaying"
            />
            <talkie-icon
              :name="'arrow-rounded-left'"
              :isActive="true"
              :variant="'secondary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="handleRecordingReset"
            />
            <talkie-icon
              :name="'send'"
              :isActive="true"
              :variant="'secondary'"
              :size="40"
              :iconToSizeRatio="1.1"
              :onClick="handleRecordingSendClick"
            />
          </span>
        </talkie-audio-player>
        <div
          class="talkie-student-card-options-spacer"
          v-if="currentRecording"
        ></div>
        <!-- Feedback Stars -->
        <talkie-icon
          :name="'star'"
          :isActive="true"
          :variant="'primary'"
          :size="40"
          :iconToSizeRatio="1.1"
          :onClick="onRatingStarClick"
        />
      </template>

      <!-- Info Mode -->
      <template v-if="mode === 'info'">
        <talkie-icon
          :name="'arrow-head-right'"
          :variant="'secondary'"
          :size="40"
          :iconToSizeRatio="1.1"
          :onClick="onInfoClick"
        />
      </template>

      <!-- Manage Mode -->
      <template v-if="mode === 'manage'">
        <talkie-icon
          :name="'key'"
          :isActive="true"
          :variant="'neutral'"
          :size="40"
          :iconToSizeRatio="1.2"
          :onClick="onKeyClick"
        />
        <talkie-icon
          :name="'trash'"
          :isActive="true"
          :variant="'neutral'"
          :size="40"
          :iconToSizeRatio="1.4"
          :onClick="onDeleteClick"
        />
      </template>

      <!-- Add Mode -->
      <template v-if="mode === 'add'">
        <talkie-icon
          :name="'plus-rounded'"
          :isActive="true"
          :variant="'neutral'"
          :size="40"
          :iconToSizeRatio="1.2"
          :onClick="onAddClick"
        />
      </template>

      <!-- Points Mode -->
      <template v-if="mode === 'points'">
        <h5 class="h5" v-if="studentPoints">{{ studentPoints }} points</h5>
      </template>
    </div>
  </div>
</template>

<script>
import { TalkieIcon } from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
} from "@/components/SubModules/AudioManager";

export default {
  name: "FeedbackCard",
  data() {
    return {
      currentRecording: null,
    };
  },
  components: {
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
  },
  props: {
    mode: {
      type: String,
      validator: (val) =>
        ["feedback", "info", "manage", "add", "points", "question"].includes(
          val
        ),
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    actionButton: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: "",
    },
    // feedback
    // info
    // manage
    // points
    studentName: {
      type: String,
    },
    studentSchoolName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
    // feedback
    studentResponseAudio: {
      type: String,
    },
    onFeedbackRecording: {
      type: Function,
      default: () => {},
    },
    onFeedbackRecordingDiscard: {
      type: Function,
      default: () => {},
    },
    onFeedbackSendClick: {
      type: Function,
      default: () => {},
    },
    onRatingStarClick: {
      type: Function,
      default: () => {},
    },
    // info
    onInfoClick: {
      type: Function,
      default: () => {},
    },
    // manage
    onKeyClick: {
      type: Function,
      default: () => {},
    },
    onDeleteClick: {
      type: Function,
      default: () => {},
    },
    // points
    studentPoints: {
      type: String,
    },
    // add
    onAddClick: {
      type: Function,
      default: () => {},
    },
    // question
    questionText: {
      type: String,
    },
  },
  methods: {
    isValidAvatar(avatar) {
      return avatar?.toString()?.includes("svg");
    },
    handleRecordedItem(recording) {
      this.currentRecording = recording;
      this.onFeedbackRecording && this.onFeedbackRecording(recording);
    },
    handleRecordingReset() {
      this.currentRecording = null;
      this.onFeedbackRecordingDiscard && this.onFeedbackRecordingDiscard();
    },
    async handleRecordingSendClick() {
      this.currentRecording = null;
      this.onFeedbackSendClick && (await this.onFeedbackSendClick());
    },
  },
  computed: {
    computedShouldWrap() {
      if (["feedback", "question"].includes(this.mode)) {
        return true;
      }
      return false;
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
}
.talkie-student-card-details-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
}
.talkie-student-card-details-title {
  display: flex;
  flex-direction: column;
}
.talkie-student-card-details-subtitle {
  font-size: 0.9em;
  color: var(--t-gray);
}
.talkie-student-card-options {
  display: flex;
  align-items: center;
}
.talkie-student-card-options-spacer {
  background: var(--t-primary);
  border-radius: var(--t-br-large);
}
.talkie-student-card-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}
.talkie-student-card-options-audio-timestamps {
  background: var(--t-primary);
  padding: var(--t-space-3) var(--t-space-5);
  border-radius: var(--t-br-medium);
  text-align: center;
  white-space: nowrap;
}
.talkie-student-card-options-audio-player-icons {
  display: flex;
  align-items: center;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-student-card-wrapper {
    border-radius: var(--t-br-small);
    padding: var(--t-space-12);
    gap: var(--t-space-12);
  }
  .talkie-student-card-wrap-content-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .talkie-student-card-details-wrapper {
    gap: var(--t-space-12);
  }
  .talkie-student-card-details-image {
    --image-size: var(--t-space-56);
  }
  .talkie-student-card-details-title {
    padding: 0 var(--t-space-8);
    gap: var(--t-space-3);
  }
  .talkie-student-card-options {
    gap: var(--t-space-12);
  }
  .talkie-student-card-options-wrap-content {
    flex-direction: column;
    gap: var(--t-space-12);
  }
  .talkie-student-card-options-spacer {
    width: calc(var(--t-space-50) * 2);
    height: var(--t-space-3);
  }
  .talkie-student-card-stop-recording-button {
    border-width: var(--t-space-2);
  }
  .talkie-student-card-options-audio-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .talkie-student-card-options-audio-player-icons {
    gap: var(--t-space-8);
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .talkie-student-card-wrap-content-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .talkie-student-card-options-wrap-content {
    flex-direction: column;
    gap: var(--t-space-12);
  }
  .talkie-student-card-options-spacer {
    width: calc(var(--t-space-50) * 2);
    height: var(--t-space-5);
  }
}
@media (min-width: 600px) {
  .talkie-student-card-wrapper {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-16);
    gap: var(--t-space-16);
  }
  .talkie-student-card-details-wrapper {
    gap: var(--t-space-16);
  }
  .talkie-student-card-details-image {
    --image-size: var(--t-space-63);
  }
  .talkie-student-card-details-title {
    padding: 0 var(--t-space-8);
    gap: var(--t-space-5);
  }
  .talkie-student-card-options {
    gap: var(--t-space-12);
  }
  .talkie-student-card-options-wrap-content {
    gap: var(--t-space-16);
  }
  .talkie-student-card-stop-recording-button {
    border-width: var(--t-space-3);
  }
  .talkie-student-card-options-audio-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .talkie-student-card-options-audio-player-icons {
    gap: var(--t-space-12);
  }
}
@media (min-width: 900px) {
  .talkie-student-card-wrapper {
    border-radius: var(--t-br-large);
  }
  .talkie-student-card-options-spacer {
    height: var(--t-space-50);
    width: var(--t-space-5);
  }
}
@media (min-width: 1200px) {
  .talkie-student-card-details-wrapper {
    gap: var(--t-space-24);
  }
  .talkie-student-card-details-image {
    --image-size: var(--t-space-70);
  }
  .talkie-student-card-options-wrap-content {
    gap: var(--t-space-24);
  }
  .talkie-student-card-options-audio-timestamps {
    font-size: var(--t-fs-small);
  }
}
</style>

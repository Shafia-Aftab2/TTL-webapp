<template>
  <div class="class-practice-wrapper">
    <div class="class-practice-header-wrapper">
      <a class="class-practice-header-wrapper-link" v-if="currentTask.canExit">
        &#8592; Exit
      </a>
      <h4 class="h4" v-if="currentTask.title">{{ currentTask.title }}</h4>
      <a class="class-practice-header-wrapper-link" v-if="currentTask.canFinish"
        >Finish &#8594;
      </a>
    </div>

    <div class="class-practice-body-wrapper">
      <div class="class-practice-body-head-wrapper">
        <p class="p" v-if="currentTask.topic">{{ currentTask.topic }}</p>
        <talkie-tool-tip
          :tooltip="currentTask.instructions"
          v-if="currentTask.instructions"
        >
          <h5 class="h5 class-practice-body-head-wrapper-instructions">
            <p class="p">Instructions</p>
          </h5>
        </talkie-tool-tip>
      </div>

      <div class="class-practice-body-content-wrapper">
        <!-- Caption this -->
        <template
          v-if="
            currentTask.type === taskTypes.CAPTION_THIS &&
            currentTask.captionImage
          "
        >
          <img
            :src="currentTask.captionImage"
            class="class-practice-body-content-wrapper-caption-image"
          />
        </template>

        <!-- Emoji story -->
        <template
          v-if="
            currentTask.type === taskTypes.EMOJI_STORY && currentTask.emojis
          "
        >
          <div class="class-practice-body-content-wrapper-emojis-wrapper">
            <template v-for="emojiURL in currentTask.emojis" :key="emojiURL">
              <img
                :draggable="false"
                :src="emojiURL"
                class="class-practice-body-content-wrapper-emojis-image-item"
              />
            </template>
          </div>
        </template>

        <!-- Translation -->
        <template
          v-if="
            currentTask.type === taskTypes.TRANSLATION &&
            currentTask.translation
          "
        >
          <div class="class-practice-body-content-wrapper-translations-wrapper">
            <h4
              class="h4 class-practice-body-content-wrapper-translations-question-header"
              v-if="currentTask.translation.question"
            >
              <span
                class="class-practice-body-content-wrapper-translations-question-wrapper"
              >
                Question
              </span>
              {{ currentTask.translation.question }}
            </h4>

            <h4
              class="h4 class-practice-body-content-wrapper-translations-answer-header"
              v-if="currentTask.translation.answer"
            >
              <span
                class="class-practice-body-content-wrapper-translations-answer-wrapper"
              >
                Answer
              </span>
              {{ currentTask.translation.answer }}
            </h4>

            <div
              class="class-practice-body-content-wrapper-translations-self-assessment-wrapper"
            >
              <h5 class="h5">Self-assessment:</h5>
              <p class="p">
                Now, listen back to your recording and compare! How did you get
                on?
              </p>
            </div>
          </div>
        </template>
      </div>

      <!-- Recorder -->
      <div
        class="class-practice-body-footer-wrapper"
        v-if="currentTask.shouldRecord"
      >
        <!-- Player -->
        <div
          class="class-practice-body-footer-wrapper-audio-player"
          v-if="currentRecording"
        >
          <talkie-audio-player
            v-slot="{
              isPlaying,
              togglePlayer,
              currentAudioPercentage,
              updateAudioPercentage,
              totalAudioPlaybackTime,
              currentAudioPlaybackTime,
            }"
            :recording="currentRecording"
          >
            <span hidden>
              <!-- TODO: updated these states via a handler -->
              {{ (this.isAudioPlaying = isPlaying) }}
              {{ (this.handleAudioPlayerToggle = togglePlayer) }}
            </span>
            <div
              class="class-practice-body-footer-wrapper-options-audio-player-wrapper"
            >
              <talkie-audio-timeline
                :percentage="currentAudioPercentage"
                :onHeadChange="updateAudioPercentage"
              />
              <span
                class="class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps"
                >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
              </span>
            </div>
          </talkie-audio-player>
        </div>

        <talkie-audio-recorder
          v-slot="{ startRecording, stopRecording, isRecording }"
          :onRecordingStopped="handleRecordedItem"
        >
          <!-- Temp -->
          <span hidden>
            {{ (this.errors = /{voiceForQnA: null}/) }}
          </span>
          <div class="class-practice-body-footer-wrapper-options">
            <div class="class-practice-body-footer-wrapper-options-item">
              <talkie-icon
                :name="'arrow-rounded-left'"
                :isActive="true"
                :variant="'secondary'"
                :size="30"
                :onClick="handleRecordedItemReset"
              />
              <p
                :class="[
                  'class-practice-body-footer-wrapper-options-item-label',
                  !currentRecording &&
                    'class-practice-body-footer-wrapper-options-item-label-non-visiable',
                ]"
              >
                Redo
              </p>
            </div>
            <div class="class-practice-body-footer-wrapper-options-item">
              <talkie-icon
                :name="'mike-unmuted'"
                :isActive="true"
                :variant="'secondary'"
                :size="50"
                :onClick="startRecording"
                :customClass="
                  errors.voiceForQnA &&
                  'class-practice-body-footer-wrapper-options-mike-unmuted-button-error'
                "
                v-if="!isRecording && !currentRecording"
              />
              <talkie-icon
                :name="'square'"
                :isActive="true"
                :variant="'secondary'"
                :size="50"
                :iconToSizeRatio="1.5"
                :customClass="'class-practice-body-footer-wrapper-options-stop-recording-button'"
                :onClick="stopRecording"
                v-if="isRecording && !currentRecording"
              />
              <talkie-icon
                :name="'play'"
                :isActive="true"
                :variant="'primary'"
                :size="50"
                :onClick="handleAudioPlayerToggle"
                v-if="!isRecording && !isAudioPlaying && currentRecording"
              />
              <talkie-icon
                :name="'pause'"
                :isActive="true"
                :variant="'primary'"
                :size="50"
                :onClick="handleAudioPlayerToggle"
                v-if="!isRecording && isAudioPlaying && currentRecording"
              />
              <p
                :class="[
                  'class-practice-body-footer-wrapper-options-item-label',
                  errors.voiceForQnA &&
                    'class-practice-body-footer-wrapper-options-item-label-error',
                ]"
              >
                {{
                  !!errors.voiceForQnA
                    ? errors.voiceForQnA
                    : !currentRecording
                    ? "Tap To Record"
                    : !isAudioPlaying
                    ? "Play"
                    : "Pause"
                }}
              </p>
            </div>
            <div class="class-practice-body-footer-wrapper-options-item">
              <talkie-icon
                :type="'submit'"
                :name="'send'"
                :isActive="true"
                :variant="'secondary'"
                :size="30"
              />
              <p
                :class="[
                  'class-practice-body-footer-wrapper-options-item-label',
                  !currentRecording &&
                    'class-practice-body-footer-wrapper-options-item-label-non-visiable',
                ]"
              >
                Preview send
              </p>
            </div>
          </div>
        </talkie-audio-recorder>
      </div>
    </div>
  </div>
</template>

<script>
import { TalkieToolTip, TalkieIcon } from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { taskTypes } from "@/utils/constants";

export default {
  name: "ClassPractice",
  components: {
    TalkieToolTip,
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
  },
  data() {
    const _tasks = [
      {
        title: "Caption This",
        canExit: true,
        canFinish: true,
        topic: "Topic: ✈️ Travel and tourism",
        type: taskTypes.CAPTION_THIS,
        captionImage: require(`@/assets/images/caption-this.png`),
        shouldRecord: true,
        instructions: `
        What can you say about the photo?

        You have several options here. You can:
        — Describe what you see on the photo.
        — Give your opinion on the photo.
        — Use the photo as prompt to talk about your own experiences or come up with your own short story in Spanish!

        Don't worry if you haven't got enough vocabulary yet. Don't let that stop you! Express yourself by using words you already know, experiment with the words you've just learnt in class. There's no right or wrong answer here. Have a go with or without your notes from class.

        Some key phrases to get you started:

        En la foto se puede ver... - In the photo, one/you can see...
        En esta foto, puedo ver... - In this photo, I can see...
        (No) me gusta esta foto porque...  - I don't like
        `,
      },
      {
        title: "Emoji Story",
        canExit: true,
        canFinish: true,
        topic: "Topic: ✈️ Travel and tourism",
        type: taskTypes.EMOJI_STORY,
        emojis: [
          `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png`,
          `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png`,
          `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png`,
          `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png`,
          `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png`,
        ],
        shouldRecord: true,
        instructions: `
        What can you say about the photo?

        You have several options here. You can:
        — Describe what you see on the photo.
        — Give your opinion on the photo.
        — Use the photo as prompt to talk about your own experiences or come up with your own short story in Spanish!

        Don't worry if you haven't got enough vocabulary yet. Don't let that stop you! Express yourself by using words you already know, experiment with the words you've just learnt in class. There's no right or wrong answer here. Have a go with or without your notes from class.

        Some key phrases to get you started:

        En la foto se puede ver... - In the photo, one/you can see...
        En esta foto, puedo ver... - In this photo, I can see...
        (No) me gusta esta foto porque...  - I don't like
        `,
      },
      {
        title: "Translation",
        canExit: true,
        canFinish: true,
        topic: "Topic: ✈️ Travel and tourism",
        type: taskTypes.TRANSLATION,
        translation: {
          question: "I cannot live without my phone and the internet.",
          answer: "No puedo vivir sin mi telefono e internet.",
        },
        shouldRecord: true,
        instructions: `
        What can you say about the photo?

        You have several options here. You can:
        — Describe what you see on the photo.
        — Give your opinion on the photo.
        — Use the photo as prompt to talk about your own experiences or come up with your own short story in Spanish!

        Don't worry if you haven't got enough vocabulary yet. Don't let that stop you! Express yourself by using words you already know, experiment with the words you've just learnt in class. There's no right or wrong answer here. Have a go with or without your notes from class.

        Some key phrases to get you started:

        En la foto se puede ver... - In the photo, one/you can see...
        En esta foto, puedo ver... - In this photo, I can see...
        (No) me gusta esta foto porque...  - I don't like
        `,
      },
    ];

    return {
      currentRecording: null,
      isAudioPlaying: false,
      handleAudioPlayerToggle: () => {},
      // temp:
      errors: {
        voiceForQnA: null,
      },
      tasks: _tasks,
      currentTask: _tasks[2],
      taskTypes: taskTypes,
    };
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
    },
  },
};
</script>

<style scoped>
.class-practice-wrapper {
  width: 100%;
  margin-top: var(--t-space-50);
  margin-bottom: calc(var(--t-space-70) * 2);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-16);
}
.class-practice-header-wrapper {
  width: 100%;
  align-items: baseline;
  text-align: center;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
}
.class-practice-header-wrapper-link {
  text-decoration: none;
}
.class-practice-body-wrapper {
  background: var(--t-white);
  border-radius: var(--t-br-large);
  padding: var(--t-space-64);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-36);
}
.class-practice-body-head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-head-wrapper-instructions {
  text-decoration: underline;
  text-underline-offset: var(--t-space-3);
  cursor: pointer;
}
.class-practice-body-content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 500px;
}
.class-practice-body-content-wrapper-caption-image {
  flex: none;
  width: 100%;
  height: 100%;
}
.class-practice-body-content-wrapper-emojis-wrapper {
  display: flex;
  user-select: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.class-practice-body-content-wrapper-emojis-image-item {
  flex: none;
  user-select: none;
}
.class-practice-body-content-wrapper-translations-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.class-practice-body-content-wrapper-translations-question-wrapper,
.class-practice-body-content-wrapper-translations-answer-wrapper {
  border-radius: var(--t-br-small);
}
.class-practice-body-content-wrapper-translations-question-wrapper {
  color: var(--t-black);
  background: var(--t-primary);
}
.class-practice-body-content-wrapper-translations-question-header {
  line-height: 1.5;
}
.class-practice-body-content-wrapper-translations-answer-wrapper {
  color: var(--t-black-50);
  background: var(--t-secondary);
}
.class-practice-body-content-wrapper-translations-answer-header {
  color: var(--t-secondary);
  line-height: 1.5;
}
.class-practice-body-content-wrapper-translations-self-assessment-wrapper {
  background: var(--t-gray-100);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-8);
  padding: var(--t-space-16);
  margin-top: var(--t-space-16);
  border-radius: var(--t-br-small);
  line-height: 1.2;
}
.class-practice-body-footer-wrapper {
  position: relative;
}
.class-practice-body-footer-wrapper-audio-player {
  margin: auto;
  padding-bottom: var(--t-space-36);
}
.class-practice-body-footer-wrapper-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.class-practice-body-footer-wrapper-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-footer-wrapper-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.class-practice-body-footer-wrapper-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.class-practice-body-footer-wrapper-options-item-label-error {
  color: var(--t-red);
}
.class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.class-practice-body-footer-wrapper-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-12);
    max-width: 100%;
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-58);
    height: var(--t-space-58);
  }
  .class-practice-body-content-wrapper-translations-wrapper {
    max-width: 100%;
    gap: var(--t-space-12);
  }
  .class-practice-body-content-wrapper-translations-question-wrapper,
  .class-practice-body-content-wrapper-translations-answer-wrapper {
    padding: var(--t-space-3) var(--t-space-5);
    font-size: 0.9em;
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 100%;
  }
}
@media (min-width: 600px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-16);
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-64);
    height: var(--t-space-64);
  }
  .class-practice-body-content-wrapper-translations-wrapper {
    max-width: 80%;
    gap: var(--t-space-24);
  }
  .class-practice-body-content-wrapper-translations-question-wrapper,
  .class-practice-body-content-wrapper-translations-answer-wrapper {
    padding: var(--t-space-5);
    font-size: 0.9em;
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 80%;
  }
}
@media (min-width: 1200px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-practice-body-footer-wrapper-options-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-16);
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-70);
    height: var(--t-space-70);
  }
  .class-practice-body-content-wrapper-translations-wrapper {
    max-width: 70%;
    gap: var(--t-space-30);
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 70%;
  }
}
</style>

<template>
  <talkie-form
    v-slot="{ errors, setValue, values, triggerFormSubmit }"
    :validationSchema="createQandATopicSchema"
    :onSubmit="handleSubmit"
    :customClass="'class-start-convo-wrapper'"
  >
    <span hidden>
      <!-- TODO: updated these states via a handler -->
      {{ (this.setFormValue = setValue) }}
      {{ (this.triggerFormSubmission = triggerFormSubmit) }}
    </span>
    <talkie-modal
      v-if="modalPreview"
      :contentPadded="true"
      :buttonsOutSideModal="modalPreviewButtons"
    >
      <talkie-question-card
        :title="values.title"
        :topic="values.topic"
        :description="values.questionText"
        :audioRecording="currentRecording"
        :fullWidth="false"
      />
    </talkie-modal>
    <h2 class="class-start-convo-header h2">Start a conversation now?</h2>
    <talkie-audio-recorder
      v-slot="{ startRecording, stopRecording, isRecording }"
      :onRecordingStopped="handleRecordedItem"
    >
      <div class="class-start-convo-form">
        <talkie-select
          :name="'topic'"
          :placeholder="'Choose topic'"
          :options="topics.map((x) => x.name)"
          :hint="{
            type: errors.topic ? 'error' : null,
            message: errors.topic ? errors.topic : null,
          }"
        />
        <talkie-input
          :name="'title'"
          :placeholder="'Title (required)'"
          :hint="{
            type: errors.title ? 'error' : null,
            message: errors.title ? errors.title : null,
          }"
        />
        <talkie-input
          :multiline="true"
          :name="'questionText'"
          :placeholder="'Question text (optional)'"
        />
        <!-- TODO: hide this filed via a class -->
        <talkie-input
          :name="'voiceForQnA'"
          :placeholder="'Audio Recording Url/Blob'"
          hidden
        />
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
          v-if="currentRecording"
        >
          <span hidden>
            <!-- TODO: updated these states via a handler -->
            {{ (this.isAudioPlaying = isPlaying) }}
            {{ (this.handleAudioPlayerToggle = togglePlayer) }}
          </span>
          <div class="class-start-convo-form-options-audio-player-wrapper">
            <talkie-audio-timeline
              :percentage="currentAudioPercentage"
              :onHeadChange="updateAudioPercentage"
            />
            <span class="class-start-convo-form-options-audio-player-timestamps"
              >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
            </span>
          </div>
        </talkie-audio-player>
        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          :animateEllipse="formStatus.animateEllipse"
          v-if="formStatus.type && formStatus.message"
        />
      </div>
      <div class="class-start-convo-form-options-wrapper">
        <div class="class-start-convo-form-options">
          <div class="class-start-convo-form-options-item">
            <talkie-icon
              :name="'arrow-rounded-left'"
              :isActive="true"
              :variant="'secondary'"
              :size="30"
              :onClick="handleRecordedItemReset"
            />
            <p
              :class="[
                'class-start-convo-form-options-item-label',
                !currentRecording &&
                  'class-start-convo-form-options-item-label-non-visiable',
              ]"
            >
              Redo
            </p>
          </div>
          <div class="class-start-convo-form-options-item">
            <talkie-icon
              :name="'mike-unmuted'"
              :isActive="true"
              :variant="'secondary'"
              :size="50"
              :onClick="startRecording"
              :customClass="
                errors.voiceForQnA &&
                'class-start-convo-form-options-mike-unmuted-button-error'
              "
              v-if="!isRecording && !currentRecording"
            />
            <talkie-icon
              :name="'square'"
              :isActive="true"
              :variant="'secondary'"
              :size="50"
              :iconToSizeRatio="1.5"
              :customClass="'class-start-convo-form-options-stop-recording-button'"
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
                'class-start-convo-form-options-item-label',
                errors.voiceForQnA &&
                  'class-start-convo-form-options-item-label-error',
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
          <div class="class-start-convo-form-options-item">
            <talkie-icon
              :type="'submit'"
              :name="'send'"
              :isActive="true"
              :variant="'secondary'"
              :size="30"
            />
            <p
              :class="[
                'class-start-convo-form-options-item-label',
                !currentRecording &&
                  'class-start-convo-form-options-item-label-non-visiable',
              ]"
            >
              Preview send
            </p>
          </div>
        </div>
      </div>
    </talkie-audio-recorder>
  </talkie-form>
  <div class="class-start-convo-footer">
    <a href="#" class="class-start-convo-footer-link">Not now</a>
  </div>
</template>

<script>
import {
  TalkieInput,
  TalkieSelect,
  TalkieIcon,
  TalkieAlert,
  TalkieForm,
  TalkieModal,
  TalkieLoader,
} from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { createQandATopicSchema } from "@/utils/validations/task.validation";
import { FileService, TaskService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";

export default {
  name: "ClassTaskCreate",
  components: {
    TalkieInput,
    TalkieSelect,
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieAlert,
    TalkieForm,
    TalkieModal,
    TalkieLoader,
    TalkieQuestionCard,
  },
  data() {
    return {
      topics: [
        {
          name: "⚽️ Free-time activities",
          id: "61b2328bea1d9f1e29e4032a",
        },
        {
          name: "✈️ Travel and tourism",
          id: "61b2328bea1d9f1e29e4032c",
        },
        {
          name: "🍔 Food and drink",
          id: "61b2328bea1d9f1e29e4032d",
        },
        {
          name: "🤳 Social media and technology",
          id: "61b2328bea1d9f1e29e4032f",
        },
        {
          name: "😊 My family and friends",
          id: "61b2328bea1d9f1e29e40320",
        },
        {
          name: "🏡 Where I live",
          id: "61b2328bea1d9f1e29e4032b",
        },
        {
          name: "🐶 Pets",
          id: "61b2328bea1d9f1e29e4032e",
        },
        {
          name: "👖 Clothing",
          id: "61b2328bea1d9f1e29e4032g",
        },
      ],
      createQandATopicSchema: createQandATopicSchema,
      loading: false,
      formStatus: {
        type: null,
        message: null,
        animateEllipse: false,
      },
      currentRecording: null,
      isAudioPlaying: null,
      modalPreview: false,
      modalPreviewButtons: [
        {
          text: "Back",
          onClick: async () => {
            await this.handleModalToggle();
            await this.handleModalValidationReset();
          },
          variant: "light",
        },
        {
          text: "Send",
          onClick: async () => {
            await this.handleModalValidation();
            await this.handleModalToggle();
            await this.triggerFormSubmission();
          },
          variant: "primary",
        },
      ],
      shouldSubmit: false,
      handleAudioPlayerToggle: () => {},
      setFormValue: () => {},
      triggerFormSubmission: () => {},
      classId: null,
    };
  },
  async created() {
    // get class id from params
    const classId = this.$route.params.id;
    this.classId = classId;
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
      this.setFormValue("voiceForQnA", recording.blob);
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
      this.setFormValue("voiceForQnA", "");
    },
    handleModalToggle() {
      this.modalPreview = !this.modalPreview;
    },
    handleModalValidation() {
      this.shouldSubmit = true;
    },
    handleModalValidationReset() {
      this.shouldSubmit = false;
    },
    async handleFileUpload() {
      // update page state
      this.formStatus = {
        type: "info",
        message: "Uploading Audio",
        animateEllipse: true,
      };

      // payload
      const payload = new FormData();
      payload.append(
        "files",
        this.currentRecording.blob,
        `talkie-audio-${Math.random() * 123456789}.mp3`
      );

      // api call
      const response = await FileService.Upload(
        { purpose: FilePurposes.TASK_VOICE },
        payload
      ).catch(() => null);

      // error case
      if (!response) return null;

      // success case
      const uploadedFile = response.data[0].s3Url;
      this.formStatus = { type: null, message: null, animateEllipse: false };
      return uploadedFile;
    },
    async handleSubmit(values) {
      if (!this.shouldSubmit) {
        this.handleModalToggle();
        this.handleModalValidationReset();
        return;
      }

      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null, animateEllipse: false };

      // upload file
      const voiceForQnA = await this.handleFileUpload();

      // failure case
      if (!voiceForQnA) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: "Could not upload audio file..!",
        };
        return;
      }

      // form data
      const { title, topic: topicName, questionText } = values;

      const topicId = this.topics.find((x) => x.name === topicName).id;

      // payload
      const payload = {
        title,
        topic: topicId,
        type: TaskTypes.QUESTION_ANSWER,
        voiceForQnA,
      };
      if (questionText) payload.questionText = questionText;

      // api call
      const response = await TaskService.Create(this.classId, payload).catch(
        (e) => {
          const errorMap = {
            ['"title" contains bad word']: "Title should not be unethical..!",
            ['"questiontext" contains bad word']:
              "Question text should not be unethical..!",
            ['"topic" must be a valid mongo id']: "Invalid Topic",
          };

          return {
            error:
              errorMap[e.response.data.message.toLowerCase()] ||
              "Could not create conversation..!",
          };
        }
      );

      // failure case
      if (response.error) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: response.error,
          animateEllipse: false,
        };
        return;
      }

      // success case
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Conversation Created. Redirecting..!",
        animateEllipse: false,
      };
      this.handleRedirection(`/classes/${this.classId}`, 3000);
    },
  },
};
</script>

<style scoped>
.class-start-convo-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.class-start-convo-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.class-start-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.class-start-convo-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.class-start-convo-form-options-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.class-start-convo-form-options-wrapper {
  position: relative;
}
.class-start-convo-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.class-start-convo-form-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.class-start-convo-form-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.class-start-convo-form-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.class-start-convo-form-options-item-label-error {
  color: var(--t-red);
}
.class-start-convo-form-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.class-start-convo-form-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}
.class-start-convo-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.class-start-convo-footer-link {
  text-decoration: underline;
}
.class-start-convo-footer-link,
.class-start-convo-footer-link:hover,
.class-start-convo-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-40);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .class-start-convo-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .class-start-convo-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .class-start-convo-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .class-start-convo-form-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .class-start-convo-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-start-convo-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-start-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-start-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .class-start-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-36);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .class-start-convo-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .class-start-convo-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .class-start-convo-form-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .class-start-convo-form-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .class-start-convo-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-start-convo-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-start-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-start-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 900px) {
  .class-start-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-start-convo-wrapper {
    padding: var(--t-space-48);
    padding-bottom: var(--t-space-58);
    margin-top: var(--t-space-48);
  }
  .class-start-convo-header {
    font-size: var(--font-size);
  }
  .class-start-convo-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .class-start-convo-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .class-start-convo-form-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .class-start-convo-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-start-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-50);
  }
  .class-start-convo-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

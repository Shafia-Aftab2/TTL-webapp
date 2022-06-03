<template>
  <!-- content -->
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ errors, setValue, values, triggerFormSubmit }"
      :initialValues="{
        topic: taskDetails?.topic,
        title: taskDetails?.title,
        questionText: taskDetails?.questionText,
      }"
      :validationSchema="updateQandATopicSchema"
      :onSubmit="handleSubmit"
      :customClass="'class-update-convo-wrapper'"
    >
      <span hidden>
        <!-- TODO: updated these states via a handler -->
        {{ (this.setFormValue = setValue) }}
        {{ (this.triggerFormSubmission = triggerFormSubmit) }}
      </span>
      <h2 class="class-update-convo-header h2">Edit task</h2>
      <div class="class-update-convo-form">
        <talkie-select-group
          :name="'topic'"
          :placeholder="'Choose topic'"
          :options="topicsGrouped?.length > 0 ? topicsGrouped : []"
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
          :placeholder="'Anything else you want to say? (optional)'"
        />
        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          :animateEllipse="formStatus.animateEllipse"
          v-if="formStatus.type && formStatus.message"
        />

        <!-- TODO: hide this filed via a class -->
        <talkie-input
          :name="'voiceForQnA'"
          :placeholder="'Audio Recording Url/Blob'"
          hidden
        />
        <!-- Audio player -->
        <talkie-audio-player
          v-slot="{
            isPlaying,
            togglePlayer,
            currentAudioPercentage,
            updateAudioPercentage,
            totalAudioPlaybackTime,
            currentAudioPlaybackTime,
          }"
          :source="currentRecordingIsFromSource && currentRecording"
          :recording="currentRecording"
          v-if="currentRecording"
        >
          <span hidden>
            <!-- TODO: updated these states via a handler -->
            {{ (this.isAudioPlaying = isPlaying) }}
            {{ (this.handleAudioPlayerToggle = togglePlayer) }}
          </span>
          <div class="class-update-task-form-options-audio-player-wrapper">
            <talkie-audio-timeline
              :percentage="currentAudioPercentage"
              :onHeadChange="updateAudioPercentage"
            />
            <span class="class-update-task-form-options-audio-player-timestamps"
              >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
            </span>
          </div>
        </talkie-audio-player>
        <!-- Preview modal -->
        <talkie-modal
          v-if="modalPreview"
          :contentPadded="true"
          :buttonsOutSideModal="modalPreviewButtons"
        >
          <talkie-question-card
            :title="values.title"
            :topic="values.topic"
            :description="values.questionText"
            :audioRecording="currentRecording || taskDetails.voiceForQnA"
            :fullWidth="false"
          />
        </talkie-modal>

        <talkie-audio-recorder
          v-slot="{ startRecording, stopRecording, isRecording }"
          :onRecordingStopped="handleRecordedItem"
        >
          <div class="class-update-task-form-options-wrapper">
            <div class="class-update-task-form-options">
              <div class="class-update-task-form-options-item">
                <talkie-icon
                  :name="'arrow-rounded-left'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="30"
                  :onClick="handleRecordedItemReset"
                />
                <p
                  :class="[
                    'class-update-task-form-options-item-label',
                    !currentRecording &&
                      'class-update-task-form-options-item-label-non-visiable',
                  ]"
                >
                  Redo
                </p>
              </div>
              <div class="class-update-task-form-options-item">
                <talkie-icon
                  :name="'mike-unmuted'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="50"
                  :onClick="startRecording"
                  :customClass="
                    errors.voiceForQnA &&
                    'class-update-task-form-options-mike-unmuted-button-error'
                  "
                  v-if="!isRecording && !currentRecording"
                />
                <talkie-icon
                  :name="'square'"
                  :isActive="true"
                  :variant="'success'"
                  :size="50"
                  :iconToSizeRatio="1.5"
                  :customClass="'class-update-task-form-options-stop-recording-button'"
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
                    'class-update-task-form-options-item-label',
                    isRecording
                      ? 'class-update-task-form-options-item-label-success'
                      : errors.voiceForQnA
                      ? 'class-update-task-form-options-item-label-error'
                      : '',
                  ]"
                >
                  {{
                    isRecording
                      ? "Recording"
                      : errors.voiceForQnA
                      ? errors.voiceForQnA
                      : !currentRecording
                      ? "Tap To Record"
                      : isAudioPlaying
                      ? "Pause"
                      : "Play"
                  }}
                </p>
              </div>
              <div class="class-update-task-form-options-item">
                <talkie-icon
                  :type="'submit'"
                  :name="'send'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="30"
                />
                <p
                  :class="[
                    'class-update-task-form-options-item-label',
                    !currentRecording &&
                      'class-update-task-form-options-item-label-non-visiable',
                  ]"
                >
                  Preview send
                </p>
              </div>
            </div>
          </div>
        </talkie-audio-recorder>
      </div>
    </talkie-form>
    <div class="class-update-convo-footer">
      <router-link
        :to="`/classes/${classId}`"
        class="class-update-convo-footer-link"
      >
        Not now
      </router-link>
    </div>
  </template>

  <!-- loading -->
  <template v-if="computedPageLoading">
    <div class="class-update-convo-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>

<script>
import {
  TalkieInput,
  // TalkieButton,
  TalkieSelectGroup,
  TalkieAlert,
  TalkieForm,
  TalkieLoader,
  TalkieIcon,
  TalkieModal,
} from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { updateQandATopicSchema } from "@/utils/validations/task.validation";
import { FileService, TaskService, ClassService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";
import topicTypes from "@/utils/constants/topicTypes";

export default {
  name: "ClassTaskUpdate",
  components: {
    TalkieInput,
    // TalkieButton,
    TalkieSelectGroup,
    TalkieAlert,
    TalkieForm,
    TalkieLoader,
    TalkieIcon,
    TalkieModal,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieQuestionCard,
  },
  data() {
    return {
      topics: [],
      updateQandATopicSchema: updateQandATopicSchema,
      pageLoading: false,
      loading: false,
      formStatus: {
        type: null,
        message: null,
        animateEllipse: false,
      },
      currentRecording: null,
      currentRecordingIsFromSource: null,
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
      taskId: null,
      classDetails: {},
      taskDetails: {},
      allowedTaskTypes: Object.values(TaskTypes),
      taskTypes: TaskTypes,
      topicsGrouped: [],
    };
  },
  computed: {
    computedPageLoading() {
      return this.pageLoading;
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // task id from params
    const taskId = this.$route.params.taskId;
    this.taskId = taskId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    this.topicsGrouped = [
      {
        title: capitalize(topicTypes.ADVANCED),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.ADVANCED)
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.INTERMEDIATE),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.INTERMEDIATE)
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.BEGINNER),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.BEGINNER)
          ?.map((x) => x?.name),
      },
    ];

    // task details (+ failure case)
    const taskDetails = await this.getTaskDetails(taskId);
    if (!taskDetails || taskDetails?.type !== TaskTypes.QUESTION_ANSWER)
      return this.$router.push("/404");

    // success case
    this.topics = classDetails?.topics;
    this.taskDetails = {
      topic: taskDetails?.topic?.name,
      title: taskDetails?.title,
      questionText: taskDetails?.questionText,
      voiceForQnA: taskDetails?.voiceForQnA,
    };
    this.currentRecording = taskDetails?.voiceForQnA;
    this.currentRecordingIsFromSource = true;
    // this.setFormValue("voiceForQnA", taskDetails?.voiceForQnA);
    this.pageLoading = false;
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
      this.setFormValue("voiceForQnA", recording.blob);
      this.currentRecordingIsFromSource = false;
      this.formStatus = {
        type: null,
        message: null,
        animateEllipse: false,
      };
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
      this.setFormValue("voiceForQnA", "");
      this.formStatus = {
        type: "info",
        message: `You have no recorded audio, Your original audio will be used.`,
        animateEllipse: false,
      };
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
    async handleFileUpload(file, filePurpose, fileName) {
      // payload
      const payload = new FormData();
      if (fileName) payload.append("files", file, fileName);
      else payload.append("files", file);

      // api call
      const response = await FileService.Upload(
        { purpose: filePurpose },
        payload
      ).catch(() => null);

      // error case
      if (!response) return null;

      // success case
      const uploadedFile = response.data[0].s3Url;
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

      // upload audio file if any
      let voiceForQnA = this.taskDetails?.voiceForQnA;
      if (this.currentRecording?.blob) {
        this.formStatus = {
          type: "info",
          message: `Uploading Audio`,
          animateEllipse: true,
          loading: true,
        };

        voiceForQnA = await this.handleFileUpload(
          this.currentRecording.blob,
          FilePurposes.TASK_VOICE,
          `talkie-${FilePurposes.TASK_VOICE}-${Math.random() * 123456789}.mp3`
        );

        // failure case
        if (!voiceForQnA) {
          this.loading = false;
          this.formStatus = {
            type: "error",
            message: "Could not upload audio file!",
            loading: false,
          };
          return;
        }
      }

      // form data
      const { title, topic: topicName, questionText } = values;
      const topicId = this?.topics?.find(
        (x) => x?.name?.trim() === topicName?.trim()
      )?.id;

      // payload
      const payload = {
        title,
        topic: topicId,
        voiceForQnA,
      };
      if (questionText) payload.questionText = questionText;

      // api call
      const response = await TaskService.Update(this.taskId, payload).catch(
        (e) => {
          const errorMap = {
            ['"title" contains bad word']: "Title should not be unethical!",
            ['"questiontext" contains bad word']:
              "Question text should not be unethical!",
            ['"topic" must be a valid mongo id']: "Invalid Topic",
          };

          return {
            error:
              errorMap[e.response.data.message.toLowerCase()] ||
              "Could not update task!",
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
        message: "Task Updated. Redirecting!",
        animateEllipse: false,
      };
      this.$router.push(
        `/classes/${this.classId}/tasks/${this.taskId}/status?status=edited`
      );
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getTaskDetails(id) {
      const response = await TaskService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
  },
};
</script>

<style scoped>
.class-update-convo-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.class-update-convo-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.class-update-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.class-update-convo-form-options {
  display: flex;
  margin: auto;
}

.class-update-task-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.class-update-task-form-options-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.class-update-task-form-options-wrapper {
  position: relative;
}
.class-update-task-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.class-update-task-form-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.class-update-task-form-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.class-update-task-form-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.class-update-task-form-options-item-label-success {
  color: var(--t-green);
}
.class-update-task-form-options-item-label-error {
  color: var(--t-red);
}
.class-update-task-form-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.class-update-task-form-options-stop-recording-button {
  border-color: var(--t-green) !important;
  border-style: solid !important;
}
.class-update-task-form-submit-button {
  margin: auto;
}
.class-update-convo-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.class-update-convo-footer-link {
  text-decoration: underline;
}
.class-update-convo-footer-link,
.class-update-convo-footer-link:hover,
.class-update-convo-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}
.class-update-convo-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-40);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .class-update-convo-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .class-update-task-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .class-update-task-form-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .class-update-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-update-task-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-update-task-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-update-task-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .class-update-task-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-create-task-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-create-task-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-create-task-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-update-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-36);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .class-update-convo-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .class-update-task-form-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .class-update-task-form-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .class-update-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-update-task-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-update-task-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-update-task-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .class-update-task-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-create-task-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-create-task-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-create-task-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-update-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 900px) {
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-48);
    padding-bottom: var(--t-space-58);
    margin-top: var(--t-space-48);
  }
  .class-update-convo-header {
    font-size: var(--font-size);
  }
  .class-update-convo-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .class-update-task-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .class-update-task-form-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .class-update-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-update-task-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-update-task-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-create-task-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-50);
  }
  .class-create-task-footer-link {
    font-size: var(--t-fs-small);
  }
  .class-create-task-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-50);
  }
  .class-update-convo-footer-link {
    font-size: var(--t-fs-small);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
}
</style>

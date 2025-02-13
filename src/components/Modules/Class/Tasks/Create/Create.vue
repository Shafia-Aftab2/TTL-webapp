<template>
  <!-- content -->
  <template v-if="!computedPageLoading">
    <template v-if="topicsGrouped.length === 0">
      <div class="class-create-task-wrapper text-center align-center">
        <img
          :src="require(`@/assets/images/warning-logo.png`)"
          class="error-image"
        />
        <h3 class="h3">No Topics Selected</h3>
        <p class="p">
          It looks like you have not added any topic to this class. Topics are
          required to create a task in your class.
          <br />
          <br />
          You can choose topics from the class management panel
        </p>
        <talkie-button :onClick="redirectToClassManagement">
          Go to Class Management
        </talkie-button>
      </div>
    </template>
    <template v-if="topicsGrouped.length > 0">
      <talkie-form
        v-slot="{ errors, setValue, values, triggerFormSubmit }"
        :validationSchema="computedValidationSchema"
        :onSubmit="handleSubmit"
        :customClass="'class-create-task-wrapper'"
      >
        <span hidden>
          <!-- TODO: updated these states via a handler -->
          {{ (this.setFormValue = setValue) }}
          {{ (this.triggerFormSubmission = triggerFormSubmit) }}
        </span>
        <h2
          class="class-create-task-header h2"
          v-if="computedSelectedTaskHeader"
        >
          {{ computedSelectedTaskHeader }}
        </h2>

        <div class="class-create-task-form">
          <!-- Common fields -->
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
            :placeholder="`Title (${
              computedSelectedTaskType === taskTypes.QUESTION_ANSWER
                ? 'required'
                : 'optional'
            })`"
            :hint="{
              type: errors.title ? 'error' : null,
              message: errors.title ? errors.title : null,
            }"
          />
          <template v-if="selectedTaskType === taskTypes.QUESTION_ANSWER">
            <talkie-input
              :multiline="true"
              :name="'questionText'"
              :placeholder="'Anything else you want to say? (optional)'"
            />
          </template>

          <!-- Fields for qna task -->
          <template v-if="selectedTaskType === taskTypes.QUESTION_ANSWER">
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
              :recording="currentRecording"
              v-if="currentRecording"
            >
              <span hidden>
                <!-- TODO: updated these states via a handler -->
                {{ (this.isAudioPlaying = isPlaying) }}
                {{ (this.handleAudioPlayerToggle = togglePlayer) }}
              </span>
              <div class="class-create-task-form-options-audio-player-wrapper">
                <talkie-audio-timeline
                  :percentage="currentAudioPercentage"
                  :onHeadChange="updateAudioPercentage"
                />
                <span
                  class="class-create-task-form-options-audio-player-timestamps"
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
                :audioRecording="currentRecording"
                :fullWidth="false"
              />
            </talkie-modal>
          </template>

          <!-- Fields for caption-this task -->
          <template v-if="selectedTaskType === taskTypes.CAPTION_THIS">
            <talkie-media-picker
              :name="'captionImage'"
              :hint="{
                type: errors.captionImage ? 'error' : null,
                message: errors.captionImage ? errors.captionImage : null,
              }"
            />
          </template>

          <!-- Fields for translation task -->
          <template v-if="selectedTaskType === taskTypes.TRANSLATION">
            <talkie-input
              :name="'textToTranslate'"
              :placeholder="'What do students need to translate?'"
              :hint="{
                type: errors.textToTranslate ? 'error' : null,
                message: errors.textToTranslate ? errors.textToTranslate : null,
              }"
            />
            <talkie-input
              :name="'translatedText'"
              :placeholder="'What\'s the correct translation?'"
              :hint="{
                type: errors.translatedText ? 'error' : null,
                message: errors.translatedText ? errors.translatedText : null,
              }"
            />
          </template>

          <!-- Fields for emoji-story task -->
          <template v-if="selectedTaskType === taskTypes.EMOJI_STORY">
            <talkie-input-emojis
              :name="'emojiStory'"
              :placeholder="'Select your emojis here'"
              :hint="{
                type: errors.emojiStory ? 'error' : null,
                message: errors.emojiStory ? errors.emojiStory : null,
              }"
            />
          </template>

          <!-- Common Fields -->
          <template
            v-if="
              selectedTaskType !== taskTypes.QUESTION_ANSWER &&
              selectedTaskType !== taskTypes.TRANSLATION
            "
          >
            <talkie-input
              :multiline="true"
              :name="'questionText'"
              :placeholder="'Anything else you want to say?'"
            />
          </template>

          <!-- Form status updates -->
          <talkie-alert
            :text="formStatus.message"
            :variant="formStatus.type"
            :animateEllipse="formStatus.animateEllipse"
            v-if="formStatus.type && formStatus.message"
          />
        </div>

        <!-- Fields for qna task -->
        <template v-if="selectedTaskType === taskTypes.QUESTION_ANSWER">
          <talkie-audio-recorder
            v-slot="{ startRecording, stopRecording, isRecording }"
            :onRecordingStopped="handleRecordedItem"
          >
            <div class="class-create-task-form-options-wrapper">
              <div class="class-create-task-form-options">
                <div class="class-create-task-form-options-item">
                  <talkie-icon
                    :name="'arrow-rounded-left'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="30"
                    :onClick="handleRecordedItemReset"
                  />
                  <p
                    :class="[
                      'class-create-task-form-options-item-label',
                      !currentRecording &&
                        'class-create-task-form-options-item-label-non-visiable',
                    ]"
                  >
                    Redo
                  </p>
                </div>
                <div class="class-create-task-form-options-item">
                  <talkie-icon
                    :name="'mike-unmuted'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="50"
                    :onClick="startRecording"
                    :customClass="
                      errors.voiceForQnA &&
                      'class-create-task-form-options-mike-unmuted-button-error'
                    "
                    v-if="!isRecording && !currentRecording"
                  />
                  <talkie-icon
                    :name="'square'"
                    :isActive="true"
                    :variant="'success'"
                    :size="50"
                    :iconToSizeRatio="1.5"
                    :customClass="'class-create-task-form-options-stop-recording-button'"
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
                      'class-create-task-form-options-item-label',
                      isRecording
                        ? 'class-create-task-form-options-item-label-success'
                        : errors.voiceForQnA
                        ? 'class-create-task-form-options-item-label-error'
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
                <div class="class-create-task-form-options-item">
                  <talkie-icon
                    :type="'submit'"
                    :name="'send'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="30"
                  />
                  <p
                    :class="[
                      'class-create-task-form-options-item-label',
                      !currentRecording &&
                        'class-create-task-form-options-item-label-non-visiable',
                    ]"
                  >
                    Preview send
                  </p>
                </div>
              </div>
            </div>
          </talkie-audio-recorder>
        </template>

        <!-- Fields for caption-this/translation/emoji-story task -->
        <template
          v-if="
            selectedTaskType === taskTypes.CAPTION_THIS ||
            selectedTaskType === taskTypes.TRANSLATION ||
            selectedTaskType === taskTypes.EMOJI_STORY
          "
        >
          <div class="class-create-task-form-submit-button">
            <talkie-button
              :loading="formStatus?.loading"
              :disabled="formStatus?.loading"
            >
              Create
            </talkie-button>
          </div>
        </template>
      </talkie-form>
      <div class="class-create-task-footer">
        <router-link
          :to="`/classes/${classId}`"
          class="class-create-task-footer-link"
        >
          Not now
        </router-link>
      </div>
    </template>
  </template>
  <!-- loading -->
  <template v-if="computedPageLoading">
    <div class="class-create-task-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>

<script>
import {
  TalkieInput,
  TalkieSelectGroup,
  TalkieIcon,
  TalkieAlert,
  TalkieForm,
  TalkieModal,
  TalkieLoader,
  TalkieButton,
  TalkieMediaPicker,
  TalkieInputEmojis,
} from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import {
  createQandATopicSchema,
  createCaptionThisTopicSchema,
  createTranslationTopicSchema,
  createEmojiStoryTopicSchema,
} from "@/utils/validations/task.validation";
import {
  FileService,
  TaskService,
  ClassService,
  TopicService,
} from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";
import topicTypes from "@/utils/constants/topicTypes";

export default {
  name: "ClassTaskCreate",
  components: {
    TalkieInput,
    TalkieSelectGroup,
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieAlert,
    TalkieForm,
    TalkieModal,
    TalkieLoader,
    TalkieButton,
    TalkieMediaPicker,
    TalkieInputEmojis,
    TalkieQuestionCard,
  },
  data() {
    return {
      topics: [],
      validationSchemas: {
        ["Q&A"]: createQandATopicSchema,
        ["Caption-This"]: createCaptionThisTopicSchema,
        ["Translation"]: createTranslationTopicSchema,
        ["Emoji-Story"]: createEmojiStoryTopicSchema,
      },
      pageLoading: false,
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
      selectedTaskType: "Q&A",
      selectedHeaderMessages: {
        ["Q&A"]: "Start a conversation now?",
        ["Caption-This"]: "Upload a photo",
        ["Translation"]: "Add a translation task for practice",
        ["Emoji-Story"]: "Create your emoji set",
      },
      selectedTaskHeader: null,
      allowedTaskTypes: Object.values(TaskTypes),
      taskTypes: TaskTypes,
      topicsGrouped: [],
    };
  },
  computed: {
    computedPageLoading() {
      return this.pageLoading;
    },
    computedValidationSchema() {
      return this.validationSchemas[this.selectedTaskType];
    },
    computedSelectedTaskHeader() {
      return this.selectedHeaderMessages[this.selectedTaskType];
    },
    computedSelectedTaskType() {
      return this.selectedTaskType;
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // get current task type from url
    const taskType = this.$route?.query?.type;
    this.selectedTaskType = taskType;
    if (!taskType) {
      URLModifier.addToURL("type", TaskTypes.QUESTION_ANSWER);
      this.selectedTaskType = TaskTypes.QUESTION_ANSWER;
    }

    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // get topics list (+ failure case)
    const topicsList = await this.getTopicsList();
    if (!topicsList) return this.$router.push("/404");

    // get topics list for class
    // const classLanguage = classDetails?.language?.toLowerCase();
    // const topicsForClass = topicsList?.filter(
    //   (x) => x?.language?.toLowerCase() === classLanguage
    // );

    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    this.topicsGrouped = [
      {
        title: capitalize(topicTypes.ADVANCED),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.ADVANCED)
          ?.sort((x, y) =>
            x.order === -1 || y.order === -1
              ? 1
              : x.order < y.order
              ? -1
              : x.order > y.order
              ? 1
              : 0
          )
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.INTERMEDIATE),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.INTERMEDIATE)
          ?.sort((x, y) =>
            x.order === -1 || y.order === -1
              ? 1
              : x.order < y.order
              ? -1
              : x.order > y.order
              ? 1
              : 0
          )
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.BEGINNER),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.BEGINNER)
          ?.sort((x, y) =>
            x.order === -1 || y.order === -1
              ? 1
              : x.order < y.order
              ? -1
              : x.order > y.order
              ? 1
              : 0
          )
          ?.map((x) => x?.name),
      },
    ];
    this.topicsGrouped = [
      this.topicsGrouped[0].items.length > 0 && {
        ...this.topicsGrouped[0],
      },
      this.topicsGrouped[1].items.length > 0 && {
        ...this.topicsGrouped[1],
      },
      this.topicsGrouped[2].items.length > 0 && {
        ...this.topicsGrouped[2],
      },
    ].filter(Boolean);

    // success case
    this.topics = classDetails.topics || [];
    this.pageLoading = false;
  },
  methods: {
    redirectToClassManagement() {
      this.$router.push(`/classes/${this.classId}/manage?tab=topics`);
    },
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
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
      if (
        !this.shouldSubmit &&
        this.selectedTaskType === TaskTypes.QUESTION_ANSWER
      ) {
        this.handleModalToggle();
        this.handleModalValidationReset();
        return;
      }

      // update page state
      this.loading = true;
      this.formStatus = {
        type: null,
        message: null,
        animateEllipse: false,
        loading: true,
      };

      // process task specific fields
      const taskSpecificFields = await (async () => {
        // qna task
        if (this.selectedTaskType === TaskTypes.QUESTION_ANSWER) {
          // update page status
          this.formStatus = {
            type: "info",
            message: `Uploading Audio`,
            animateEllipse: true,
            loading: true,
          };

          // upload file
          const voiceForQnA = await this.handleFileUpload(
            this.currentRecording.blob,
            FilePurposes.TASK_VOICE,
            `talkie-${FilePurposes.TASK_VOICE}-${Math.random() * 123456789}.mp3`
          );

          // failure case
          if (!voiceForQnA) {
            this.loading = false;
            this.formStatus = {
              type: "error",
              message: "Uh oh, upload failed. Please try again.",
              loading: false,
            };
            return;
          }

          // success case
          return { voiceForQnA };
        }
        // caption-this task
        if (this.selectedTaskType === TaskTypes.CAPTION_THIS) {
          // update page status
          this.formStatus = {
            type: "info",
            message: `Uploading Image`,
            animateEllipse: true,
            loading: true,
          };

          // upload file
          const captionThisImage = await this.handleFileUpload(
            values?.captionImage,
            FilePurposes.TASK_IMAGE
          );

          // failure case
          if (!captionThisImage) {
            this.loading = false;
            this.formStatus = {
              type: "error",
              message: "Oops, we couldn't upload image file. Please try again.",
              loading: false,
            };
            return;
          }

          // success case
          return { captionThisImage, isPracticeMode: false }; // all tasks should go to class, only admin will be able to create quizzes
        }
        // translation task
        if (this.selectedTaskType === TaskTypes.TRANSLATION) {
          return {
            textToTranslate: values.textToTranslate,
            answer: values.translatedText,
            isPracticeMode: false, // all tasks should go to class, only admin will be able to create quizzes
          };
        }
        // emoji-story task
        if (this.selectedTaskType === TaskTypes.EMOJI_STORY) {
          this.formStatus = {
            loading: true,
          };
          return {
            emojiStory: values.emojiStory,
            isPracticeMode: false, // all tasks should go to class, only admin will be able to create quizzes
          };
        }
        return null;
      })();
      if (!taskSpecificFields) return;

      // form data
      const { title, topic: topicName, questionText } = values;

      const topicId = this.topics?.find(
        (x) => x?.name?.trim() === topicName?.trim()
      )?.id;

      // payload
      const payload = {
        title: title || "",
        topic: topicId,
        type: this.selectedTaskType,
        ...taskSpecificFields,
      };
      if (questionText) payload.questionText = questionText;

      // api call
      const response = await TaskService.Create(this.classId, payload).catch(
        (e) => {
          const errorMap = {
            ['"title" contains bad word']:
              "Please make sure title is appropriate.",
            ['"questiontext" contains bad word']:
              "Please make sure question is appropriate.",
            ['"topic" must be a valid mongo id']: "Invalid Topic",
            ["Q&A"]:
              "Oops! Something has gone wrong... Please try again later.",
            ["Caption-This"]:
              "Oops! Something has gone wrong... Please try again later.",
            ["Translation"]:
              "Oops! Something has gone wrong... Please try again later.",
            ["Emoji-Story"]:
              "Oops! Something has gone wrong... Please try again later.",
            ['"topic" is required']: "Please select a topic to continue",
          };

          return {
            error:
              errorMap[e.response.data.message.toLowerCase()] ||
              errorMap[this.selectedTaskType],
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
          loading: false,
        };
        return;
      }

      // success case
      this.loading = false;
      // this.formStatus = {
      //   type: "success",
      //   message:
      //     this.selectedTaskType === TaskTypes.QUESTION_ANSWER
      //       ? "Success!"
      //       : this.selectedTaskType === TaskTypes.CAPTION_THIS
      //       ? "Success!"
      //       : this.selectedTaskType === TaskTypes.TRANSLATION
      //       ? "Success!"
      //       : this.selectedTaskType === TaskTypes.EMOJI_STORY
      //       ? "Success!"
      //       : "",
      //   animateEllipse: false,
      //   loading: false,
      // };
      const taskId = response?.data?.id;
      this.handleRedirection(
        `/classes/${this.classId}/tasks/${taskId}/status?status=created`,
        200
      );
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getTopicsList() {
      const query = {};

      const response = await TopicService.Query(query).catch(() => null);

      return !!response.data ? response.data.results : null;
    },
  },
};
</script>

<style scoped>
.class-create-task-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}

.class-create-task-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}

.class-create-task-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.class-create-task-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.class-create-task-form-options-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}

.class-create-task-form-options-wrapper {
  position: relative;
}

.class-create-task-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}

.class-create-task-form-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.class-create-task-form-options-item-label {
  text-align: center;
  line-height: 1.1;
}

.class-create-task-form-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}

.class-create-task-form-options-item-label-success {
  color: var(--t-green);
}

.class-create-task-form-options-item-label-error {
  color: var(--t-red);
}

.class-create-task-form-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}

.class-create-task-form-options-stop-recording-button {
  border-color: var(--t-green) !important;
  border-style: solid !important;
}

.class-create-task-form-submit-button {
  margin: auto;
}

.class-create-task-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.class-create-task-footer-link {
  text-decoration: underline;
}

.class-create-task-footer-link,
.class-create-task-footer-link:hover,
.class-create-task-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

.class-create-task-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.text-center {
  text-align: center;
}

.align-center {
  align-items: center;
}

.error-image {
  height: var(--image-size);
  width: var(--image-size);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-create-task-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-40);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }

  .class-create-task-header {
    font-size: calc(var(--font-size) * 0.7);
  }

  .class-create-task-form {
    gap: var(--t-space-12);
    width: 100%;
  }

  .class-create-task-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }

  .class-create-task-form-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }

  .class-create-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }

  .class-create-task-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }

  .class-create-task-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }

  .class-create-task-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }

  .class-create-task-form-options-stop-recording-button {
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

  .error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}

@media (min-width: 600px) {
  .class-create-task-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-36);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }

  .class-create-task-header {
    font-size: calc(var(--font-size) * 0.75);
  }

  .class-create-task-form {
    gap: var(--t-space-16);
    width: 65%;
  }

  .class-create-task-form-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }

  .class-create-task-form-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }

  .class-create-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }

  .class-create-task-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }

  .class-create-task-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }

  .class-create-task-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }

  .class-create-task-form-options-stop-recording-button {
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

  .error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}

@media (min-width: 900px) {
  .class-create-task-header {
    font-size: calc(var(--font-size) * 0.85);
  }

  .error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}

@media (min-width: 1200px) {
  .class-create-task-wrapper {
    padding: var(--t-space-48);
    padding-bottom: var(--t-space-58);
    margin-top: var(--t-space-48);
  }

  .class-create-task-header {
    font-size: var(--font-size);
  }

  .class-create-task-form {
    gap: var(--t-space-24);
    width: 70%;
  }

  .class-create-task-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }

  .class-create-task-form-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }

  .class-create-task-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }

  .class-create-task-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }

  .class-create-task-form-options-audio-player-timestamps {
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
}
</style>

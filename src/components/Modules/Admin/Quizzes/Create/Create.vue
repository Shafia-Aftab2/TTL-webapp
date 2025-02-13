<template>
  <!-- content -->
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ errors, setValue, values, triggerFormSubmit }"
      :validationSchema="computedValidationSchema"
      :onSubmit="handleSubmit"
      :customClass="'admin-create-quizzes-wrapper'"
    >
      <span hidden>
        <!-- TODO: updated these states via a handler -->
        {{ (this.setFormValue = setValue) }}
        {{ (this.triggerFormSubmission = triggerFormSubmit) }}
      </span>
      <h2
        class="admin-create-quizzes-header h2"
        v-if="computedSelectedTaskHeader"
      >
        {{ computedSelectedTaskHeader }}
      </h2>

      <div class="admin-create-quizzes-form">
        <!-- Common fields -->
        <talkie-select
          :name="'language'"
          :placeholder="'Choose language'"
          :options="supportedLanguages?.length > 0 ? supportedLanguages : []"
          :onChange="handleTopicSelectionChange"
          :hint="{
            type: errors.language ? 'error' : null,
            message: errors.language ? errors.language : null,
          }"
        />
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
          :placeholder="'Title (optional)'"
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
            <div class="admin-create-quizzes-form-options-audio-player-wrapper">
              <talkie-audio-timeline
                :percentage="currentAudioPercentage"
                :onHeadChange="updateAudioPercentage"
              />
              <span class="admin-create-quizzes-audio-player-timestamps"
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
            :placeholder="'Text To Translate (required)'"
            :hint="{
              type: errors.textToTranslate ? 'error' : null,
              message: errors.textToTranslate ? errors.textToTranslate : null,
            }"
          />
          <talkie-input
            :name="'translatedText'"
            :placeholder="'Translated Text (required)'"
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
            :placeholder="'Anything else you want to say? (optional)'"
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
          <div class="admin-create-quizzes-form-options-wrapper">
            <div class="admin-create-quizzes-form-options">
              <div class="admin-create-quizzes-form-options-item">
                <talkie-icon
                  :name="'arrow-rounded-left'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="30"
                  :onClick="handleRecordedItemReset"
                />
                <p
                  :class="[
                    'admin-create-quizzes-form-options-item-label',
                    !currentRecording &&
                      'admin-create-quizzes-form-options-item-label-non-visiable',
                  ]"
                >
                  Redo
                </p>
              </div>
              <div class="admin-create-quizzes-form-options-item">
                <talkie-icon
                  :name="'mike-unmuted'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="50"
                  :onClick="startRecording"
                  :customClass="
                    errors.voiceForQnA &&
                    'admin-create-quizzes-form-options-mike-unmuted-button-error'
                  "
                  v-if="!isRecording && !currentRecording"
                />
                <talkie-icon
                  :name="'square'"
                  :isActive="true"
                  :variant="'success'"
                  :size="50"
                  :iconToSizeRatio="1.5"
                  :customClass="'admin-create-quizzes-form-options-stop-recording-button'"
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
                    'admin-create-quizzes-form-options-item-label',
                    isRecording
                      ? 'admin-create-quizzes-form-options-item-label-success'
                      : errors.voiceForQnA
                      ? 'admin-create-quizzes-form-options-item-label-error'
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
              <div class="admin-create-quizzes-form-options-item">
                <talkie-icon
                  :type="'submit'"
                  :name="'send'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="30"
                />
                <p
                  :class="[
                    'admin-create-quizzes-form-options-item-label',
                    !currentRecording &&
                      'admin-create-quizzes-form-options-item-label-non-visiable',
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
        <div class="admin-create-quizzes-form-submit-button">
          <talkie-button :loading="formStatus?.loading"> Create </talkie-button>
        </div>
      </template>
    </talkie-form>
    <div class="admin-create-quizzes-footer">
      <router-link
        :to="`/admin/quizzes`"
        class="admin-create-quizzes-footer-link"
      >
        Not now
      </router-link>
    </div>
  </template>
  <!-- loading -->
  <template v-if="computedPageLoading">
    <div class="admin-create-quizzes-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>

<script>
import {
  TalkieInput,
  TalkieSelect,
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
  createCaptionThisQuizScehma,
  createTranslationQuizSchema,
  createEmojiStoryQuizSchema,
  requireLanguageForTopic,
} from "@/utils/validations/task.validation";
import { concatValidations } from "@/utils/validations/custom.validation";
import { FileService, TaskTemplateService, TopicService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";
import { supportedLanguages, topicTypes } from "@/utils/constants";

export default {
  name: "AdminCreateQuizzes",
  components: {
    TalkieInput,
    TalkieSelect,
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
        ["Q&A"]: concatValidations(
          createQandATopicSchema,
          requireLanguageForTopic
        ),
        ["Caption-This"]: concatValidations(
          createCaptionThisQuizScehma,
          requireLanguageForTopic
        ),
        ["Translation"]: concatValidations(
          createTranslationQuizSchema,
          requireLanguageForTopic
        ),
        ["Emoji-Story"]: concatValidations(
          createEmojiStoryQuizSchema,
          requireLanguageForTopic
        ),
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
      selectedTaskType: TaskTypes.CAPTION_THIS,
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
      supportedLanguages: Object.values(supportedLanguages)?.map((x) =>
        x?.toLowerCase()
      ),
      selectedLanguage: null,
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
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // get current task type from url
    const taskType = this?.$route?.query?.type;
    this.selectedTaskType = taskType;
    if (!taskType || taskType === TaskTypes.QUESTION_ANSWER) {
      URLModifier.addToURL("type", TaskTypes.CAPTION_THIS);
      this.selectedTaskType = TaskTypes.CAPTION_THIS;
    }

    // get topics list (+ failure case)
    const topicsList = await this.getTopicsList();
    if (!topicsList) return this.$router.push("/404");

    // success case
    this.topics = topicsList || [];
    this.pageLoading = false;
  },
  methods: {
    handleTopicSelectionChange(e) {
      const language = e?.target?.value?.toLowerCase();
      this.selectedLanguage = language;
      this.updateTopicsList(language);
    },
    updateTopicsList(displayForLanguage) {
      if (!displayForLanguage) {
        this.topicsGrouped = [];
        return;
      }

      const _topics = this.topics?.filter(
        (x) => x?.language?.toLowerCase() === displayForLanguage
      );
      const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
      this.topicsGrouped = [
        {
          title: capitalize(topicTypes.ADVANCED),
          items: _topics
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
          items: _topics
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
          items: _topics
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
        loading: false,
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
          return { captionThisImage, isPracticeMode: true };
        }
        // translation task
        if (this.selectedTaskType === TaskTypes.TRANSLATION) {
          return {
            textToTranslate: values.textToTranslate,
            answer: values.translatedText,
            isPracticeMode: true,
          };
        }
        // emoji-story task
        if (this.selectedTaskType === TaskTypes.EMOJI_STORY) {
          this.formStatus = {
            loading: true,
          };
          return {
            emojiStory: values.emojiStory,
            isPracticeMode: true,
          };
        }
        return null;
      })();
      if (!taskSpecificFields) return;

      // form data
      const { title, topic: topicName, questionText } = values;
      const topicId = this.topics?.find(
        (x) =>
          x?.name?.toLowerCase() === topicName?.trim()?.toLowerCase() &&
          x?.language?.toLowerCase() ===
            this.selectedLanguage?.toLowerCase()?.trim()
      )?.id;
      // payload
      const payload = {
        title: title || "",
        topic: topicId,
        type: this.selectedTaskType,
        ...taskSpecificFields,
        isPracticeMode: true,
      };
      if (questionText) payload.questionText = questionText;

      // api call
      const response = await TaskTemplateService.Create(payload).catch((e) => {
        const errorMap = {
          ['"title" contains bad word']:
            "Please make sure title is appropriate.",
          ['"questiontext" contains bad word']:
            "Please make sure question is appropriate.",
          ['"topic" must be a valid mongo id']: "Invalid Topic",
          ["Q&A"]: "Oops! Something has gone wrong... Please try again later.",
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
            errorMap[e?.response?.data?.message?.toLowerCase()] ||
            errorMap[this.selectedTaskType],
        };
      });

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
      this.formStatus = {
        type: "success",
        message: "Success!",
        // this.selectedTaskType === TaskTypes.QUESTION_ANSWER
        //   ? "Conversation Created. Redirecting!"
        //   : this.selectedTaskType === TaskTypes.CAPTION_THIS
        //   ? "Caption Task Created. Redirecting!"
        //   : this.selectedTaskType === TaskTypes.TRANSLATION
        //   ? "Translation Task Created. Redirecting!"
        //   : this.selectedTaskType === TaskTypes.EMOJI_STORY
        //   ? "Emoji Story Task Created. Redirecting!"
        //   : "",
        animateEllipse: false,
        loading: false,
      };
      this.handleRedirection(`/admin/quizzes`, 200);
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
.admin-create-quizzes-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.admin-create-quizzes-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.admin-create-quizzes-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.admin-create-quizzes-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.admin-create-quizzes-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.admin-create-quizzes-form-options-wrapper {
  position: relative;
}
.admin-create-quizzes-form-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.admin-create-quizzes-form-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.admin-create-quizzes-form-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.admin-create-quizzes-form-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.admin-create-quizzes-form-options-item-label-success {
  color: var(--t-green);
}
.admin-create-quizzes-form-options-item-label-error {
  color: var(--t-red);
}
.admin-create-quizzes-form-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.admin-create-quizzes-form-options-stop-recording-button {
  border-color: var(--t-green) !important;
  border-style: solid !important;
}
.admin-create-quizzes-form-submit-button {
  margin: auto;
}
.admin-create-quizzes-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.admin-create-quizzes-footer-link {
  text-decoration: underline;
}
.admin-create-quizzes-footer-link,
.admin-create-quizzes-footer-link:hover,
.admin-create-quizzes-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}
.admin-create-quizzes-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .admin-create-quizzes-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-40);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .admin-create-quizzes-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .admin-create-quizzes-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .admin-create-quizzes-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .admin-create-quizzes-form-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .admin-create-quizzes-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .admin-create-quizzes-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .admin-create-quizzes-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .admin-create-quizzes-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .admin-create-quizzes-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .admin-create-quizzes-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .admin-create-quizzes-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .admin-create-quizzes-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .admin-create-quizzes-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-36);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .admin-create-quizzes-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .admin-create-quizzes-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .admin-create-quizzes-form-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .admin-create-quizzes-form-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .admin-create-quizzes-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .admin-create-quizzes-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .admin-create-quizzes-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .admin-create-quizzes-form-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .admin-create-quizzes-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .admin-create-quizzes-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .admin-create-quizzes-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .admin-create-quizzes-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 900px) {
  .admin-create-quizzes-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .admin-create-quizzes-wrapper {
    padding: var(--t-space-48);
    padding-bottom: var(--t-space-58);
    margin-top: var(--t-space-48);
  }
  .admin-create-quizzes-header {
    font-size: var(--font-size);
  }
  .admin-create-quizzes-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .admin-create-quizzes-form-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .admin-create-quizzes-form-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .admin-create-quizzes-form-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .admin-create-quizzes-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .admin-create-quizzes-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .admin-create-quizzes-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-50);
  }
  .admin-create-quizzes-footer-link {
    font-size: var(--t-fs-small);
  }
  .admin-create-quizzes-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
}
</style>

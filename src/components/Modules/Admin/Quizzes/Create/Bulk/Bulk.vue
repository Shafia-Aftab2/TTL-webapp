<template>
  <!-- content -->
  <template v-if="!computedPageLoading">
    <div class="admin-create-quizzes-wrapper">
      <talkie-form
        v-slot="{ errors }"
        :validationSchema="validationSchema"
        :onSubmit="handleSubmit"
        :customClass="'admin-create-quizzes-wrapper'"
        :key="$route.fullPath"
      >
        <h2 class="admin-create-quizzes-header h2">Upload CSV file (Excel)</h2>
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

        <talkie-media-picker
          :name="'csvFile'"
          :placeholder="'Drag and drop your csv file'"
          :allowedMediaTypes="['text/csv']"
          :hint="{
            type: errors.csvFile ? 'error' : null,
            message: errors.csvFile ? errors.csvFile : null,
          }"
        />

        <!-- Form status updates -->
        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          :animateEllipse="formStatus.animateEllipse"
          v-if="formStatus.type && formStatus.message"
        />

        <div class="admin-create-quizzes-form-submit-button">
          <talkie-button :loading="formStatus?.loading"> Create </talkie-button>
        </div>
      </talkie-form>
    </div>
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
  TalkieAlert,
  TalkieLoader,
  TalkieButton,
  TalkieMediaPicker,
  TalkieForm,
  TalkieSelect,
  TalkieSelectGroup,
} from "@/components/UICore";
import {
  createBulkTaskSchema,
  requireLanguageForTopic,
} from "@/utils/validations/task.validation";
import { concatValidations } from "@/utils/validations/custom.validation";
import { TaskTemplateService, TopicService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import { supportedLanguages, topicTypes } from "@/utils/constants";
import csvParser from "papaparse";

export default {
  name: "AdminCreateQuizzesBulk",
  components: {
    TalkieAlert,
    TalkieLoader,
    TalkieButton,
    TalkieMediaPicker,
    TalkieForm,
    TalkieSelect,
    TalkieSelectGroup,
  },
  data() {
    return {
      topics: [],
      validationSchema: concatValidations(
        createBulkTaskSchema,
        requireLanguageForTopic
      ),
      pageLoading: false,
      loading: false,
      formStatus: {
        type: null,
        message: null,
        animateEllipse: false,
      },
      isAudioPlaying: null,
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
  },
  async created() {
    // update page state
    this.pageLoading = true;

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
            ?.map((x) => x?.name),
        },
        {
          title: capitalize(topicTypes.INTERMEDIATE),
          items: _topics
            ?.filter((x) => x?.type === topicTypes.INTERMEDIATE)
            ?.map((x) => x?.name),
        },
        {
          title: capitalize(topicTypes.BEGINNER),
          items: _topics
            ?.filter((x) => x?.type === topicTypes.BEGINNER)
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
    async readCSV(file) {
      return new Promise((resolve, reject) => {
        try {
          csvParser.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              resolve(results.data);
            },
          });
        } catch {
          reject();
        }
      });
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = {
        type: null,
        message: null,
        animateEllipse: false,
        loading: true,
      };

      // calculate payload
      const topicId = this.topics?.find(
        (x) => x?.name?.toLowerCase() === values?.topic?.trim()?.toLowerCase()
      )?.id;

      // get tasks from csv
      const tasksFromCSV = await this.readCSV(values.csvFile).catch(() => null);

      // check if there are tasks from csv file
      if (!tasksFromCSV || tasksFromCSV?.length === 0) {
        this.formStatus = {
          type: "error",
          message: "Invalid CSV file!",
          animateEllipse: false,
          loading: false,
        };
        return;
      }

      // TODO: preview file, + valid file preview

      const tasks = tasksFromCSV?.map((x) => ({
        answer: x?.answer,
        questionText: x?.comments,
        textToTranslate: x?.question,
        title: x?.title,
        isPracticeMode: true,
        topic: topicId,
        type: TaskTypes.TRANSLATION,
      }));

      const payload = { tasks };

      // api call
      const response = await TaskTemplateService.CreateBulk(payload).catch(
        () => {
          return {
            error: "Invalid CSV file",
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
      this.formStatus = {
        type: "success",
        message: "Quizzes created in bulk!",
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

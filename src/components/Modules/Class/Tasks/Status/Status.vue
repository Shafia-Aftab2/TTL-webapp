<template>
  <template v-if="!computedPageLoading">
    <div class="class-convo-status-wrapper">
      <h2 class="class-convo-status-header h2">{{ computedTaskStatus }}</h2>
      <div class="class-convo-status-question-card-wrapper">
        <talkie-question-card
          :title="taskDetails?.title"
          :topic="taskDetails?.topic"
          :description="taskDetails?.description"
          :fullWidth="false"
          :hoverAnimation="false"
          :audioSource="
            taskDetails?.type === taskTypes.QUESTION_ANSWER &&
            taskDetails?.audioSource
          "
          :image="
            taskDetails?.type === taskTypes.CAPTION_THIS && taskDetails?.image
          "
          :expandContent="
            taskDetails?.type === taskTypes.TRANSLATION
              ? { translation: taskDetails?.translation }
              : taskDetails?.type === taskTypes.EMOJI_STORY
              ? { emojis: taskDetails?.emojiStory }
              : {}
          "
        />
      </div>
      <div class="class-convo-status-options-wrapper">
        <talkie-button-drop-down
          :size="'small'"
          :variant="'primary'"
          :dropDownItems="newTaskOptions"
        >
          Create New
        </talkie-button-drop-down>
        <talkie-button :outlined="true" :onClick="handleClassHomeClick">
          Home
        </talkie-button>
      </div>
    </div>
  </template>

  <template v-if="computedPageLoading">
    <div class="class-convo-status-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>

<script>
import {
  TalkieButton,
  TalkieLoader,
  TalkieButtonDropDown,
} from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import { TaskService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import TaskTypes from "@/utils/constants/taskTypes";

export default {
  name: "ClassTaskStatus",
  components: {
    TalkieButton,
    TalkieLoader,
    TalkieQuestionCard,
    TalkieButtonDropDown,
  },
  data() {
    return {
      taskStatus: {
        CREATED: "Sent!",
        EDITED: "Saved!",
        DELETED: "Deleted!",
      },
      newTaskOptions: [
        {
          name: "Question",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${encodeURIComponent(
                TaskTypes.QUESTION_ANSWER
              )}`,
              100
            ),
        },
        {
          name: "Photo",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.CAPTION_THIS}`,
              100
            ),
        },
        {
          name: "Emoji Story",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.EMOJI_STORY}`,
              100
            ),
        },
        {
          name: "Translation",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.TRANSLATION}`,
              100
            ),
        },
        {
          name: "Bulk Upload",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create/bulk`,
              100
            ),
        },
      ],
      taskStatusQueryParam: null,
      taskDetails: {},
      taskTypes: TaskTypes,
      pageLoading: false,
      taskId: null,
      classId: null,
    };
  },
  computed: {
    computedPageLoading() {
      return this.pageLoading;
    },
    computedTaskStatus() {
      return this.taskStatus[this?.taskStatusQueryParam?.toUpperCase()];
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // class id from params
    const classId = this.$route.params.classId;
    this.classId = classId;

    // get status query param from url
    const statusQueryParam = this?.$route?.query?.status;
    this.taskStatusQueryParam = statusQueryParam;

    // remove param from url
    URLModifier.removeFromURL("status");

    // task id from params
    const taskId = this.$route.params.taskId;
    this.taskId = taskId;

    // get task details (+ failure case)
    const taskDetails = await this.getTaskDetails(taskId);
    if (!taskDetails) return this.$router.push("/404");

    // success case
    this.taskDetails = {
      id: taskDetails?.id,
      type: taskDetails?.type,
      title: taskDetails?.title,
      topic: taskDetails?.topic.name,
      description: taskDetails?.questionText,
      isForPractice: taskDetails?.isPracticeMode,
      ...(taskDetails?.type === TaskTypes.QUESTION_ANSWER && {
        audioSource: taskDetails?.voiceForQnA,
      }),
      ...(taskDetails?.type === TaskTypes.CAPTION_THIS && {
        image: taskDetails?.captionThisImage,
      }),
      ...(taskDetails?.type === TaskTypes.TRANSLATION && {
        translation: {
          textToTranslate: taskDetails?.textToTranslate,
          translatedText: taskDetails?.answer,
        },
      }),
      ...(taskDetails?.type === TaskTypes.EMOJI_STORY && {
        emojiStory: taskDetails?.emojiStory,
      }),
    };
    this.pageLoading = false;
  },
  methods: {
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
    handleClassHomeClick() {
      this.$router.push(`/classes/${this.classId}`);
    },
    async getTaskDetails(id) {
      const response = await TaskService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
  },
};
</script>

<style scoped>
.class-convo-status-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.class-convo-status-header {
  text-align: center;
  color: var(--t-secondary);
  --font-size: var(--t-fs-h2);
}
.class-convo-status-question-card-wrapper {
  border: var(--t-space-1) solid var(--t-gray-75);
  border-radius: var(--t-br-large);
}
.class-convo-status-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-12);
}
.class-convo-status-loading-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-36);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .class-convo-status-question-card-wrapper {
    width: 100%;
  }
  .class-convo-status-loading-wrapper {
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .class-convo-status-question-card-wrapper {
    width: 80%;
  }
  .class-convo-status-loading-wrapper {
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 900px) {
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
  .class-convo-status-header {
    font-size: var(--font-size);
  }
  .class-convo-status-loading-wrapper {
    margin-top: var(--t-space-48);
  }
}
</style>

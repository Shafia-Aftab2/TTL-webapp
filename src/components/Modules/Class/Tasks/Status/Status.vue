<template>
  <template v-if="!computedPageLoading">
    <div class="class-convo-status-wrapper">
      <h2 class="class-convo-status-header h2">{{ computedTaskStatus }}</h2>
      <div class="class-convo-status-question-card-wrapper">
        <talkie-question-card
          :title="taskDetails?.title"
          :topic="taskDetails?.topic"
          :audioSource="taskDetails?.audioSource"
          :fullWidth="false"
        />
      </div>
      <div class="class-convo-status-options-wrapper">
        <talkie-button :onClick="hanldeCreateNewTaskClick">
          Create New
        </talkie-button>
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
import { TalkieButton, TalkieLoader } from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import { TaskService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";

export default {
  name: "ClassTaskStatus",
  components: {
    TalkieButton,
    TalkieLoader,
    TalkieQuestionCard,
  },
  data() {
    return {
      taskStatus: {
        CREATED: "Sent!",
        EDITED: "Saved!",
        DELETED: "Deleted!",
      },
      taskStatusQueryParam: null,
      taskDetails: {},
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
    const statusQueryParam = URLModifier.getURLParam("status");
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
      id: taskDetails.id,
      type: taskDetails.type,
      title: taskDetails.title,
      topic: taskDetails.topic.name,
      description: taskDetails.questionText,
      audioSource: taskDetails.voiceForQnA,
    };
    this.pageLoading = false;
  },
  methods: {
    hanldeCreateNewTaskClick() {
      this.$router.push(`/classes/${this.classId}/tasks/create`);
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

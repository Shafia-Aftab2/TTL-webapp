<template>
  <!-- content -->
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ errors }"
      :initialValues="{
        topic: taskDetails.topic,
        title: taskDetails.title,
        questionText: taskDetails.questionText,
      }"
      :validationSchema="updateQandATopicSchema"
      :onSubmit="handleSubmit"
      :customClass="'class-update-convo-wrapper'"
    >
      <h2 class="class-update-convo-header h2">Edit Task</h2>
      <div class="class-update-convo-form">
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
        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          :animateEllipse="formStatus.animateEllipse"
          v-if="formStatus.type && formStatus.message"
        />
      </div>
      <div class="class-update-convo-form-options">
        <talkie-button :type="'submit'" :loading="loading">
          Update
        </talkie-button>
      </div>
    </talkie-form>
    <div class="class-update-convo-footer">
      <a :href="`/classes/${classId}`" class="class-update-convo-footer-link">
        Not now
      </a>
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
  TalkieButton,
  TalkieSelect,
  TalkieAlert,
  TalkieForm,
  TalkieLoader,
} from "@/components/UICore";
import { updateQandATopicSchema } from "@/utils/validations/task.validation";
import { TaskService, ClassService } from "@/api/services";

export default {
  name: "ClassTaskUpdate",
  components: {
    TalkieInput,
    TalkieButton,
    TalkieSelect,
    TalkieAlert,
    TalkieForm,
    TalkieLoader,
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
      classId: null,
      taskId: null,
      classDetails: {},
      taskDetails: {},
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

    // task details (+ failure case)
    const taskDetails = await this.getTaskDetails(taskId);
    if (!taskDetails) return this.$router.push("/404");

    // success case
    this.topics = classDetails.topics;
    this.taskDetails = {
      topic: taskDetails?.topic?.name,
      title: taskDetails?.title,
      questionText: taskDetails?.questionText,
      voiceForQnA: taskDetails?.voiceForQnA,
    };
    this.pageLoading = false;
  },
  methods: {
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null, animateEllipse: false };

      // form data
      const { title, topic: topicName, questionText } = values;
      const voiceForQnA = this.taskDetails.voiceForQnA;
      const topicId = this.topics.find((x) => x.name === topicName).id;

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
            ['"title" contains bad word']: "Title should not be unethical..!",
            ['"questiontext" contains bad word']:
              "Question text should not be unethical..!",
            ['"topic" must be a valid mongo id']: "Invalid Topic",
          };

          return {
            error:
              errorMap[e.response.data.message.toLowerCase()] ||
              "Could not update task..!",
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
        message: "Task Updated. Redirecting..!",
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

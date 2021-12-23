<template>
  <div class="class-tasks-inbox-task-item" @click="handleItemBodyClick">
    <!-- Item Header -->
    <div
      class="class-tasks-inbox-task-item-header-wrapper"
      @click="handleItemBodyClick"
    >
      <div
        class="class-tasks-inbox-task-item-header"
        @click="handleItemBodyClick"
      >
        <p class="p" v-if="title" @click="handleItemBodyClick">{{ title }}</p>
        <p class="p" v-if="topic" @click="handleItemBodyClick">{{ topic }}</p>
      </div>
      <div
        class="class-tasks-inbox-task-item-header-status"
        v-if="!isRead"
      ></div>
    </div>

    <!-- Spacer -->
    <div
      class="class-tasks-inbox-task-item-spacer"
      v-if="taskItemExpanded"
    ></div>

    <template v-if="taskItemExpanded">
      <!-- Audio Messages -->
      <div class="class-tasks-inbox-task-item-audio-responses-wrapper">
        <template v-if="!state?.responsesFetch?.loading">
          <task-item-response
            v-for="_response in computedResponses"
            :key="_response"
            :alignment="_response.from !== user?.id ? 'left' : 'right'"
            :responseAudio="_response.audio"
          />
        </template>

        <!-- Fetch Messages Error -->
        <div
          class="class-tasks-inbox-task-item-audio-response-centered"
          v-if="
            state?.responsesFetch?.message?.type &&
            state?.responsesFetch?.message?.text
          "
        >
          <talkie-alert
            :text="state?.responsesFetch?.message?.text"
            :variant="state?.responsesFetch?.message?.type"
          />
        </div>

        <!-- Fetch Messages Loader -->
        <template v-if="state?.responsesFetch?.loading">
          <div class="class-tasks-inbox-task-item-audio-response-centered">
            <talkie-loader :size="'large'" />
          </div>
        </template>
      </div>

      <!-- Spacer -->
      <div
        class="class-tasks-inbox-task-item-spacer"
        v-if="taskItemExpanded"
      ></div>

      <!-- Audio Recorder -->
      <task-item-recorder :onRecordingSendClick="handleResponseCreation" />
    </template>
  </div>
</template>

<script>
import { TalkieLoader, TalkieAlert } from "@/components/UICore";
import TaskItemResponse from "./Response";
import TaskItemRecorder from "./Recorder";
import authUser from "@/utils/helpers/auth";
import { ResponseService, FileService } from "@/api/services";
import FilePurposes from "@/utils/constants/filePurposes";

export default {
  name: "TasksInboxTaskItem",
  components: {
    TalkieLoader,
    TalkieAlert,
    TaskItemResponse,
    TaskItemRecorder,
  },
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    responses: {
      type: Array,
    },
  },
  data() {
    return {
      taskItemExpanded: false,
      user: {},
      state: {
        responsesFetch: {
          loading: false,
          message: {
            type: null,
            text: null,
          },
        },
      },
      messagesFetched: [],
    };
  },
  computed: {
    computedResponses() {
      return [...this.responses, ...this.messagesFetched];
    },
  },
  created() {
    // get auth user
    const user = authUser.getUser();
    this.user = user;
  },
  methods: {
    async handleItemBodyClick(e) {
      if (e.target === e.currentTarget) {
        this.taskItemExpanded = !this.taskItemExpanded;
      }

      if (this.taskItemExpanded) {
        // update page state
        this.state.responsesFetch = {
          loading: true,
          message: {
            type: null,
            text: null,
          },
        };

        // get responses for current task
        const taskResponses = await this.getTaskResponses(this.id);

        // failure case
        if (!taskResponses) {
          this.state.responsesFetch = {
            loading: false,
            message: {
              type: "error",
              text: "Failed to load latest responses..!",
            },
          };
          return;
        }

        // success case
        this.messagesFetched = taskResponses?.map((x) => ({
          id: x?.id,
          from: x?.student?.id,
          audio: x?.voiceRecording,
        }));
        this.state.responsesFetch = {
          loading: false,
          message: {
            type: null,
            text: null,
          },
        };
      }
    },
    async handleFileUpload(recordingBlob) {
      // payload
      const payload = new FormData();
      payload.append(
        "files",
        recordingBlob,
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
      return uploadedFile;
    },
    async handleResponseCreation(recording) {
      // upload audio file
      const uploadedFile = await this.handleFileUpload(recording?.blob);

      // failure case
      if (!uploadedFile) {
        return;
      }

      // payload
      const payload = {
        voiceRecording: uploadedFile,
      };

      // api call (create response)
      const response = await ResponseService.CreateResponse(
        this.id,
        payload
      ).catch();

      // failure case
      if (!response) {
        this.creatingResponseMessage = false;
        this.createResponseMessageError = "Failed To Create Response..!";
        return;
      }

      // success case
      const createdResponse = response?.data;
      this.messagesFetched = [
        ...this.messagesFetched,
        {
          id: createdResponse?.id,
          from: createdResponse?.student,
          audio: createdResponse?.voiceRecording,
        },
      ];
    },
    async getTaskResponses(taskId) {
      const query = {};
      const responseAPI = await ResponseService.QueryClassTaskResponses(
        taskId,
        query
      ).catch();

      return responseAPI?.data || null;
    },
  },
};
</script>

<style>
.class-tasks-inbox-task-item {
  display: flex;
  flex-direction: column;
  background: var(--t-white);
  cursor: pointer;
}
.class-tasks-inbox-task-item-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-tasks-inbox-task-item-spacer {
  height: var(--t-space-2);
  width: 100%;
  background: var(--t-gray-75);
}
.class-tasks-inbox-task-item-header {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-header-status {
  display: block;
  border-radius: 50%;
  background: var(--t-primary);
}
.class-tasks-inbox-task-item-audio-responses-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-audio-response-centered {
  margin: auto;
}
.class-tasks-inbox-task-item-audio-response-right {
  margin-left: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-8);
    border-radius: var(--t-br-medium);
    padding: var(--t-space-20);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-12) 0;
  }
  .class-tasks-inbox-task-item-header {
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-header-status {
    width: var(--t-space-12);
    height: var(--t-space-12);
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-8);
    padding: var(--t-space-8) 0;
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-8);
    border-radius: var(--t-br-large);
    padding: var(--t-space-24);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-16) 0;
  }
  .class-tasks-inbox-task-item-header {
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-header-status {
    width: var(--t-space-16);
    height: var(--t-space-16);
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-10);
    padding: var(--t-space-10) 0;
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-16);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-24) 0;
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-12);
    padding: var(--t-space-12) 0;
  }
}
</style>

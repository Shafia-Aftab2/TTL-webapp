<template>
  <div class="talkie-conversation-card" @click="handleCardBodyClick">
    <!-- Conversation Header -->
    <div
      class="talkie-conversation-card-header-wrapper"
      @click="handleCardBodyClick"
    >
      <div class="talkie-conversation-card-header" @click="handleCardBodyClick">
        <p class="p" v-if="taskTitle" @click="handleCardBodyClick">
          {{ taskTitle }}
        </p>
        <p class="p" v-if="taskTopic" @click="handleCardBodyClick">
          {{ taskTopic }}
        </p>
      </div>
      <div
        class="talkie-conversation-card-header-status"
        v-if="!taskIsRead"
      ></div>
    </div>

    <!-- Spacer -->
    <div class="talkie-conversation-card-spacer" v-if="cardExpanded"></div>

    <template v-if="cardExpanded">
      <!-- Audio Messages -->
      <div class="talkie-conversation-card-audio-messages-wrapper">
        <template v-if="!state?.responsesFetch?.loading">
          <conversation-message
            v-for="_response in computedMessages"
            :key="_response"
            :alignment="_response.from !== user?.id ? 'left' : 'right'"
            :messageAudio="_response.audio"
          />
        </template>

        <!-- Create Message Loader -->
        <template v-if="state?.responseCreation?.loading">
          <div class="talkie-conversation-card-audio-message-right">
            <talkie-loader :size="'large'" />
          </div>
        </template>

        <!-- Create Message Error -->
        <div
          class="talkie-conversation-card-audio-message-right"
          v-if="
            state?.responseCreation?.message?.type &&
            state?.responseCreation?.message?.text
          "
        >
          <talkie-alert
            :text="state?.responseCreation?.message?.text"
            :variant="state?.responseCreation?.message?.type"
          />
        </div>

        <!-- Fetch Messages Error -->
        <div
          class="talkie-conversation-card-audio-message-centered"
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
          <div class="talkie-conversation-card-audio-message-centered">
            <talkie-loader :size="'large'" />
          </div>
        </template>
      </div>

      <!-- Spacer -->
      <div class="talkie-conversation-card-spacer" v-if="cardExpanded"></div>

      <!-- Conversation Recorder -->
      <conversation-recorder :onRecordingSendClick="handleMessageCreation" />
    </template>
  </div>
</template>

<script>
import { TalkieLoader, TalkieAlert } from "@/components/UICore";
import ConversationMessage from "./Message";
import ConversationRecorder from "./Recorder";
import authUser from "@/utils/helpers/auth";
import { ResponseService, FileService, FeedbackService } from "@/api/services";
import FilePurposes from "@/utils/constants/filePurposes";

export default {
  name: "ConversationCard",
  components: {
    TalkieLoader,
    TalkieAlert,
    ConversationMessage,
    ConversationRecorder,
  },
  props: {
    taskId: {
      type: String,
    },
    taskTitle: {
      type: String,
    },
    taskTopic: {
      type: String,
    },
    taskIsRead: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      cardExpanded: false,
      user: {},
      state: {
        responseCreation: {
          loading: false,
          message: {
            type: null,
            text: null,
          },
        },
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
    computedMessages() {
      return [...this.messages, ...this.messagesFetched];
    },
  },
  created() {
    // get auth user
    const user = authUser.getUser();
    this.user = user;
  },
  methods: {
    async handleCardBodyClick(e) {
      if (e.target !== e.currentTarget) return;

      this.cardExpanded = !this.cardExpanded;

      if (this.cardExpanded) {
        // update page state
        this.state.responsesFetch = {
          loading: true,
          message: {
            type: null,
            text: null,
          },
        };

        // get responses for current task
        const taskResponses = await this.getTaskResponses(this.taskId);

        // get feedbacks (whole class) for current task
        const taskFeedbacksWholeClass = await this.getTaskFeedbacks({
          taskId: this.taskId,
        });

        // get feedbacks (individual response) for current task
        const taskFeedbacksIndividualResponse = await (async () => {
          // get responses of current student
          const studentResponseIds = [
            ...taskResponses
              ?.filter((x) => x?.student?.id === this?.user?.id)
              ?.map((x) => x?.id),
          ];

          // storage
          let _temp = [];

          // get feedbacks of individual responses
          await Promise.all(
            studentResponseIds?.map(async (x) => {
              const _feedbackForResponse = await this.getTaskFeedbacks({
                taskId: this.taskId,
                responseId: x,
              });

              _temp = [..._temp, ..._feedbackForResponse];
            })
          );

          // return list of individual response feedbacks
          return _temp;
        })();

        // failure case
        if (
          !taskResponses ||
          !taskFeedbacksWholeClass ||
          !taskFeedbacksIndividualResponse
        ) {
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
        const messagesFetched = (() => {
          let _temp = [];

          // add responses of auth user + transform obj
          _temp = [
            ...taskResponses
              ?.filter((x) => x?.student?.id === this?.user?.id)
              ?.map((x) => ({
                id: x?.id,
                from: x?.student?.id,
                audio: x?.voiceRecording,
                dateTime: x?.createdAt,
              })),
          ];

          // add feedbacks from of auth user + transform obj
          _temp = [
            ..._temp,
            ...[
              ...taskFeedbacksWholeClass,
              ...taskFeedbacksIndividualResponse,
            ]?.map((x) => ({
              id: x?.id,
              from: x?.teacher,
              audio: x?.voiceRecording,
              dateTime: x?.createdAt,
            })),
          ];

          // sort responses/feedbacks with dateTime
          _temp = [..._temp]?.sort(function (a, b) {
            const aDate = new Date(a?.dateTime);
            const bDate = new Date(b?.dateTime);
            return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
          });

          return _temp;
        })();
        this.messagesFetched = messagesFetched;
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
    async handleMessageCreation(recording) {
      // update page state
      this.state.responseCreation = {
        loading: true,
        message: {
          type: null,
          text: null,
        },
      };

      // upload audio file
      const uploadedFile = await this.handleFileUpload(recording?.blob);

      // failure case
      if (!uploadedFile) {
        this.state.responseCreation = {
          loading: false,
          message: {
            type: "error",
            text: "Failed To Create Response..!",
          },
        };
        return;
      }

      // payload
      const payload = {
        voiceRecording: uploadedFile,
      };

      // api call (create response)
      const response = await ResponseService.CreateResponse(
        this.taskId,
        payload
      ).catch();

      // failure case
      if (!response) {
        this.state.responseCreation = {
          loading: false,
          message: {
            type: "error",
            text: "Failed To Create Response..!",
          },
        };
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
      this.state.responseCreation = {
        loading: false,
        message: {
          type: null,
          text: null,
        },
      };
    },
    async getTaskResponses(taskId) {
      const query = {};

      const responseAPI = await ResponseService.QueryClassTaskResponses(
        taskId,
        query
      ).catch();

      return responseAPI?.data || null;
    },
    async getTaskFeedbacks({ taskId, responseId = null }) {
      const query = { ...(responseId && { responseId }) };

      const responseAPI = await FeedbackService.QueryClassTaskFeedbacks(
        taskId,
        query
      ).catch();

      return responseAPI?.data || null;
    },
  },
};
</script>

<style>
.talkie-conversation-card {
  display: flex;
  flex-direction: column;
  background: var(--t-white);
  cursor: pointer;
}
.talkie-conversation-card-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.talkie-conversation-card-spacer {
  height: var(--t-space-2);
  width: 100%;
  background: var(--t-gray-75);
}
.talkie-conversation-card-header {
  display: flex;
  flex-direction: column;
}
.talkie-conversation-card-header-status {
  display: block;
  border-radius: 50%;
  background: var(--t-primary);
}
.talkie-conversation-card-audio-messages-wrapper {
  display: flex;
  flex-direction: column;
}
.talkie-conversation-card-audio-message-centered {
  margin: auto;
}
.talkie-conversation-card-audio-message-right {
  margin-left: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-conversation-card {
    gap: var(--t-space-8);
    border-radius: var(--t-br-medium);
    padding: var(--t-space-20);
  }
  .talkie-conversation-card-spacer {
    margin: var(--t-space-12) 0;
  }
  .talkie-conversation-card-header {
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-header-status {
    width: var(--t-space-12);
    height: var(--t-space-12);
  }
  .talkie-conversation-card-audio-messages-wrapper {
    gap: var(--t-space-8);
    padding: var(--t-space-8) 0;
  }
}
@media (min-width: 600px) {
  .talkie-conversation-card {
    gap: var(--t-space-8);
    border-radius: var(--t-br-large);
    padding: var(--t-space-24);
  }
  .talkie-conversation-card-spacer {
    margin: var(--t-space-16) 0;
  }
  .talkie-conversation-card-header {
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-header-status {
    width: var(--t-space-16);
    height: var(--t-space-16);
  }
  .talkie-conversation-card-audio-messages-wrapper {
    gap: var(--t-space-10);
    padding: var(--t-space-10) 0;
  }
}
@media (min-width: 1200px) {
  .talkie-conversation-card {
    gap: var(--t-space-16);
  }
  .talkie-conversation-card-spacer {
    margin: var(--t-space-24) 0;
  }
  .talkie-conversation-card-audio-messages-wrapper {
    gap: var(--t-space-12);
    padding: var(--t-space-12) 0;
  }
}
</style>

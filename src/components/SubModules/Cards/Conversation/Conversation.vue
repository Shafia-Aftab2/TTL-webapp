<template>
  <div
    :class="[
      'talkie-conversation-card',
      `talkie-conversation-card-${userMode}-mode`,
    ]"
    @click="handleCardBodyClick"
  >
    <!-- Conversation Header -->
    <div
      class="talkie-conversation-card-header-wrapper"
      @click="handleCardBodyClick"
    >
      <!-- Student Mode -->
      <template v-if="userMode === 'student'">
        <div
          class="talkie-conversation-card-header talkie-conversation-card-header-col"
          @click="handleCardBodyClick"
        >
          <p class="p" v-if="taskTitle" @click="handleCardBodyClick">
            {{ taskTitle }}
          </p>
          <p class="p" v-if="taskTopic" @click="handleCardBodyClick">
            {{ taskTopic }}
          </p>
          <p
            class="p talkie-conversation-card-header-description"
            v-if="taskDescription"
            @click="handleCardBodyClick"
          >
            {{ taskDescription }}
          </p>
        </div>
        <div
          class="talkie-conversation-card-header-status"
          v-if="!taskIsRead"
        ></div>
      </template>
      <!-- Teacher Mode -->
      <template v-if="userMode === 'teacher'">
        <!-- left side -->
        <div
          class="talkie-conversation-card-header talkie-conversation-card-header-row talkie-conversation-card-header-row-center"
        >
          <img
            class="talkie-conversation-card-header-image"
            :src="studentAvatar"
            v-if="studentAvatar"
          />
          <p class="p" style="margin-bottom: 0 !important" v-if="studentName">
            {{ studentName }}
          </p>
        </div>

        <!-- right side -->
        <div
          class="talkie-conversation-card-header-options"
          v-if="!cardExpanded"
        >
          <talkie-audio-player
            v-if="computedMessages?.length > 0 && computedMessages[0]?.audio"
            v-slot="{ isPlaying, startPlayer, stopPlayer }"
            :source="computedMessages[0]?.audio"
          >
            <span
              class="talkie-conversation-card-header-options-audio-player-icons"
            >
              <talkie-icon
                :name="'play'"
                :isActive="true"
                :variant="'primary'"
                :size="40"
                :iconToSizeRatio="1.1"
                :onClick="startPlayer"
                v-if="!isPlaying"
              />
              <talkie-icon
                :name="'pause'"
                :isActive="true"
                :variant="'primary'"
                :size="40"
                :iconToSizeRatio="1.1"
                :onClick="stopPlayer"
                v-if="isPlaying"
              />
            </span>
          </talkie-audio-player>
          <!-- Record Button -->
          <talkie-icon
            :name="'mike-unmuted'"
            :isActive="true"
            :variant="'secondary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="handleCardBodyClick"
            v-if="!isRecording"
          />
          <!-- Feedback Stars -->
          <!-- <talkie-icon
            :name="'star'"
            :isActive="true"
            :variant="'primary'"
            :size="40"
            :iconToSizeRatio="1.1"
            :onClick="onRatingStarClick"
          /> -->
        </div>
      </template>
    </div>

    <!-- Spacer -->
    <div class="talkie-conversation-card-spacer" v-if="cardExpanded"></div>

    <template v-if="cardExpanded">
      <!-- Conversation Messages -->
      <div class="talkie-conversation-card-audio-messages-wrapper">
        <template v-if="!state?.messagesFetch?.loading">
          <conversation-message
            v-for="_response in computedMessages"
            :key="_response"
            :alignment="_response.from !== user?.id ? 'left' : 'right'"
            :messageAudio="_response.audio"
          />
        </template>

        <!-- Create Message Loader -->
        <template v-if="state?.messageCreation?.loading">
          <div class="talkie-conversation-card-audio-message-right">
            <talkie-loader :size="'large'" />
          </div>
        </template>

        <!-- Create Message Error -->
        <div
          class="talkie-conversation-card-audio-message-right"
          v-if="
            state?.messageCreation?.message?.type &&
            state?.messageCreation?.message?.text
          "
        >
          <talkie-alert
            :text="state?.messageCreation?.message?.text"
            :variant="state?.messageCreation?.message?.type"
          />
        </div>

        <!-- Fetch Messages Error -->
        <div
          class="talkie-conversation-card-audio-message-centered"
          v-if="
            state?.messagesFetch?.message?.type &&
            state?.messagesFetch?.message?.text
          "
        >
          <talkie-alert
            :text="state?.messagesFetch?.message?.text"
            :variant="state?.messagesFetch?.message?.type"
          />
        </div>

        <!-- Fetch Messages Loader -->
        <template v-if="state?.messagesFetch?.loading">
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
import { TalkieLoader, TalkieAlert, TalkieIcon } from "@/components/UICore";
import ConversationMessage from "./Message";
import ConversationRecorder from "./Recorder";
import authUser from "@/utils/helpers/auth";
import { ResponseService, FileService, FeedbackService } from "@/api/services";
import FilePurposes from "@/utils/constants/filePurposes";
import rolesList from "@/utils/constants/roles";
import { notifications } from "@/components/UIActions";
import { TalkieAudioPlayer } from "@/components/SubModules/AudioManager";

export default {
  name: "ConversationCard",
  components: {
    TalkieLoader,
    TalkieAlert,
    TalkieIcon,
    ConversationMessage,
    ConversationRecorder,
    TalkieAudioPlayer,
  },
  props: {
    userMode: {
      type: String,
      validator: (val) => ["student", "teacher"].includes(val),
    },
    messages: {
      type: Array,
      default: () => [],
    },
    taskId: {
      type: String,
    },
    studentId: {
      type: String,
    },
    // student mode
    taskTitle: {
      type: String,
    },
    taskDescription: {
      type: String,
    },
    taskTopic: {
      type: String,
    },
    taskIsRead: {
      type: Boolean,
      default: false,
    },
    // teacher mode
    studentName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
  },
  data() {
    return {
      cardExpanded: false,
      user: {},
      state: {
        messageCreation: {
          loading: false,
          message: {
            type: null,
            text: null,
          },
        },
        messagesFetch: {
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
    computedResponseId() {
      const responseId = (() => {
        const _studentMessages = this.computedMessages.filter(
          (x) => x?.from === this.studentId
        );

        const lastStudentMessage =
          _studentMessages[_studentMessages?.length - 1];

        return lastStudentMessage?.id;
      })();

      return responseId || null;
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

      if (this.cardExpanded) await this.getConversationMessages();
    },
    async getConversationMessages() {
      // update page state
      this.state.messagesFetch = {
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
            ?.filter((x) => x?.student?.id === this?.studentId)
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
        this.state.messagesFetch = {
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
            ?.filter((x) => x?.student?.id === this?.studentId)
            ?.map((x) => ({
              id: x?.id,
              from: x?.student?.id,
              audio: x?.voiceRecording,
              dateTime: x?.createdAt,
            })),
        ];

        // add feedbacks for auth user + transform obj
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
      this.state.messagesFetch = {
        loading: false,
        message: {
          type: null,
          text: null,
        },
      };
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
      // if teacher has no response to give feedback for
      if (!this.computedResponseId && this.userMode === rolesList.TEACHER) {
        notifications.show("No Student Responses To Give Feedback For..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // update page state
      this.state.messageCreation = {
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
        this.state.messageCreation = {
          loading: false,
          message: {
            type: "error",
            text: `Failed To Create ${
              this.userMode === rolesList.STUDENT ? "Response" : "Feedback"
            }..!`,
          },
        };
        return;
      }

      // payload
      const payload = {
        voiceRecording: uploadedFile,
      };

      // api call (create response/feedback)
      const response =
        this.userMode === rolesList.STUDENT
          ? await ResponseService.CreateResponse(this.taskId, payload).catch()
          : await FeedbackService.CreateIndividualFeedback(
              this.computedResponseId,
              payload
            ).catch();

      // failure case
      if (!response) {
        this.state.messageCreation = {
          loading: false,
          message: {
            type: "error",
            text: `Failed To Create ${
              this.userMode === rolesList.STUDENT ? "Response" : "Feedback"
            }..!`,
          },
        };
        return;
      }

      // success case
      const createdMessage = response?.data;
      this.messagesFetched = [
        ...this.messagesFetched,
        {
          id: createdMessage?.id,
          from:
            this.userMode === rolesList.STUDENT ? this.studentId : this.user.id,
          audio: createdMessage?.voiceRecording,
        },
      ];
      this.state.messageCreation = {
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
}
.talkie-conversation-card-header-description {
  margin-top: var(--t-space-5);
  color: var(--t-gray-50);
}
.talkie-conversation-card-header-col {
  flex-direction: column;
}
.talkie-conversation-card-header-row {
  flex-direction: row;
}
.talkie-conversation-card-header-row-center {
  align-items: center;
}
.talkie-conversation-card-header-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
}
.talkie-conversation-card-header-status {
  display: block;
  border-radius: 50%;
  background: var(--t-primary);
}
.talkie-conversation-card-header-options {
  display: flex;
  align-items: center;
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
  }
  .talkie-conversation-card-student-mode,
  .talkie-conversation-card-teacher-mode {
    padding: var(--t-space-20);
  }
  .talkie-conversation-card-spacer {
    margin: var(--t-space-12) 0;
  }
  .talkie-conversation-card-header-col {
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-header-row {
    gap: var(--t-space-12);
  }
  .talkie-conversation-card-header-image {
    --image-size: var(--t-space-56);
  }
  .talkie-conversation-card-header-status {
    width: var(--t-space-12);
    height: var(--t-space-12);
  }
  .talkie-conversation-card-header-options {
    gap: var(--t-space-12);
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
  }
  .talkie-conversation-card-student-mode {
    padding: var(--t-space-24);
  }
  .talkie-conversation-card-teacher-mode {
    padding: var(--t-space-16);
  }
  .talkie-conversation-card-spacer {
    margin: var(--t-space-16) 0;
  }
  .talkie-conversation-card-header-col {
    gap: var(--t-space-8);
  }
  .talkie-conversation-card-header-row {
    gap: var(--t-space-16);
  }
  .talkie-conversation-card-header-image {
    --image-size: var(--t-space-63);
  }
  .talkie-conversation-card-header-status {
    width: var(--t-space-16);
    height: var(--t-space-16);
  }
  .talkie-conversation-card-header-options {
    gap: var(--t-space-12);
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
  .talkie-conversation-card-header-image {
    --image-size: var(--t-space-70);
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

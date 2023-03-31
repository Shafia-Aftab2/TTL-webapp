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
        <!-- left side -->
        <div
          :class="[
            'talkie-conversation-card-header',
            'talkie-conversation-card-header-col',
          ]"
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

        <!-- right side -->
        <div class="talkie-conversation-card-header-options">
          <div
            class="talkie-conversation-card-header-status"
            v-if="!taskIsRead"
          ></div>

          <talkie-chip
            :label="`${pointsScored}  star${pointsScored > 0 ? 's' : ''}`"
            :variant="'success'"
            v-if="pointsScored != null && pointsScored >= 0"
          />
        </div>
      </template>
      <!-- Teacher Mode -->
      <template v-if="userMode === 'teacher'">
        <!-- left side -->
        <div
          :class="[
            'talkie-conversation-card-header',
            'talkie-conversation-card-header-row',
            'talkie-conversation-card-header-row-center',
          ]"
        >
          <template v-if="captionThisImage">
            <img
              class="talkie-conversation-card-header-image"
              :src="captionThisImage"
            />
            <p v-if="topicName" class="p" style="margin-bottom: 0 !important">
              Topic: {{ topicName }}
            </p>
          </template>
          <template v-if="textToTranslate">
            <p class="p" style="margin-bottom: 0 !important">
              Translation: {{ textToTranslate }}
            </p>
          </template>
          <div v-if="emojiStory && emojiStory.length">
            <div style="display: flex; flex-direction: row">
              <p v-if="topicName" class="p" style="margin-bottom: 0 !important">
                Topic: {{ topicName }}
              </p>
            </div>
            <div style="display: flex; flex-direction: row; margin-top: 20px">
              <img
                v-for="emoji in emojiStory"
                :key="emoji"
                :src="emoji"
                :alt="'Talkie Emoji'"
                class="talkie-conversation-message-emoji"
              />
            </div>
          </div>
          <template v-if="!textToTranslate && !captionThisImage && !emojiStory">
            <p class="p" style="margin-bottom: 0 !important">
              {{ taskTitle || "No title " }}
            </p>
            <p v-if="!taskTitle" class="p" style="margin-bottom: 0 !important">
              Topic: {{ topicName }}
            </p>
          </template>
          <template v-if="!topicName">
            <img
              class="talkie-conversation-card-header-image"
              :src="require(`@/assets/images/person-placeholder-image.png`)"
              v-if="!isValidAvatar(studentAvatar)"
            />
            <span
              class="talkie-conversation-card-header-image"
              v-if="isValidAvatar(studentAvatar)"
              v-html="studentAvatar"
            >
            </span>
            <p class="p" style="margin-bottom: 0 !important" v-if="studentName">
              {{ studentName }}
            </p>
          </template>
        </div>

        <!-- right side -->
        <div class="talkie-conversation-card-header-options">
          <!-- <talkie-chip
            :label="'Click To Expand'"
            :variant="'neutral'"
            v-if="!cardExpanded"
            :onClick="handleCardBodyClick"
          /> -->

          <!-- Audio Message without expand -->
          <talkie-audio-player
            v-if="latestStudResponse && latestStudResponse.voiceRecording"
            :source="latestStudResponse.voiceRecording"
            v-slot="{
              // totalAudioPlaybackTime,
              startPlayer,
              stopPlayer,
              isPlaying,
              // updateAudioPercentage,
              // currentAudioPercentage,
            }"
          >
            <talkie-icon
              :name="'play'"
              :variant="'primary'"
              :size="35"
              :onClick="
                async () => {
                  await startPlayer();
                  // onAudioPlay() && (await onAudioPlay());
                }
              "
              v-if="!isPlaying"
            />
            <talkie-icon
              :name="'pause'"
              :variant="'primary'"
              :size="35"
              :onClick="stopPlayer"
              v-if="isPlaying"
            />
            <!-- <talkie-audio-timeline
              :percentage="currentAudioPercentage"
              :onHeadChange="updateAudioPercentage"
            />
            <span class="talkie-conversation-card-message-timestamps">
              {{ totalAudioPlaybackTime }}
            </span> -->
          </talkie-audio-player>
          &nbsp;
          <!-- Record Buttons Without expand -->
          <talkie-audio-recorder
            v-slot="{ startRecording, stopRecording, isRecording }"
            :onRecordingStopped="handleRecordedItem"
          >
            <talkie-icon
              :name="'mike-unmuted'"
              :isActive="false"
              :variant="'secondary'"
              :size="33"
              :onClick="startRecording"
              v-if="!isRecording && !currentRecording"
            />
            <talkie-icon
              :name="'square'"
              :isActive="false"
              :variant="'secondary'"
              :size="33"
              :iconToSizeRatio="1.5"
              :customClass="'talkie-conversation-card-options-stop-recording-button'"
              :onClick="stopRecording"
              v-if="isRecording && !currentRecording"
            />
            <talkie-icon
              :name="'send'"
              :isActive="false"
              :variant="'secondary'"
              :size="33"
              :onClick="handleRecordingSendClick"
              v-if="currentRecording && !isSendingRecording"
            />
            <talkie-loader
              :name="'sendLoader'"
              :size="'large'"
              v-if="isSendingRecording"
            />
          </talkie-audio-recorder>
          &nbsp;
          <!-- Feedback Stars -->
          <talkie-icon
            :name="'star'"
            :isActive="false"
            :variant="!feedbackGiven ? 'neutral' : 'primary'"
            :size="33"
            :iconToSizeRatio="1.1"
            :onClick="handleRateStudentResponse"
          />
          <!-- v-if="cardExpanded" -->
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
            :messagePhoto="_response.photo"
            :messageText="_response.text"
            :messageEmojis="_response.emojis"
            :messageAudio="_response.audio"
            :isDownloadable="isAudioDownloadable"
            :showReadReceipt="_response.showReadReceipt"
            :isRead="_response.isRead"
            :onAudioPlay="async () => await markMessageRead(_response.id)"
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

  <!-- Modal Content -->
  <!-- <talkie-modal
    :contentPadded="true"
    :closeButton="true"
    :onClose="handleModalClose"
    :maxWidth="750"
    v-if="showRatingStarModal"
  >
    <div class="class-manage-modal-invite-students">
      <div class="class-manage-modal-invite-students-header-wrapper">
        <h3 class="h3">Rate Response</h3>
      </div>

      <div style="display: block">
        <talkie-star-rating :onRatingChange="handleRatingStarChange" />
      </div>

      <talkie-button
        :onClick="handleRateStudentResponse"
        :disabled="responseRating === 0"
      >
        Continue
      </talkie-button>
    </div>
  </talkie-modal> -->

  <!-- Backdrop load wrapper -->
  <talkie-back-drop-loader v-if="backdropLoading" />
</template>

<script>
import {
  TalkieLoader,
  TalkieAlert,
  TalkieIcon,
  // TalkieModal,
  // TalkieStarRating,
  // TalkieButton,
  TalkieChip,
  TalkieBackDropLoader,
} from "@/components/UICore";
import {
  TalkieAudioPlayer,
  TalkieAudioRecorder,
  // TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import ConversationMessage from "./Message";
import ConversationRecorder from "./Recorder";
import authUser from "@/utils/helpers/auth";
import {
  ResponseService,
  FileService,
  FeedbackService,
  TaskService,
} from "@/api/services";
import FilePurposes from "@/utils/constants/filePurposes";
import rolesList from "@/utils/constants/roles";
import { notifications } from "@/components/UIActions";

export default {
  name: "ConversationCard",
  components: {
    TalkieLoader,
    TalkieAlert,
    TalkieIcon,
    // TalkieModal,
    // TalkieButton,
    // TalkieStarRating,
    TalkieChip,
    TalkieBackDropLoader,
    ConversationMessage,
    ConversationRecorder,
    TalkieAudioPlayer,
    TalkieAudioRecorder,
    // TalkieAudioTimeline,
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
    textToTranslate: {
      type: String,
    },
    captionThisImage: {
      type: String,
    },
    emojiStory: {
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
    showReadReceipts: {
      type: Boolean,
      default: false,
    },
    // teacher mode
    topicName: {
      type: String,
    },
    studentName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
    isAudioDownloadable: {
      type: Boolean,
      default: false,
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
      showRatingStarModal: false,
      // responseRating: 0,
      responseRating: 5, // give fix feedback value = 5 stars
      feedbackGiven: false,
      backdropLoading: false,
      pointsScored: null,
      latestStudResponse: null,
      currentRecording: null,
      isSendingRecording: false,
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
    this.getConversationMessages();
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
    },
    async handleRecordingSendClick() {
      this.isSendingRecording = true;
      await this.handleMessageCreation(this.currentRecording);
      this.isSendingRecording = false;
      this.currentRecording = null;
    },
    isValidAvatar(avatar) {
      return avatar?.toString()?.includes("svg");
    },
    handleRatingStarClick() {
      this.showRatingStarModal = true;
      this.responseRating = 0;
    },
    handleModalClose() {
      this.showRatingStarModal = false;
      this.responseRating = 0;
    },
    handleRatingStarChange(rating) {
      this.responseRating = rating;
    },
    async handleRateStudentResponse() {
      if (this.feedbackGiven) {
        notifications.show("You've already given this student a star!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // form data
      const score = this.responseRating;
      const responseId = (() => {
        const studentResponses = this.computedMessages?.filter(
          (x) => x?.from !== this?.user?.id
        );

        // only the first response can be scored
        const firstStudentResponse = studentResponses?.[0];

        return firstStudentResponse?.id;
      })();

      // validate form data
      if (!responseId) {
        notifications.show("No response from student.", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // update page state
      this.backdropLoading = true;
      this.showRatingStarModal = false;
      this.responseRating = 0;

      // payload
      const payload = { score };

      // api call
      const response = await ResponseService.AddResponseScore(
        responseId,
        payload
      ).catch(() => {
        return {
          error: "Could not add rating. Please try again later.",
        };
      });

      // failure case
      if (response.error) {
        this.backdropLoading = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      this.feedbackGiven = true;
      notifications.show("⭐ Feedback sent!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async markMessageRead(messageId) {
      const messages = [...this.messagesFetched];
      const message = messages.find((x) => x.id === messageId);

      // return if message is already marked
      if (message?.isRead) return;

      // mark feedback as read
      if (this.userMode === "student") {
        await FeedbackService.MarkFeedbackReadByStudent(messageId).catch(
          () => null
        );
      }

      // update messages
      message.isRead = true;
      this.messagesFetched = messages;
    },
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

      // api call to get inbox messages
      const response =
        this.userMode === rolesList.TEACHER
          ? await TaskService.GetTeacherInboxItemDetails(
              this.taskId,
              this.studentId
            ).catch(() => null)
          : await TaskService.GetStudentInboxItemDetails(this.taskId).catch(
              () => null
            );

      // failure case
      if (!response?.data) {
        this.state.messagesFetch = {
          loading: false,
          message: {
            type: "error",
            text: "Sorry, we can't seem to load your inbox. Please try again later.",
          },
        };
        return;
      }

      // success case
      const transformedMessages = response?.data?.messages?.map((x) => ({
        id: x?.id,
        from: x?.student || x?.teacher,
        dateTime: x?.createdAt,
        audio: x?.voiceRecording,
        // read receipts for students
        ...(x.object === "feedback" &&
          this.showReadReceipts &&
          this.userMode === "student" && {
            isRead: x?.readByStudents?.includes(this.studentId),
            showReadReceipt: true,
          }),
      }));
      this.latestStudResponse = response.data.messages
        .filter((x) => x.object === "response")
        .reduce((a, b) => (a.createdAt > b.createdAt ? a : b));

      this.messagesFetched = transformedMessages;

      // only allow the teacher to score the first response
      const scoredByTeacher = response?.data?.messages?.filter(
        (x) => x?.object === "response" && x.scoreByTeacher
      )?.[0];

      if (scoredByTeacher) {
        this.feedbackGiven = true;
        this.pointsScored = scoredByTeacher?.scoreByTeacher;
      }

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
      if (!recording) return;

      // if teacher has no response to give feedback for
      if (!this.computedResponseId && this.userMode === rolesList.TEACHER) {
        notifications.show("No response from student.", {
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
            text: `Failed. Please try again.`,
            // text: `Failed To Create ${
            //   this.userMode === rolesList.STUDENT ? "Response" : "Feedback"
            // }!`,
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
            text: `Failed. Please try again.`,
            // text: `Failed To Create ${
            //   this.userMode === rolesList.STUDENT ? "Response" : "Feedback"
            // }!`,
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
            this.userMode === rolesList.STUDENT
              ? this.studentId
              : this.user?.id,
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
      notifications.show(
        `${this.userMode === "student" ? "Response" : "Feedback"} sent!`,
        {
          variant: "success",
          displayIcon: true,
        }
      );
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
  transition: 0.1s ease;
  border-color: var(--t-gray-75);
  border-style: solid;
}
.talkie-conversation-card:hover {
  border-width: var(--t-space-1);
  transform: scale(0.99);
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
.talkie-conversation-card-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-30);
}
.talkie-conversation-card-modal-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-5);
  text-align: center;
}
.talkie-conversation-card-modal-input-wrapper,
.talkie-conversation-card-modal-input-wrapper > div {
  min-width: 80% !important;
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
.talkie-conversation-message-emoji {
  height: var(--t-space-36);
  width: var(--t-space-36);
}
</style>

<template>
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ setValue, triggerFormSubmit }"
      :onSubmit="handleSubmit"
      :customClass="'box-container'"
    >
      <span hidden>
        <!-- TODO: updated these states via a handler -->
        {{ (this.setFormValue = setValue) }}
        {{ (this.triggerFormSubmission = triggerFormSubmit) }}
      </span>
      <talkie-modal
        v-if="modalPreview"
        :contentPadded="true"
        :buttonsOutSideModal="modalPreviewButtons"
      >
        Press Send To Conitnue
      </talkie-modal>
      <talkie-audio-recorder
        v-slot="{ startRecording, stopRecording, isRecording }"
        :onRecordingStopped="handleRecordedItem"
      >
        <div class="header">
          <talkie-question-card
            :title="taskDetails.title"
            :topic="taskDetails.topic"
            :description="taskDetails.description"
            :fullWidth="true"
            class="bg"
          />
        </div>
        <div class="box-content">
          <div class="qa">
            <div class="talkie-icon-bar">
              <div class="messege-bar">
                <talkie-audio-timeline
                  :percentage="currentAudioPercentage"
                  :onHeadChange="updateAudioPercentage"
                />
              </div>
              <div class="bar-icons-pg">
                <talkie-icon
                  :name="'arrow-rounded-left'"
                  :isActive="true"
                  :onClick="handleRecordedItemReset"
                  :variant="'secondary'"
                  :size="30"
                />
                <talkie-icon
                  :name="'mike-unmuted'"
                  :isActive="true"
                  :variant="'secondary'"
                  :onClick="startRecording"
                  :size="50"
                  v-if="!isRecording && !currentRecording"
                />
                <talkie-icon
                  :name="'square'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="50"
                  :iconToSizeRatio="1.5"
                  :customClass="'class-start-convo-form-options-stop-recording-button'"
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
                <talkie-icon
                  :type="'submit'"
                  :name="'send'"
                  :isActive="true"
                  :variant="'secondary'"
                  :size="30"
                />
              </div>
            </div>
          </div>
        </div>
      </talkie-audio-recorder>
      <div class="recording">
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
          <div class="class-start-convo-form-options-audio-player-wrapper">
            <talkie-audio-timeline
              :percentage="currentAudioPercentage"
              :onHeadChange="updateAudioPercentage"
            />
            <span class="class-start-convo-form-options-audio-player-timestamps"
              >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
            </span>
          </div>
        </talkie-audio-player>
      </div>
    </talkie-form>
  </template>
  <template v-if="computedPageLoading">
    <div class="class-start-convo-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>
<script>
import {
  TalkieIcon,
  TalkieForm,
  TalkieLoader,
  TalkieModal,
} from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import {
  ClassService,
  TaskService,
  ResponseService,
  FileService,
} from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";
export default {
  name: "ClassTaskResponse",
  components: {
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieForm,
    TalkieLoader,
    TalkieModal,
    TalkieQuestionCard,
  },
  data() {
    return {
      topics: [],
      // createQandATopicSchema: createQandATopicSchema,
      pageLoading: false,
      loading: false,
      formStatus: {
        type: null,
        message: null,
        animateEllipse: false,
      },
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
      currentRecording: null,
      isAudioPlaying: null,
      shouldSubmit: false,
      handleAudioPlayerToggle: () => {},
      setFormValue: () => {},
      triggerFormSubmission: () => {},
      classId: null,
      taskId: null,
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

    // task id from params
    const taskId = this.$route.params.taskId;
    this.taskId = taskId;

    // class id from params
    const classId = this.$route.params.classId;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // class tasks
    const classTasks = await this.getClassTasks(classId);
    if (!classTasks) return this.$router.push("/404");

    // get task details
    const taskDetails = await this.getTaskDetails(taskId);
    if (!taskDetails) return this.$router.push("/404");

    // get task responses
    const taskResponses = await this.getTaskResponses(taskId);
    if (!taskResponses) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails.id,
      name: classDetails.name,
    };

    // sidebar data
    const sidebarItems = classTasks.results.map((x) => ({
      name: x.title,
      hasRightIcon: true,
      link: `/classes/${this.classId}/tasks/${x.id}/respond`,
      onClick: () =>
        this.$router.push(`/classes/${this.classId}/tasks/${x.id}/respond`),
      isActive: x.id === taskId,
    }));
    const sidebarButtons = [
      {
        text: "Go To Class",
        type: "button",
        variant: "primary",
        size: "small",
        outlined: true,
        loading: false,
        disabled: false,
        onClick: () => this.$router.push(`/classes/${this.classId}`),
      },
    ];

    this.handleSidebarMutation({
      items: sidebarItems,
      buttons: sidebarButtons,
    });

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
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    handleSidebarMutation(data) {
      const sidebar = this.$store.state.sidebar;
      const updatedData = {
        hasBackLink: data.hasOwnProperty("hasBackLink")
          ? data.hasBackLink
          : sidebar.hasBackLink,
        items: data.hasOwnProperty("items") ? data.items : sidebar.items,
        checkboxes: data.hasOwnProperty("checkboxes")
          ? data.checkboxes
          : sidebar.checkboxes,
        buttons: data.hasOwnProperty("buttons")
          ? data.buttons
          : sidebar.buttons,
      };

      this.handleStoreMutation(
        "sidebar",
        Object.assign({}, { ...updatedData })
      );
    },

    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getClassTasks(id) {
      const query = { type: TaskTypes.QUESTION_ANSWER };

      const response = await TaskService.QueryClassTasks(id, query).catch(
        () => null
      );

      return response.data || null;
    },
    async getTaskDetails(id) {
      const response = await TaskService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getTaskResponses(taskId) {
      const query = {};

      const response = await ResponseService.QueryClassTaskResponses(
        taskId,
        query
      ).catch(() => null);

      return response.data || null;
    },

    handleRecordedItem(recording) {
      this.currentRecording = recording;
      this.setFormValue("voiceForQnA", recording.blob);
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
      this.setFormValue("voiceForQnA", "");
    },
    handleModalValidation() {
      this.shouldSubmit = true;
    },
    handleModalToggle() {
      this.modalPreview = !this.modalPreview;
    },
    handleModalValidationReset() {
      this.shouldSubmit = false;
    },
    async handleFileUpload() {
      // update page state
      this.formStatus = {
        type: "info",
        message: "Uploading Audio",
        animateEllipse: true,
      };

      // payload
      const payload = new FormData();
      payload.append(
        "files",
        this.currentRecording.blob,
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
      this.formStatus = { type: null, message: null, animateEllipse: false };
      return uploadedFile;
    },
    async handleSubmit() {
      if (!this.shouldSubmit) {
        this.handleModalToggle();
        this.handleModalValidationReset();
        return;
      }
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null, animateEllipse: false };

      // upload file
      const voiceForQnA = await this.handleFileUpload();

      // failure case
      if (!voiceForQnA) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: "Could not upload audio file..!",
        };
        return;
      }

      // payload
      const payload = {
        voiceRecording: voiceForQnA,
      };

      // api call
      const response = await ResponseService.CreateResponse(
        "61b8dab540b8301eca269d38",
        payload
      ).catch(() => {
        return {
          error: "Could not Send Recording..!",
        };
      });

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
        message: "Recording Sent. Redirecting..!",
        animateEllipse: false,
      };

      // update page state
      this.loading = false;

      // redirect to class
      this.$router.push(
        `/classes/${this.classId}/tasks/${this.taskId}/respond`
      );
    },
  },
};
</script>
<style scoped>
.bg {
  background-color: transparent;
}
.header {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
}
.recording {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  padding: 100px 0 var(--t-space-50) 0;
}
.talkie-icon-bar {
  position: relative;
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.messege-bar {
  margin-bottom: 20px;
}
.bar-icons-pg {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.qa {
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.box-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  z-index: 1;
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-header {
  display: grid;
  gap: 10px;
}
.box-head {
  display: flex;
  justify-content: space-between;
}
.class-start-convo-form-options-audio-player-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.class-start-convo-form-options-audio-player-timestamps {
  margin-left: auto;
  color: var(--t-black-100);
}
.class-start-convo-form-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}
.class-start-convo-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
@media (max-width: 599px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-start-convo-form-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}

@media (min-width: 900px) {
  .class-start-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}

@media (min-width: 1200px) {
  .class-start-convo-form-options-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-start-convo-form-options-audio-player-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-start-convo-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
}
</style>

<template>
  <template v-if="!computedPageLoading">
    <talkie-form
      v-slot="{ setValue, triggerFormSubmit }"
      :onSubmit="handleSubmit"
      :customClass="'box-container'"
    >
      <h3>Q&A</h3>
      <span hidden>
        <!-- TODO: updated these states via a handler -->
        {{ (this.setFormValue = setValue) }}
        {{ (this.triggerFormSubmission = triggerFormSubmit) }}
      </span>
      <talkie-modal
        v-if="modalPreview"
        :contentPadded="true"
        :buttonsOutSideModal="modalPreviewButtons"
        :type="'Confirm'"
        :title="'Press Send to Continue'"
      >
      </talkie-modal>
      <talkie-audio-recorder
        v-slot="{ startRecording, stopRecording, isRecording }"
        :onRecordingStopped="handleRecordedItem"
      >
        <div class="box-content">
          <div class="qa">
            <small>Technology and Media</small>
            <h2>Fave App</h2>
            <p>This is translation</p>
            <div class="talkie-icon-bar">
              <div class="messege-bar">
                <p>Audios</p>
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
} from "../../../UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { FileService, TopicService, ResponseService } from "@/api/services";
import FilePurposes from "@/utils/constants/filePurposes";
import authUser from "@/utils/helpers/auth";
export default {
  name: "StudentQA",
  components: {
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieForm,
    TalkieLoader,
    TalkieModal,
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

    // get class topics
    const topics = await this.getClassTopics();

    // error case
    if (!topics) return this.$router.push("/404");

    // success case
    this.topics = topics;
    this.pageLoading = false;
  },
  methods: {
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

      const user = authUser.getUser();

      // get user classes
      const classes =
        user.schools && user.schools.length > 0
          ? user.schools[0].classes
          : null;
      if (!classes) return this.$router.push("/404");

      // get user first class id
      const firstClassId = classes.length > 0 ? classes[0] : null;
      if (!firstClassId) return this.$router.push("/404");

      // update page state
      this.loading = false;

      // redirect to class
      this.$router.push(`/classes/${firstClassId}`);
    },
    async getClassTopics() {
      const query = {};

      const response = await TopicService.Query(query).catch(() => null);

      return !!response.data ? response.data.results : null;
    },
  },
};
</script>
<style scoped>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
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

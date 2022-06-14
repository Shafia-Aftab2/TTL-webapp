<template>
  <div class="class-practice-wrapper" v-if="!computedPageLoading">
    <div class="class-practice-header-wrapper">
      <!-- If there are no more class tasks for practice -->
      <template v-if="noMoreTasks">
        <span> </span>
        <h4 class="h4">
          Practice Mode <br />
          (All done!)
        </h4>
        <a
          class="class-practice-header-wrapper-link"
          @click="handleFinishLinkClick"
        >
          Finish &#8594;
        </a>
      </template>

      <!-- If there are no class tasks for practice -->
      <template v-if="classTasks.length === 0 && !noMoreTasks">
        <router-link class="class-practice-header-wrapper-link" to="/">
          &#8592; Exit
        </router-link>
        <h4 class="h4">Practice Mode</h4>
      </template>

      <!-- If there are class tasks for practice -->
      <template v-if="classTasks.length > 0 && !noMoreTasks">
        <router-link
          class="class-practice-header-wrapper-link"
          to="/"
          v-if="currentTask.canExit"
        >
          &#8592; Exit
        </router-link>
        <h4 class="h4" v-if="currentTask.title">{{ currentTask.title }}</h4>
        <a
          class="class-practice-header-wrapper-link"
          v-if="currentTask.canFinish"
          @click="handleFinishLinkClick"
        >
          Finish &#8594;
        </a>
      </template>
    </div>

    <!-- If there are class tasks for practice -->
    <template v-if="classTasks.length > 0 && !noMoreTasks">
      <div
        :class="[
          'class-practice-body-wrapper',
          currentTaskAnswered.scores &&
            currentTaskAnswered.appericiationMessage &&
            'class-practice-body-wrapper-blured',
        ]"
      >
        <div class="class-practice-body-head-wrapper">
          <p class="p" v-if="currentTask.topic">{{ currentTask.topic }}</p>
          <talkie-tool-tip
            :tooltip="currentTask.instructions"
            v-if="currentTask.instructions"
          >
            <h5 class="h5 class-practice-body-head-wrapper-instructions">
              <p class="p">Instructions</p>
            </h5>
          </talkie-tool-tip>
        </div>

        <div class="class-practice-body-content-wrapper">
          <!-- Caption this -->
          <template
            v-if="
              currentTask.type === taskTypes.CAPTION_THIS &&
              currentTask.captionImage
            "
          >
            <img
              :src="currentTask.captionImage"
              class="class-practice-body-content-wrapper-caption-image"
            />
          </template>

          <!-- Emoji story -->
          <template
            v-if="
              currentTask.type === taskTypes.EMOJI_STORY && currentTask.emojis
            "
          >
            <div class="class-practice-body-content-wrapper-emojis-wrapper">
              <template v-for="emojiURL in currentTask.emojis" :key="emojiURL">
                <img
                  :draggable="false"
                  :src="emojiURL"
                  class="class-practice-body-content-wrapper-emojis-image-item"
                />
              </template>
            </div>
          </template>

          <!-- Translation -->
          <template
            v-if="
              currentTask.type === taskTypes.TRANSLATION &&
              currentTask.translation
            "
          >
            <div class="class-translations-wrapper">
              <h4
                class="h4 class-translations-question-header"
                v-if="currentTask.translation.question"
              >
                <span class="class-translations-question-wrapper">
                  Question
                </span>
                {{ currentTask.translation.question }}
              </h4>

              <h4
                class="h4 class-translations-answer-header"
                v-if="
                  currentTask.translation.answer &&
                  currentTaskAnswered.showTranslationSelfAssessment
                "
              >
                <span class="class-translations-answer-wrapper"> Answer </span>
                {{ currentTask.translation.answer }}
              </h4>

              <div
                class="class-translations-self-assessment-wrapper"
                v-if="currentTaskAnswered.showTranslationSelfAssessment"
              >
                <h5 class="h5">Self-assessment:</h5>
                <p class="p">
                  Now, listen back to your recording and compare! How did you
                  get on?
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Recorder -->
        <div
          class="class-practice-body-footer-wrapper"
          v-if="currentTask.shouldRecord"
        >
          <!-- Player -->
          <div
            class="class-practice-body-footer-wrapper-audio-player"
            v-if="
              currentRecording &&
              !(
                currentTaskAnswered.scores &&
                currentTaskAnswered.appericiationMessage
              )
            "
          >
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
            >
              <span hidden>
                <!-- TODO: updated these states via a handler -->
                {{ (this.isAudioPlaying = isPlaying) }}
                {{ (this.handleAudioPlayerToggle = togglePlayer) }}
              </span>
              <div class="class-practice-body-audio-player-wrapper">
                <talkie-audio-timeline
                  :percentage="currentAudioPercentage"
                  :onHeadChange="updateAudioPercentage"
                />
                <span
                  class="class-practice-body-audio-player-wrapper-timestamps"
                  >{{ currentAudioPlaybackTime }} / {{ totalAudioPlaybackTime }}
                </span>
              </div>
            </talkie-audio-player>
          </div>

          <talkie-audio-recorder
            v-slot="{ startRecording, stopRecording, isRecording }"
            :onRecordingStopped="handleRecordedItem"
          >
            <!-- Temp -->
            <span hidden>
              {{ (this.errors = /{voiceForQnA: null}/) }}
            </span>
            <div class="class-practice-body-footer-wrapper-options">
              <!-- Not answered options -->
              <template
                v-if="
                  !(
                    currentTaskAnswered.scores &&
                    currentTaskAnswered.appericiationMessage
                  )
                "
              >
                <!-- if there is self assessment for current(translation for now) task -->
                <div
                  class="class-practice-body-footer-wrapper-options-item"
                  v-if="
                    currentRecording &&
                    currentTaskAnswered.showTranslationSelfAssessment
                  "
                >
                  <talkie-icon
                    :type="'submit'"
                    :name="'x-mark'"
                    :isActive="true"
                    :variant="'danger'"
                    :size="30"
                    :onClick="
                      async () => await handleTranslationTaskAnswer(false)
                    "
                  />
                </div>
                <!-- if there is no self assessment for current(translation for now) task -->
                <div
                  class="class-practice-body-footer-wrapper-options-item"
                  v-if="
                    currentRecording &&
                    !currentTaskAnswered.showTranslationSelfAssessment
                  "
                >
                  <talkie-icon
                    :name="'arrow-rounded-left'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="30"
                    :onClick="handleRecordedItemReset"
                  />
                  <p
                    :class="[
                      'class-practice-body-footer-wrapper-options-item-label',
                      !currentRecording &&
                        'class-practice-body-footer-wrapper-options-item-label-non-visiable',
                    ]"
                  >
                    Redo
                  </p>
                </div>
                <!-- pause/play/record/stop toggle -->
                <div class="class-practice-body-footer-wrapper-options-item">
                  <talkie-icon
                    :name="'mike-unmuted'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="50"
                    :onClick="startRecording"
                    :customClass="
                      errors.voiceForQnA &&
                      'class-practice-body-footer-wrapper-options-mike-unmuted-button-error'
                    "
                    v-if="!isRecording && !currentRecording"
                  />
                  <talkie-icon
                    :name="'square'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="50"
                    :iconToSizeRatio="1.5"
                    :customClass="'class-practice-body-footer-wrapper-options-stop-recording-button'"
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
                  <p
                    :class="[
                      'class-practice-body-footer-wrapper-options-item-label',
                      errors.voiceForQnA &&
                        'class-practice-body-footer-wrapper-options-item-label-error',
                    ]"
                  >
                    {{
                      !!errors.voiceForQnA
                        ? errors.voiceForQnA
                        : !currentRecording
                        ? "Tap To Record"
                        : !isAudioPlaying
                        ? "Play"
                        : "Pause"
                    }}
                  </p>
                </div>
                <!-- if there is self assessment for current(translation for now) task -->
                <div
                  class="class-practice-body-footer-wrapper-options-item"
                  v-if="
                    currentRecording &&
                    currentTaskAnswered.showTranslationSelfAssessment
                  "
                >
                  <talkie-icon
                    :type="'submit'"
                    :name="'tick-mark'"
                    :isActive="true"
                    :variant="'success'"
                    :size="30"
                    :onClick="
                      async () => await handleTranslationTaskAnswer(true)
                    "
                  />
                </div>
                <!-- if there is no self assessment for current(translation for now) task -->
                <div
                  class="class-practice-body-footer-wrapper-options-item"
                  v-if="
                    currentRecording &&
                    !currentTaskAnswered.showTranslationSelfAssessment
                  "
                >
                  <talkie-icon
                    :type="'submit'"
                    :name="'send'"
                    :isActive="true"
                    :variant="'secondary'"
                    :size="30"
                    :onClick="
                      async () =>
                        currentTask.type !== taskTypes.TRANSLATION
                          ? await handleTaskAnswer()
                          : await handleTranslationTaskAnswer()
                    "
                  />
                  <p
                    :class="[
                      'class-practice-body-footer-wrapper-options-item-label',
                      !currentRecording &&
                        'class-practice-body-footer-wrapper-options-item-label-non-visiable',
                    ]"
                  >
                    Answer
                  </p>
                </div>
              </template>

              <!-- Answered options -->
              <template
                v-if="
                  currentTaskAnswered.scores &&
                  currentTaskAnswered.appericiationMessage
                "
              >
                <div class="class-practice-body-footer-wrapper-options-item">
                  <button
                    class="class-practice-body-next-button"
                    @click="handleTaskScoring"
                  >
                    Next
                  </button>
                </div>
              </template>
            </div>
          </talkie-audio-recorder>
        </div>

        <!-- After task attempted (Answered options) -->
        <div
          class="class-practice-body-task-attempted-wrapper"
          v-if="
            currentTaskAnswered.scores &&
            currentTaskAnswered.appericiationMessage
          "
        >
          <h2 class="h2">
            {{ currentTaskAnswered.appericiationMessage }}
            {{
              currentTaskAnswered.scores == 0
                ? ""
                : `${currentTaskAnswered.scores} pts`
            }}
          </h2>
        </div>
      </div>
    </template>

    <!-- If there are no class tasks for practice -->
    <template v-if="classTasks.length === 0 && !noMoreTasks">
      <div
        class="class-practice-body-wrapper class-practice-body-centered-wrapper"
      >
        <img
          :src="require(`@/assets/images/warning-logo.png`)"
          class="class-practice-body-no-tasks-image"
        />
        <p class="p class-practice-body-no-tasks-description">
          Hmm... It looks like there are no tasks for practice at this moment.
          They will appear here once your teacher adds them in the class.
        </p>
        <talkie-button :onClick="handleHomeButtonClick">
          Back Home
        </talkie-button>
      </div>
    </template>

    <!-- If there are no more class tasks for practice -->
    <template v-if="noMoreTasks">
      <div
        class="class-practice-body-wrapper class-practice-body-centered-wrapper"
      >
        <img
          :src="require(`@/assets/images/party-popper.png`)"
          class="class-practice-body-no-tasks-image"
        />
        <p class="p class-practice-body-no-tasks-description">
          Congrats! You got through all the quizzes! Check back tomorrow for
          more.
        </p>
        <talkie-button :onClick="handleHomeButtonClick">
          Back Home
        </talkie-button>
      </div>
    </template>
  </div>

  <!-- Load Wrapper -->
  <div class="class-manage-load-wrapper" v-if="computedPageLoading">
    <talkie-loader :size="'large'" />
  </div>

  <!-- Backdrop Loader -->
  <talkie-back-drop-loader
    v-if="backdropLoading"
    :customClass="'class-practice-backdrop-load-wrapper'"
  />
</template>

<script>
import {
  TalkieToolTip,
  TalkieIcon,
  TalkieLoader,
  TalkieBackDropLoader,
  TalkieButton,
} from "@/components/UICore";
import {
  TalkieAudioRecorder,
  TalkieAudioPlayer,
  TalkieAudioTimeline,
} from "@/components/SubModules/AudioManager";
import { filePurposes, supportedLanguages, taskTypes } from "@/utils/constants";
import {
  ClassService,
  TaskService,
  FileService,
  ResponseService,
} from "@/api/services";
import authUser from "@/utils/helpers/auth";
import { notifications } from "@/components/UIActions";

export default {
  name: "ClassPractice",
  components: {
    TalkieToolTip,
    TalkieIcon,
    TalkieAudioRecorder,
    TalkieAudioPlayer,
    TalkieAudioTimeline,
    TalkieLoader,
    TalkieButton,
    TalkieBackDropLoader,
  },
  data() {
    return {
      currentRecording: null,
      isAudioPlaying: false,
      handleAudioPlayerToggle: () => {},
      user: {},
      loading: false,
      backdropLoading: false,
      classId: null,
      classDetails: {},
      classTasks: [],
      currentTask: { index: null },
      noMoreTasks: false,
      currentTaskAnswered: {
        responseId: null,
        scores: null,
        appericiationMessage: "",
        // specific for translation
        translationScores: 0,
        isCorrectAnswer: false,
        showTranslationSelfAssessment: false,
      },
      taskTypes: taskTypes,
      taskScores: {
        ["Emoji-Story"]: "10",
        ["Translation"]: {
          correctAnswer: "5",
          wrongAnswer: "0",
        },
        ["Caption-This"]: "5",
      },
      appericiationMessages: {
        [supportedLanguages.SPANISH?.toLowerCase()]: {
          ["Emoji-Story"]: "¡Excelente!",
          ["Translation"]: {
            correctAnswer: "¡Bien hecho!",
            wrongAnswer: "¡Ayy, qué pena! :(",
          },
          ["Caption-This"]: "¡Muy bien!",
        },
        [supportedLanguages.FRENCH?.toLowerCase()]: {
          ["Emoji-Story"]: "Génial!",
          ["Translation"]: {
            correctAnswer: "Bien fait!",
            wrongAnswer: "Oh quel dommage! :(",
          },
          ["Caption-This"]: "Très bien!",
        },
      },
      instructions: {
        ["Emoji-Story"]: `
          <strong>Tell us a story using the emojis in front of you as prompt.</strong>
          <br/>
          <br/>
          "A story?! How long should it be?"
          There is no time limit here, don't worry. It could be a sentence or a very detailed story lasting a few minutes - entirely up to you!
          <br/>
          <br/>
          "But I don't know what the emojis are saying..."
          You're right, some of the emojis can be hard to interpret. Have a go anyway. It's your story, you're in control. Oh, and you don't have to mention and include every single one emoji but if you're up for a challenge today, go for it!
          <br/>
          <br/>
          "But I don't know how to say it in Spanish/French..."
          That's okay! That's completely normal. The best approach is to look up the word online - have something to add to your vocabulary! No time? You can also use a word you already know and tweak the story a little bit. 
          <br/>
          <br/>
          Don't worry if you haven't got enough vocabulary yet - don't let that stop you! Express yourself by using words you already know, experiment with the words you've just learnt in class. There's no right or wrong answer here. Have a go with or without your notes from class.
         `,
        ["Caption-This"]: `
          <strong>What can you say about the photo?</strong>
          <br/>
          <br/>
          You have several options here. You can:
          <br/>
          <ul class="p">
            <li>— Describe what you see on the photo.</li>
            <li>— Give your opinion on the photo.</li>
            <li>— Use the photo as prompt to talk about your own experiences or come up with your own short story in your target language.</li>
          </ul>
          <br/>
          Don't worry if you haven't got enough vocabulary yet - don't let that stop you! Express yourself by using words you already know, experiment with the words you've just learnt in class. There's no right or wrong answer here. Have a go with or without your notes from class. 
        `,
        ["Translation"]: `
          <strong>How many can you translate in 5 minutes? 🧐</strong>
          <br/>
          <br/>
          Translate the phrases or sentences into your target language.
          <br/>
          <br/>
          Feeling stuck? Things that might help:
          <br/>
          <ul class="p">
            <li>— Break the sentence down and focus on the words you can already translate.</li>
            <li>— Topics are provided below the phrase. Use what you know from the context to make an educated guess. Which words can you recall from the technology topic, for example?</li>
            <li>— All else fails, feel free to check your notes from class.</li>
          </ul>
          <br/>
          <br/>
          Don't worry if you haven't got enough vocabulary yet - don't let that stop you! It's okay to not get it completely right. The best approach is to have a go, and if it's wrong, make a note of it for next time.
          <br/>
          <br/>
          Keep going! It takes time but you'll get there!
        `,
      },
    };
  },
  computed: {
    computedPageLoading() {
      return this.loading;
    },
  },
  async created() {
    // update page state
    this.loading = true;

    // get auth user
    const user = authUser.getUser();
    this.user = user;

    // check if user has joined a class
    const hasJoinedAClass =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;

    // redirect to join class if not have already
    if (!hasJoinedAClass) return this.$router.push(`/classes/join`);

    // class id from cookies
    const classId = hasJoinedAClass;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // class tasks
    const classTasks = await this.getClassTasksForPractice(classId);
    if (!classTasks) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails?.id,
      name: classDetails?.name,
      language: classDetails?.language,
      parentSchool: classDetails?.schoolName,
      teacher: {
        id: classDetails?.teacher.id,
        name: classDetails?.teacher.name,
        image: classDetails?.teacher.image,
      },
      topics: classDetails?.topics.map((x) => ({
        name: x?.name,
        type: x?.type,
        id: x?.id,
      })),
    };
    this.classTasks = classTasks?.results
      ?.filter((x) => !x?.isAttempted && x?.type !== taskTypes.QUESTION_ANSWER)
      ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
      ?.map((x) => ({
        id: x?.id,
        type: x?.type,
        title: x?.type?.split("-").join(" "),
        topic: x?.topic?.name,
        description: x?.questionText,
        canExit: true,
        canFinish: true,
        shouldRecord: true,
        instructions: this.instructions?.[x?.type],
        ...(x?.type === taskTypes.CAPTION_THIS && {
          captionImage: x?.captionThisImage,
        }),
        ...(x?.type === taskTypes.TRANSLATION && {
          translation: { question: x?.textToTranslate, answer: x?.answer },
        }),
        ...(x?.type === taskTypes.EMOJI_STORY && {
          emojis: x?.emojiStory || [],
        }),
      }));
    this.currentTask =
      this.classTasks.length > 0 ? { ...this.classTasks[0], index: 0 } : {};
    this.loading = false;
  },
  methods: {
    handleRecordedItem(recording) {
      this.currentRecording = recording;
    },
    handleRecordedItemReset() {
      this.currentRecording = null;
    },
    handleHomeButtonClick() {
      this.$router.push("/");
    },
    handleFinishLinkClick() {
      this.$router.push("/");
      notifications.show("See you next time!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async handleFileUpload(recordingBlob) {
      // payload
      const payload = new FormData();
      payload.append(
        "files",
        recordingBlob,
        `talkie-audio-teacher-response-${Math.random() * 123456789}.mp3`
      );

      // api call
      const response = await FileService.Upload(
        { purpose: filePurposes.TASK_VOICE },
        payload
      ).catch(() => null);

      // error case
      if (!response) return null;

      // success case
      const uploadedFile = response.data[0].s3Url;
      return uploadedFile;
    },
    async handleTranslationTaskAnswer(isCorrectAnswer = false) {
      // show self assessment options for translation task
      if (
        this.currentTask?.type === taskTypes.TRANSLATION &&
        !this.currentTaskAnswered.showTranslationSelfAssessment
      ) {
        this.currentTaskAnswered = {
          ...this.currentTaskAnswered,
          showTranslationSelfAssessment: true,
        };
        return;
      }

      // set translation scores based on self assessment
      this.currentTaskAnswered = {
        ...this.currentTask,
        isCorrectAnswer: isCorrectAnswer,
      };

      await this.handleTaskAnswer();
    },
    async handleTaskAnswer() {
      // update page state
      this.backdropLoading = true;

      // file upload (+ failure case)
      const voiceRecording = await this.handleFileUpload(
        this.currentRecording.blob
      );
      if (!voiceRecording) {
        notifications.show("Could not add your answer!", {
          variant: "error",
          displayIcon: true,
        });
        this.backdropLoading = false;
        return;
      }

      // form data
      const taskId = this.currentTask.id;

      // payload
      const payload = { voiceRecording };

      // api call
      const response = await ResponseService.CreateResponse(
        taskId,
        payload
      ).catch(() => null);

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show("Could not add your answer!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      // notifications.show("Answered Successfully!", {
      //   variant: "success",
      //   displayIcon: true,
      // });
      this.currentTaskAnswered = {
        responseId: response.data.id,
        scores:
          this.currentTask.type === taskTypes.TRANSLATION
            ? this.currentTaskAnswered.isCorrectAnswer
              ? this.taskScores[this.currentTask.type].correctAnswer
              : this.taskScores[this.currentTask.type].wrongAnswer
            : this.taskScores[this.currentTask.type],
        appericiationMessage:
          this.currentTask.type === taskTypes.TRANSLATION
            ? this.currentTaskAnswered.isCorrectAnswer
              ? this.appericiationMessages?.[
                  this.classDetails?.language?.toLowerCase()
                ]?.[this.currentTask.type]?.correctAnswer
              : this.appericiationMessages?.[
                  this.classDetails?.language?.toLowerCase()
                ]?.[this.currentTask.type]?.wrongAnswer
            : this.appericiationMessages?.[
                this.classDetails?.language?.toLowerCase()
              ]?.[this.currentTask.type],
      };
    },
    async handleTaskScoring() {
      // update page state
      this.backdropLoading = true;

      // form data
      const responseId = this.currentTaskAnswered.responseId;
      const score = this.currentTaskAnswered.scores;

      // payload
      const payload = { score };

      // api call
      const response = await ResponseService.AddResponseScore(
        responseId,
        payload
      ).catch(() => null);

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show("Could not add scores to your answer!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      this.currentRecording = null;
      this.currentTaskAnswered = {};

      // check if the tasks are finished (else set next task)
      const hasMoreTasks = this.classTasks.length - 1 > this.currentTask.index;
      if (hasMoreTasks)
        this.currentTask = {
          ...this.classTasks[this.currentTask.index + 1],
          index: this.currentTask.index + 1,
        };
      else {
        this.currentTask = {};
        this.noMoreTasks = true;
      }
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getClassTasksForPractice(id) {
      const query = { isPracticeMode: true };

      const response = await TaskService.QueryClassTasks(id, query).catch(
        () => null
      );

      return response.data || null;
    },
  },
};
</script>

<style scoped>
.class-practice-wrapper {
  width: 100%;
  margin-top: var(--t-space-50);
  margin-bottom: calc(var(--t-space-70) * 2);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-16);
}
.class-practice-header-wrapper {
  width: 100%;
  align-items: baseline;
  text-align: center;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
}
.class-practice-header-wrapper-link,
.class-practice-header-wrapper-link:visited {
  text-decoration: none;
  color: var(--t-black);
}
.class-practice-body-wrapper {
  background: var(--t-white);
  border-radius: var(--t-br-large);
  padding: var(--t-space-64);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-36);
  position: relative;
}
.class-practice-body-centered-wrapper {
  align-items: center;
  justify-content: center;
}
.class-practice-body-wrapper-blured {
  border-style: solid;
  border-top-width: var(--t-space-1);
  border-left-width: var(--t-space-1);
  border-right-width: var(--t-space-1);
  border-bottom-width: var(--t-space-1);
  border-color: var(--t-gray-75);
}
.class-practice-body-wrapper-blured > * {
  filter: blur(var(--t-space-4));
}
.class-practice-body-head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-head-wrapper-instructions {
  text-decoration: underline;
  text-underline-offset: var(--t-space-3);
  cursor: pointer;
}
.class-practice-body-content-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 500px;
}
.class-practice-body-content-wrapper-caption-image {
  flex: none;
  width: 100%;
  height: 100%;
  max-height: 500px;
}
.class-practice-body-content-wrapper-emojis-wrapper {
  display: flex;
  user-select: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.class-practice-body-content-wrapper-emojis-image-item {
  flex: none;
  user-select: none;
}
.class-translations-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.class-translations-question-wrapper,
.class-translations-answer-wrapper {
  border-radius: var(--t-br-small);
  margin-right: var(--t-space-5);
}
.class-translations-question-wrapper {
  color: var(--t-black);
  background: var(--t-primary);
}
.class-translations-question-header {
  line-height: 1.5;
}
.class-translations-answer-wrapper {
  color: var(--t-black-50);
  background: var(--t-secondary);
}
.class-translations-answer-header {
  color: var(--t-secondary);
  line-height: 1.5;
}
.class-translations-self-assessment-wrapper {
  background: var(--t-gray-100);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-8);
  padding: var(--t-space-16);
  margin-top: var(--t-space-16);
  border-radius: var(--t-br-small);
  line-height: 1.2;
}
.class-practice-body-task-attempted-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(0);
  border-radius: var(--t-br-large);
  background-color: rgba(247, 241, 241, 0.5);
}
.class-practice-body-footer-wrapper {
  position: relative;
  filter: blur(0);
  z-index: var(--t-zindex-50);
}
.class-practice-body-footer-wrapper-audio-player {
  margin: auto;
  padding-bottom: var(--t-space-36);
}
.class-practice-body-footer-wrapper-options {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
}
.class-practice-body-footer-wrapper-options-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.class-practice-body-next-button {
  background: transparent;
  border: transparent;
  cursor: pointer;
  display: inline-flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease;
  color: var(--t-black-50);
  font-family: var(--t-ff-bold);
  background-color: var(--t-orange);
  border-radius: 50%;
}
.class-practice-body-footer-wrapper-options-item-label {
  text-align: center;
  line-height: 1.1;
}
.class-practice-body-footer-wrapper-options-item-label-non-visiable {
  color: transparent;
  user-select: none;
}
.class-practice-body-footer-wrapper-options-item-label-error {
  color: var(--t-red);
}
.class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
  border-color: var(--t-red) !important;
  border-style: solid !important;
}
.class-practice-body-footer-wrapper-options-stop-recording-button {
  border-color: var(--t-secondary) !important;
  border-style: solid !important;
}
.class-practice-body-no-tasks-image {
  height: var(--no-tasks-image);
  width: var(--no-tasks-image);
  margin: auto;
}
.class-practice-body-no-tasks-description {
  line-height: 1.2;
  text-align: center;
}
.class-practice-backdrop-load-wrapper {
  z-index: var(--t-zindex-60);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-practice-body-next-button {
    font-size: var(--t-space-12);
    padding: var(--t-space-44);
    height: var(--t-space-44);
    width: var(--t-space-44);
  }
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-36);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-8);
    min-width: var(--t-space-64);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-12);
  }
  .class-practice-body-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-2) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-2) !important;
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-12);
    max-width: 100%;
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-58);
    height: var(--t-space-58);
  }
  .class-translations-wrapper {
    max-width: 100%;
    gap: var(--t-space-12);
  }
  .class-translations-question-wrapper,
  .class-translations-answer-wrapper {
    padding: var(--t-space-3) var(--t-space-5);
    font-size: 0.9em;
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 100%;
  }
  .class-practice-body-no-tasks-image {
    --no-tasks-image: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .class-practice-body-next-button {
    font-size: var(--t-space-16);
    padding: var(--t-space-50);
    height: var(--t-space-50);
    width: var(--t-space-50);
  }
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, -5%);
    gap: var(--t-space-40);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-10);
    min-width: calc(var(--t-space-64) * 1.5);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-audio-player-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-10);
  }
  .class-practice-body-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .class-practice-body-footer-wrapper-options-mike-unmuted-button-error {
    border-width: var(--t-space-3) !important;
  }
  .class-practice-body-footer-wrapper-options-stop-recording-button {
    border-width: var(--t-space-3) !important;
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-16);
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-64);
    height: var(--t-space-64);
  }
  .class-translations-wrapper {
    max-width: 80%;
    gap: var(--t-space-24);
  }
  .class-translations-question-wrapper,
  .class-translations-answer-wrapper {
    padding: var(--t-space-5);
    font-size: 0.9em;
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 80%;
  }
  .class-practice-body-no-tasks-image {
    --no-tasks-image: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 1200px) {
  .class-practice-body-footer-wrapper-options {
    transform: translate(-50%, 5%);
    gap: var(--t-space-48);
  }
  .class-practice-body-footer-wrapper-options-item {
    gap: var(--t-space-12);
    min-width: calc(var(--t-space-48) * 2);
  }
  .class-practice-body-footer-wrapper-options-item-label {
    font-size: calc(var(--t-fs-small) * 0.8);
  }
  .class-practice-body-audio-player-wrapper {
    gap: var(--t-space-5);
    margin-top: var(--t-space-16);
  }
  .class-practice-body-audio-player-wrapper-timestamps {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-practice-body-content-wrapper-emojis-wrapper {
    gap: var(--t-space-16);
  }
  .class-practice-body-content-wrapper-emojis-image-item {
    width: var(--t-space-70);
    height: var(--t-space-70);
  }
  .class-translations-wrapper {
    max-width: 70%;
    gap: var(--t-space-30);
  }
  .class-practice-body-footer-wrapper-audio-player {
    max-width: 70%;
  }
  .class-practice-body-no-tasks-image {
    --no-tasks-image: calc(var(--t-space-70) * 1.2);
  }
}
</style>

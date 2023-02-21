<template>
  <div class="student-info-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="student-info-header-wrapper">
        <div class="student-info-header-details-wrapper">
          <img
            class="student-info-header-image"
            :src="require(`@/assets/images/person-placeholder-image.png`)"
            v-if="!isValidAvatar(studentDetails.image)"
          />
          <span
            class="student-info-header-image"
            v-if="isValidAvatar(studentDetails.image)"
            v-html="studentDetails.image"
          >
          </span>
          <h2 class="h2" v-if="studentDetails?.name">
            {{ studentDetails?.name }}
          </h2>
        </div>
        <div class="student-info-header-tabs-wrapper">
          <template v-for="tabName in tabs" :key="tabName">
            <talkie-tab
              :label="tabName"
              :active="tabName.toLowerCase().split(' ').join('-') === activeTab"
              :onClick="() => handleTabChange(tabName.toLowerCase())"
            />
          </template>
        </div>
      </div>

      <!-- Class tasks tab -->
      <template v-if="activeTab === 'class-tasks'">
        <div
          :class="[
            'student-info-content-wrapper',
            'student-info-content-wrapper-single-col',
          ]"
        >
          <!-- if student responses -->
          <template
            v-if="studentAttemptedTasks && studentAttemptedTasks.length > 0"
          >
            <template
              v-for="attemptedTask in studentAttemptedTasks"
              :key="attemptedTask"
            >
              <talkie-conversation-card
                v-if="!attemptedTask.isPracticeMode"
                :taskId="attemptedTask?.id"
                :userMode="'teacher'"
                :studentId="studentId"
                :topicName="attemptedTask?.topicName"
                :messages="attemptedTask?.messages"
                :isAudioDownloadable="attemptedTask?.audio"
              />
            </template>
          </template>

          <!-- no student responses -->
          <template v-if="studentAttemptedTasks?.length === 0">
            <img
              :src="require(`@/assets/images/warning-logo.png`)"
              class="student-info-content-error-image"
            />
            <p class="p student-info-content-error-info">
              Hmm... it looks like nothing is here yet.
            </p>
          </template>
        </div>
      </template>

      <!-- Quiz tab -->
      <template v-if="activeTab === 'quiz-mode'">
        <div
          :class="[
            'student-info-content-wrapper',
            'student-info-content-wrapper-single-col',
          ]"
        >
          <!-- if student responses -->
          <template
            v-if="studentAttemptedTasks && studentAttemptedTasks.length > 0"
          >
            <template
              v-for="attemptedTask in studentAttemptedTasks"
              :key="attemptedTask"
            >
              <talkie-conversation-card
                v-if="attemptedTask.isPracticeMode"
                :taskId="attemptedTask?.id"
                :userMode="'teacher'"
                :studentId="studentId"
                :topicName="attemptedTask?.topicName"
                :messages="attemptedTask?.messages"
                :isAudioDownloadable="attemptedTask?.audio"
              />
            </template>
          </template>

          <!-- no student responses -->
          <template v-if="studentAttemptedTasks?.length === 0">
            <img
              :src="require(`@/assets/images/warning-logo.png`)"
              class="student-info-content-error-image"
            />
            <p class="p student-info-content-error-info">
              Hmm... it looks like nothing is here yet.
            </p>
          </template>
        </div>
      </template>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="student-info-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>

    <!-- Backdrop load wrapper -->
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieTab,
  TalkieLoader,
  TalkieBackDropLoader,
} from "@/components/UICore";
import { TalkieConversationCard } from "@/components/SubModules/Cards";
import { ClassService, TaskService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import URLModifier from "@/utils/helpers/URLModifier";
import authUser from "@/utils/helpers/auth";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import handleSidebarMutation from "@/utils/mixins/handleSidebarMutation";
import subscriptionPerksMixin from "@/utils/mixins/subscriptionPerksMixin";

export default {
  name: "StudentInfo",
  mixins: [handleSidebarMutation, subscriptionPerksMixin],
  components: {
    TalkieTab,
    TalkieLoader,
    TalkieBackDropLoader,
    TalkieConversationCard,
  },
  data() {
    return {
      classId: null,
      studentId: null,
      studentDetails: {},
      classStudents: [],
      studentAttemptedTasks: [],
      loading: false,
      backdropLoading: false,
      activeTab: "class-tasks",
      tabs: ["Class Tasks", "Quiz Mode"],
      TaskTypes: TaskTypes,
    };
  },
  computed: {
    computedIsSubscriptionOver() {
      const subscription = this.$store.state.subscription;
      return (
        subscription.isRequired &&
        subscription.isTrialOver &&
        subscription.isCalculated
      );
    },
  },
  async created() {
    await this.handleLoadSequence(this.$route.params.classId);
  },
  async beforeRouteUpdate(to) {
    await this.handleLoadSequence(to.params.classId);
  },
  methods: {
    isValidAvatar(avatar) {
      return avatar?.toString()?.includes("svg");
    },
    async handleLoadSequence(classId) {
      // update page state
      this.loading = true;

      // get current tab from url
      const tab = this?.$route?.query?.tab;
      if (!tab) URLModifier.addToURL("tab", "class-tasks");
      if (["class-tasks", "quiz-mode"].includes(tab)) this.activeTab = tab;

      // get auth user
      this.user = authUser.getUser();

      // class id from params
      this.classId = classId;

      // tudent id from params
      this.studentId = this.$route.params?.studentId;

      // class details (+ failure case)
      const classDetails = await this.getClassDetails(classId);
      if (!classDetails) return this.$router.push("/404");

      // class tasks
      const classTasks = await this.getClassTasks(classId);
      if (!classTasks) return this.$router.push("/404");

      // class tasks
      const practiceTask = await this.getClassTasks(classId, true);
      if (!practiceTask) return this.$router.push("/404");
      // Filter those tasks that are attempted by student
      const allTasks = [
        ...classTasks.results.filter((x) => x.isAttempted),
        ...practiceTask.results.filter((x) => x.isAttempted),
      ];
      // class students
      this.classStudents = classDetails?.students?.map((x) => ({
        id: x?.id,
        name: x?.name,
        image: x?.image
          ? generateAvatar(x?.image?.split("-")[1], x?.image)
          : null,
      }));

      // current student
      const foundStudent = this.classStudents.find(
        (x) => x.id === this.studentId
      );
      this.studentDetails = { ...foundStudent };

      // tasks assigned to student
      const studentAttemptedTasks =
        allTasks?.map((x) => ({
          id: x?.id,
          topicName: x?.topic?.name,
          isPracticeMode: x.isPracticeMode,
          messages: [
            {
              id: x?.id || x?._id,
              from: x?.teacher,
              ...(x?.type === TaskTypes.QUESTION_ANSWER && {
                audio: x?.voiceForQnA,
              }),
              ...(x?.type === TaskTypes.CAPTION_THIS && {
                photo: x?.captionThisImage,
              }),
              ...(x?.type === TaskTypes.TRANSLATION && {
                text: x?.textToTranslate,
              }),
              ...(x?.type === TaskTypes.EMOJI_STORY && {
                emojis: x?.emojiStory,
              }),
            },
          ],
        })) || [];
      this.studentAttemptedTasks = studentAttemptedTasks;

      // sidebar data
      const sidebarItems = this.classStudents?.map((x) => ({
        name: x?.name,
        hasRightIcon: true,
        link: `/classes/${this.classId}/students/${x?.id}`,
        onClick: () =>
          this.$router.push(`/classes/${this.classId}/students/${x?.id}`),
        isActive: x?.id === this.studentId,
      }));
      this.handleSidebarMutation({
        items: sidebarItems,
      });

      this.loading = false;
    },
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
    handleTabChange(x) {
      this.activeTab = x?.toLowerCase().split(" ").join("-");
      URLModifier.addToURL("tab", x?.toLowerCase().split(" ").join("-"));
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getClassTasks(id, isPracticeMode = false) {
      const query = {
        ...(isPracticeMode && { isPracticeMode }),
        forStudent: this.studentId,
      };

      const response = await TaskService.QueryClassTasks(id, query).catch(
        () => null
      );

      return response.data || null;
    },
  },
};
</script>

<style scoped>
.student-info-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.student-info-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.student-info-header-details-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.student-info-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.student-info-header-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.student-info-header-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.student-info-header-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.student-info-header-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.student-info-header-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.student-info-options-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.student-info-options-selector > div {
  min-width: 100%;
}
.student-info-content-wrapper {
  display: grid;
}
.student-info-content-error-image {
  height: var(--image-size);
  width: var(--image-size);
  margin: auto;
}
.student-info-content-error-info {
  margin: auto;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.student-info-content-error-info > a {
  color: var(--t-black);
}
.student-info-loading-wrapper {
  margin: auto;
}
.student-info-header-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
}

/* Responsive variants */
@media (max-width: 599px) {
  .student-info-wrapper {
    gap: var(--t-space-18);
  }
  .student-info-header-wrapper {
    gap: var(--t-space-12);
  }
  .student-info-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .student-info-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .student-info-header-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .student-info-options-wrapper {
    gap: var(--t-space-12);
  }
  .student-info-options-selector {
    min-width: 100%;
  }
  .student-info-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .student-info-content-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .student-info-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .student-info-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
  .student-info-header-image {
    --image-size: var(--t-space-56);
  }
}
@media (min-width: 600px) {
  .student-info-wrapper {
    gap: var(--t-space-24);
  }
  .student-info-header-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .student-info-header-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-options-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-options-selector {
    min-width: 70%;
  }
  .student-info-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .student-info-content-wrapper {
    gap: var(--t-space-16);
  }
  .student-info-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .student-info-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .student-info-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
  .student-info-header-image {
    --image-size: var(--t-space-63);
  }
}
@media (min-width: 900px) {
  .student-info-wrapper {
    gap: var(--t-space-36);
  }
  .student-info-options-selector {
    min-width: 40%;
  }
  .student-info-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .student-info-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .student-info-content-error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
  .student-info-header-image {
    --image-size: var(--t-space-70);
  }
}
</style>

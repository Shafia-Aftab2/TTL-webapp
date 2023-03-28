<template>
  <div class="class-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-home-header-wrapper">
        <div class="class-home-header-details-wrapper">
          <h2 class="h2" v-if="classDetails?.name">{{ classDetails?.name }}</h2>
          <div class="class-home-header-details-icons-wrapper" v-if="isTeacher">
            <talkie-icon :name="'trophy'" :onClick="handleClassTrophyClick" />
            <talkie-icon :name="'setting'" :onClick="handleClassManageClick" />
          </div>
        </div>
        <div class="class-home-header-tabs-wrapper">
          <template v-for="tabName in tabs" :key="tabName">
            <talkie-tab
              :label="tabName"
              :active="tabName.toLowerCase() === activeTab"
              :onClick="() => handleTabChange(tabName.toLowerCase())"
            />
          </template>
        </div>
      </div>

      <!-- Questions tab -->
      <template v-if="activeTab === 'questions'">
        <div class="class-home-options-wrapper">
          <div class="class-home-options-selector">
            <talkie-select-group
              :placeholder="'Filter by topic'"
              :customClass="'class-home-options-custom-talkie-select'"
              :options="
                classTopicsGrouped?.length > 0 ? classTopicsGrouped : []
              "
              :onChange="handleTopicFilterChange"
            />
          </div>
          <talkie-button-drop-down
            :size="'small'"
            :variant="'primary'"
            :dropDownItems="newTaskOptions"
            v-if="isTeacher"
          >
            + New Task
          </talkie-button-drop-down>
        </div>

        <!-- <talkie-switch
          :checkLabel="'Showing other quizzes'"
          :uncheckLabel="'Show other quizzes'"
          :onToggle="handlePracticeModeToggleChange"
        /> -->

        <div
          :class="[
            'class-home-content-wrapper',
            'class-home-content-wrapper-multi-col',
          ]"
        >
          <talkie-modal
            :type="'confirm'"
            :confirmButtonText="'Got it, don\'t show this again'"
            :contentPadded="true"
            :closeButton="true"
            :centered="true"
            :title="'Delete task'"
            :description="'Are you sure? Your students\' responses and feedback will also be deleted.'"
            :onClose="handleTopicDeleteDialogClose"
            :onConfirm="handleTaskDeletion"
            v-if="taskToDelete"
          />
          <template v-if="classTasks && classTasks?.length > 0">
            <template v-for="_question in classTasks" :key="_question">
              <talkie-question-card
                v-if="
                  currentTopicFilter
                    ? _question.topic === currentTopicFilter
                    : true
                "
                :title="_question.title"
                :topic="_question.topic"
                :description="_question.description"
                :manageModeOptions="{
                  canEdit: isTeacher,
                  canDelete: isTeacher,
                  canDownload:
                    canDownloadContent &&
                    _question.type === TaskTypes.QUESTION_ANSWER,
                }"
                :centered="false"
                :hoverAnimation="true"
                :audioSource="
                  _question.type === TaskTypes.QUESTION_ANSWER &&
                  _question.audioSource
                "
                :image="
                  _question.type === TaskTypes.CAPTION_THIS && _question.image
                "
                :expandContent="
                  _question.type === TaskTypes.TRANSLATION
                    ? { translation: _question.translation }
                    : _question.type === TaskTypes.EMOJI_STORY
                    ? { emojis: _question.emojiStory }
                    : {}
                "
                :onCardBodyClick="() => handleTopicCardBodyClick(_question.id)"
                :onEditClick="() => handleTopicCardEditClick(_question.id)"
                :onDeleteClick="() => handleTopicCardDeleteClick(_question.id)"
              />
            </template>
          </template>
        </div>
      </template>

      <!-- Students tab -->
      <template v-if="activeTab === 'students'">
        <!-- Add new student -->
        <div class="class-home-add-student-wrapper">
          <div>
            <talkie-button
              :size="'small'"
              :onClick="handleAddStudentButtonClick"
              v-if="isTeacher && classStudents?.length !== 0"
            >
              + Add student
            </talkie-button>
          </div>
          <!-- Modal Content -->
          <talkie-modal
            :contentPadded="true"
            :closeButton="true"
            :onClose="handleModalClose"
            :maxWidth="750"
            v-if="modalMode"
          >
            <!-- Invite Students -->
            <template v-if="modalMode === 'invite-students'">
              <div class="class-manage-modal-invite-students">
                <div class="class-manage-modal-invite-students-header-wrapper">
                  <h3 class="h3">Invite your students</h3>
                  <p class="p">
                    Share this url with your students to invite them to the
                    class
                  </p>
                </div>
                <div class="class-manage-modal-invite-students-input-wrapper">
                  <talkie-input :value="computedClassJoinLink" />
                </div>
                <talkie-button :onClick="handleClassJoinLinkCopyButtonClick">
                  Copy
                </talkie-button>
              </div>
            </template>
          </talkie-modal>
        </div>
        <div
          :class="[
            'class-home-content-wrapper',
            'class-home-content-wrapper-single-col',
          ]"
        >
          <template v-if="classStudents && classStudents.length > 0">
            <talkie-student-card
              v-for="_student in classStudents"
              :key="_student"
              :mode="'info'"
              :studentName="_student.name"
              :studentAvatar="_student.image"
              :actionButton="true"
              :onInfoClick="() => redirectToStudentInfo(_student.id)"
            />
          </template>
          <template v-if="classStudents?.length === 0">
            <img
              :src="require(`@/assets/images/warning-logo.png`)"
              class="class-home-content-error-image"
            />
            <p class="p class-home-content-error-info">
              Hmm... it looks like no one's here yet. Click
              <router-link :to="`/classes/${classId}/manage`">
                here
              </router-link>
              to invite your students to this class.
            </p>
          </template>
        </div>
      </template>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="class-home-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>

    <!-- Backdrop load wrapper -->
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieIcon,
  TalkieTab,
  TalkieSelectGroup,
  TalkieModal,
  TalkieLoader,
  // TalkieSwitch,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
  TalkieButton,
  TalkieInput,
} from "@/components/UICore";
import {
  TalkieQuestionCard,
  TalkieStudentCard,
} from "@/components/SubModules/Cards";
import { ClassService, TaskService, TopicService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import URLModifier from "@/utils/helpers/URLModifier";
import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";
import { notifications } from "@/components/UIActions";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import handleSidebarMutation from "@/utils/mixins/handleSidebarMutation";
import topicTypes from "@/utils/constants/topicTypes";
import subscriptionPerksMixin from "@/utils/mixins/subscriptionPerksMixin";
import { copy as copyToClipboard } from "@/utils/helpers/clipboard";
import cookies from "@/utils/helpers/cookies";

export default {
  name: "ClassHome",
  mixins: [handleSidebarMutation, subscriptionPerksMixin],
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelectGroup,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieLoader,
    // TalkieSwitch,
    TalkieBackDropLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
    TalkieButton,
    TalkieInput,
  },
  data() {
    return {
      taskToDelete: null,
      dontShowDeleteModal: cookies.getCookie("dont-show-delete-modal"),
      newTaskOptions: [
        {
          name: "Question",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${encodeURIComponent(
                TaskTypes.QUESTION_ANSWER
              )}`,
              100
            ),
        },
        {
          name: "Photo",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.CAPTION_THIS}`,
              100
            ),
        },
        {
          name: "Emoji Story",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.EMOJI_STORY}`,
              100
            ),
        },
        {
          name: "Translation",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.TRANSLATION}`,
              100
            ),
        },
        {
          name: "Bulk Upload",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create/bulk`,
              100
            ),
        },
      ],
      classId: null,
      classDetails: {},
      classStudents: [],
      classTasks: [],
      classTopics: [],
      isTeacher: false,
      isStudent: false,
      loading: false,
      backdropLoading: false,
      activeTab: "questions",
      tabs: ["Questions", "Students"],
      currentTopicFilter: null,
      TaskTypes: TaskTypes,
      classTopicsGrouped: {},
      modalMode: null,
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
    computedClassJoinLink() {
      console.log(this.classId);
      return `${URLModifier.getDomain()}/classes/${this.classId}/join`;
    },
  },
  async created() {
    await this.handleLoadSequence(this.$route.params.id);
  },
  async beforeRouteUpdate(to) {
    await this.handleLoadSequence(to.params.id);
  },
  methods: {
    redirectToStudentInfo(studentId) {
      this.$router.push(`/classes/${this.classId}/students/${studentId}`);
    },
    async handleLoadSequence(classId) {
      // update page state
      this.loading = true;

      // get current tab from url
      const tab = this?.$route?.query?.tab;
      if (!tab) URLModifier.addToURL("tab", "questions");
      if (["students", "questions"].includes(tab)) this.activeTab = tab;

      // get auth user
      this.user = authUser.getUser();

      // get user role
      if (this.user?.role === roles.TEACHER) this.isTeacher = true;
      else this.isStudent = true;

      // class id from params
      this.classId = classId;

      // classes list (+ failure case)
      const myClasses = await this.getMyClasses();
      if (!myClasses) return this.$router.push("/404");

      // class details (+ failure case)
      const classDetails = await this.getClassDetails(classId);
      if (!classDetails) return this.$router.push("/404");

      // class tasks
      const classTasks = await this.getClassTasks(classId);
      if (!classTasks) return this.$router.push("/404");

      // class topics
      // const classTopics = await this.getClassTopics(classDetails?.language);
      // if (!classTopics) return this.$router.push("/404");

      // success case
      const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
      this.classTopicsGrouped = [
        {
          title: capitalize(topicTypes.ADVANCED),
          items: classDetails?.topics
            ?.filter((x) => x?.type === topicTypes.ADVANCED)
            ?.sort((x, y) =>
              x.order === -1 || y.order === -1
                ? 1
                : x.order < y.order
                ? -1
                : x.order > y.order
                ? 1
                : 0
            )
            ?.map((x) => x?.name),
        },
        {
          title: capitalize(topicTypes.INTERMEDIATE),
          items: classDetails?.topics
            ?.filter((x) => x?.type === topicTypes.INTERMEDIATE)
            ?.sort((x, y) =>
              x.order === -1 || y.order === -1
                ? 1
                : x.order < y.order
                ? -1
                : x.order > y.order
                ? 1
                : 0
            )
            ?.map((x) => x?.name),
        },
        {
          title: capitalize(topicTypes.BEGINNER),
          items: classDetails?.topics
            ?.filter((x) => x?.type === topicTypes.BEGINNER)
            ?.sort((x, y) =>
              x.order === -1 || y.order === -1
                ? 1
                : x.order < y.order
                ? -1
                : x.order > y.order
                ? 1
                : 0
            )
            ?.map((x) => x?.name),
        },
      ];
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
        topics: classDetails?.topics?.map((x) => ({
          name: x?.name,
          type: x?.type,
          id: x?.id,
        })),
        tasks: classDetails?.tasks?.map((x) => ({
          title: x?.title,
          type: x?.type,
          id: x?.id,
        })),
      };

      // sidebar data
      const sidebarItems = myClasses?.map((x) => ({
        name: x?.name,
        hasRightIcon: true,
        link: `/classes/${x?.id}`,
        onClick: () => this.$router.push(`/classes/${x?.id}`),
        isActive: x?.id === classId,
      }));
      const sidebarButtons = [
        {
          text: "+ New Class",
          type: "button",
          variant: "primary",
          size: "small",
          outlined: true,
          loading: false,
          disabled: false,
          onClick: () => this.$router.push("/classes/create"),
        },
      ];
      this.handleSidebarMutation({
        items: sidebarItems,
        buttons: sidebarButtons,
      });

      this.classTasks = classTasks?.results?.map((x) => ({
        id: x?.id,
        type: x?.type,
        title: x?.title,
        topic: x?.topic?.name,
        description: x?.questionText,
        isForPractice: x?.isPracticeMode,
        ...(x?.type === TaskTypes.QUESTION_ANSWER && {
          audioSource: x?.voiceForQnA,
        }),
        ...(x?.type === TaskTypes.CAPTION_THIS && {
          image: x?.captionThisImage,
        }),
        ...(x?.type === TaskTypes.TRANSLATION && {
          translation: {
            textToTranslate: x?.textToTranslate,
            translatedText: x?.answer,
          },
        }),
        ...(x?.type === TaskTypes.EMOJI_STORY && {
          emojiStory: x?.emojiStory,
        }),
      }));

      this.classStudents = classDetails?.students?.map((x) => ({
        id: x?.id,
        name: x?.name,
        image: x?.image
          ? generateAvatar(x?.image?.split("-")[1], x?.image)
          : null,
      }));

      // this.classTopics = classTopics;

      this.loading = false;
    },
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
    handleClassTrophyClick() {
      this.handleRedirection(`/classes/${this.classId}/leaderboard`, 1);
    },
    handleClassManageClick() {
      this.handleRedirection(`/classes/${this.classId}/manage`, 1);
    },
    handleTopicCardBodyClick(taskId) {
      this.handleRedirection(`/classes/${this.classId}/tasks/${taskId}`, 1);
    },
    handleTopicCardEditClick(taskId) {
      this.handleRedirection(
        `/classes/${this.classId}/tasks/${taskId}/edit`,
        1
      );
    },
    async handleTopicCardDeleteClick(id) {
      if (this.computedIsSubscriptionOver) {
        this.handleRedirection(`/classes/${this.classId}/tasks`); // this will redirect to same page but we will get the trial-end-modal again
        return;
      }
      // check if it is not the first visit of user then delete task directly
      if (this.dontShowDeleteModal) {
        await this.handleTaskDeletion(id);
      } else {
        this.taskToDelete = id;
      }
    },
    handleTopicDeleteDialogClose() {
      this.taskToDelete = null;
    },
    async handlePracticeModeToggleChange(showPracticeModeTasks) {
      // update page state
      this.backdropLoading = true;

      // api call
      const classTasks = await this.getClassTasks(
        this.classId,
        showPracticeModeTasks
      );

      // failure case
      if (!classTasks) {
        this.backdropLoading = false;
        notifications.show(
          `Failed to get ${
            showPracticeModeTasks ? "practice" : "class"
          } mode task!`,
          {
            variant: "error",
            displayIcon: true,
          }
        );
        return;
      }

      // success case
      this.backdropLoading = false;
      this.classTasks = classTasks?.results?.map((x) => ({
        id: x?.id,
        type: x?.type,
        title: x?.title,
        topic: x?.topic.name,
        description: x?.questionText,
        isForPractice: x?.isPracticeMode,
        ...(x?.type === TaskTypes.QUESTION_ANSWER && {
          audioSource: x?.voiceForQnA,
        }),
        ...(x?.type === TaskTypes.CAPTION_THIS && {
          image: x?.captionThisImage,
        }),
        ...(x?.type === TaskTypes.TRANSLATION && {
          translation: {
            textToTranslate: x?.textToTranslate,
            translatedText: x?.answer,
          },
        }),
        ...(x?.type === TaskTypes.EMOJI_STORY && {
          emojiStory: x?.emojiStory,
        }),
      }));
    },
    async handleTaskDeletion(id = null) {
      // don't show the delete dialog further
      if (!this.dontShowDeleteModal) {
        cookies.setCookie("dont-show-delete-modal", true, {
          expires: 1,
        });
        this.dontShowDeleteModal = true;
      }
      const taskId = this.taskToDelete || id;
      this.taskToDelete = null;
      this.backdropLoading = true;

      // api call
      const response = await TaskService.Delete(taskId).catch(() => null);

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show(
          "Sorry, we can't delete this at the moment. Please try again later.",
          {
            variant: "error",
            displayIcon: true,
          }
        );
        return;
      }

      // success case
      this.backdropLoading = false;
      notifications.show("Task deleted successfully.", {
        variant: "success",
        displayIcon: true,
      });
      this.classTasks = this.classTasks?.filter((x) => x?.id !== taskId);
    },
    handleTabChange(x) {
      this.activeTab = x?.toLowerCase();
      URLModifier.addToURL("tab", x?.toLowerCase());
    },
    handleTopicFilterChange(e) {
      const selectedTopic = e.target.value.trim();
      this.currentTopicFilter = selectedTopic;
    },
    async getMyClasses() {
      const response = await ClassService.GetMyClasses().catch(() => null);

      return response.data || null;
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getClassTasks(id, isPracticeMode = false) {
      const query = {
        ...(isPracticeMode && { isPracticeMode }),
        sortBy: "createdAt:desc",
      };

      const response = await TaskService.QueryClassTasks(id, query).catch(
        () => null
      );

      return response.data || null;
    },
    async getClassTopics(language) {
      const query = { ...(language && { language }) };

      const response = await TopicService.Query(query).catch(() => null);

      return !!response?.data ? response?.data?.results : null;
    },
    async handleClassJoinLinkCopyButtonClick() {
      const isCopiedToClipboard = await copyToClipboard(
        this.computedClassJoinLink
      );

      // error case
      if (!isCopiedToClipboard) {
        notifications.show("Failed to copy to clipboard!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      notifications.show("Copied to clipboard!", {
        variant: "success",
        displayIcon: true,
      });
    },
    handleAddStudentButtonClick() {
      this.modalMode = "invite-students";
    },
    handleModalClose() {
      this.modalMode = null;
    },
  },
};
</script>

<style scoped>
.class-home-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.class-home-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.class-home-header-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-home-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-home-header-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.class-home-header-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.class-home-header-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.class-home-header-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.class-home-header-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.class-home-options-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.class-home-add-student-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
}
.class-home-options-selector > div {
  min-width: 100%;
}
.class-home-content-wrapper {
  display: grid;
}
.class-home-content-error-image {
  height: var(--image-size);
  width: var(--image-size);
  margin: auto;
}
.class-home-content-error-info {
  margin: auto;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.class-home-content-error-info > a {
  color: var(--t-black);
}
.class-home-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-home-wrapper {
    gap: var(--t-space-18);
  }
  .class-home-header-wrapper {
    gap: var(--t-space-12);
  }
  .class-home-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .class-home-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .class-home-header-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .class-home-options-wrapper {
    gap: var(--t-space-12);
  }
  .class-home-options-selector {
    min-width: 100%;
  }
  .class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .class-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .class-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .class-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .class-home-wrapper {
    gap: var(--t-space-24);
  }
  .class-home-header-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .class-home-header-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-options-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-options-selector {
    min-width: 70%;
  }
  .class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .class-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .class-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .class-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}
@media (min-width: 900px) {
  .class-home-wrapper {
    gap: var(--t-space-36);
  }
  .class-home-options-selector {
    min-width: 40%;
  }
  .class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .class-home-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .class-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}
</style>

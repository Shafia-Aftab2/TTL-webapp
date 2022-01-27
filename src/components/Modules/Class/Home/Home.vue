<template>
  <div class="class-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-home-header-wrapper">
        <div class="class-home-header-details-wrapper">
          <h2 class="h2" v-if="classDetails.name">{{ classDetails.name }}</h2>
          <div class="class-home-header-details-icons-wrapper" v-if="isTeacher">
            <talkie-icon :name="'trophy'" :onClick="hanldeClassTrophyClick" />
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
          <talkie-select
            :placeholder="'Filter by topic'"
            :customClass="'class-home-options-custom-talkie-select'"
            :options="
              classDetails?.topics && classDetails?.topics?.length > 0
                ? classDetails?.topics?.map((x) => x.name)
                : []
            "
            :onChange="handleTopicFilterChange"
          />
          <talkie-button-drop-down
            :size="'small'"
            :variant="'primary'"
            :dropDownItems="newTaskOptions"
            v-if="isTeacher"
          >
            + New Task
          </talkie-button-drop-down>
        </div>
        <div
          :class="[
            'class-home-content-wrapper',
            'class-home-content-wrapper-multi-col',
          ]"
        >
          <talkie-modal
            :type="'confirm'"
            :contentPadded="true"
            :closeButton="true"
            :centered="true"
            :title="'Are You Sure'"
            :description="'Your students responses and your feedbacks will also be deleted.'"
            :onClose="handleTopicDeleteDialogClose"
            :onConfirm="handleTaskDeletion"
            v-if="taskToDelete"
          />
          <template v-if="classTasks && classTasks.length > 0">
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
                :manageMode="isTeacher"
                :centered="false"
                :hoverAnimation="true"
                :audioSource="_question.audioSource"
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
            />
          </template>
          <template v-if="classStudents?.length === 0">
            <img
              :src="require(`@/assets/images/warning-logo.png`)"
              class="class-home-content-error-image"
            />
            <p class="p class-home-content-error-info">
              Hmm..! It looks like there are no students in your class. You can
              invite them from the class management page.
              <a :href="`/classes/${classId}/manage`">Click Here</a>
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
  TalkieSelect,
  TalkieModal,
  TalkieLoader,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
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

export default {
  name: "ClassHome",
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelect,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieLoader,
    TalkieBackDropLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
  },
  data() {
    return {
      taskToDelete: null,
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
          onClick: () => this.redirectToCommingSoonPage(),
        },
        {
          name: "Translation",
          onClick: () =>
            this.handleRedirection(
              `/classes/${this.classId}/tasks/create?type=${TaskTypes.TRANSLATION}`,
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
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get current tab from url
    const tab = URLModifier.getURLParam("tab");
    if (!tab) URLModifier.addToURL("tab", "questions");
    if (["students", "questions"].includes(tab)) this.activeTab = tab;

    // get auth user
    this.user = authUser.getUser();

    // get user role
    if (this.user.role === roles.TEACHER) this.isTeacher = true;
    else this.isStudent = true;

    // class id from params
    const classId = this.$route.params.id;
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
    const classTopics = await this.getClassTopics(classId);
    if (!classTopics) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails.id,
      name: classDetails.name,
      langugage: classDetails.langugage,
      parentSchool: classDetails.schoolName,
      teacher: {
        id: classDetails.teacher.id,
        name: classDetails.teacher.name,
        image: classDetails.teacher.image,
      },
      topics: classDetails.topics.map((x) => ({
        name: x.name,
        type: x.type,
        id: x.id,
      })),
      tasks: classDetails.tasks.map((x) => ({
        title: x.title,
        type: x.type,
        id: x.id,
      })),
    };

    // sidebar data
    const sidebarItems = myClasses.map((x) => ({
      name: x.name,
      hasRightIcon: true,
      link: `/classes/${x.id}`,
      onClick: () => this.$router.push(`/classes/${x.id}`),
      isActive: x.id === classId,
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

    this.classTasks = classTasks.results.map((x) => ({
      id: x.id,
      type: x.type,
      title: x.title,
      topic: x.topic.name,
      description: x.questionText,
      audioSource: x.voiceForQnA,
    }));

    this.classStudents = classDetails.students.map((x) => ({
      id: x.id,
      name: x.name,
      image: x?.image
        ? generateAvatar(x?.image?.split("-")[1], x?.image)
        : null,
    }));

    this.classTopics = classTopics;

    this.loading = false;
  },
  methods: {
    redirectToCommingSoonPage() {
      this.$router.push(`/coming-soon`);
    },
    handleRedirection(link, timeout = 100) {
      const self = this;
      setTimeout(function () {
        self.$router.push(link);
      }, timeout);
    },
    hanldeClassTrophyClick() {
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
    handleTopicCardDeleteClick(id) {
      this.taskToDelete = id;
    },
    handleTopicDeleteDialogClose() {
      this.taskToDelete = null;
    },
    async handleTaskDeletion() {
      const taskId = this.taskToDelete;
      this.taskToDelete = null;
      this.backdropLoading = true;

      // api call
      const response = await TaskService.Delete(taskId).catch(() => null);

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show("Failed To Delete Task..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      notifications.show("Task Deleted Successfully..!", {
        variant: "success",
        displayIcon: true,
      });
      this.classTasks = this.classTasks?.filter((x) => x?.id !== taskId);
    },
    handleTabChange(x) {
      this.activeTab = x.toLowerCase();
      URLModifier.addToURL("tab", x.toLowerCase());
    },
    handleTopicFilterChange(e) {
      const selectedTopic = e.target.value;
      this.currentTopicFilter = selectedTopic;
    },
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
    async getMyClasses() {
      const response = await ClassService.GetMyClasses().catch(() => null);

      return response.data || null;
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
    async getClassTopics() {
      const query = {};

      const response = await TopicService.Query(query).catch(() => null);

      return !!response.data ? response.data.results : null;
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
  justify-content: space-between;
  align-items: center;
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

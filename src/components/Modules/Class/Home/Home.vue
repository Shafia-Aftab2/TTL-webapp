<template>
  <div class="class-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-home-header-wrapper">
        <div class="class-home-header-details-wrapper">
          <h2 class="h2" v-if="classDetails.name">{{ classDetails.name }}</h2>
          <div class="class-home-header-details-icons-wrapper" v-if="isTeacher">
            <talkie-icon :name="'trophy'" />
            <talkie-icon :name="'setting'" />
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
              classTopics && classTopics.length > 0
                ? classTopics.map((x) => x.name)
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
            :description="'Your students responses will also be deleted.'"
            :onClose="handleTopicDeleteDialogClose"
            v-if="showDeleteDialog"
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
                :audioSource="_question.audioSource"
                :onDeleteClick="handleTopicCardDeleteClick"
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
              :studentAvatar="_student.avatar"
            />
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

export default {
  name: "ClassHome",
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelect,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
  },
  data() {
    return {
      showDeleteDialog: false,
      newTaskOptions: [
        {
          name: "Question",
          onClick: () => {},
        },
        {
          name: "Photo",
          onClick: () => {},
        },
        {
          name: "Emoji Story",
          onClick: () => {},
        },
        {
          name: "Translation",
          onClick: () => {},
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
        onClick: () => console.log("Button Clicked"),
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
      avatar:
        x.avatar ||
        "data:image/png;base64,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",
    }));

    this.classTopics = classTopics;

    this.loading = false;
  },
  methods: {
    handleTopicCardDeleteClick() {
      this.showDeleteDialog = !this.showDeleteDialog;
    },
    handleTopicDeleteDialogClose() {
      this.showDeleteDialog = !this.showDeleteDialog;
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
}
</style>

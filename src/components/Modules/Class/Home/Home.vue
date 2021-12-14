<template>
  <div class="class-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-home-header-wrapper">
        <div class="class-home-header-details-wrapper">
          <h2 class="h2" v-if="classDetails.name">{{ classDetails.name }}</h2>
          <div class="class-home-header-details-icons-wrapper">
            <talkie-icon :name="'trophy'" />
            <talkie-icon :name="'setting'" />
          </div>
        </div>
        <div class="class-home-header-tabs-wrapper">
          <talkie-tab :label="'Questions'" :active="true" />
          <talkie-tab :label="'Students'" />
        </div>
      </div>
      <div class="class-home-options-wrapper">
        <talkie-select
          :placeholder="'Filter by topic'"
          :customClass="'class-home-options-custom-talkie-select'"
          :options="
            classDetails.topics && classDetails.topics.length > 0
              ? classDetails.topics.map((x) => x.name)
              : []
          "
        />
        <talkie-button-drop-down
          :size="'small'"
          :variant="'primary'"
          :dropDownItems="newTaskOptions"
        >
          + New Task
        </talkie-button-drop-down>
      </div>
      <div class="class-home-content-wrapper">
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
          <talkie-question-card
            v-for="_question in classTasks"
            :key="_question"
            :title="_question.title"
            :topic="_question.topic"
            :description="_question.description"
            :manageMode="true"
            :centered="false"
            :audioSource="_question.audioSource"
            :onDeleteClick="handleTopicCardDeleteClick"
          />
        </template>
      </div>
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
import { TalkieQuestionCard } from "@/components/SubModules/Cards";
import { ClassService } from "@/api/services";

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
      classTasks: {},
      loading: false,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // classes list (+ failure case)
    const myClasses = await this.getMyClasses();
    if (!myClasses) return this.$router.push("/404");

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

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
    this.classTasks = classDetails.tasks;

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

    this.loading = false;
  },
  methods: {
    handleTopicCardDeleteClick() {
      this.showDeleteDialog = !this.showDeleteDialog;
    },
    handleTopicDeleteDialogClose() {
      this.showDeleteDialog = !this.showDeleteDialog;
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
    grid-template-columns: 1fr;
    gap: var(--t-space-16);
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
    grid-template-columns: 1fr;
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .class-home-wrapper {
    gap: var(--t-space-36);
  }
  .class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .class-home-content-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

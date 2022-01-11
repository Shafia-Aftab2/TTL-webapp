<template>
  <div class="class-manage-wrapper">
    <div class="class-manage-header-wrapper">
      <div class="class-manage-header-details-wrapper">
        <h2 class="h2" v-if="classDetails.name">{{ classDetails.name }}</h2>
        <div class="class-manage-header-details-tab-options-wrapper">
          <p class="p">Manage:</p>
          <template v-for="tabName in tabs" :key="tabName">
            <talkie-tab
              :label="tabName"
              :active="tabName.toLowerCase() === activeTab"
              :onClick="() => handleTabChange(tabName.toLowerCase())"
            />
          </template>
        </div>
      </div>
      <div class="class-manage-header-details-manage-options-wrapper">
        <talkie-icon
          :name="'pencil'"
          :variant="'secondary'"
          :size="35"
          :iconToSizeRatio="1.2"
        />
        <talkie-icon
          :name="'trash'"
          :variant="'neutral'"
          :size="35"
          :iconToSizeRatio="1.2"
        />
      </div>
    </div>
    <div class="class-manage-content-wrapper">
      <!-- Students tab -->
      <template v-if="activeTab === 'students'">
        <talkie-student-card
          :mode="'add'"
          :customClass="'class-manage-content-card'"
          :onAddClick="handleAddStudentButtonClick"
        />
        <talkie-student-card
          v-for="_student in classStudents"
          :key="_student"
          :mode="'manage'"
          :customClass="'class-manage-content-card'"
          :studentAvatar="_student.avatar"
          :studentName="_student.name"
          :onDeleteClick="handleStudentRemoveClick"
        />
      </template>

      <!-- Topics tab -->
      <template v-if="activeTab === 'topics'">
        <h4 class="h4">Beginners / Intermediate</h4>
        <talkie-topic-card
          v-for="_topic in classTopics"
          :key="_topic"
          :topicName="_topic.name"
          :customClass="'class-manage-content-card'"
        />
      </template>
    </div>
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
          <p class="p">Copy and paste the url below</p>
        </div>
        <div class="class-manage-modal-invite-students-input-wrapper">
          <talkie-input :value="'url here'" />
        </div>
        <talkie-button> Copy </talkie-button>
      </div>
    </template>

    <!-- Remove Student -->
    <template v-if="modalMode === 'remove-student'">
      <div class="class-manage-modal-invite-students">
        <div class="class-manage-modal-invite-students-header-wrapper">
          <h3 class="h3">Remove Student</h3>
          <p class="p">Sure to remove this student from the class?</p>
        </div>
        <talkie-button :variant="'danger'"> Yes, Remove </talkie-button>
      </div>
    </template>
  </talkie-modal>
</template>

<script>
import {
  TalkieInput,
  TalkieButton,
  TalkieTab,
  TalkieIcon,
  TalkieModal,
} from "@/components/UICore";
import {
  TalkieStudentCard,
  TalkieTopicCard,
} from "@/components/SubModules/Cards";
import URLModifier from "@/utils/helpers/URLModifier";
import { ClassService } from "@/api/services";

export default {
  name: "ClassManage",
  components: {
    TalkieInput,
    TalkieButton,
    TalkieTab,
    TalkieIcon,
    TalkieModal,
    TalkieStudentCard,
    TalkieTopicCard,
  },
  data() {
    return {
      activeTab: "students",
      tabs: ["students", "topics"],
      modalMode: null,
      classId: null,
      classDetails: {},
      classStudents: [],
      classTopics: [],
    };
  },
  async created() {
    // get current tab from url
    const tab = URLModifier.getURLParam("tab");
    if (!tab) URLModifier.addToURL("tab", "students");
    if (["students", "topics"].includes(tab)) this.activeTab = tab;

    // class id from params
    const classId = this.$route.params.classId;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails.id,
      name: classDetails.name,
      langugage: classDetails.langugage,
    };
    this.classStudents = classDetails?.students?.map((x) => ({
      id: x?.id,
      name: x?.name,
      avatar: "https://via.placeholder.com/150",
    }));
    this.classTopics = classDetails?.topics?.map((x) => ({
      id: x?.id,
      type: x?.type,
      name: x?.name,
    }));
  },
  methods: {
    handleTabChange(x) {
      this.activeTab = x.toLowerCase();
      URLModifier.addToURL("tab", x.toLowerCase());
    },
    handleAddStudentButtonClick() {
      this.modalMode = "invite-students";
    },
    handleStudentRemoveClick() {
      this.modalMode = "remove-student";
    },
    handleModalClose() {
      this.modalMode = null;
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
  },
};
</script>

<style>
.class-manage-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  margin-bottom: var(--t-space-36);
  background-color: var(--t-white);
}
.class-manage-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-manage-header-details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.class-manage-header-details-tab-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-manage-header-details-manage-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
}
.class-manage-content-wrapper {
  flex-direction: column;
  display: flex;
  justify-content: center;
}
.class-manage-content-card {
  border: var(--t-space-1) solid var(--t-gray-75);
}
.class-manage-modal-invite-students {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-30);
}
.class-manage-modal-invite-students-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-5);
}
.class-manage-modal-invite-students-input-wrapper,
.class-manage-modal-invite-students-input-wrapper > div {
  min-width: 80% !important;
}
.class-manage-load-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  margin-top: var(--t-space-36);
  margin-bottom: var(--t-space-36);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-manage-wrapper {
    max-width: 100%;
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-24) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-tab-options-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-manage-options-wrapper {
    gap: var(--t-space-3);
  }
  .class-manage-content-wrapper {
    gap: var(--t-space-8);
  }
}
@media (min-width: 600px) {
  .class-manage-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-tab-options-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-manage-options-wrapper {
    gap: var(--t-space-5);
  }
  .class-manage-content-wrapper {
    gap: var(--t-space-8);
  }
}
@media (min-width: 1200px) {
  .class-manage-wrapper {
    max-width: 90%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
    gap: calc(var(--t-space-36) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-manage-header-details-tab-options-wrapper {
    gap: var(--t-space-12);
  }
  .class-manage-content-wrapper {
    gap: var(--t-space-12);
  }
}
</style>

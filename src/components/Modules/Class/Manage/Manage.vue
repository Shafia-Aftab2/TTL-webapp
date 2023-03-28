<template>
  <!-- Back button -->
  <div class="loading-wrapper">
    <talkie-icon :name="'arrow-left'" :size="25" :onClick="redirectBack" />
  </div>

  <!-- Content Wrapper -->
  <div class="class-manage-wrapper" v-if="!computedPageLoading">
    <div class="class-manage-header-wrapper">
      <div class="class-manage-header-details-wrapper">
        <h2 class="h2" v-if="classDetails?.name && !editClassMode">
          <router-link
            :to="computedClassHomeLink"
            class="class-manage-header-details-class-name-link"
          >
            {{ classDetails?.name }}
          </router-link>
        </h2>
        <talkie-form
          :customClass="'class-manage-header-details-update-form-wrapper'"
          v-if="editClassMode"
          v-slot="{ errors }"
          :initialValues="{
            name: classDetails?.name,
          }"
          :validationSchema="updateClassSchema"
          :onSubmit="handleEditClassSubmit"
        >
          <talkie-input
            :name="'name'"
            :size="'large'"
            :placeholder="'Class Name'"
            :hint="{
              type: errors.name ? 'error' : null,
              message: errors.name ? errors.name : null,
            }"
          />
          <talkie-icon
            :type="'submit'"
            :name="'tick-mark'"
            :variant="'success'"
            :isActive="true"
            :size="30"
            :iconToSizeRatio="1.5"
          />
          <talkie-icon
            :name="'x-mark'"
            :variant="'danger'"
            :isActive="true"
            :size="30"
            :iconToSizeRatio="1.5"
            :onClick="handleUnsetEditClassMode"
          />
        </talkie-form>

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
          :onClick="handleSetEditClassMode"
          v-if="!editClassMode"
        />
        <talkie-icon
          :name="'trash'"
          :variant="'neutral'"
          :size="35"
          :iconToSizeRatio="1.2"
          :onClick="handleClassDeleteClick"
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
          :studentAvatar="_student.image"
          :studentName="_student.name"
          :onKeyClick="
            async () =>
              await handleStudentPasswordChangeClick(
                _student?.id,
                _student?.name
              )
          "
          :onDeleteClick="
            async () => await handleStudentRemoveClick(_student?.id)
          "
        />
      </template>

      <!-- Topics tab -->
      <template v-if="activeTab === 'topics'">
        <h4 class="h4" v-if="topicsList?.advanced?.length > 0">
          Intermediate / Advanced
        </h4>
        <talkie-topic-card
          v-for="_topic in topicsList.advanced"
          :key="_topic"
          :topicName="_topic.name"
          :customClass="'class-manage-content-card'"
          :topicSelected="activeClassTopicIds?.includes(_topic.id)"
          :onTopicCheckToggle="
            async (isSelected) =>
              await handleTopicSelectToggle(isSelected, _topic.id)
          "
        />

        <h4 class="h4" v-if="topicsList?.intermediate?.length > 0">
          Beginners / Intermediate
        </h4>
        <talkie-topic-card
          v-for="_topic in topicsList.intermediate"
          :key="_topic"
          :topicName="_topic.name"
          :customClass="'class-manage-content-card'"
          :topicSelected="activeClassTopicIds?.includes(_topic.id)"
          :onTopicCheckToggle="
            async (isSelected) =>
              await handleTopicSelectToggle(isSelected, _topic.id)
          "
        />

        <h4 class="h4" v-if="topicsList?.beginner?.length > 0">Beginners</h4>
        <talkie-topic-card
          v-for="_topic in topicsList.beginner"
          :key="_topic"
          :topicName="_topic.name"
          :customClass="'class-manage-content-card'"
          :topicSelected="activeClassTopicIds?.includes(_topic.id)"
          :onTopicCheckToggle="
            async (isSelected) =>
              await handleTopicSelectToggle(isSelected, _topic.id)
          "
        />
      </template>
    </div>
  </div>

  <!-- Load Wrapper -->
  <div class="class-manage-load-wrapper" v-if="computedPageLoading">
    <talkie-loader :size="'large'" />
  </div>

  <!-- Backdrop load wrapper -->
  <talkie-back-drop-loader v-if="backdropLoading" />

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
            Share this url with your students to invite them to the class
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

    <!-- Remove Student -->
    <template v-if="modalMode === 'change-student-password'">
      <talkie-form
        :customClass="'class-manage-modal-invite-students'"
        v-slot="{ errors }"
        :validationSchema="changeStudentPasswordSchema"
        :onSubmit="handleStudentPasswordChange"
      >
        <div class="class-manage-modal-invite-students-header-wrapper">
          <h3 class="h3">Change Student Password</h3>
          <p class="p">
            Enter new password for {{ modalData.changePasswordForStudent.name }}
          </p>
        </div>

        <talkie-input
          :name="'password'"
          :type="'password'"
          :placeholder="'Enter new password.'"
          :hint="{
            type: errors.password ? 'error' : null,
            message: errors.password ? errors.password : null,
          }"
        />

        <talkie-button :type="'submit'"> Update Password </talkie-button>
      </talkie-form>
    </template>

    <!-- Remove Student -->
    <template v-if="modalMode === 'remove-student'">
      <div class="class-manage-modal-invite-students">
        <div class="class-manage-modal-invite-students-header-wrapper">
          <h3 class="h3">Remove Student</h3>
          <p class="p">Sure to remove this student from the class?</p>
        </div>
        <talkie-button :variant="'danger'" :onClick="handleStudentRemove">
          Yes, Remove
        </talkie-button>
      </div>
    </template>

    <!-- Class Delete -->
    <template v-if="modalMode === 'class-delete'">
      <div class="class-manage-modal-invite-students">
        <div class="class-manage-modal-invite-students-header-wrapper">
          <h3 class="h3">Delete Class</h3>
          <p class="p">
            All the class data including your students' recordings and your
            feedback will be deleted permanently. Are you sure you want to
            delete?
          </p>
        </div>
        <talkie-button :variant="'danger'" :onClick="handleClassDeletion">
          Yes, I'm sure.
        </talkie-button>
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
  TalkieLoader,
  TalkieForm,
  TalkieBackDropLoader,
} from "@/components/UICore";
import {
  TalkieStudentCard,
  TalkieTopicCard,
} from "@/components/SubModules/Cards";
import URLModifier from "@/utils/helpers/URLModifier";
import { ClassService, TopicService, UserService } from "@/api/services";
import { notifications } from "@/components/UIActions";
import {
  updateClassSchema,
  changeStudentPasswordSchema,
} from "@/utils/validations/class.validation";
import topicTypes from "@/utils/constants/topicTypes";
import { copy as copyToClipboard } from "@/utils/helpers/clipboard";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import authUser from "@/utils/helpers/auth";

export default {
  name: "ClassManage",
  components: {
    TalkieInput,
    TalkieButton,
    TalkieTab,
    TalkieIcon,
    TalkieModal,
    TalkieLoader,
    TalkieForm,
    TalkieBackDropLoader,
    TalkieStudentCard,
    TalkieTopicCard,
  },
  data() {
    return {
      activeTab: "students",
      tabs: ["students", "topics"],
      modalMode: null,
      modalData: {},
      editClassMode: false,
      topicsList: [],
      classId: null,
      classDetails: {},
      classStudents: [],
      classTopics: [],
      activeClassTopicIds: [],
      pageLoading: false,
      backdropLoading: false,
      updateClassSchema: updateClassSchema,
      changeStudentPasswordSchema: changeStudentPasswordSchema,
    };
  },
  computed: {
    computedClassHomeLink() {
      return `/classes/${this.classId}`;
    },
    computedClassJoinLink() {
      return `${URLModifier.getDomain()}/classes/${this.classId}/join`;
    },
    computedPageLoading() {
      return this.pageLoading;
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // get current tab from url
    const tab = this?.$route?.query?.tab;
    if (!tab) URLModifier.addToURL("tab", "students");
    if (["students", "topics"].includes(tab)) this.activeTab = tab;

    // class id from params
    const classId = this.$route.params.classId;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // get topics list (+ failure case)
    const topicsList = await this.getTopicsList(classDetails?.language);
    if (!topicsList) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails?.id,
      name: classDetails?.name,
      langugage: classDetails?.langugage,
    };
    this.classStudents = classDetails?.students?.map((x) => ({
      id: x?.id,
      name: x?.name,
      image: x?.image
        ? generateAvatar(x?.image?.split("-")[1], x?.image)
        : null,
    }));
    this.classTopics = classDetails?.topics?.map((x) => ({
      id: x?.id,
      type: x?.type,
      name: x?.name,
    }));
    this.activeClassTopicIds = (classDetails?.topics || [])?.map((x) => x?.id);
    this.topicsList = {
      beginner: topicsList
        .filter((x) => x?.type === topicTypes.BEGINNER)
        .sort((x, y) =>
          x.order === -1 || y.order === -1
            ? 1
            : x.order < y.order
            ? -1
            : x.order > y.order
            ? 1
            : 0
        ),
      intermediate: topicsList
        .filter((x) => x?.type === topicTypes.INTERMEDIATE)
        .sort((x, y) =>
          x.order === -1 || y.order === -1
            ? 1
            : x.order < y.order
            ? -1
            : x.order > y.order
            ? 1
            : 0
        ),
      advanced: topicsList
        .filter((x) => x?.type === topicTypes.ADVANCED)
        .sort((x, y) =>
          x.order === -1 || y.order === -1
            ? 1
            : x.order < y.order
            ? -1
            : x.order > y.order
            ? 1
            : 0
        ),
    };
    this.pageLoading = false;
  },
  methods: {
    redirectBack() {
      this.$router.go(-1);
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
    async handleTopicSelectToggle(isSelected, topicId) {
      const newTopics = isSelected
        ? [...this.activeClassTopicIds, topicId]
        : [...this.activeClassTopicIds]?.filter((x) => x !== topicId);

      if (await this.updateClassTopic([topicId], isSelected)) {
        this.activeClassTopicIds = newTopics;
      }
    },
    async updateClassTopic(topics, isAddMode) {
      // update page state
      this.backdropLoading = true;

      // payload
      const classId = this.classId;
      const payload = { topics };

      // api call
      const response = await (isAddMode
        ? ClassService.AddTopics
        : ClassService.RemoveTopics)(classId, payload).catch(() => {
        return {
          error: "Could not update class topic/s!",
        };
      });

      // failure case
      if (response.error) {
        this.backdropLoading = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return false;
      }

      // success case
      this.backdropLoading = false;
      notifications.show("Class topics updated!", {
        variant: "success",
        displayIcon: true,
      });
      return true;
    },
    handleTabChange(x) {
      this.activeTab = x?.toLowerCase();
      URLModifier.addToURL("tab", x?.toLowerCase());
    },
    handleAddStudentButtonClick() {
      this.modalMode = "invite-students";
    },
    handleStudentPasswordChangeClick(studentId, studentName) {
      this.modalMode = "change-student-password";
      this.modalData = {
        changePasswordForStudent: {
          id: studentId,
          name: studentName,
        },
      };
    },
    handleStudentRemoveClick(studentId) {
      this.modalMode = "remove-student";
      this.modalData = {
        studentToRemove: studentId,
      };
    },
    handleClassDeleteClick() {
      this.modalMode = "class-delete";
    },
    handleModalClose() {
      this.modalMode = null;
      this.modalData = {};
    },
    handleSetEditClassMode() {
      this.editClassMode = true;
    },
    handleUnsetEditClassMode() {
      this.editClassMode = false;
    },
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getTopicsList(language) {
      const query = { ...(language && { language }) };

      const response = await TopicService.Query(query).catch(() => null);

      return !!response.data ? response.data.results : null;
    },
    async handleClassDeletion() {
      // update page state
      this.modalMode = null;
      this.backdropLoading = true;

      // api call
      const response = await ClassService.Delete(this.classId).catch(
        () => null
      );

      // failure case
      if (!response) {
        this.backdropLoading = false;
        notifications.show("Failed To Delete Class!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      notifications.show("Class Deleted Successfully!", {
        variant: "success",
        displayIcon: true,
      });
      // update user profile data (+failure case)
      const isProfileUpdated = await this.updateUserProfile();
      if (!isProfileUpdated) return this.$router.push("/404");
      this.$router.push("/");
    },
    async updateUserProfile() {
      // api call
      const response = await UserService.GetMyProfile().catch();

      // failure case
      if (!response?.data) return false;

      // success case
      const expires = (date) => ({ expires: new Date(date) });
      const nextDay = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      authUser.setUser(response?.data, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
      return true;
    },
    async handleStudentRemove() {
      // form data
      const studentId = this.modalData.studentToRemove;

      // update page state
      this.modalMode = null;
      this.modalData = {};
      this.backdropLoading = true;

      // payload
      const payload = {
        students: [studentId],
      };

      // api call
      const response = await ClassService.RemoveStudents(
        this.classId,
        payload
      ).catch(() => {
        return {
          error: "Could not remove student!",
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
      this.classStudents = [
        ...this.classStudents.filter((x) => x?.id !== studentId),
      ];
      notifications.show("Student removed successfully!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async handleStudentPasswordChange(values) {
      // form data
      const studentId = this.modalData.changePasswordForStudent.id;
      const { password } = values;

      // update page state
      this.modalMode = null;
      this.modalData = {};
      this.backdropLoading = true;

      // payload
      const payload = { password };

      // api call
      const response = await ClassService.ChangeStudentPassword(
        this.classId,
        studentId,
        payload
      ).catch(() => {
        return {
          error: "Could not update student password!",
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
      notifications.show("Student password updated successfully!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async handleEditClassSubmit(values) {
      // update page state
      this.backdropLoading = true;

      // form data
      const { name } = values;

      // if name is same then return
      if (name === this.classDetails?.name) {
        this.backdropLoading = false;
        this.editClassMode = false;
        notifications.show("Class updated successfully!", {
          variant: "success",
          displayIcon: true,
        });
        return;
      }

      // payload
      const payload = { name };

      // api call
      const response = await ClassService.Update(this.classId, payload).catch(
        (e) => {
          const errorMap = {
            ['"name" contains bad word']: "Please enter an appropriate name",
            ["class already exists in school"]:
              "Oops, this class name already exists. Try another one?",
          };

          return {
            error:
              errorMap[e.response.data.message.toLowerCase()] ||
              "Sorry, we can't update your class at the mo. Please try again later.",
          };
        }
      );

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
      this.classDetails.name = name; // update class name in state
      this.backdropLoading = false;
      this.editClassMode = false;
      notifications.show("Class updated successfully!", {
        variant: "success",
        displayIcon: true,
      });
    },
  },
};
</script>

<style>
.loading-wrapper {
  margin: auto;
  margin-top: var(--t-space-36);
}
.class-manage-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-24);
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
.class-manage-header-details-class-name-link,
.class-manage-header-details-class-name-link:visited {
  text-decoration: none;
  color: var(--t-black);
}
.class-manage-header-details-update-form-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-align: center;
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
  .loading-wrapper {
    max-width: 100%;
  }
  .class-manage-wrapper {
    max-width: 100%;
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-24) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-update-form-wrapper {
    gap: var(--t-space-5);
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
  .loading-wrapper {
    max-width: 80%;
  }
  .class-manage-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-manage-header-details-update-form-wrapper {
    gap: var(--t-space-10);
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
  .loading-wrapper {
    max-width: 90%;
  }
  .class-manage-wrapper {
    max-width: 90%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
    gap: calc(var(--t-space-36) * 2);
  }
  .class-manage-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-manage-header-details-update-form-wrapper {
    gap: var(--t-space-12);
  }
  .class-manage-header-details-tab-options-wrapper {
    gap: var(--t-space-12);
  }
  .class-manage-content-wrapper {
    gap: var(--t-space-12);
  }
}
</style>

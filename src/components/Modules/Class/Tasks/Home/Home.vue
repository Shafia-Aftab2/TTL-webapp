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
      </div>

      <div
        :class="[
          'class-home-content-wrapper',
          'class-home-content-wrapper-single-col',
        ]"
      >
        <!-- Details -->
        <template v-if="taskDetails">
          <talkie-question-card
            :title="taskDetails.title"
            :topic="taskDetails.topic"
            :description="taskDetails.description"
            :manageModeOptions="{
              canEdit: isTeacher,
              canDelete: isTeacher,
            }"
            :centered="false"
            :fullWidth="true"
            :audioSource="taskDetails.audioSource"
            :onEditClick="handleTaskEditClick"
            :onDeleteClick="handleTaskDeleteClick"
          />
        </template>

        <!-- Whole Class Feedback -->
        <talkie-feedback-card
          :fullWidth="true"
          :onFeedbackRecording="handleTaskWholeClassFeedbackRecording"
          :onFeedbackRecordingDiscard="
            handleTaskWholeClassFeedbackRecordingDiscard
          "
          :onFeedbackSendClick="handleTaskWholeClassFeedbackSend"
        />

        <!-- Student responses -->
        <template v-if="classStudents && classStudents.length > 0">
          <template v-for="_student in classStudents" :key="_student">
            <talkie-conversation-card
              v-if="studentWithTaskResponses?.includes(_student?.id)"
              :taskId="taskId"
              :messages="[
                {
                  id: taskDetails?.id,
                  from: user?.id,
                  audio: taskDetails?.audioSource,
                },
              ]"
              :userMode="'teacher'"
              :studentId="_student?.id"
              :studentName="_student?.name"
              :studentAvatar="_student?.image"
            />
          </template>
        </template>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="class-home-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>
    <talkie-back-drop-loader v-if="backdropLoading" />

    <!-- Task delete modal -->
    <talkie-modal
      :type="'confirm'"
      :contentPadded="true"
      :closeButton="true"
      :centered="true"
      :title="'Are You Sure'"
      :description="'Your students responses and your feedbacks will also be deleted.'"
      :onClose="handleTaskDeleteReset"
      :onConfirm="handleTaskDeletion"
      v-if="showDeleteTaskDialog"
    />
  </div>
</template>

<script>
import {
  TalkieIcon,
  TalkieModal,
  TalkieLoader,
  TalkieBackDropLoader,
} from "@/components/UICore";
import {
  TalkieQuestionCard,
  TalkieFeedbackCard,
  TalkieConversationCard,
} from "@/components/SubModules/Cards";
import {
  ClassService,
  TaskService,
  ResponseService,
  FileService,
  FeedbackService,
} from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";
import FilePurposes from "@/utils/constants/filePurposes";
import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";
import { notifications } from "@/components/UIActions";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "ClassTaskHome",
  components: {
    TalkieIcon,
    TalkieLoader,
    TalkieModal,
    TalkieQuestionCard,
    TalkieFeedbackCard,
    TalkieBackDropLoader,
    TalkieConversationCard,
  },
  data() {
    return {
      classId: null,
      taskId: null,
      classDetails: {},
      classStudents: [],
      studentWithTaskResponses: [],
      taskDetails: {},
      taskResponses: [],
      taskResponsesWholeClassFeedbackRecording: null,
      taskResponsesIndividualFeedbackRecordings: [],
      isTeacher: false,
      isStudent: false,
      loading: false,
      backdropLoading: false,
      showDeleteTaskDialog: false,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get auth user
    this.user = authUser.getUser();

    // get user role
    if (this.user.role === roles.TEACHER) this.isTeacher = true;
    else this.isStudent = true;

    // class id from params
    const classId = this.$route.params.classId;
    this.classId = classId;

    // task id from params
    const taskId = this.$route.params.taskId;
    this.taskId = taskId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // class tasks
    const classTasks = await this.getClassTasks(classId);
    if (!classTasks) return this.$router.push("/404");

    // get task details
    const taskDetails = await this.getTaskDetails(taskId);
    if (!taskDetails || taskDetails.type !== TaskTypes.QUESTION_ANSWER)
      return this.$router.push("/404");

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
      link: `/classes/${this.classId}/tasks/${x.id}`,
      onClick: () =>
        this.$router.push(`/classes/${this.classId}/tasks/${x.id}`),
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

    this.taskResponses = taskResponses.map((x) => ({
      id: x.id,
      student: {
        id: x.student && x.student.id ? x.student.id : "student-id",
        name: x.student && x.student.name ? x.student.name : "student-name",
        avatar:
          x.student && x.student.avatar
            ? x.student.avatar
            : "data:image/png;base64,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",
      },
      audioSource: x.voiceRecording,
    }));

    this.classStudents =
      classDetails?.students?.map((x) => ({
        id: x?.id,
        name: x?.name,
        image: x?.image
          ? generateAvatar(x?.image?.split("-")[1], x?.image)
          : null,
      })) || [];

    const studentWithTaskResponses = (() => {
      const _uniqueStudentIds = new Set();

      this.taskResponses?.map(
        (x) =>
          !_uniqueStudentIds?.has(x?.student?.id) &&
          _uniqueStudentIds?.add(x?.student?.id)
      );

      return [..._uniqueStudentIds];
    })();
    this.studentWithTaskResponses = studentWithTaskResponses;

    this.loading = false;
  },
  methods: {
    redirectToCommingSoonPage() {
      this.$router.push(`/coming-soon`);
    },
    handleTaskEditClick() {
      this.$router.push(`/classes/${this.classId}/tasks/${this.taskId}/edit`);
    },
    hanldeClassTrophyClick() {
      this.$router.push(`/classes/${this.classId}/leaderboard`);
    },
    handleClassManageClick() {
      this.$router.push(`/classes/${this.classId}/manage`);
    },
    handleTaskDeleteClick() {
      this.showDeleteTaskDialog = true;
    },
    handleTaskDeleteReset() {
      this.showDeleteTaskDialog = false;
    },
    handleTaskIndividualFeedbackRecording(responseId, recording) {
      this.taskResponsesIndividualFeedbackRecordings = [
        ...this.taskResponsesIndividualFeedbackRecordings,
        {
          responseId,
          recording,
        },
      ];
    },
    handleTaskIndividualFeedbackRecordingDiscard(responseId) {
      this.taskResponsesIndividualFeedbackRecordings = [
        ...this.taskResponsesIndividualFeedbackRecordings.filter(
          (x) => x.responseId !== responseId
        ),
      ];
    },
    async handleTaskIndividualFeedbackSend(responseId) {
      const taskFeedback = this.taskResponsesIndividualFeedbackRecordings.find(
        (x) => x.responseId === responseId
      );

      if (!taskFeedback) {
        notifications.show("Could not create feedback..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      await this.handleCreateResponseFeedback(
        {
          responseId,
          responseFeedbackRecording: taskFeedback.recording,
        },
        false
      );
    },
    handleTaskWholeClassFeedbackRecording(recording) {
      this.taskResponsesWholeClassFeedbackRecording = recording;
    },
    handleTaskWholeClassFeedbackRecordingDiscard() {
      this.taskResponsesWholeClassFeedbackRecording = null;
    },
    async handleTaskWholeClassFeedbackSend() {
      if (!this.taskResponsesWholeClassFeedbackRecording) {
        notifications.show("Could not create feedback..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      await this.handleCreateResponseFeedback(
        {
          taskId: this.taskId,
          responseFeedbackRecording:
            this.taskResponsesWholeClassFeedbackRecording,
        },
        true
      );
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
        { purpose: FilePurposes.TASK_VOICE },
        payload
      ).catch(() => null);

      // error case
      if (!response) return null;

      // success case
      const uploadedFile = response.data[0].s3Url;
      return uploadedFile;
    },
    async handleCreateResponseFeedback(values, wholeClass = false) {
      // update page state
      this.backdropLoading = true;

      // upload file
      const { taskId, responseId, responseFeedbackRecording } = values;
      const voiceRecording = await this.handleFileUpload(
        responseFeedbackRecording.blob
      );

      // file upload failure
      if (!voiceRecording) {
        notifications.show("Could not create feedback..!", {
          variant: "error",
          displayIcon: true,
        });
        this.backdropLoading = false;
        return;
      }

      // api payload
      const payload = { voiceRecording };

      // api call
      const response = wholeClass
        ? await FeedbackService.CreateWholeClassFeedback(taskId, payload).catch(
            () => null
          )
        : await FeedbackService.CreateIndividualFeedback(
            responseId,
            payload
          ).catch(() => null);

      // failure case
      if (!response) {
        notifications.show("Could not create feedback..!", {
          variant: "error",
          displayIcon: true,
        });
        this.backdropLoading = false;
        return;
      }

      // success case
      notifications.show("Feeback Created..!", {
        variant: "success",
        displayIcon: true,
      });
      this.backdropLoading = false;
    },
    async handleTaskDeletion() {
      this.backdropLoading = true;
      this.showDeleteTaskDialog = false;

      // api call
      const response = await TaskService.Delete(this.taskId).catch(() => null);

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
      this.$router.push(`/classes/${this.classId}`);
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
  .class-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-content-wrapper-single-col {
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
  .class-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .class-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 900px) {
  .class-home-wrapper {
    gap: var(--t-space-36);
  }
}
</style>

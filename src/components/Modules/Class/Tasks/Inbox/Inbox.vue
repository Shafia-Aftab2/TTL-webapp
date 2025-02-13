<template>
  <!-- Page Content -->
  <template v-if="!computedLoading">
    <div class="class-tasks-inbox-wrapper">
      <div class="class-tasks-inbox-header-wrapper">
        <h2 class="h2">Your inbox</h2>
        <div class="class-tasks-inbox-header-select-wrapper">
          <talkie-select-group
            :placeholder="'Filter by question type'"
            :options="topicsGrouped?.length > 0 ? topicsGrouped : []"
            :onChange="handleTopicFilterChange"
          />
        </div>
      </div>
      <div class="class-tasks-inbox-task-items-wrapper">
        <template v-if="tasksList.length > 0">
          <template v-for="_task in tasksList" :key="_task">
            <talkie-conversation-card
              v-if="
                currentTopicFilter
                  ? _task?.topic?.name === currentTopicFilter
                  : true
              "
              :userMode="'student'"
              :studentId="user?.id"
              :taskId="_task?.id"
              :taskTitle="_task?.title"
              :taskDescription="_task?.description"
              :taskTopic="_task?.topic?.name"
              :taskIsRead="_task?.isRead"
              :messages="_task?.responses"
              :showReadReceipts="true"
            />
          </template>
        </template>
      </div>
    </div>
  </template>

  <!-- Loading State -->
  <template v-if="computedLoading">
    <div class="class-tasks-inbox-loading-wrapper">
      <talkie-loader :size="'large'" />
    </div>
  </template>
</template>

<script>
import { TalkieSelectGroup, TalkieLoader } from "@/components/UICore";
import { TalkieConversationCard } from "@/components/SubModules/Cards";
import { ClassService, TaskService } from "@/api/services";
import authUser from "@/utils/helpers/auth";
import topicTypes from "@/utils/constants/topicTypes";
import taskTypes from "@/utils/constants/taskTypes";

export default {
  name: "TasksInbox",
  components: {
    TalkieSelectGroup,
    TalkieLoader,
    TalkieConversationCard,
  },
  data() {
    return {
      classTopics: [],
      currentTopicFilter: null,
      user: {},
      classId: null,
      tasksList: [],
      loading: false,
      topicsGrouped: [],
    };
  },
  computed: {
    computedLoading() {
      return this.loading;
    },
  },
  async created() {
    // update page state
    this.loading = true;

    // get user data
    const user = authUser.getUser();
    this.user = user;

    // get class id from user data (+ failure case)
    const classId =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;
    if (!classId) return this.$router.push("/404");
    this.classId = classId;

    // get class details
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    this.topicsGrouped = [
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

    // get class tasks list
    const tasksList = await this.getClassTasks(classId);
    if (!tasksList) return this.$router.push("/404");

    // get inbox items
    const inboxItems = await this.getMyInbox();
    if (!inboxItems) return this.$router.push("/404");

    // update state
    this.classTopics = classDetails?.topics?.map((x) => ({
      id: x?.id,
      name: x?.name,
    }));
    const transformedInboxItems = inboxItems.map((x) => ({
      id: x?.id,
      title: x?.title,
      description: x?.questionText,
      topic: {
        id: x?.topic?.id || x?.topic?._id,
        name: x?.topic?.name,
      },
      type: x?.type,
      isRead: !x?.hasUnreadFeedbacks,
      responses: [
        {
          id: x?.id,
          from: x.teacher,
          dateTime: x?.createdAt,
          ...(x?.type === taskTypes.QUESTION_ANSWER && {
            audio: x?.voiceForQnA,
          }),
          ...(x?.type === taskTypes.CAPTION_THIS && {
            photo: x?.captionThisImage,
          }),
          ...(x?.type === taskTypes.TRANSLATION && {
            text: x?.textToTranslate,
          }),
          ...(x?.type === taskTypes.EMOJI_STORY && {
            emojis: x?.emojiStory,
          }),
        },
      ],
    }));
    this.tasksList = transformedInboxItems;

    this.loading = false;
  },
  methods: {
    handleTopicFilterChange(e) {
      const selectedTopic = e.target.value.trim();
      this.currentTopicFilter = selectedTopic;
    },
    async getClassDetails(classId) {
      const response = await ClassService.GetDetails(classId).catch();

      return response?.data || null;
    },
    async getClassTasks(classId) {
      const query = {};

      const response = await TaskService.QueryClassTasks(
        classId,
        query
      ).catch();

      return response?.data?.results || null;
    },
    async getMyInbox() {
      const response = await TaskService.GetStudentInbox().catch(() => null);

      return response?.data || null;
    },
  },
};
</script>

<style>
.class-tasks-inbox-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.class-tasks-inbox-task-items-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-loading-wrapper {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-24);
    margin-bottom: var(--t-space-24);
    padding: 0 var(--t-space-12);
    gap: var(--t-space-24);
  }
  .class-tasks-inbox-header-wrapper {
    gap: var(--t-space-16);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 70%;
  }
  .class-tasks-inbox-task-items-wrapper {
    gap: var(--t-space-12);
  }
  .class-tasks-inbox-loading-wrapper {
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-36);
    margin-bottom: var(--t-space-36);
    padding: 0 var(--t-space-24);
    gap: var(--t-space-28);
  }
  .class-tasks-inbox-header-wrapper {
    gap: var(--t-space-20);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 50%;
  }
  .class-tasks-inbox-task-items-wrapper {
    gap: var(--t-space-16);
  }
  .class-tasks-inbox-loading-wrapper {
    margin-top: var(--t-space-36);
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-wrapper {
    margin-top: var(--t-space-50);
    margin-bottom: var(--t-space-50);
    gap: var(--t-space-24);
  }
  .class-tasks-inbox-header-select-wrapper {
    min-width: 40%;
  }
  .class-tasks-inbox-loading-wrapper {
    margin-top: var(--t-space-50);
  }
}
</style>

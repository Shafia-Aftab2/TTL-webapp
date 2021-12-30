<template>
  <!-- Page Content -->
  <template v-if="!computedLoading">
    <div class="class-tasks-inbox-wrapper">
      <div class="class-tasks-inbox-header-wrapper">
        <h2 class="h2">Speaking Portfolio</h2>
        <div class="class-tasks-inbox-header-select-wrapper">
          <talkie-select
            :placeholder="'Filter by question type'"
            :options="
              classTopics && classTopics.length > 0
                ? classTopics.map((x) => x.name)
                : []
            "
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
              :taskTopic="_task?.topic?.name"
              :taskIsRead="false"
              :messages="_task?.responses"
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
import { TalkieSelect, TalkieLoader } from "@/components/UICore";
import { TalkieConversationCard } from "@/components/SubModules/Cards";
import { ClassService, TaskService } from "@/api/services";
import authUser from "@/utils/helpers/auth";

export default {
  name: "TasksInbox",
  components: {
    TalkieSelect,
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

    // get class tasks list
    const tasksList = await this.getClassTasks(classId);
    if (!tasksList) return this.$router.push("/404");

    // update state
    this.classTopics = classDetails?.topics?.map((x) => ({
      id: x?.id,
      name: x?.name,
    }));
    this.tasksList = tasksList?.map((x) => ({
      id: x?.id,
      type: x?.type,
      title: x?.title,
      topic: {
        id: x?.topic?.id,
        name: x?.topic?.name,
      },
      responses: [
        {
          id: x?.id,
          from: x?.teacher,
          audio: x?.voiceForQnA,
          dateTime: x?.createdAt,
        },
      ],
    }));
    this.loading = false;
  },
  methods: {
    handleTopicFilterChange(e) {
      const selectedTopic = e.target.value;
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

<template>
  <div class="class-tasks-inbox-wrapper">
    <div class="class-tasks-inbox-header-wrapper">
      <h2 class="h2">Speaking Portfolio</h2>
      <div class="class-tasks-inbox-header-select-wrapper">
        <talkie-select :placeholder="'Filter by question type'" />
      </div>
    </div>
    <div class="class-tasks-inbox-task-items-wrapper">
      <template v-if="tasksList.length > 0">
        <task-item
          v-for="_task in tasksList"
          :key="_task"
          :id="_task?.id"
          :title="_task?.title"
          :topic="_task?.topic?.name"
          :responses="_task?.responses"
          :isRead="false"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { TalkieSelect } from "@/components/UICore";
import TaskItem from "./TaskItem";
import { TaskService } from "@/api/services";
import authUser from "@/utils/helpers/auth";

export default {
  name: "TasksInbox",
  components: {
    TalkieSelect,
    TaskItem,
  },
  data() {
    return {
      responses: [
        {
          id: 123131468541,
          from: "teacher",
          audio:
            "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
        },
        {
          id: 123131445641568541,
          from: "me",
          audio:
            "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
        },
        {
          id: 123131462428541,
          from: "teacher",
          audio:
            "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
        },
      ],
      user: {},
      classId: null,
      tasksList: [],
    };
  },
  async created() {
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

    // get class tasks list
    const tasksList = await this.getClassTasks(classId);
    if (!tasksList) return this.$router.push("/404");

    // update state
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
        },
      ],
    }));
  },
  methods: {
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
}
</style>

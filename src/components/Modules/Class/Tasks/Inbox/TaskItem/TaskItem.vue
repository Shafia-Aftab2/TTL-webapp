<template>
  <div class="class-tasks-inbox-task-item" @click="handleItemBodyClick">
    <!-- Item Header -->
    <div
      class="class-tasks-inbox-task-item-header-wrapper"
      @click="handleItemBodyClick"
    >
      <div
        class="class-tasks-inbox-task-item-header"
        @click="handleItemBodyClick"
      >
        <p class="p" v-if="title" @click="handleItemBodyClick">{{ title }}</p>
        <p class="p" v-if="topic" @click="handleItemBodyClick">{{ topic }}</p>
      </div>
      <div
        class="class-tasks-inbox-task-item-header-status"
        v-if="!isRead"
      ></div>
    </div>

    <!-- Spacer -->
    <div
      class="class-tasks-inbox-task-item-spacer"
      v-if="taskItemExpanded"
    ></div>

    <template v-if="taskItemExpanded">
      <!-- Audio Messages -->
      <div class="class-tasks-inbox-task-item-audio-responses-wrapper">
        <task-item-response
          v-for="_response in computedResponses"
          :key="_response"
          :alignment="_response.from !== user?.id ? 'left' : 'right'"
          :responseAudio="_response.audio"
        />
      </div>

      <!-- Spacer -->
      <div
        class="class-tasks-inbox-task-item-spacer"
        v-if="taskItemExpanded"
      ></div>
    </template>
  </div>
</template>

<script>
import { TalkieLoader, TalkieAlert } from "@/components/UICore";
import TaskItemResponse from "./Response";
import authUser from "@/utils/helpers/auth";
import { ResponseService } from "@/api/services";

export default {
  name: "TasksInboxTaskItem",
  components: {
    TalkieLoader,
    TalkieAlert,
    TaskItemResponse,
  },
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    responses: {
      type: Array,
    },
  },
  data() {
    return {
      taskItemExpanded: false,
      user: {},
      messagesFetched: [],
    };
  },
  computed: {
    computedResponses() {
      return [...this.responses, ...this.messagesFetched];
    },
  },
  created() {
    // get auth user
    const user = authUser.getUser();
    this.user = user;
  },
  methods: {
    async handleItemBodyClick(e) {
      if (e.target === e.currentTarget) {
        this.taskItemExpanded = !this.taskItemExpanded;
      }

      if (this.taskItemExpanded) {
        // get responses for current task
        const taskResponses = await this.getTaskResponses(this.id);

        // failure case
        if (!taskResponses) {
          this.state.responsesFetch = {
            loading: false,
            message: {
              type: "error",
              text: "Failed to load latest responses..!",
            },
          };
          return;
        }

        // success case
        this.messagesFetched = taskResponses?.map((x) => ({
          id: x?.id,
          from: x?.student?.id,
          audio: x?.voiceRecording,
        }));
      }
    },
    async getTaskResponses(taskId) {
      const query = {};
      const responseAPI = await ResponseService.QueryClassTaskResponses(
        taskId,
        query
      ).catch();

      return responseAPI?.data || null;
    },
  },
};
</script>

<style>
.class-tasks-inbox-task-item {
  display: flex;
  flex-direction: column;
  background: var(--t-white);
  cursor: pointer;
}
.class-tasks-inbox-task-item-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-tasks-inbox-task-item-spacer {
  height: var(--t-space-2);
  width: 100%;
  background: var(--t-gray-75);
}
.class-tasks-inbox-task-item-header {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-header-status {
  display: block;
  border-radius: 50%;
  background: var(--t-primary);
}
.class-tasks-inbox-task-item-audio-responses-wrapper {
  display: flex;
  flex-direction: column;
}
.class-tasks-inbox-task-item-audio-message-centered {
  margin: auto;
}
.class-tasks-inbox-task-item-audio-message-right {
  margin-left: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-8);
    border-radius: var(--t-br-medium);
    padding: var(--t-space-20);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-12) 0;
  }
  .class-tasks-inbox-task-item-header {
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-header-status {
    width: var(--t-space-12);
    height: var(--t-space-12);
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-8);
    padding: var(--t-space-8) 0;
  }
}
@media (min-width: 600px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-8);
    border-radius: var(--t-br-large);
    padding: var(--t-space-24);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-16) 0;
  }
  .class-tasks-inbox-task-item-header {
    gap: var(--t-space-8);
  }
  .class-tasks-inbox-task-item-header-status {
    width: var(--t-space-16);
    height: var(--t-space-16);
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-10);
    padding: var(--t-space-10) 0;
  }
}
@media (min-width: 1200px) {
  .class-tasks-inbox-task-item {
    gap: var(--t-space-16);
  }
  .class-tasks-inbox-task-item-spacer {
    margin: var(--t-space-24) 0;
  }
  .class-tasks-inbox-task-item-audio-responses-wrapper {
    gap: var(--t-space-12);
    padding: var(--t-space-12) 0;
  }
}
</style>

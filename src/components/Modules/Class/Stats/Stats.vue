<template>
  <!-- Page Content -->
  <template v-if="!computedLoading">
    <div class="class-tasks-inbox-wrapper">
      <div class="class-tasks-inbox-header-wrapper">
        <h2 class="h2">Your Scores</h2>
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
          <template v-for="_task in filteredTasksList" :key="_task.id">
            <div class="task-item">
              <!-- Task Heading and Topic -->
              <div class="task-content">
                <h3 class="task-heading">{{ _task.title }}</h3>
                <p class="task-topic">{{ _task.topicName }}</p>

                <!-- Star Rating Section -->
                <div class="task-controls">
                  <!-- View Feedback Button -->
                  <button
                    class="feedback-btn"
                    @click="toggleFeedback(_task.id)"
                  >
                    {{ _task.showFeedback ? "Hide Feedback" : "View Feedback" }}
                  </button>
                  <div class="stars">
                    <span
                      v-for="index in 5"
                      :key="index"
                      class="star"
                      :class="{ filled: index <= _task.rating }"
                    >
                      ★
                    </span>
                  </div>
                </div>
              </div>

              <!-- Feedback Section (Expandable Dropdowns) -->
              <div class="task-feedback" v-if="_task.showFeedback">
                <!-- Teacher Feedback -->
                <div class="feedback-section">
                  <h4
                    @click="toggleDropdown('teacher', _task.id)"
                    class="feedback-heading"
                  >
                    Teacher Feedback
                  </h4>
                  <div
                    v-if="_task.showTeacherFeedback"
                    class="feedback-content"
                  >
                    <p>
                      {{
                        _task.teacherFeedback || "No teacher feedback available"
                      }}
                    </p>
                  </div>
                </div>

                <!-- AI Feedback -->
                <div class="feedback-section">
                  <h4
                    @click="toggleDropdown('ai', _task.id)"
                    class="feedback-heading"
                  >
                    AI Feedback
                  </h4>
                  <div v-if="_task.showAiFeedback" class="feedback-content">
                    <p>{{ _task.aiFeedback || "No AI feedback available" }}</p>
                  </div>
                </div>
              </div>
            </div>
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
import { TalkieLoader, TalkieSelectGroup } from "@/components/UICore";
import { ClassService, TaskService } from "@/api/services";
import authUser from "@/utils/helpers/auth";
import topicTypes from "@/utils/constants/topicTypes";

export default {
  name: "TasksInbox",
  components: {
    TalkieLoader,
    TalkieSelectGroup,
  },
  data() {
    return {
      user: {},
      classId: null,
      tasksList: [],
      currentTopicFilter: null, // Add topic filter state
      loading: false,
      topicsGrouped: [],
    };
  },
  computed: {
    computedLoading() {
      return this.loading;
    },
    filteredTasksList() {
      // Filter tasks based on the selected topic
      if (this.currentTopicFilter) {
        return this.tasksList.filter(
          (task) => task.topicName === this.currentTopicFilter
        );
      }
      return this.tasksList;
    },
  },
  async created() {
    this.loading = true;

    const user = authUser.getUser();
    this.user = user;

    const classId =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;

    if (!classId) return this.$router.push("/404");
    this.classId = classId;

    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    const tasksList = await this.getClassTasks(classId);
    if (!tasksList) return this.$router.push("/404");

    const inboxItems = await this.getMyInbox();
    if (!inboxItems) return this.$router.push("/404");

    // Map inbox items to include ratings for star display and feedback
    const transformedInboxItems = inboxItems.map((x) => ({
      id: x?.id,
      title: x?.title,
      topicName: x?.topic?.name || "No topic available",
      rating: x?.rating || 0,
      teacherFeedback: x?.teacherFeedback || "",
      aiFeedback: x?.aiFeedback || "",
      showFeedback: false,
      showTeacherFeedback: false,
      showAiFeedback: false,
    }));

    this.tasksList = transformedInboxItems;

    // Group topics for the filter dropdown
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    this.topicsGrouped = [
      {
        title: capitalize(topicTypes.ADVANCED),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.ADVANCED)
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.INTERMEDIATE),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.INTERMEDIATE)
          ?.map((x) => x?.name),
      },
      {
        title: capitalize(topicTypes.BEGINNER),
        items: classDetails?.topics
          ?.filter((x) => x?.type === topicTypes.BEGINNER)
          ?.map((x) => x?.name),
      },
    ];

    this.loading = false;
  },

  methods: {
    handleTopicFilterChange(e) {
      const selectedTopic = e.target.value.trim();
      this.currentTopicFilter = selectedTopic;
    },
    toggleFeedback(taskId) {
      const task = this.tasksList.find((t) => t.id === taskId);
      if (task) {
        task.showFeedback = !task.showFeedback;
      }
    },
    toggleDropdown(type, taskId) {
      const task = this.tasksList.find((t) => t.id === taskId);
      if (task) {
        if (type === "teacher") {
          task.showTeacherFeedback = !task.showTeacherFeedback;
        } else if (type === "ai") {
          task.showAiFeedback = !task.showAiFeedback;
        }
      }
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

<style scoped>
.task-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.task-content {
  margin-bottom: 10px;
}

.task-heading {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.task-topic {
  font-size: 14px;
  color: #555;
}

.task-controls {
  display: flex;
  margin-top: -3%;
  align-items: center;
  justify-content: flex-end;
}

.stars {
  display: flex;
  align-items: right;
}

.star {
  font-size: 24px;
  color: #d3d3d3; /* Default color for unfilled stars */
}

.star.filled {
  color: #ffc107; /* Gold color for filled stars */
}

.feedback-btn {
  background-color: #ffc107;
  color: #fff;
  border: none;
  margin-top: 1%;
  margin-right: 1%;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.feedback-btn:hover {
  background-color: #0056b3;
}

.task-feedback {
  margin-top: 10px;
  background-color: #f0f8ff;
  padding: 10px;
  border-radius: 5px;
}

.feedback-section {
  margin-top: 10px;
}

.feedback-heading {
  font-size: 16px;
  /* font-weight: */
}
</style>

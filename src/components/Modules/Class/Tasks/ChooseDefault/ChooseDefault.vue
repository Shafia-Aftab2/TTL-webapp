<template>
  <div class="class-tas-choose-default-wrapper">
    <talkie-loader :size="'large'" v-if="loading" />
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import { TaskService } from "@/api/services";
import TaskTypes from "@/utils/constants/taskTypes";

export default {
  name: "ClassTaskChooseDefault",
  components: {
    TalkieLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get class id from params
    const classId = this?.$route?.params?.classId;

    // class tasks (+ failure case)
    const classTasks = await this.getClassTasks(classId);
    if (!classTasks) return this.$router.push(`/classes/${classId}`);

    // select first task (+ failure case)
    const firstClassId =
      classTasks?.results?.length > 0 ? classTasks?.results[0]?.id : null;
    if (!firstClassId) return this.$router.push(`/classes/${classId}`);

    // update page state
    this.loading = false;

    // redirect to task
    this.$router.push(`/classes/${classId}/tasks/${firstClassId}`);
  },
  methods: {
    async getClassTasks(id) {
      const query = { type: TaskTypes.QUESTION_ANSWER };

      const response = await TaskService.QueryClassTasks(id, query).catch(
        () => null
      );

      return response?.data || null;
    },
  },
};
</script>

<style scoped>
.class-tas-choose-default-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
</style>

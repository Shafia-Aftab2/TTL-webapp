<template>
  <div class="teachers-class-join-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="teachers-class-join-content-wrapper">
        <h3 class="h3" v-if="isJoined">
          You are now a member of
          <a class="teachers-class-join-content-class-name">
            {{ classDetails.name }}
          </a>
        </h3>
        <h3 class="h3" v-if="!isJoined">Could not join class..!</h3>

        <talkie-button>Go To Class</talkie-button>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="teachers-class-join-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>
  </div>
</template>

<script>
import { TalkieLoader, TalkieButton } from "@/components/UICore";
import { ClassService } from "@/api/services";

export default {
  name: "ClassJoin",
  components: {
    TalkieLoader,
    TalkieButton,
  },
  data() {
    return {
      loading: false,
      isJoined: false,
      classId: null,
      classDetails: {},
    };
  },
  async created() {
    // get class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // init join class sequence
    await this.handleClassJoinSequence();
  },
  methods: {
    async handleClassJoinSequence() {
      // update page state
      this.loading = true;

      // api call
      const response = await ClassService.JoinAsStudent(this.classId).catch(
        () => null
      );

      // failure case
      if (!response) {
        this.isJoined = false;
        this.loading = false;
        return;
      }

      // success case
      const classDetails = response.data;
      this.classDetails = {
        id: classDetails.id,
        name: classDetails.name,
      };
      this.isJoined = true;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.teachers-class-join-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
  transition: 0.2s ease;
  min-height: 80vh;
}
.teachers-class-join-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.teachers-class-join-content-class-name {
  color: var(--t-secondary);
}
.teachers-class-join-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-class-join-wrapper {
    gap: var(--t-space-18);
  }
  .teachers-class-join-content-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 600px) {
  .teachers-class-join-wrapper {
    gap: var(--t-space-24);
  }
  .teachers-class-join-content-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .teachers-class-join-wrapper {
    gap: var(--t-space-36);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

<template>
  <div class="class-join-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <div class="class-join-content-wrapper">
        <h3 class="h3" v-if="isJoined">
          You are now a member of
          <a class="class-join-content-class-name" :href="classDetails.link">
            {{ classDetails.name }}
          </a>
        </h3>
        <h3 class="h3" v-if="!isJoined">Could not join class..!</h3>

        <talkie-button :onClick="handleRedirection">
          {{ isJoined ? `Go To Class` : `Try Again` }}
        </talkie-button>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="class-join-loading-wrapper">
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
    handleRedirection() {
      this.$router.push(
        `/classes/${this.classId}${this.isJoined ? "" : "/join"}`
      );
    },
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
        link: `/classes/${classDetails.id}`,
      };
      this.isJoined = true;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.class-join-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
  transition: 0.2s ease;
  min-height: 80vh;
}
.class-join-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.class-join-content-class-name {
  color: var(--t-secondary);
}
.class-join-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-join-wrapper {
    gap: var(--t-space-18);
  }
  .class-join-content-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 600px) {
  .class-join-wrapper {
    gap: var(--t-space-24);
  }
  .class-join-content-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .class-join-wrapper {
    gap: var(--t-space-36);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

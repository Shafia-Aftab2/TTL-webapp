<template>
  <div class="class-join-link-wrapper">
    <!-- Join New Class -->
    <template v-if="!computedPageLoading">
      <div
        class="class-join-link-content-wrapper class-join-link-content-centered-wrapper"
      >
        <h3 class="h3" v-if="isJoined">
          You are now a member of
          <a
            class="class-join-link-content-class-name"
            :href="classDetails.link"
          >
            {{ classDetails.name }}
          </a>
        </h3>
        <h3 class="h3" v-if="!isJoined">Could not join class..!</h3>

        <talkie-button :onClick="handleCTAButtonClick">
          {{ isJoined ? `Go To Class Inbox` : `Try Again` }}
        </talkie-button>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="computedPageLoading">
      <div class="class-join-link-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>
  </div>
</template>

<script>
import { TalkieLoader, TalkieButton } from "@/components/UICore";
import { notifications } from "@/components/UIActions";
import { ClassService, UserService } from "@/api/services";
import authUser from "@/utils/helpers/auth";

export default {
  name: "ClassJoinLink",
  components: {
    TalkieLoader,
    TalkieButton,
  },
  data() {
    return {
      pageLoading: false,
      isJoined: false,
      classId: null,
      classDetails: {},
    };
  },
  computed: {
    computedPageLoading() {
      return this.pageLoading;
    },
  },
  async created() {
    // get class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // init join class sequence
    await this.handleClassJoinSequence();
  },
  methods: {
    handleCTAButtonClick() {
      this.$router.push(
        this.isJoined ? `/classes/tasks/inbox` : `/classes/${this.classId}/join`
      );
    },
    async getUserProfile() {
      const response = await UserService.GetMyProfile().catch();

      return response?.data || null;
    },
    async handleClassJoinSequence() {
      // update page state
      this.pageLoading = true;

      // api call (join class)
      const responseJoin = await ClassService.JoinAsStudent(this.classId).catch(
        () => null
      );

      // failure case
      if (!responseJoin) {
        this.isJoined = false;
        this.pageLoading = false;
        return;
      }

      // api call (user profile)
      const responseProfile = await this.getUserProfile();

      // failure case
      if (!responseProfile) {
        this.isJoined = false;
        this.pageLoading = false;
        return;
      }

      // success case
      const expires = (date) => ({ expires: new Date(date) });
      const nextDay = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      authUser.setUser(responseProfile, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
      const classDetails = responseJoin.data;
      this.classDetails = {
        id: classDetails.id,
        name: classDetails.name,
        link: `/classes/${classDetails.id}`,
      };
      this.isJoined = true;
      this.pageLoading = false;
    },
  },
};
</script>

<style scoped>
.class-join-link-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  transition: 0.2s ease;
  text-align: center;
  margin-top: var(--t-space-36);
}
.class-join-link-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.class-join-link-content-centered-wrapper {
  padding: var(--t-space-50);
}
.class-join-link-content-class-name {
  color: var(--t-secondary);
}
.class-join-link-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-join-link-wrapper {
    gap: var(--t-space-18);
  }
  .class-join-link-content-centered-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 600px) {
  .class-join-link-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24);
  }
  .class-join-link-content-centered-wrapper {
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .class-join-link-wrapper {
    gap: var(--t-space-36);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

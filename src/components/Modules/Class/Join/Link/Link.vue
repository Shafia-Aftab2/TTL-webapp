<template>
  <div class="class-join-link-wrapper">
    <!-- Class Already Joined -->
    <template v-if="classAlreadyJoined">
      <div
        class="class-join-link-content-wrapper class-join-link-content-centered-wrapper"
      >
        <h3 class="h3">
          You are already a member of
          <router-link
            class="class-join-link-content-class-name"
            :to="classDetails.link"
          >
            {{ classDetails.name }}
          </router-link>
        </h3>

        <talkie-button :onClick="handleCTAButtonClick">
          Go To Class Inbox
        </talkie-button>
      </div>
    </template>

    <!-- Join New Class -->
    <template
      v-if="
        !classAlreadyJoined && !requiredClassIdToLeave && !computedPageLoading
      "
    >
      <div
        class="class-join-link-content-wrapper class-join-link-content-centered-wrapper"
      >
        <h3 class="h3" v-if="isJoined">
          You are now a member of
          <router-link
            class="class-join-link-content-class-name"
            :to="classDetails.link"
          >
            {{ classDetails.name }}
          </router-link>
        </h3>
        <h3 class="h3" v-if="!isJoined">Could not join class..!</h3>

        <talkie-button :onClick="handleCTAButtonClick">
          {{ isJoined ? `Go To Class Inbox` : `Try Again` }}
        </talkie-button>
      </div>
    </template>

    <!-- Leave Existing Class -->
    <template
      v-if="
        !classAlreadyJoined && requiredClassIdToLeave && !computedPageLoading
      "
    >
      <h2 class="h2">Leave {{ classToLeaveDetails?.name }}</h2>
      <div
        class="class-join-link-content-wrapper class-join-link-content-card-wrapper"
      >
        <h3 class="h3">Are you sure?</h3>
        <p class="p">
          It looks like you’ve been sent another invite link to join a different
          class. By joining a new class, all of your recordings will be deleted.
          Remember, you can’t undo this action.
        </p>
        <talkie-alert
          v-if="
            requiredClassIdToLeaveStatus?.type &&
            requiredClassIdToLeaveStatus?.message
          "
          :variant="requiredClassIdToLeaveStatus?.type"
          :text="requiredClassIdToLeaveStatus?.message"
        />
        <talkie-button :onClick="handleJoinNewClassClick">
          Join the new class
        </talkie-button>
      </div>
      <a class="class-join-link-content-undo-text" @click="handleBackClick">
        No, wait! I clicked the link by mistake.
      </a>
    </template>

    <!-- Load wrapper -->
    <template v-if="computedPageLoading">
      <div class="class-join-link-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieLoader,
  TalkieButton,
  TalkieAlert,
  TalkieBackDropLoader,
} from "@/components/UICore";
import { ClassService, UserService } from "@/api/services";
import authUser from "@/utils/helpers/auth";

export default {
  name: "ClassJoinLink",
  components: {
    TalkieLoader,
    TalkieButton,
    TalkieAlert,
    TalkieBackDropLoader,
  },
  data() {
    return {
      pageLoading: false,
      backdropLoading: false,
      isJoined: false,
      classAlreadyJoined: false,
      classId: null,
      classDetails: {},
      requiredClassIdToLeave: null,
      requiredClassIdToLeaveStatus: {
        type: null,
        message: null,
      },
      classToLeaveDetails: {},
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

    // get user data
    const user = authUser.getUser();

    // check if user has joined a class
    const joinedClassId =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;

    // handle if class is already joined
    if (joinedClassId === classId) {
      this.pageLoading = true;
      const classDetails = await this.getClassDetails(classId);
      this.classDetails = classDetails;
      this.classAlreadyJoined = true;
      this.pageLoading = false;
      return;
    }

    // handle join sequence if no class joined
    if (!joinedClassId) {
      await this.handleClassJoinSequence();
      return;
    }

    // handle leave if already joined a class
    this.pageLoading = true;
    this.requiredClassIdToLeave = joinedClassId;
    const classToLeaveDetails = await this.getClassDetails(
      this.requiredClassIdToLeave
    );
    this.classToLeaveDetails = classToLeaveDetails;
    this.pageLoading = false;
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    },
    handleCTAButtonClick() {
      this.$router.push(
        this.isJoined || this.classAlreadyJoined
          ? `/classes/tasks/inbox`
          : `/classes/${this.classId}/join`
      );
    },
    async getUserProfile() {
      const response = await UserService.GetMyProfile().catch();

      return response?.data || null;
    },
    async getClassDetails(classId) {
      const response = await ClassService.GetDetails(classId).catch();

      return response?.data || null;
    },
    async updateUserProfile() {
      // api call (user profile)
      const responseProfile = await this.getUserProfile();

      // failure case
      if (!responseProfile) return false;

      // success case
      const expires = (date) => ({ expires: new Date(date) });
      const nextDay = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      authUser.setUser(responseProfile, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
      return true;
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
    async handleJoinNewClassClick() {
      // update page state
      this.backdropLoading = true;
      this.requiredClassIdToLeaveStatus = {
        type: null,
        message: null,
      };

      // api call (leave class)
      const responseLeave = await ClassService.LeaveAsStudent(
        this.requiredClassIdToLeave
      ).catch(() => null);

      // failure case
      if (!responseLeave) {
        this.backdropLoading = false;
        this.requiredClassIdToLeaveStatus = {
          type: "error",
          message: "Failed To Leave Existing Class..!",
        };
        return;
      }

      // update user profile
      const isProfileUpdated = await this.updateUserProfile();

      // failure case
      if (!isProfileUpdated) {
        this.backdropLoading = false;
        this.requiredClassIdToLeaveStatus = {
          type: "error",
          message: "Failed To Leave Existing Class. Please Try Again..!",
        };
        return;
      }

      // success case
      this.backdropLoading = false;
      this.requiredClassIdToLeaveStatus = {
        type: null,
        message: null,
      };
      this.requiredClassIdToLeave = null;
      this.classToLeaveDetails = null;
      await this.handleClassJoinSequence();
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
.class-join-link-content-card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--t-white);
}
.class-join-link-content-class-name {
  color: var(--t-secondary);
}
.class-join-link-loading-wrapper {
  margin: auto;
}
.class-join-link-content-undo-text {
  color: var(--t-black);
}
.class-join-link-content-undo-text:visited,
.class-join-link-content-undo-text:hover {
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-join-link-wrapper {
    gap: var(--t-space-18);
  }
  .class-join-link-content-centered-wrapper {
    gap: var(--t-space-16);
  }
  .class-join-link-content-card-wrapper {
    border-radius: var(--t-br-large);
    width: 100%;
    padding: var(--t-space-48) var(--t-space-24);
    gap: var(--t-space-36);
  }
  .class-join-link-content-undo-text {
    font-size: calc(var(--t-fs-small) * 0.95);
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
  .class-join-link-content-card-wrapper {
    border-radius: var(--t-br-large);
    width: 100%;
    padding: var(--t-space-50);
    gap: var(--t-space-24);
  }
  .class-join-link-content-undo-text {
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 900px) {
  .class-join-link-wrapper {
    gap: var(--t-space-36);
  }
  .class-join-link-content-card-wrapper {
    border-radius: var(--t-br-large);
    width: 90%;
    padding: var(--t-space-70);
    gap: var(--t-space-36);
  }
  .class-join-link-content-undo-text {
    font-size: var(--t-fs-body);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}
</style>

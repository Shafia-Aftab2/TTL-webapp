<template>
  <!-- Content Wrapper -->
  <div class="class-stats-wrapper" v-if="!computedPageLoading">
    <div class="class-stats-header-wrapper">
      <h2 class="h2">My Stats</h2>
    </div>

    <div class="class-stats-header-student-wrapper">
      <span
        v-html="userStats?.image"
        v-if="userStats?.image"
        class="class-stats-header-student-avatar"
      >
      </span>
      <h4 class="h4" v-if="userStats?.name">
        {{ userStats?.name?.split(" ")[0] }}
      </h4>
      <h5 class="h5" v-if="userStats?.className">
        {{ userStats?.className }}
      </h5>
    </div>

    <div class="class-stats-content-wrapper">
      <div class="class-stats-points-content-wrapper">
        <h5 class="h5">Total Number of points</h5>
        <h3 class="h3 class-stats-points">{{ userStats?.points }}</h3>
      </div>
      <div class="class-stats-points-content-wrapper">
        <h5 class="h5">Total Number of quiz attempts</h5>
        <h3 class="h3 class-stats-points">{{ userStats?.attemptedQuizes }}</h3>
      </div>
      <talkie-button> View Leaderboard </talkie-button>
      <talkie-button :onClick="handleHomeRedirect">Go Back </talkie-button>
    </div>
  </div>

  <!-- Load Wrapper -->
  <div class="class-manage-load-wrapper" v-if="computedPageLoading">
    <talkie-loader :size="'large'" />
  </div>
</template>

<script>
import { TalkieButton, TalkieLoader } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import { ClassService, ResponseService } from "@/api/services";

export default {
  name: "ClassStats",
  components: { TalkieButton, TalkieLoader },
  data() {
    return {
      userStats: {
        name: null,
        image: null,
        className: null,
        points: null,
        attemptedQuizes: null,
      },
      classDetails: {},
      classId: null,
      pageLoading: false,
    };
  },
  computed: {
    computedPageLoading() {
      return this.pageLoading;
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // get auth user
    const user = authUser.getUser();

    // class id from user data
    const classId =
      user?.schools?.length > 0 && user?.schools[0]?.classes?.length > 0
        ? user?.schools[0]?.classes[0]
        : null;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // get student stats  (+ failure case)
    const myStats = await this.getMyStats();
    if (!myStats) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails.id,
      name: classDetails.name,
      langugage: classDetails.langugage,
    };
    this.userStats = {
      name: user?.name,
      points: myStats?.totalScores,
      attemptedQuizes: myStats?.totalRespones,
      image: user?.image
        ? generateAvatar(user?.image?.split("-")[1], user?.image)
        : null,
      className: classDetails.name,
    };
    this.pageLoading = false;
  },
  methods: {
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getMyStats() {
      const query = { isPracticeMode: true };

      const response = await ResponseService.GetMyStats(
        this.classId,
        query
      ).catch(() => null);

      return response?.data || null;
    },
    handleHomeRedirect() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.class-stats-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  margin-bottom: calc(var(--t-space-70) * 2);
  background-color: var(--t-white);
}
.class-stats-header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.class-stats-header-student-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-12);
}
.class-stats-header-student-avatar {
  height: var(--student-avatar);
  width: var(--student-avatar);
  border-style: solid;
  border-color: var(--t-primary);
  background-color: var(--t-gray-125);
  border-radius: 50%;
}
.class-stats-content-wrapper {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.class-stats-points-content-wrapper {
  border: var(--t-space-1) solid var(--t-gray-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.class-stats-points {
  color: var(--t-secondary);
}
/* Responsive variants */
@media (max-width: 599px) {
  .class-stats-wrapper {
    max-width: 100%;
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.5);
    border-width: var(--t-space-2);
  }
  .class-stats-content-wrapper {
    gap: var(--t-space-30);
  }
  .class-stats-points-content-wrapper {
    border-radius: var(--t-br-small);
    padding: var(--t-space-16) var(--t-space-24);
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .class-stats-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-10);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.65);
    border-width: var(--t-space-3);
  }
  .class-stats-content-wrapper {
    gap: var(--t-space-24);
  }
  .class-stats-points-content-wrapper {
    border-radius: var(--t-br-medium);
    gap: var(--t-space-16);
    padding: var(--t-space-16) var(--t-space-50);
  }
}
@media (min-width: 1200px) {
  .class-stats-wrapper {
    max-width: 90%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
    gap: calc(var(--t-space-12) * 2);
  }
  .class-stats-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-stats-header-student-wrapper {
    gap: var(--t-space-12);
  }
  .class-stats-header-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.75);
  }
  .class-stats-points-content-wrapper {
    padding: var(--t-space-24) calc(var(--t-space-70) * 1.5);
  }
}
</style>

<template>
  <!-- Content Wrapper -->
  <div class="class-leader-wrapper" v-if="!computedPageLoading">
    <div class="class-leader-header-wrapper">
      <div class="class-leader-header-details-wrapper">
        <h2 class="h2" v-if="classDetails.name">
          <a
            :href="computedClassHomeLink"
            class="class-leader-header-details-class-name-link"
          >
            {{ classDetails.name }}
          </a>
        </h2>
      </div>
    </div>
    <div
      class="class-leader-header-details-top-student-wrapper"
      v-if="classLeaderboard.length > 0"
    >
      <span
        v-html="classLeaderboard[0]?.image"
        v-if="classLeaderboard[0]?.image"
        class="class-leader-header-details-top-student-avatar"
      >
      </span>
      <h4 class="h4" v-if="classLeaderboard[0]?.name">
        {{ classLeaderboard[0]?.name?.split(" ")[0] }}
      </h4>
      <h5 class="h5" v-if="classLeaderboard[0]?.points">
        {{ classLeaderboard[0]?.points }}
      </h5>
      <img
        :src="require(`@/assets/images/trophy.png`)"
        class="class-leader-header-details-top-student-trophy-image"
      />
    </div>
    <div class="class-leader-content-wrapper">
      <talkie-student-card
        v-for="_student in classLeaderboard"
        :key="_student"
        :mode="'points'"
        :customClass="'class-leader-content-card'"
        :studentAvatar="_student.image"
        :studentName="_student.name"
        :studentPoints="_student.points"
      />
    </div>
  </div>

  <!-- Load Wrapper -->
  <div class="class-manage-load-wrapper" v-if="computedPageLoading">
    <talkie-loader :size="'large'" />
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import { TalkieStudentCard } from "@/components/SubModules/Cards";
import { ClassService } from "@/api/services";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "ClassLeaderboard",
  components: { TalkieLoader, TalkieStudentCard },
  data() {
    return {
      classId: null,
      pageLoading: false,
      classDetails: {},
      classLeaderboard: [],
    };
  },
  computed: {
    computedClassHomeLink() {
      return `${window.location.origin}/classes/${this.classId}`;
    },
    computedPageLoading() {
      return this.pageLoading;
    },
  },
  async created() {
    // update page state
    this.pageLoading = true;

    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // class details (+ failure case)
    const classDetails = await this.getClassDetails(classId);
    if (!classDetails) return this.$router.push("/404");

    // get topics list (+ failure case)
    const classLeaderboard = await this.getClassLeaderboard();
    if (!classLeaderboard) return this.$router.push("/404");

    // success case
    this.classDetails = {
      id: classDetails.id,
      name: classDetails.name,
      langugage: classDetails.langugage,
    };
    this.classLeaderboard = classLeaderboard
      ?.map((x) => ({
        id: x?.id,
        name: x?.name,
        image: x?.image
          ? generateAvatar(x?.image?.split("-")[1], x?.image)
          : null,
        points: x?.totalScores.toString(),
      }))
      ?.sort(function (a, b) {
        return b?.points - a?.points;
      });
    this.pageLoading = false;
  },
  methods: {
    async getClassDetails(id) {
      const response = await ClassService.GetDetails(id).catch(() => null);

      return response.data || null;
    },
    async getClassLeaderboard() {
      const response = await ClassService.GetLeaderboard(this.classId).catch(
        () => null
      );

      return response.data || null;
    },
  },
};
</script>

<style>
.class-leader-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  margin-bottom: var(--t-space-36);
  background-color: var(--t-white);
}
.class-leader-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-leader-header-details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.class-leader-header-details-class-name-link,
.class-leader-header-details-class-name-link:visited {
  text-decoration: none;
  color: var(--t-black);
}
.class-leader-header-details-top-student-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-12);
}
.class-leader-header-details-top-student-avatar {
  height: var(--student-avatar);
  width: var(--student-avatar);
  border-style: solid;
  border-color: var(--t-primary);
  background-color: var(--t-gray-125);
  border-radius: 50%;
}
.class-leader-header-details-top-student-trophy-image {
  height: var(--student-trophy-image);
  width: var(--student-trophy-image);
}
.class-leader-header-details-update-form-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-leader-header-details-tab-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-leader-header-details-manage-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
}
.class-leader-content-wrapper {
  flex-direction: column;
  display: flex;
  justify-content: center;
}
.class-leader-content-card {
  border: var(--t-space-1) solid var(--t-gray-75);
}
.class-leader-modal-invite-students {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-30);
}
.class-leader-modal-invite-students-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-5);
  text-align: center;
}
.class-leader-modal-invite-students-input-wrapper,
.class-leader-modal-invite-students-input-wrapper > div {
  min-width: 80% !important;
}
.class-leader-load-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  margin-top: var(--t-space-36);
  margin-bottom: var(--t-space-36);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-leader-wrapper {
    max-width: 100%;
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-leader-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-leader-header-details-top-student-wrapper {
    gap: var(--t-space-8);
  }
  .class-leader-header-details-top-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.5);
    border-width: var(--t-space-2);
  }
  .class-leader-header-details-top-student-trophy-image {
    --student-trophy-image: calc(var(--t-space-50) * 1.25);
  }
  .class-leader-header-details-update-form-wrapper {
    gap: var(--t-space-5);
  }
  .class-leader-header-details-tab-options-wrapper {
    gap: var(--t-space-8);
  }
  .class-leader-header-details-manage-options-wrapper {
    gap: var(--t-space-3);
  }
  .class-leader-content-wrapper {
    gap: var(--t-space-8);
  }
}
@media (min-width: 600px) {
  .class-leader-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
    gap: calc(var(--t-space-16) * 2);
  }
  .class-leader-header-details-wrapper {
    gap: var(--t-space-8);
  }
  .class-leader-header-details-top-student-wrapper {
    gap: var(--t-space-10);
  }
  .class-leader-header-details-top-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.65);
    border-width: var(--t-space-3);
  }
  .class-leader-header-details-top-student-trophy-image {
    --student-trophy-image: calc(var(--t-space-50) * 1.35);
  }
  .class-leader-header-details-update-form-wrapper {
    gap: var(--t-space-10);
  }
  .class-leader-header-details-tab-options-wrapper {
    gap: var(--t-space-8);
  }
  .class-leader-header-details-manage-options-wrapper {
    gap: var(--t-space-5);
  }
  .class-leader-content-wrapper {
    gap: var(--t-space-8);
  }
}
@media (min-width: 1200px) {
  .class-leader-wrapper {
    max-width: 90%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
    gap: calc(var(--t-space-12) * 2);
  }
  .class-leader-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .class-leader-header-details-top-student-wrapper {
    gap: var(--t-space-12);
  }
  .class-leader-header-details-top-student-avatar {
    --student-avatar: calc(var(--t-space-50) * 1.75);
  }
  .class-leader-header-details-top-student-trophy-image {
    --student-trophy-image: calc(var(--t-space-50) * 1.5);
  }
  .class-leader-header-details-update-form-wrapper {
    gap: var(--t-space-12);
  }
  .class-leader-header-details-tab-options-wrapper {
    gap: var(--t-space-12);
  }
  .class-leader-content-wrapper {
    gap: var(--t-space-12);
  }
}
</style>

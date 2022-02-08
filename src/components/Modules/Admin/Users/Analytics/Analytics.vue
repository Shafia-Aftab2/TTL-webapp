<template>
  <div class="admin-users-analytics-wrapper">
    <template v-if="!loading">
      <!-- Header -->
      <div class="admin-users-analytics-header-wrapper">
        <img
          v-if="!userDetails.image"
          :src="require(`@/assets/images/person-placeholder-image.png`)"
          class="admin-users-analytics-header-image"
        />
        <span
          v-if="userDetails.image"
          v-html="userDetails.image"
          class="admin-users-analytics-header-image"
        >
        </span>
        <div class="admin-users-analytics-header-info-wrapper">
          <h2 class="h2" v-if="userDetails.name">{{ userDetails.name }}</h2>
          <h5 class="h5" v-if="userDetails.schoolName">
            {{ userDetails.schoolName }}
          </h5>
        </div>
      </div>

      <!-- Body -->
      <div
        :class="[
          'admin-users-analytics-content-wrapper',
          'admin-users-analytics-content-wrapper-multi-col',
        ]"
      >
        <template v-if="userAnalytics && userAnalytics.length > 0">
          <template v-for="_userAnalytic in userAnalytics" :key="_userAnalytic">
            <div class="admin-users-analytics-content-item">
              <h2 class="h2" v-if="_userAnalytic.descripter">
                {{ _userAnalytic.descripter }}
              </h2>
              <p class="p" v-if="_userAnalytic.summary">
                {{ _userAnalytic.summary }}
              </p>
            </div>
          </template>
        </template>
      </div>

      <!-- Footer -->
      <talkie-button :onClick="handleUserRemoveClick" :loading="isRemovingUser">
        Remove User
      </talkie-button>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="admin-users-analytics-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>

    <!-- Backdrop load wrapper -->
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieLoader,
  TalkieBackDropLoader,
  TalkieButton,
} from "@/components/UICore";
import { UserService } from "@/api/services";
import { notifications } from "@/components/UIActions";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "AdminUserDetails",
  components: {
    TalkieButton,
    TalkieLoader,
    TalkieBackDropLoader,
  },
  data() {
    return {
      userId: null,
      usersList: [],
      userDetails: {},
      userAnalytics: [],
      loading: false,
      backdropLoading: false,
      isRemovingUser: false,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get list of users
    const usersList = await this.getUsersList();
    if (!usersList) return this.$router.push("/404");

    // get the current user id from params
    const userId = this.$route.params.userId;
    this.userId = userId;

    // get user details with id from params
    const userDetails = await this.getUserDetails(userId);
    if (!userDetails) return this.$router.push("/404");

    // get user analytics with id from params
    const userAnalytics = await this.getUserAnalytics(userId);
    if (!userAnalytics) return this.$router.push("/404");

    // success case

    // sidebar data
    const sidebarItems = usersList?.map((x) => ({
      name: x?.name,
      hasRightIcon: true,
      link: `/admin/users/${x?.id}`,
      onClick: () => this.$router.push(`/admin/users/${x?.id}`),
      isActive: this.$route.path === `/admin/users/${x?.id}`,
    }));
    this.handleSidebarMutation({ items: sidebarItems });

    this.usersList = usersList?.map((x) => ({
      id: x?.id,
      name: x?.name,
    }));

    this.userDetails = {
      name: userDetails.name,
      schoolName: userDetails?.schools?.[0]?.name || "",
      image: userDetails?.image
        ? generateAvatar(userDetails?.image?.split("-")[1], userDetails?.image)
        : null,
    };

    this.userAnalytics = [
      {
        descripter: userAnalytics.students || "0",
        summary: "Student(s)",
      },
      {
        descripter: userAnalytics.classes || "0",
        summary: "Class(es)",
      },
      {
        descripter: userAnalytics.questions || "0",
        summary: "Question(s)",
      },
      {
        descripter: userAnalytics.lastLogin ? "Active" : "Inactive",
        summary: `Last Login: ${
          userAnalytics.lastLogin
            ? new Date(userAnalytics.lastLogin)?.toLocaleString()
            : "N/A"
        }`,
      },
    ];

    this.loading = false;
  },
  methods: {
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
    handleSidebarMutation(data) {
      const sidebar = this.$store.state.sidebar;
      const updatedData = {
        hasBackLink: data.hasOwnProperty("hasBackLink")
          ? data.hasBackLink
          : sidebar.hasBackLink,
        items: data.hasOwnProperty("items") ? data.items : sidebar.items,
        checkboxes: data.hasOwnProperty("checkboxes")
          ? data.checkboxes
          : sidebar.checkboxes,
        buttons: data.hasOwnProperty("buttons")
          ? data.buttons
          : sidebar.buttons,
      };

      this.handleStoreMutation(
        "sidebar",
        Object.assign({}, { ...updatedData })
      );
    },
    async handleUserRemoveClick() {
      // update page state
      this.isRemovingUser = true;

      // api call
      const response = await UserService.RemoveUserById(this.userId).catch(
        () => ({ error: "Could not remove user..!" })
      );

      // failure case
      if (response.error) {
        this.isRemovingUser = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.isRemovingUser = false;
      notifications.show("User Removed. Redirecting..!", {
        variant: "success",
        displayIcon: true,
      });
      this.$router.push(`/`);
    },
    async getUsersList() {
      const query = { limit: 1000 };

      const response = await UserService.GetUsersList(query).catch(() => null);

      return response?.data?.results || null;
    },
    async getUserDetails(userId) {
      const response = await UserService.GetUserById(userId).catch(() => null);

      return response?.data || null;
    },
    async getUserAnalytics(userId) {
      const response = await UserService.GetUserAnalytics(userId).catch(
        () => null
      );

      return response?.data || null;
    },
  },
};
</script>

<style scoped>
.admin-users-analytics-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.admin-users-analytics-header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.admin-users-analytics-header-info-wrapper {
  display: flex;
  flex-direction: column;
}
.admin-users-analytics-header-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
}
.admin-users-analytics-content-wrapper {
  display: grid;
}
.admin-users-analytics-content-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--t-white);
  width: 100%;
}
.admin-users-analytics-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-18);
  }
  .admin-users-analytics-header-wrapper {
    gap: var(--t-space-8);
  }
  .admin-users-analytics-header-info-wrapper {
    gap: var(--t-space-3);
  }
  .admin-users-analytics-header-image {
    --image-size: var(--t-space-63);
  }
  .admin-users-analytics-content-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-analytics-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-small);
    padding: var(--t-space-30) var(--t-space-16);
    gap: var(--t-space-5);
  }
}
@media (min-width: 600px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-24);
  }
  .admin-users-analytics-header-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-analytics-header-info-wrapper {
    gap: var(--t-space-5);
  }
  .admin-users-analytics-header-image {
    --image-size: var(--t-space-70);
  }
  .admin-users-analytics-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-analytics-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-30) var(--t-space-24);
    gap: var(--t-space-12);
  }
}
@media (min-width: 900px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-36);
  }
  .admin-users-analytics-header-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-36) var(--t-space-24);
    gap: var(--t-space-16);
  }
}
</style>

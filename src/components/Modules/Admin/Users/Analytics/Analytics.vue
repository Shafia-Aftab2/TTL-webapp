<template>
  <div class="admin-users-analytics-wrapper">
    <template v-if="!loading">
      <!-- Header -->
      <div class="admin-users-analytics-header-wrapper">
        <img
          :src="require(`@/assets/images/person-placeholder-image.png`)"
          class="admin-users-analytics-header-image"
        />
        <div class="admin-users-analytics-header-info-wrapper">
          <h2 class="h2">Mr Bookes</h2>
          <h5 class="h5">Hollyfield Academy</h5>
        </div>
      </div>

      <!-- Body -->
      <div
        :class="[
          'admin-users-analytics-content-wrapper',
          'admin-users-analytics-content-wrapper-multi-col',
        ]"
      >
        <div class="admin-users-analytics-content-item">
          <h2 class="h2">36</h2>
          <p class="p">Students</p>
        </div>
        <div class="admin-users-analytics-content-item">
          <h2 class="h2">2</h2>
          <p class="p">Classes</p>
        </div>
        <div class="admin-users-analytics-content-item">
          <h2 class="h2">9</h2>
          <p class="p">Questions</p>
        </div>
        <div class="admin-users-analytics-content-item">
          <h2 class="h2">Active</h2>
          <p class="p">Last Login: Yesterday</p>
        </div>
      </div>

      <!-- Footer -->
      <talkie-button> Remove User </talkie-button>
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
  TalkieIcon,
  TalkieTab,
  TalkieSelect,
  TalkieModal,
  TalkieLoader,
  TalkieSwitch,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
  TalkieInput,
  TalkieButton,
} from "@/components/UICore";
import {
  TalkieQuestionCard,
  TalkieStudentCard,
} from "@/components/SubModules/Cards";
import { UserService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "AdminUserAnalytics",
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelect,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieButton,
    TalkieLoader,
    TalkieSwitch,
    TalkieBackDropLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
    TalkieInput,
  },
  data() {
    return {
      usersList: [],
      userAnalytics: {},
      loading: false,
      backdropLoading: false,
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get list of users
    const usersList = await this.getUsersList();
    if (!usersList) return this.$router.push("/404");

    // success case
    this.usersList = usersList?.map((x) => ({
      id: x?.id,
      name: x?.name,
    }));
    // sidebar data
    const sidebarItems = usersList?.map((x) => ({
      name: x?.name,
      hasRightIcon: true,
      link: `/admin/users/${x?.id}`,
      onClick: () => this.$router.push(`/admin/users/${x?.id}`),
      isActive: this.$route.path === `/admin/users/${x?.id}`,
    }));
    this.handleSidebarMutation({ items: sidebarItems });

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
    async getUsersList() {
      const query = { limit: 1000 };

      const response = await UserService.GetUsersList(query).catch(() => null);

      return response?.data?.results || null;
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

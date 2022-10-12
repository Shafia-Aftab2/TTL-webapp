<template>
  <div class="admin-users-home-wrapper">
    <!-- Contents -->
    <template v-if="!loading">
      <h2 class="h2">Users</h2>

      <div class="admin-users-home-options-wrapper">
        <div class="admin-users-home-options-tabs-wrapper">
          <p class="p">Filter:</p>
          <template v-for="tabName in tabs" :key="tabName">
            <talkie-tab
              :label="tabName"
              :active="tabName.toLowerCase() === activeTab"
              :onClick="() => handleTabChange(tabName.toLowerCase())"
            />
          </template>
        </div>
        <talkie-input
          :placeholder="'Search name / school / keyword'"
          :customClass="'admin-users-home-options-custom-input'"
          :onChange="handleUsersFilter"
        />
      </div>
      <div class="admin-users-home-options-wrapper">
        <div class="admin-users-home-options-selector">
          <talkie-select
            :placeholder="'Select Users By Role'"
            :options="Object.values(roles)?.map((x) => `${x}s`)"
            :onChange="handleUserRoleChange"
          />
        </div>
      </div>

      <div
        :class="[
          'admin-users-home-content-wrapper',
          'admin-users-home-content-wrapper-single-col',
        ]"
      >
        <template v-if="usersList && usersList.length > 0">
          <template v-for="_user in usersList" :key="_user">
            <template
              v-if="
                selectedUserRole?.length > 0
                  ? _user.role === selectedUserRole
                  : true
              "
            >
              <talkie-student-card
                v-if="
                  ((activeTab === 'free' && !_user.isSubscriber) ||
                    (activeTab === 'paid' && _user.isSubscriber)) &&
                  (currentFilter
                    ? _user?.name?.toLowerCase()?.includes(currentFilter) ||
                      _user?.schoolName?.toLowerCase()?.includes(currentFilter)
                    : true)
                "
                :mode="'info'"
                :studentName="`${_user.name} ${
                  _user.email ? `(${_user.email})` : ''
                }`"
                :studentAvatar="_user.image"
                :studentSchoolName="_user.schoolName"
                :onInfoClick="() => handleUserInfoRedirect(_user?.id)"
              />
            </template>
          </template>
        </template>
      </div>
    </template>

    <!-- Load wrapper -->
    <template v-if="loading">
      <div class="admin-users-home-loading-wrapper">
        <talkie-loader :size="'large'" />
      </div>
    </template>

    <!-- Backdrop load wrapper -->
    <talkie-back-drop-loader v-if="backdropLoading" />
  </div>
</template>

<script>
import {
  TalkieTab,
  TalkieLoader,
  TalkieBackDropLoader,
  TalkieInput,
  TalkieSelect,
} from "@/components/UICore";
import { TalkieStudentCard } from "@/components/SubModules/Cards";
import { UserService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import handleSidebarItemsMutation from "../../_common/mixins/handleSidebarItemsMutation";
import rolesList from "@/utils/constants/roles";

export default {
  name: "AdminUsersHome",
  mixins: [handleSidebarItemsMutation],
  components: {
    TalkieTab,
    TalkieLoader,
    TalkieBackDropLoader,
    TalkieInput,
    TalkieSelect,
    TalkieStudentCard,
  },
  data() {
    return {
      usersList: [],
      loading: false,
      backdropLoading: false,
      activeTab: "free",
      tabs: ["Free", "Paid"],
      currentFilter: "",
      roles: rolesList,
      selectedUserRole: "",
    };
  },
  async created() {
    // update page state
    this.loading = true;

    // get current tab from url
    const tab = this?.$route?.query?.tab;
    if (!tab) URLModifier.addToURL("tab", "free");
    if (["students", "free"].includes(tab)) this.activeTab = tab;

    // get list of users
    const usersList = await this.getUsersList();
    if (!usersList) return this.$router.push("/404");

    this.usersList = usersList
      ?.filter((x) => !x?.isTestUser)
      ?.map((x) => ({
        id: x?.id,
        name: x?.name,
        email: x?.email,
        schoolName: x?.schools?.[0]?.name,
        role: x?.role,
        image: x?.image
          ? generateAvatar(x?.image?.split("-")[1], x?.image)
          : null,
        isSubscriber: !!x?.subscription,
      }));

    this.loading = false;
  },
  methods: {
    handleUserInfoRedirect(userId) {
      this.$router.push(`/admin/users/${userId}`);
    },
    handleUsersFilter(e) {
      this.currentFilter = e.target.value.trim()?.toLowerCase();
    },
    handleTabChange(x) {
      this.activeTab = x?.toLowerCase();
      URLModifier.addToURL("tab", x?.toLowerCase());
    },
    handleUserRoleChange(e) {
      const selectedIndex = e.target.selectedIndex;

      this.selectedUserRole =
        selectedIndex > 0
          ? Object.keys(rolesList)?.[selectedIndex - 1].toLowerCase()
          : "";
    },
    async getUsersList() {
      const query = { limit: 1000 };

      const response = await UserService.GetUsersList(query).catch(() => null);

      return response?.data?.results || null;
    },
  },
};
</script>

<style>
.admin-users-home-options-custom-input {
  border-color: var(--t-gray-75) !important;
}
</style>

<style scoped>
.admin-users-home-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.admin-users-home-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.admin-users-home-header-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-options-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.admin-users-home-options-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.admin-users-home-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-users-home-options-selector > div {
  min-width: 100%;
}
.admin-users-home-content-wrapper {
  display: grid;
}
.admin-users-home-content-error-image {
  height: var(--image-size);
  width: var(--image-size);
  margin: auto;
}
.admin-users-home-content-error-info {
  margin: auto;
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.admin-users-home-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-18);
  }
  .admin-users-home-header-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .admin-users-home-options-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-options-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-home-options-selector {
    min-width: 100%;
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .admin-users-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-24);
  }
  .admin-users-home-header-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .admin-users-home-options-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-options-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-options-selector {
    min-width: 70%;
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .admin-users-home-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-home-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}
@media (min-width: 900px) {
  .admin-users-home-options-selector {
    min-width: 40%;
  }
}
@media (min-width: 900px) {
  .admin-users-home-wrapper {
    gap: var(--t-space-36);
  }
  .admin-users-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .admin-users-home-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .admin-users-home-content-error-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}
</style>

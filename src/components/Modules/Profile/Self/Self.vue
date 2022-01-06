<template>
  <div class="profile-wrapper">
    <div class="profile-info-wrapper">
      <h2 class="h2">Profile Info</h2>
      <!-- <p class="p" style="margin-bottom: 0 !important">Avatar</p> -->
    </div>

    <template v-if="!editMode">
      <div class="profile-fields-wrapper">
        <template v-if="user?.role === rolesList.STUDENT">
          <talkie-input
            :value="user?.firstName"
            :placeholder="'First Name'"
            :customClass="'profile-input'"
            :disabled="true"
          />
          <talkie-input
            :value="user?.lastName"
            :placeholder="'Last Name'"
            :customClass="'profile-input'"
            :disabled="true"
          />
          <talkie-input
            :value="user?.username"
            :placeholder="'Username'"
            :customClass="'profile-input'"
            :disabled="true"
          />
        </template>
        <template v-if="user?.role === rolesList.TEACHER">
          <talkie-input
            :value="user?.name"
            :placeholder="'Name'"
            :customClass="'profile-input'"
            :disabled="true"
          />
          <talkie-input
            :value="user?.displayName"
            :placeholder="'Display Name'"
            :customClass="'profile-input'"
            :disabled="true"
          />
          <talkie-input
            :value="user?.email"
            :placeholder="'Email Address'"
            :customClass="'profile-input'"
            :disabled="true"
          />
        </template>
      </div>
    </template>

    <template v-if="editMode">
      <talkie-form
        :customClass="'profile-fields-wrapper'"
        v-slot="{ errors, triggerFormSubmit }"
        :validationSchema="updateProfileSchema"
        :initialValues="{
          name: user?.name,
          displayName: user?.displayName,
          email: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.username,
        }"
        :onSubmit="handleSubmit"
      >
        <span hidden>
          <!-- TODO: updated these states via a handler -->
          {{ (this.triggerFormSubmission = triggerFormSubmit) }}
        </span>
        <template v-if="user?.role === rolesList.TEACHER">
          <talkie-input
            :name="'name'"
            :placeholder="'Name'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.name ? 'error' : null,
              message: errors.name ? errors.name : null,
            }"
          />
          <talkie-input
            :name="'displayName'"
            :placeholder="'Display Name'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.displayName ? 'error' : null,
              message: errors.displayName ? errors.displayName : null,
            }"
          />
          <talkie-input
            :name="'email'"
            :placeholder="'Email Address'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.email ? 'error' : null,
              message: errors.email ? errors.email : null,
            }"
          />
        </template>
        <template v-if="user?.role === rolesList.STUDENT">
          <talkie-input
            :name="'firstName'"
            :placeholder="'First Name'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.firstName ? 'error' : null,
              message: errors.firstName ? errors.firstName : null,
            }"
          />
          <talkie-input
            :name="'lastName'"
            :placeholder="'Last Name'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.lastName ? 'error' : null,
              message: errors.lastName ? errors.lastName : null,
            }"
          />
          <talkie-input
            :name="'username'"
            :placeholder="'Username'"
            :customClass="'profile-input'"
            :hint="{
              type: errors.username ? 'error' : null,
              message: errors.username ? errors.username : null,
            }"
          />
        </template>

        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          v-if="formStatus.type && formStatus.message"
        />
      </talkie-form>
    </template>

    <div class="profile-options-wrapper">
      <div class="profile-footer" v-if="user?.role === rolesList.TEACHER">
        <a
          class="profile-footer-link"
          v-if="!editMode"
          @click="handleChangePasswordRedirection"
        >
          Change my password
        </a>
      </div>

      <talkie-button
        :size="'medium'"
        v-if="!editMode"
        :onClick="handleEditButtonClick"
      >
        Edit Profile
      </talkie-button>

      <talkie-button
        :size="'medium'"
        v-if="editMode"
        :onClick="triggerFormSubmission"
        :loading="loading"
      >
        Save Changes
      </talkie-button>

      <talkie-button
        :variant="'danger'"
        :size="'medium'"
        v-if="editMode"
        :onClick="handleCancelEditButtonClick"
      >
        Cancel
      </talkie-button>
    </div>
  </div>
</template>

<script>
import {
  TalkieForm,
  TalkieInput,
  TalkieButton,
  TalkieAlert,
} from "@/components/UICore";
import { UserService } from "@/api/services";
import {
  updateTeacherProfileSchema,
  updateStudentProfileSchema,
} from "@/utils/validations/user.validation";
import authUser from "@/utils/helpers/auth";
import { notifications } from "@/components/UIActions";
import rolesList from "@/utils/constants/roles";

export default {
  name: "ProfileSelf",
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
  },
  data() {
    return {
      user: {},
      editMode: false,
      triggerFormSubmission: () => {},
      updateProfileSchema: {},
      rolesList: rolesList,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  created() {
    // get auth user from cookies
    const user = authUser.getUser();
    this.user = {
      schoolName: user?.schools[0]?.name || null,
      displayName: user?.displayName,
      email: user?.email,
      name: user?.name,
      role: user?.role,
      username: user?.username,
    };

    const userFullName = user?.name?.split(" ");
    this.user.firstName = userFullName?.length > 0 ? userFullName[0] : "";
    this.user.lastName =
      userFullName?.shift()?.length > 0 ? userFullName?.join(" ") : "";

    if (user?.role === rolesList.STUDENT) {
      this.updateProfileSchema = updateStudentProfileSchema;
    }
    if (user?.role === rolesList.TEACHER) {
      this.updateProfileSchema = updateTeacherProfileSchema;
    }
  },
  methods: {
    handleChangePasswordRedirection() {
      authUser.deleteUser();
      authUser.deleteAccessToken();
      authUser.deleteRefreshToken();
      this.$router.push("/auth/forgot-password");
    },
    handleEditButtonClick() {
      this.editMode = true;
    },
    handleSaveEditButtonClick() {
      this.editMode = false;
    },
    handleCancelEditButtonClick() {
      this.editMode = false;
    },
    async getUserProfile() {
      const response = await UserService.GetMyProfile().catch();

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
      this.user = {
        schoolName: responseProfile?.schools[0]?.name || null,
        displayName: responseProfile?.displayName,
        email: responseProfile?.email,
        name: responseProfile?.name,
        role: responseProfile?.role,
        username: responseProfile?.username,
      };

      const userFullName = responseProfile?.name?.split(" ");
      this.user.firstName = userFullName?.length > 0 ? userFullName[0] : "";
      this.user.lastName =
        userFullName?.shift()?.length > 0 ? userFullName?.join(" ") : "";

      return true;
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { email, name, firstName, lastName, username, displayName } =
        values;

      // payload
      const payload = {
        ...(this.user?.role === rolesList.TEACHER && {
          name,
          displayName,
          email,
        }),
        ...(this.user?.role === rolesList.STUDENT && {
          name: `${firstName} ${lastName}`,
          username,
        }),
      };

      // api call
      const response = await UserService.UpdateProfile(payload).catch((e) => {
        const errorMap = {
          ["email already exists"]: "Email Already Exists..!",
          ['"name" contains bad word']: "Name should not be unethical..!",
          ['"displayname" contains bad word']:
            "Display name should not be unethical..!",
          ["username already exists"]: "Username already exists..!",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Failed to update profile..!",
        };
      });

      // failure case
      if (response.error) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: response.error,
        };
        return;
      }

      // success case
      this.loading = false;
      this.formStatus = {
        type: null,
        message: null,
      };
      notifications.show("Profile updated successfully..!", {
        variant: "success",
        displayIcon: true,
      });
      await this.updateUserProfile();
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
}
.profile-info-wrapper,
.profile-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
  width: 100%;
}
.profile-fields-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: var(--t-space-12);
}
.profile-input {
  margin: auto;
}
.profile-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.profile-footer-link {
  text-decoration: underline;
}
.profile-footer-link,
.profile-footer-link:hover,
.profile-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .profile-wrapper {
    max-width: 100%;
    gap: var(--t-space-36);
    padding: var(--t-space-32);
    margin-top: var(--t-space-50);
    margin-bottom: var(--t-space-50);
    border-radius: var(--t-br-medium);
  }
  .profile-fields-wrapper {
    width: 100%;
  }
  .profile-input {
    max-width: 100%;
  }
  .profile-footer {
    padding: var(--t-space-24);
  }
  .profile-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .profile-wrapper {
    max-width: 65%;
    gap: var(--t-space-48);
    padding: var(--t-space-48);
    margin-top: var(--t-space-70);
    margin-bottom: var(--t-space-70);
    border-radius: var(--t-br-medium);
  }
  .profile-fields-wrapper {
    width: 80%;
  }
  .profile-input {
    max-width: 100%;
  }
  .profile-footer {
    padding: var(--t-space-16);
  }
  .profile-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .profile-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .profile-input {
    max-width: 85%;
  }
  .profile-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

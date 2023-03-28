<template>
  <div class="profile-wrapper">
    <div class="profile-info-wrapper">
      <h2 class="h2">Profile Info</h2>
      <span v-if="pickedAvatar?.svg" class="profile-avatar" id="avatar-picked">
      </span>
      <span
        v-html="user?.image"
        v-if="user?.image && !pickedAvatar?.svg"
        class="profile-avatar"
        id="user-avatar"
      >
      </span>
      <div class="profile-info-options-wrapper">
        <talkie-chip
          :label="'Pick an avatar'"
          :variant="'neutral'"
          :onClick="handleShowAvatarModal"
          v-if="editMode"
        />
      </div>
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
        <template v-if="user?.role === rolesList.ADMIN">
          <talkie-input
            :value="user?.name"
            :placeholder="'Name'"
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
        <template v-if="user?.role === rolesList.ADMIN">
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

  <!-- Modal Content -->
  <talkie-modal
    :contentPadded="true"
    :closeButton="true"
    :onClose="handleModalCloseClick"
    :maxWidth="820"
    v-if="avatarModal"
  >
    <div class="profile-avatars-list-header">
      <h2 class="h2">Pick An Avatar</h2>
      <talkie-button :onClick="changeAvatarStyles" :size="'small'">
        Change Styling
      </talkie-button>
    </div>

    <div class="profile-avatars-list-loader" v-if="loadingAvatars">
      <talkie-loader :size="'large'" />
    </div>

    <div class="profile-avatars-list-wrapper" id="profile-avatar-holder"></div>
  </talkie-modal>
</template>

<script>
import {
  TalkieForm,
  TalkieInput,
  TalkieButton,
  TalkieAlert,
  TalkieModal,
  TalkieChip,
  TalkieLoader,
} from "@/components/UICore";
import { UserService } from "@/api/services";
import {
  updateTeacherProfileSchema,
  updateStudentProfileSchema,
} from "@/utils/validations/user.validation";
import authUser from "@/utils/helpers/auth";
import { notifications } from "@/components/UIActions";
import rolesList from "@/utils/constants/roles";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "ProfileSelf",
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
    TalkieModal,
    TalkieChip,
    TalkieLoader,
  },
  data() {
    return {
      avatarModal: false,
      avatarStyling: "adventurer",
      user: {},
      editMode: false,
      triggerFormSubmission: () => {},
      updateProfileSchema: {},
      rolesList: rolesList,
      loading: false,
      loadingAvatars: false,
      formStatus: {
        type: null,
        message: null,
      },
      pickedAvatar: {
        svg: null,
        seed: null,
      },
    };
  },
  async created() {
    // get auth user from cookies
    const user = authUser.getUser();
    this.user = {
      schoolName: user?.schools[0]?.name || null,
      displayName: user?.displayName,
      email: user?.email,
      name: user?.name,
      role: user?.role,
      username: user?.username,
      ...(user?.image && {
        image: await generateAvatar(user?.image?.split("-")[1], user?.image),
      }),
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
    handleModalCloseClick() {
      this.avatarModal = false;
    },
    async handleShowAvatarModal() {
      this.avatarModal = true;
      await this.createAvatars();
    },
    async createAvatars() {
      document.getElementById("profile-avatar-holder").innerHTML = await "";
      const avatarsContainer = document.getElementById("profile-avatar-holder");
      avatarsContainer.classList.add("hidden");
      this.loadingAvatars = true;

      // generate 100 avatars
      for (let i = 0; i < 100; i++) {
        const seed = `${Math.random() * 486131613}-${this.avatarStyling}`;
        const avatarSVG = await generateAvatar(this.avatarStyling, seed);

        const avatarElement = document.createElement("span");
        avatarElement.classList.add("profile-avatar");
        avatarElement.innerHTML = avatarSVG;
        avatarElement.addEventListener(
          "click",
          async () => await this.handleAvatarClick(avatarSVG, seed)
        );

        avatarsContainer.appendChild(avatarElement);
      }

      await new Promise((r) => setTimeout(r, 100));
      avatarsContainer.classList.remove("hidden");
      this.loadingAvatars = false;
    },
    async changeAvatarStyles() {
      const currentStyling = this.avatarStyling;

      const replaceStyle = {
        ["adventurer"]: "micah",
        ["micah"]: "avataaars",
        ["avataaars"]: "adventurer",
      };

      this.avatarStyling = replaceStyle[currentStyling];

      await this.createAvatars();
    },
    async handleAvatarClick(avatarSVG, seed) {
      this.pickedAvatar = { svg: avatarSVG, seed };
      this.avatarModal = false;
      await new Promise((r) => setTimeout(r, 10)); // wait for the element to mount
      const avatarElement = document.getElementById("avatar-picked");
      avatarElement.innerHTML = avatarSVG;
    },
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
        ...(responseProfile?.image && {
          image: await generateAvatar(
            responseProfile?.image?.split("-")[1],
            responseProfile?.image
          ),
        }),
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
      const image = this.pickedAvatar?.seed;

      // payload
      const payload = {
        ...(this.user?.role === rolesList.TEACHER && {
          name,
          displayName,
          email,
        }),
        ...(this.user?.role === rolesList.ADMIN && {
          name,
          email,
        }),
        ...(this.user?.role === rolesList.STUDENT && {
          name: `${firstName} ${lastName}`,
          username,
        }),
        ...(image && { image }),
      };

      // api call
      const response = await UserService.UpdateProfile(payload).catch((e) => {
        const errorMap = {
          ["email already exists"]:
            "Oops, this email already exists. Try another one?",
          ['"name" contains bad word']: "Please enter an appropriate name",
          ['"displayname" contains bad word']:
            "Please enter an appropriate display name",
          ["username already exists"]:
            "Oops, this username already exists. Try another one?",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Hmm.. we can't seem to update your profile. Please try again later.",
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
      notifications.show("Profile updated successfully!", {
        variant: "success",
        displayIcon: true,
      });
      await this.updateUserProfile();
      this.editMode = false;
      this.$store.state.user = { ...response.data };
    },
  },
};
</script>

<style>
.profile-avatars-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.profile-avatars-list-loader {
  margin: auto;
}
.profile-avatars-list-wrapper {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: var(--t-space-10);
  max-height: calc(var(--t-space-50) * 5);
  overflow: scroll;
}
.profile-avatar {
  height: calc(var(--t-space-40) * 2);
  width: calc(var(--t-space-40) * 2);
  border-radius: var(--t-br-small);
  cursor: pointer;
}
.profile-avatar:hover {
  background: var(--t-gray-75);
}
.hidden {
  display: none;
}
</style>

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
.profile-info-options-wrapper {
  display: flex;
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

<template>
  <div class="profile-wrapper">
    <div class="profile-info-wrapper">
      <h2 class="h2">Profile Info</h2>
      <p class="p" style="margin-bottom: 0 !important">Avatar</p>
    </div>

    <div class="profile-fields-wrapper">
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
        :value="user?.schoolName"
        :placeholder="'School Name'"
        :customClass="'profile-input'"
        :disabled="true"
      />
      <talkie-input
        :value="user?.email"
        :placeholder="'Email Address'"
        :customClass="'profile-input'"
        :disabled="true"
      />
    </div>

    <div class="profile-options-wrapper">
      <div class="profile-footer">
        <a class="profile-footer-link"> Change my password </a>
      </div>
      <talkie-button :size="'medium'"> Edit Profile </talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";

export default {
  name: "ProfileSelf",
  components: {
    TalkieInput,
    TalkieButton,
  },
  data() {
    return {
      user: {},
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
    };
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

<template>
  <div class="profile-wrapper">
    <div class="profile-info-wrapper">
      <h2 class="h2">Profile Info</h2>
      <p class="p" style="margin-bottom: 0 !important">Avatar</p>
    </div>

    <div class="profile-fields-wrapper">
      <talkie-input :placeholder="'Name'" :customClass="'profile-input'" />
      <talkie-input
        :placeholder="'Display Name'"
        :customClass="'profile-input'"
      />
      <talkie-input
        :placeholder="'School Name'"
        :customClass="'profile-input'"
      />
      <talkie-input
        :placeholder="'Email Address'"
        :customClass="'profile-input'"
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

export default {
  name: "ProfileSelf",
  components: {
    TalkieInput,
    TalkieButton,
  },
};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
  max-width: 80%;
  padding: var(--t-space-48);
  border-radius: var(--t-br-large);
  gap: var(--t-space-48);
  margin-top: var(--t-space-70);
  margin-bottom: var(--t-space-70);
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
  width: 80%;
}
.profile-input {
  margin: auto;
  max-width: 85%;
}
.profile-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: var(--t-space-16);
}
.profile-footer-link {
  text-decoration: underline;
  font-size: var(--t-fs-small);
}
.profile-footer-link,
.profile-footer-link:hover,
.profile-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}
</style>

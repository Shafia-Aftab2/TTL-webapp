<template>
  <div class="teachers-signup-wrapper">
    <!-- On Left of Screen -->
    <div class="teachers-signup-avatar">
      <logo-teacher-signup />
    </div>

    <!-- on Right of Screen -->
    <div class="teachers-signup-form">
      <h3 class="h3">Create A Teacher Account</h3>
      <talkie-input
        :size="'medium'"
        :placeholder="'Your Name'"
        :customClass="'teachers-signup-form-field'"
      />
      <talkie-input
        :size="'medium'"
        :placeholder="'Your Display Name - What Do Students Call You?'"
        :customClass="'teachers-signup-form-field'"
      />
      <talkie-input
        :size="'medium'"
        :placeholder="'School Name'"
        :customClass="'teachers-signup-form-field'"
      />
      <talkie-input
        :size="'medium'"
        :placeholder="'Email Address'"
        :customClass="'teachers-signup-form-field'"
      />
      <talkie-input
        :size="'medium'"
        :placeholder="'Password'"
        :customClass="'teachers-signup-form-field'"
      />
      <div class="teachers-signup-form-options">
        <talkie-button :size="'medium'">Create</talkie-button>
        <div>
          <p class="teachers-signup-form-options-info">
            By signing up, you accept Talkie’s
          </p>
          <p class="teachers-signup-form-options-info">
            <a class="teachers-signup-form-options-info-link" href="#"
              >Terms of Service</a
            >
            and
            <a class="teachers-signup-form-options-info-link" href="#"
              >Privacy Policy.</a
            >
          </p>
        </div>
        <p class="teachers-signup-form-options-info">
          Already have an account?
          <a class="teachers-signup-form-options-info-link" href="#">Log in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton } from "../../../UICore";
import LogoTeacherSignup from "../../../SVGs/LogoTeacherSignup.vue";

export default {
  name: "TeacherSignup",
  components: {
    TalkieInput,
    TalkieButton,
    LogoTeacherSignup,
  },
};
</script>

<style>
.teachers-signup-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: var(--t-space-12);
  flex-direction: row;
  gap: var(--t-space-24);
  padding: var(--t-space-48) 0;
  max-width: 100%;
}
.teachers-signup-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  --logo-width: 500px;
  --logo-height: 500px;
}
.teachers-signup-avatar > svg {
  position: static;
  opacity: 1;
  transform: translate(0, 0);
  z-index: var(--t-zindex-10);
  width: var(--logo-width);
  height: var(--logo-height);
}
.teachers-signup-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: var(--t-space-16);
}
.teachers-signup-form-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--t-space-12);
  gap: var(--t-space-24);
}
.teachers-signup-form-options-info {
  padding: var(--t-space-4);
  text-align: center;
  font-size: var(--t-fs-small);
}
.teachers-signup-form-options-info-link {
  text-decoration: none;
  font-family: var(--t-ff-bold);
  color: var(--t-black);
}
.teachers-signup-form-options-info-link:visited {
  color: var(--t-black);
}
</style>

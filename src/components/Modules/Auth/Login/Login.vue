<template>
  <talkie-auth-split-wrapper>
    <div class="auth-split-form">
      <h3 class="h3">Login With Your Account</h3>
      <talkie-input
        :name="'email'"
        :size="'medium'"
        :placeholder="'Email Address'"
      />
      <talkie-input
        :type="'password'"
        :name="'password'"
        :size="'medium'"
        :placeholder="'Password'"
      />
      <div class="auth-split-form-options">
        <talkie-button :size="'medium'" :type="'submit'">Login</talkie-button>
        <div>
          <p class="auth-split-form-options-info">View Talkie’s</p>
          <p class="auth-split-form-options-info">
            <a class="auth-split-form-options-info-link" href="#"
              >Terms of Service</a
            >
            and
            <a class="auth-split-form-options-info-link" href="#"
              >Privacy Policy.</a
            >
          </p>
        </div>
        <p class="auth-split-form-options-info">
          Don't have an account?
          <a class="auth-split-form-options-info-link" href="#">
            Create Account
          </a>
        </p>
      </div>
    </div>
  </talkie-auth-split-wrapper>
</template>

<script>
import { TalkieInput, TalkieButton } from "@/components/UICore";
import TalkieAuthSplitWrapper from "../Wrappers/SplitWrapper.vue";

export default {
  name: "AuthLogin",
  components: {
    TalkieInput,
    TalkieButton,
    TalkieAuthSplitWrapper,
  },
};
</script>

<style>
.auth-split-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.auth-split-form-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--t-space-12);
}
.auth-split-form-options-info {
  padding: var(--t-space-4);
  text-align: center;
}
.auth-split-form-options-info-link {
  text-decoration: none;
  font-family: var(--t-ff-bold);
  color: var(--t-black);
}
.auth-split-form-options-info-link:visited {
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .auth-split-form {
    gap: var(--t-space-12);
  }
  .auth-split-form-options {
    gap: var(--t-space-12);
  }
  .auth-split-form-options-info {
    font-size: calc(var(--t-fs-small) - 2px);
  }
}
@media (min-width: 600px) {
  .auth-split-form {
    gap: var(--t-space-12);
  }
  .auth-split-form-options {
    gap: var(--t-space-24);
  }
  .auth-split-form-options-info {
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 1200px) {
  .auth-split-form {
    gap: var(--t-space-16);
  }
}
</style>

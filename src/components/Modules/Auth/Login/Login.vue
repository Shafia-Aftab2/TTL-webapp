<template>
  <talkie-auth-split-wrapper>
    <talkie-form
      :customClass="'auth-split-form'"
      v-slot="{ errors }"
      :validationSchema="loginSchema"
      :onSubmit="handleSubmit"
    >
      <h3 class="h3">Login With Your Account</h3>
      <talkie-input
        :name="'email'"
        :size="'medium'"
        :placeholder="'Email Address'"
        :hint="{
          type: errors.email ? 'error' : null,
          message: errors.email ? errors.email : null,
        }"
      />
      <talkie-input
        :type="'password'"
        :name="'password'"
        :size="'medium'"
        :placeholder="'Password'"
        :hint="{
          type: errors.password ? 'error' : null,
          message: errors.password ? errors.password : null,
        }"
      />
      <talkie-alert
        :text="formStatus.message"
        :variant="formStatus.type"
        v-if="formStatus.type && formStatus.message"
      />
      <div class="auth-split-form-options">
        <talkie-button :size="'medium'" :type="'submit'" :loading="loading">
          Login
        </talkie-button>
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
    </talkie-form>
  </talkie-auth-split-wrapper>
</template>

<script>
import {
  TalkieInput,
  TalkieButton,
  TalkieForm,
  TalkieAlert,
} from "@/components/UICore";
import { AuthService } from "@/api/services";
import { loginSchema } from "@/utils/validations/auth.validation";
import TalkieAuthSplitWrapper from "../Wrappers/SplitWrapper.vue";

export default {
  name: "AuthLogin",
  data() {
    return {
      loginSchema: loginSchema,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
    TalkieAuthSplitWrapper,
  },
  methods: {
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { email, password } = values;

      // payload
      const payload = {
        email,
        password,
      };

      // api call
      const response = await AuthService.Login(payload).catch(() => {
        return {
          error: "Could not login..!",
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
        type: "success",
        message: "Login Successfull. Redirecting..!",
      };
    },
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

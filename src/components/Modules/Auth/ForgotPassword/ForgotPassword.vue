<template>
  <talkie-form
    :customClass="'auth-forgot-password-wrapper'"
    v-slot="{ errors }"
    :validationSchema="forgotPasswordSchema"
    :onSubmit="handleSubmit"
  >
    <div class="auth-forgot-password-info-wrapper">
      <h2 class="h2">Forgot your password?</h2>
      <p class="p" style="margin-bottom: 0 !important">
        Please enter your email below. We'll send you a link to reset your
        password.
      </p>
    </div>

    <div class="auth-forgot-password-fields-wrapper">
      <talkie-input
        :name="'email'"
        :placeholder="'Email address'"
        :customClass="'auth-forgot-password-input'"
        :hint="{
          type: errors.email ? 'error' : null,
          message: errors.email ? errors.email : null,
        }"
      />

      <talkie-alert
        :text="formStatus.message"
        :variant="formStatus.type"
        v-if="formStatus.type && formStatus.message"
      />
    </div>

    <div class="auth-forgot-password-options-wrapper">
      <talkie-button :size="'medium'" :type="'submit'" :loading="loading">
        Reset my Password
      </talkie-button>
    </div>

    <div class="auth-forgot-password-footer">
      <router-link class="auth-forgot-password-footer-link" to="/auth/login">
        Back to Login
      </router-link>
    </div>
  </talkie-form>
</template>

<script>
import {
  TalkieForm,
  TalkieInput,
  TalkieButton,
  TalkieAlert,
} from "@/components/UICore";
import { AuthService } from "@/api/services";
import { forgotPasswordSchema } from "@/utils/validations/auth.validation";
import handleAlreadyLogginIn from "../_common/mixins/handleAlreadyLogginIn";

export default {
  name: "AuthForgotPassword",
  mixins: [handleAlreadyLogginIn],
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
  },
  data() {
    return {
      forgotPasswordSchema: forgotPasswordSchema,
      clientRedirectURI: null,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  created() {
    const clientRedirectURI = `${window.location.origin}/auth/reset-password`;
    this.clientRedirectURI = clientRedirectURI;
  },
  methods: {
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { email } = values;

      // payload
      const payload = { email, clientRedirectURI: this.clientRedirectURI };

      // api call
      const response = await AuthService.ForgotPassword(payload).catch((e) => {
        const errorMap = {
          ["no users found with this email"]: "Account not found..!",
          ["inactive account"]: "Inactive account..!",
          ['"email" must be a valid email']: "Email must be valid..!",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Could not make reset password request..!",
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
        message:
          "Password Reset Link Sent To Your Email..! Please check your inbox for more details.",
      };
    },
  },
};
</script>

<style scoped>
.auth-forgot-password-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
}
.auth-forgot-password-info-wrapper,
.auth-forgot-password-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
}
.auth-forgot-password-fields-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: var(--t-space-12);
}
.auth-forgot-password-input {
  margin: auto;
}
.auth-forgot-password-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.auth-forgot-password-footer-link {
  text-decoration: underline;
}
.auth-forgot-password-footer-link,
.auth-forgot-password-footer-link:hover,
.auth-forgot-password-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .auth-forgot-password-wrapper {
    max-width: 100%;
    gap: var(--t-space-36);
    padding: var(--t-space-32);
    margin-top: var(--t-space-50);
    border-radius: var(--t-br-medium);
  }
  .auth-forgot-password-fields-wrapper {
    width: 100%;
  }
  .auth-forgot-password-input {
    max-width: 100%;
  }
  .auth-forgot-password-footer {
    padding: var(--t-space-50);
  }
  .auth-forgot-password-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .auth-forgot-password-wrapper {
    max-width: 65%;
    gap: var(--t-space-48);
    padding: var(--t-space-48);
    margin-top: var(--t-space-70);
    border-radius: var(--t-br-medium);
  }
  .auth-forgot-password-fields-wrapper {
    width: 80%;
  }
  .auth-forgot-password-input {
    max-width: 100%;
  }
  .auth-forgot-password-footer {
    margin-top: var(--t-space-24);
    padding: var(--t-space-36);
  }
  .auth-forgot-password-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .auth-forgot-password-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .auth-forgot-password-input {
    max-width: 85%;
  }
  .auth-forgot-password-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

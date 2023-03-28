<template>
  <template v-if="!isPasswordChanged">
    <talkie-form
      :customClass="'auth-reset-password-wrapper'"
      v-slot="{ errors }"
      :validationSchema="resetPasswordSchema"
      :onSubmit="handleSubmit"
    >
      <div class="auth-reset-password-info-wrapper">
        <h2 class="h2">Reset your password</h2>
        <p class="p" style="margin-bottom: 0 !important">
          Please enter your new password below
        </p>
      </div>

      <div class="auth-reset-password-fields-wrapper">
        <talkie-input
          :name="'password'"
          :type="'password'"
          :placeholder="'Password'"
          :customClass="'auth-reset-password-input'"
          :hint="{
            type: errors.password ? 'error' : null,
            message: errors.password ? errors.password : null,
          }"
        />

        <talkie-input
          :name="'confirmPassword'"
          :type="'password'"
          :placeholder="'Confirm Password'"
          :customClass="'auth-reset-password-input'"
          :hint="{
            type: errors.confirmPassword ? 'error' : null,
            message: errors.confirmPassword ? errors.confirmPassword : null,
          }"
        />

        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          v-if="formStatus.type && formStatus.message"
        />
      </div>

      <div class="auth-reset-password-options-wrapper">
        <talkie-button :size="'medium'" :type="'submit'" :loading="loading">
          Reset my password
        </talkie-button>
      </div>

      <div class="auth-reset-password-footer">
        <router-link
          class="auth-reset-password-footer-link"
          to="/auth/forgot-password"
        >
          Request password change
        </router-link>
      </div>
    </talkie-form>
  </template>

  <template v-if="isPasswordChanged">
    <div class="auth-reset-password-wrapper">
      <div class="auth-reset-password-info-wrapper" v-if="isPasswordChanged">
        <h2 class="h2">Password Reset Successful</h2>
        <p class="p" style="margin-bottom: 0 !important">
          Please login to your account with the new password
        </p>
      </div>

      <div class="auth-reset-password-options-wrapper">
        <talkie-button
          :size="'medium'"
          :type="'button'"
          :onClick="handleLoginRedirect"
        >
          Continue to Login
        </talkie-button>
      </div>
    </div>
  </template>
</template>
<script>
import {
  TalkieForm,
  TalkieInput,
  TalkieButton,
  TalkieAlert,
} from "@/components/UICore";
import { AuthService } from "@/api/services";
import { resetPasswordSchema } from "@/utils/validations/auth.validation";
import authUser from "@/utils/helpers/auth";

export default {
  name: "AuthResetPassword",
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
  },
  data() {
    return {
      resetPasswordSchema: resetPasswordSchema,
      resetPasswordToken: null,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      isPasswordChanged: false,
    };
  },
  created() {
    // logout user on visiting this link
    this.handleUserLogout();

    // get reset password token from url
    const resetPasswordToken = this.$route.params.resetPasswordToken;
    this.resetPasswordToken = resetPasswordToken;
  },
  methods: {
    handleUserLogout() {
      authUser.deleteUser();
      authUser.deleteAccessToken();
      authUser.deleteRefreshToken();
    },
    handleLoginRedirect() {
      this.$router.push(`/auth/login`);
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { password } = values;

      // payload
      const payload = { password };

      // api call
      const response = await AuthService.ResetPassword(
        this.resetPasswordToken,
        payload
      ).catch((e) => {
        const errorMap = {
          ["token not found"]:
            "Sorry, we can't recognise the reset link. Please try again.",
          ["password must be at least 8 characters"]:
            "Password must contain at least 8 characters",
          ["password must contain at least 1 letter and 1 number"]:
            "Password must contain at least 1 letter and 1 number",
        };

        return {
          error:
            errorMap[e?.response?.data?.message?.toLowerCase()] ||
            "Sorry, we can't seem to change your password. Please try again later.",
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
        message: "Password reset successful!",
      };
      this.isPasswordChanged = true;
    },
  },
};
</script>

<style scoped>
.auth-reset-password-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
}
.auth-reset-password-info-wrapper,
.auth-reset-password-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
  width: 100%;
}
.auth-reset-password-fields-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: var(--t-space-12);
}
.auth-reset-password-input {
  margin: auto;
}
.auth-reset-password-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.auth-reset-password-footer-link {
  text-decoration: underline;
}
.auth-reset-password-footer-link,
.auth-reset-password-footer-link:hover,
.auth-reset-password-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .auth-reset-password-wrapper {
    max-width: 100%;
    gap: var(--t-space-36);
    padding: var(--t-space-32);
    margin-top: var(--t-space-50);
    border-radius: var(--t-br-medium);
  }
  .auth-reset-password-fields-wrapper {
    width: 100%;
  }
  .auth-reset-password-input {
    max-width: 100%;
  }
  .auth-reset-password-footer {
    padding: var(--t-space-50);
  }
  .auth-reset-password-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .auth-reset-password-wrapper {
    max-width: 65%;
    gap: var(--t-space-48);
    padding: var(--t-space-48);
    margin-top: var(--t-space-70);
    border-radius: var(--t-br-medium);
  }
  .auth-reset-password-fields-wrapper {
    width: 80%;
  }
  .auth-reset-password-input {
    max-width: 100%;
  }
  .auth-reset-password-footer {
    margin-top: var(--t-space-24);
    padding: var(--t-space-36);
  }
  .auth-reset-password-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .auth-reset-password-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .auth-reset-password-input {
    max-width: 85%;
  }
  .auth-reset-password-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

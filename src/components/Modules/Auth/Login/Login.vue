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
        :name="'emailOrUsername'"
        :size="'medium'"
        :placeholder="'Username or Email Address'"
        :hint="{
          type: errors.emailOrUsername ? 'error' : null,
          message: errors.emailOrUsername ? errors.emailOrUsername : null,
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
      <p
        class="auth-split-form-options-info auth-split-form-options-info-right"
      >
        <a
          class="auth-split-form-options-info-link"
          href="/auth/forgot-password"
        >
          Forgot Password?
        </a>
      </p>
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
            <a class="auth-split-form-options-info-link" href="#">
              Terms of Service
            </a>
            and
            <a class="auth-split-form-options-info-link" href="#">
              Privacy Policy.
            </a>
          </p>
        </div>
        <p class="auth-split-form-options-info">
          Don't have an account?
          <a class="auth-split-form-options-info-link" href="/auth/signup">
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
import authUser from "@/utils/helpers/auth";
import TalkieAuthSplitWrapper from "../Wrappers/SplitWrapper.vue";
import handleAlreadyLogginIn from "../_common/mixins/handleAlreadyLogginIn";
import URLModifier from "@/utils/helpers/URLModifier";

export default {
  name: "AuthLogin",
  mixins: [handleAlreadyLogginIn],
  data() {
    return {
      loginSchema: loginSchema,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      redirectURL: null,
    };
  },
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
    TalkieAuthSplitWrapper,
  },
  created() {
    // get redirect url from params
    const redirectURL = URLModifier.getURLParam("redirect_url");
    this.redirectURL = redirectURL;
  },
  methods: {
    isValidEmail(email) {
      const emailTestRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailTestRegex.test(email);
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { emailOrUsername, password } = values;

      // payload
      const payload = { password };
      if (this.isValidEmail(emailOrUsername)) {
        payload.email = emailOrUsername;
      } else {
        payload.username = emailOrUsername;
      }

      // api call
      const response = await AuthService.Login(payload).catch((e) => {
        const errorMap = {
          ["incorrect email or password"]:
            "Incorrect email/username or password..!",
          ['"email" must be a valid email']: "Email must be valid..!",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Could not login..!",
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
      const { user, tokens } = response.data;
      this.handleStoreMutation("user", user);
      const expires = (date) => ({ expires: new Date(date) });
      authUser.setUser(user, expires(tokens.refresh.expiry));
      authUser.setAccessToken(
        tokens.access.token,
        expires(tokens.access.expiry)
      );
      authUser.setRefreshToken(
        tokens.refresh.token,
        expires(tokens.refresh.expiry)
      );
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Login Successfull. Redirecting..!",
      };
      window.location = this.redirectURL ? this.redirectURL : "/";
    },
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
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
.auth-split-form-options-info-right {
  text-align: right !important;
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

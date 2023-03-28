<template>
  <talkie-auth-split-wrapper>
    <talkie-form
      :customClass="'auth-split-form'"
      v-slot="{ errors }"
      :validationSchema="computedSignupSchema"
      :onSubmit="handleSubmit"
      :key="computedSignupMode"
    >
      <h3 class="h3">Create an account</h3>
      <div class="signup-option-wrapper">
        <talkie-button
          :type="'button'"
          :size="'medium'"
          :outlined="signupMode === 'teacher'"
          :onClick="() => setSignupMode('student')"
        >
          I'm a student
        </talkie-button>
        <talkie-button
          :type="'button'"
          :size="'medium'"
          :outlined="signupMode === 'student'"
          :onClick="() => setSignupMode('teacher')"
        >
          I'm a teacher
        </talkie-button>
      </div>
      <template v-if="computedSignupMode === 'teacher'">
        <talkie-input
          :name="'name'"
          :size="'medium'"
          :placeholder="'Your Name'"
          :hint="{
            type: errors.name ? 'error' : null,
            message: errors.name ? errors.name : null,
          }"
        />
        <talkie-input
          :name="'displayName'"
          :size="'medium'"
          :placeholder="'Your Display Name - What Do Students Call You?'"
          :hint="{
            type: errors.displayName ? 'error' : null,
            message: errors.displayName ? errors.displayName : null,
          }"
        />
        <talkie-input
          :name="'schoolName'"
          :size="'medium'"
          :placeholder="'School Name'"
          :hint="{
            type: errors.schoolName ? 'error' : null,
            message: errors.schoolName ? errors.schoolName : null,
          }"
        />
        <talkie-input
          :name="'email'"
          :size="'medium'"
          :placeholder="'Email Address'"
          :hint="{
            type: errors.email ? 'error' : null,
            message: errors.email ? errors.email : null,
          }"
        />
      </template>
      <template v-if="computedSignupMode === 'student'">
        <talkie-input
          :name="'firstName'"
          :size="'medium'"
          :placeholder="'First Name'"
          :hint="{
            type: errors.firstName ? 'error' : null,
            message: errors.firstName ? errors.firstName : null,
          }"
        />
        <talkie-input
          :name="'lastName'"
          :size="'medium'"
          :placeholder="'Last Name'"
          :hint="{
            type: errors.lastName ? 'error' : null,
            message: errors.lastName ? errors.lastName : null,
          }"
        />
        <talkie-input
          :name="'username'"
          :size="'medium'"
          :placeholder="'Username'"
          :hint="{
            type: errors.username ? 'error' : null,
            message: errors.username ? errors.username : null,
          }"
        />
      </template>
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
          Create
        </talkie-button>
        <div>
          <p class="auth-split-form-options-info">
            By signing up, you accept Talkie’s
          </p>
          <p class="auth-split-form-options-info">
            <router-link
              class="auth-split-form-options-info-link"
              to="/services/terms"
            >
              Terms of Service
            </router-link>
            and
            <router-link
              class="auth-split-form-options-info-link"
              to="/services/privacy-policy"
            >
              Privacy Policy.
            </router-link>
          </p>
        </div>
        <p class="auth-split-form-options-info">
          Are you a
          {{ computedSignupMode === "teacher" ? "student" : "teacher" }}?
          <router-link
            class="auth-split-form-options-info-link"
            :to="`/auth/signup/${
              computedSignupMode === 'teacher' ? 'student' : 'teacher'
            }`"
          >
            Signup here
          </router-link>
        </p>
        <p class="auth-split-form-options-info">
          Already have an account?
          <router-link
            class="auth-split-form-options-info-link"
            :to="`/auth/login${
              redirectRoute ? `?redirect_route=${redirectRoute}` : ''
            }`"
          >
            Log in
          </router-link>
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
import {
  studentSignupSchema,
  teacherSignupSchema,
} from "@/utils/validations/auth.validation";
import { roles } from "@/utils/constants";
import authUser from "@/utils/helpers/auth";
import TalkieAuthSplitWrapper from "../Wrappers/SplitWrapper.vue";
import handleAlreadyLogginIn from "../_common/mixins/handleAlreadyLogginIn";
// import URLModifier from "@/utils/helpers/URLModifier";

export default {
  name: "AuthSignup",
  mixins: [handleAlreadyLogginIn],
  data() {
    return {
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      redirectRoute: null,
      signupMode: "student",
    };
  },
  computed: {
    computedSignupSchema() {
      return this.signupMode === "teacher"
        ? teacherSignupSchema
        : studentSignupSchema;
    },
    computedSignupMode() {
      return this.signupMode;
    },
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
    const redirectRoute = this?.$route?.query?.redirect_route;
    this.redirectRoute = redirectRoute;
  },
  methods: {
    setSignupMode(mode) {
      this.signupMode = mode;
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const {
        name,
        firstName,
        lastName,
        username,
        displayName,
        schoolName,
        email,
        password,
      } = values;

      // payload
      const payload = (() => {
        if (this.signupMode === "student") {
          return {
            name: `${firstName} ${lastName}`,
            username: username?.trim(),
            password,
            role: roles.STUDENT,
          };
        }
        if (this.signupMode === "teacher") {
          return {
            name,
            displayName,
            schoolName,
            email: email?.trim(),
            password,
            role: roles.TEACHER,
          };
        }
      })();

      // api call
      const response = await AuthService.Signup(payload).catch((e) => {
        const errorMap = {
          ['"name" contains bad word']: "Please enter an appropriate name",
          ['"username" contains bad word']:
            "Please enter an appropriate username",
          ['"displayname" contains bad word']:
            "Please enter an appropriate display name",
          ['"schoolname" contains bad word']:
            "Please enter an appropriate school name",
          ["email already exists"]:
            "Oops, this email already exists. Try another one?",
          ["username already exists"]:
            "Oops, this username already exists. Try another one?",
          ["password must be at least 8 characters"]:
            "Password must contain at least 8 characters",
          ["password must contain at least 1 letter and 1 number"]:
            "Password must contain at least 1 letter and 1 number",
        };

        return {
          error:
            errorMap[e?.response?.data?.message?.toLowerCase()] ||
            "Sorry, we can't create your account at the mo. Please try again later.",
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
      const { user, tokens } = response?.data;
      const expires = (date) => ({ expires: new Date(date) });
      authUser.setUser(user, expires(tokens?.refresh?.expiry));
      authUser.setAccessToken(
        tokens?.access?.token,
        expires(tokens?.access?.expiry)
      );
      authUser.setRefreshToken(
        tokens?.refresh?.token,
        expires(tokens?.refresh?.expiry)
      );
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Account Created. Redirecting!",
      };
      this.$router.push(this.redirectRoute ? this.redirectRoute : "/");
      this.$store.dispatch("unsetSubscriptionCalculatedStatus");
      this.$store.dispatch("calculateSubscription");
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
.signup-option-wrapper {
  display: flex;
  gap: var(--t-space-8);
  margin: auto;
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

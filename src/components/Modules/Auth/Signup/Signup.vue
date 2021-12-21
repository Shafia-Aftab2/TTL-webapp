<template>
  <talkie-auth-split-wrapper>
    <talkie-form
      :customClass="'auth-split-form'"
      v-slot="{ errors }"
      :validationSchema="computedSignupSchema"
      :onSubmit="handleSubmit"
    >
      <h3 class="h3">
        {{
          signupMode === "teacher"
            ? "Create A Teacher Account"
            : "Create A Student Account"
        }}
      </h3>
      <template v-if="signupMode === 'teacher'">
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
      <template v-if="signupMode === 'student'">
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
          Already have an account?
          <a class="auth-split-form-options-info-link" href="#">Log in</a>
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

export default {
  name: "AuthSignup",
  data() {
    return {
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  computed: {
    computedSignupSchema() {
      return this.signupMode === "teacher"
        ? teacherSignupSchema
        : studentSignupSchema;
    },
  },
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
    TalkieAuthSplitWrapper,
  },
  props: {
    signupMode: {
      type: String,
      validator: (val) => ["student", "teacher"].includes(val),
    },
  },
  methods: {
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
            username,
            password,
            role: roles.STUDENT,
          };
        }
        if (this.signupMode === "teacher") {
          return {
            name,
            displayName,
            schoolName,
            email,
            password,
            role: roles.TEACHER,
          };
        }
      })();

      // api call
      const response = await AuthService.Signup(payload).catch((e) => {
        const errorMap = {
          ['"name" contains bad word']: "Name should not be unethical..!",
          ['"username" contains bad word']:
            "Username should not be unethical..!",
          ['"displayname" contains bad word']:
            "Display name should not be unethical..!",
          ['"schoolname" contains bad word']:
            "School name should not be unethical..!",
          ["email already exists"]: "Email already exists..!",
          ["username already exists"]: "Username already exists..!",
          ["password must be at least 8 characters"]:
            "Password must contain at least 8 characters..!",
          ["password must contain at least 1 letter and 1 number"]:
            "Password must contain at least 1 letter and 1 number..!",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Could not create account..!",
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
        message: "Account Created. Redirecting..!",
      };
      this.$router.push("/");
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

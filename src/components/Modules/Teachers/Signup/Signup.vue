<template>
  <div class="teachers-signup-wrapper">
    <!-- On Left of Screen -->
    <div class="teachers-signup-avatar">
      <logo-teacher-signup />
    </div>

    <!-- on Right of Screen -->
    <talkie-form
      :customClass="'teachers-signup-form'"
      v-slot="{ errors }"
      :validationSchema="teacherSignupSchema"
      :onSubmit="mockAPI"
    >
      <h3 class="h3">Create A Teacher Account</h3>
      <talkie-input
        :name="'name'"
        :size="'medium'"
        :placeholder="'Your Name'"
        :customClass="'teachers-signup-form-field'"
        :hint="{
          type: errors.name ? 'error' : null,
          message: errors.name ? errors.name : null,
        }"
      />
      <talkie-input
        :name="'displayName'"
        :size="'medium'"
        :placeholder="'Your Display Name - What Do Students Call You?'"
        :customClass="'teachers-signup-form-field'"
        :hint="{
          type: errors.displayName ? 'error' : null,
          message: errors.displayName ? errors.displayName : null,
        }"
      />
      <talkie-input
        :name="'schoolName'"
        :size="'medium'"
        :placeholder="'School Name'"
        :customClass="'teachers-signup-form-field'"
        :hint="{
          type: errors.schoolName ? 'error' : null,
          message: errors.schoolName ? errors.schoolName : null,
        }"
      />
      <talkie-input
        :name="'email'"
        :size="'medium'"
        :placeholder="'Email Address'"
        :customClass="'teachers-signup-form-field'"
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
        :customClass="'teachers-signup-form-field'"
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
      <div class="teachers-signup-form-options">
        <talkie-button :size="'medium'" :type="'submit'" :loading="loading">
          Create
        </talkie-button>
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
    </talkie-form>
  </div>
</template>

<script>
import {
  TalkieInput,
  TalkieButton,
  TalkieForm,
  TalkieAlert,
} from "../../../UICore";
import LogoTeacherSignup from "../../../SVGs/LogoTeacherSignup.vue";
import { teacherSignupSchema } from "../../../../utils/validations/auth.validation";
import { AuthService } from "../../../../api/services";

export default {
  name: "TeacherSignup",
  data() {
    return {
      teacherSignupSchema: teacherSignupSchema,
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
    LogoTeacherSignup,
    TalkieAlert,
  },
  methods: {
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { name, displayName, schoolName, email, password } = values;

      // payload
      const payload = {
        name,
        displayName,
        schoolName,
        email,
        password,
      };

      // api call
      const response = await AuthService.Signup(payload).catch(() => false);

      // failure case
      if (!response) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: "Could not create account.",
        };
        return;
      }

      // success case
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Account Created. Redirecting..!",
      };
    },
    async mockAPI(values) {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.loading = false;
      if (values.email === "success@talkie.com") {
        this.formStatus = {
          type: "success",
          message: "Account created. Redirecting...!",
        };
      } else {
        this.formStatus = {
          type: "error",
          message: "Could not create account.",
        };
      }
    },
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
}
.teachers-signup-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  --logo-width: 500px;
  --logo-height: 500px;
}
.teachers-signup-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.teachers-signup-form-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--t-space-12);
}
.teachers-signup-form-options-info {
  padding: var(--t-space-4);
  text-align: center;
}
.teachers-signup-form-options-info-link {
  text-decoration: none;
  font-family: var(--t-ff-bold);
  color: var(--t-black);
}
.teachers-signup-form-options-info-link:visited {
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-signup-wrapper {
    flex-direction: column;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .teachers-signup-avatar {
    display: none;
  }
  .teachers-signup-form {
    gap: var(--t-space-12);
  }
  .teachers-signup-form-options {
    gap: var(--t-space-12);
  }
  .teachers-signup-form-options-info {
    font-size: calc(var(--t-fs-small) - 2px);
  }
}
@media (min-width: 600px) {
  .teachers-signup-wrapper {
    flex-direction: column;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .teachers-signup-avatar {
    display: flex;
  }
  .teachers-signup-avatar > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-150%, -30%);
    opacity: 0.5;
    z-index: var(--t-zindex-nv-10);
    width: calc(var(--logo-width) * 0.9);
    height: calc(var(--logo-height) * 0.9);
  }
  .teachers-signup-form {
    gap: var(--t-space-12);
  }
  .teachers-signup-form-options {
    gap: var(--t-space-24);
  }
  .teachers-signup-form-options-info {
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 900px) {
  .teachers-signup-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .teachers-signup-avatar > svg {
    position: static;
    opacity: 1;
    transform: translate(0, 0);
    z-index: var(--t-zindex-10);
    width: calc(var(--logo-width) * 0.8);
    height: calc(var(--logo-height) * 0.8);
  }
}
@media (min-width: 1200px) {
  .teachers-signup-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-48) 0;
  }
  .teachers-signup-avatar > svg {
    width: var(--logo-width);
    height: var(--logo-height);
  }
  .teachers-signup-form {
    gap: var(--t-space-16);
  }
}
</style>

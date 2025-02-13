<template>
  <div class="create-class-wrapper">
    <!-- on Left of Screen -->
    <talkie-form
      :customClass="'create-class-form'"
      v-slot="{ errors }"
      :initialValues="{
        schoolId: schoolId,
      }"
      :validationSchema="createClassSchema"
      :onSubmit="handleSubmit"
    >
      <h3 class="h3">Welcome, {{ user?.name }}!</h3>
      <h5 class="create-class-form-header h5">
        Let’s create your first class...
      </h5>
      <talkie-input
        :name="'name'"
        :size="'medium'"
        :placeholder="'Class Name'"
        :customClass="'create-class-form-field'"
        :hint="{
          type: errors.name ? 'error' : null,
          message: errors.name ? errors.name : null,
        }"
      />
      <talkie-select
        :name="'language'"
        :size="'medium'"
        :placeholder="'I teach...'"
        :options="languageList"
        :customClass="'create-class-form-field'"
        :hint="{
          type: errors.language ? 'error' : null,
          message: errors.language ? errors.language : null,
        }"
      />
      <talkie-alert
        :text="formStatus.message"
        :variant="formStatus.type"
        v-if="formStatus.type && formStatus.message"
      />
      <talkie-button
        :size="'medium'"
        :customClass="'create-class-form-field'"
        :loading="loading"
      >
        Next
      </talkie-button>
    </talkie-form>

    <!-- On Right of Screen -->
    <div class="create-class-avatar">
      <img
        src="/assets/media/pngs/class-unlimited-freetrial.png"
        alt="Class Unlimited Free Trial"
        class="class-logo"
      />
    </div>
  </div>
</template>

<script>
import {
  TalkieInput,
  TalkieSelect,
  TalkieButton,
  TalkieForm,
  TalkieAlert,
} from "@/components/UICore";
import { ClassService, UserService } from "@/api/services";
import { createClassSchema } from "@/utils/validations/class.validation";
import supportedLanguages from "@/utils/constants/supportedLanguages";
import authUser from "@/utils/helpers/auth";
import subscriptionPerksMixin from "@/utils/mixins/subscriptionPerksMixin";

export default {
  name: "TeacherClassCreate",
  mixins: [subscriptionPerksMixin],
  components: {
    TalkieInput,
    TalkieSelect,
    TalkieButton,
    TalkieForm,
    TalkieAlert,
  },
  data() {
    return {
      createClassSchema: createClassSchema,
      languageList: [...Object.values(supportedLanguages)],
      schoolId: null,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      user: {},
    };
  },
  computed: {
    computedSubscription() {
      return this.$store.state.subscription;
    },
  },
  created() {
    // get auth user
    const user = authUser.getUser();
    this.user = user;

    // get school id from user
    const schoolId =
      user.schools && user.schools.length > 0 ? user.schools[0]._id : null;

    // failure case
    if (!schoolId) return this.$router.push("/404");

    // success case
    this.schoolId = schoolId;
  },
  methods: {
    /*** NOTE: this function is to be removed, and related data has to come from api ***/
    tempfunc_CheckIfUserCanCreateUnlimitedClasses() {
      if (
        !this.canCreateUnlimitedClasses &&
        this.currentClassCount >= this.maxClassCount
      ) {
        this.formStatus = {
          type: "error",
          message: `You already have created the max no. of classes (${this.maxClassCount}) as per your subscription plan!`,
        };
        return false;
      }
      return true;
    },
    async handleSubmit(values) {
      /*** NOTE: this temp block is to be removed, and related data has to come from api ***/
      /* temp block start */
      const canCreateUnlimited =
        this.tempfunc_CheckIfUserCanCreateUnlimitedClasses();
      if (!canCreateUnlimited) return;
      /* temp block end */

      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { name, language, schoolId } = values;

      // payload
      const payload = {
        name,
        language,
        schoolId,
      };
      // api call
      const response = await ClassService.Create(payload).catch((e) => {
        const errorMap = {
          ['"name" contains bad word']: "Please enter an appropriate name",
          ['"schoolid" must be a valid mongo id']: "Invalid School",
          ["school not found"]: "Invalid School",
          ["class already exists in school"]:
            "Oops, this class name already exists. Try another one?",
          ["user has no subscription"]:
            "Please upgrade your account to continue",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Sorry, we can't create your class at the mo. Please try again later.",
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
        message: "Class created successfully.",
      };
      const classId = response?.data?.id;
      // update user profile data (+failure case)
      const isProfileUpdated = await this.updateUserProfile();
      if (!isProfileUpdated) return this.$router.push("/404");
      this.$router.push(`/classes/${classId}/choose-topics`);
    },
    async updateUserProfile() {
      // api call
      const response = await UserService.GetMyProfile().catch();

      // failure case
      if (!response?.data) return false;

      // success case
      const expires = (date) => ({ expires: new Date(date) });
      const nextDay = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      authUser.setUser(response?.data, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
      return true;
    },
  },
};
</script>

<style>
.create-class-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  min-height: 80vh;
}
.create-class-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.create-class-form-header {
  font-family: var(--t-ff-medium);
}
.create-class-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.class-logo {
  width: 600px;
  height: auto;
  padding-left: 200px;
}

/* Responsive variants */
@media (max-width: 599px) {
  .create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
    margin-top: var(--t-space-12);
  }
  .create-class-form {
    gap: var(--t-space-12);
  }
  .create-class-avatar {
    display: none;
  }
}
@media (min-width: 600px) {
  .create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .create-class-form {
    gap: var(--t-space-12);
  }
  .create-class-avatar {
    display: flex;
  }
}
@media (min-width: 900px) {
  .create-class-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .create-class-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24) 0;
  }
  .create-class-form {
    gap: var(--t-space-16);
  }
}
</style>

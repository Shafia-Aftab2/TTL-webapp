<template>
  <div class="teachers-create-class-wrapper">
    <!-- on Left of Screen -->
    <talkie-form
      :customClass="'teachers-create-class-form'"
      v-slot="{ errors }"
      :initialValues="{
        schoolId: schoolId,
      }"
      :validationSchema="createClassSchema"
      :onSubmit="handleSubmit"
    >
      <h3 class="h3">¡Hola, Ms. Joyce!</h3>
      <h5 class="teachers-create-class-form-header h5">
        Let’s create your first class...
      </h5>
      <talkie-input
        :name="'name'"
        :size="'medium'"
        :placeholder="'Class Name'"
        :customClass="'teachers-create-class-form-field'"
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
        :customClass="'teachers-create-class-form-field'"
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
        :customClass="'teachers-create-class-form-field'"
        :loading="loading"
      >
        Next
      </talkie-button>
    </talkie-form>

    <!-- On Right of Screen -->
    <div class="teachers-create-class-avatar">
      <logo-teacher-class-create />
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
import LogoTeacherClassCreate from "@/components/SVGs/LogoTeacherClassCreate.vue";
import { ClassService } from "@/api/services";
import { createClassSchema } from "@/utils/validations/class.validation";
import supportedLangugages from "@/utils/constants/supportedLangugages";

export default {
  name: "TeacherClassCreate",
  data() {
    return {
      createClassSchema: createClassSchema,
      languageList: [...Object.values(supportedLangugages)],
      schoolId: "61b231c2ea1d9f1e29e4030c", // TODO: remove hardcoded
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  components: {
    TalkieInput,
    TalkieSelect,
    TalkieButton,
    TalkieForm,
    TalkieAlert,
    LogoTeacherClassCreate,
  },
  methods: {
    async handleSubmit(values) {
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
          ['"name" contains bad word']: "Name should not be unethical..!",
          ['"schoolid" must be a valid mongo id']: "Invalid School",
          ["school not found"]: "Invalid School",
          ["class already exists in school"]:
            "Class with same name already exists..!",
        };

        return {
          error:
            errorMap[e.response.data.message.toLowerCase()] ||
            "Could not create class..!",
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
        message: "Class Created. Redirecting..!",
      };
    },
  },
};
</script>

<style>
.teachers-create-class-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
}
.teachers-create-class-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.teachers-create-class-form-header {
  font-family: var(--t-ff-medium);
}
.teachers-create-class-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  --logo-width: 500px;
  --logo-height: 500px;
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
    margin-top: var(--t-space-12);
  }
  .teachers-create-class-form {
    gap: var(--t-space-12);
  }
  .teachers-create-class-avatar {
    display: none;
  }
}
@media (min-width: 600px) {
  .teachers-create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .teachers-create-class-form {
    gap: var(--t-space-12);
  }
  .teachers-create-class-avatar {
    display: flex;
  }
  .teachers-create-class-avatar > svg {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-40%, -50%);
    opacity: 0.5;
    z-index: var(--t-zindex-nv-10);
    width: calc(var(--logo-width) * 0.9);
    height: calc(var(--logo-height) * 0.9);
  }
}
@media (min-width: 900px) {
  .teachers-create-class-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .teachers-create-class-avatar > svg {
    position: static;
    opacity: 1;
    transform: translate(0, 0);
    z-index: var(--t-zindex-10);
    width: calc(var(--logo-width) * 0.8);
    height: calc(var(--logo-height) * 0.8);
  }
}
@media (min-width: 1200px) {
  .teachers-create-class-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24) 0;
  }
  .teachers-create-class-form {
    gap: var(--t-space-16);
  }
  .teachers-create-class-avatar > svg {
    width: var(--logo-width);
    height: var(--logo-height);
  }
}
</style>

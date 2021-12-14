<template>
  <div class="class-choose-topics-wrapper">
    <!-- on Left of Screen -->
    <div class="class-choose-topics-info">
      <h3 class="h3">Choose Topics</h3>
      <p class="class-choose-topics-info-header p">
        Select as many topics as you want for your class. This way, we get to
        tailor the quizzes...
      </p>
    </div>

    <!-- On Right of Screen -->
    <talkie-form
      :customClass="'class-choose-topics-form'"
      :onSubmit="handleCustomFormValidation"
    >
      <div class="class-choose-topics-sub-form">
        <h4 class="h4">Beginners/Intermediate</h4>
        <p class="p" style="margin-bottom: 0 !important">GCSE Level</p>
        <template v-for="topic in topics.intermediate" :key="topic.id">
          <talkie-check-box :name="topic.id" :label="topic.name" />
        </template>
      </div>
      <div class="class-choose-topics-sub-form">
        <h4 class="h4">Beginners</h4>
        <p class="p" style="margin-bottom: 0 !important">KS3 Level</p>
        <template v-for="topic in topics.beginner" :key="topic.id">
          <talkie-check-box :name="topic.id" :label="topic.name" />
        </template>
      </div>
      <talkie-alert
        :text="formStatus.message"
        :variant="formStatus.type"
        v-if="formStatus.type && formStatus.message"
      />
      <talkie-button :loading="loading" :size="'medium'">Next</talkie-button>
    </talkie-form>
  </div>
</template>

<script>
import {
  TalkieCheckBox,
  TalkieButton,
  TalkieForm,
  TalkieAlert,
} from "@/components/UICore";
import { ClassService } from "@/api/services";

export default {
  name: "ChooseTopics",
  components: {
    TalkieCheckBox,
    TalkieButton,
    TalkieForm,
    TalkieAlert,
  },
  data() {
    return {
      topics: {
        intermediate: [
          {
            name: "⚽️ Free-time activities",
            id: "61b2328bea1d9f1e29e4032a",
          },
          {
            name: "✈️ Travel and tourism",
            id: "61b2328bea1d9f1e29e4032c",
          },
          {
            name: "🍔 Food and drink",
            id: "61b2328bea1d9f1e29e4032d",
          },
          {
            name: "🤳 Social media and technology",
            id: "61b2328bea1d9f1e29e4032f",
          },
        ],
        beginner: [
          {
            name: "😊 My family and friends",
            id: "61b2328bea1d9f1e29e40320",
          },
          {
            name: "🏡 Where I live",
            id: "61b2328bea1d9f1e29e4032b",
          },
          {
            name: "🐶 Pets",
            id: "61b2328bea1d9f1e29e4032e",
          },
          {
            name: "👖 Clothing",
            id: "61b2328bea1d9f1e29e4032g",
          },
        ],
      },
      classId: null,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
    };
  },
  created() {
    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;
  },
  methods: {
    async handleCustomFormValidation(values) {
      // ensure at least one topic to be selected
      const hasASelectedTopic =
        Object.values(values).filter((x) => x).length > 0;

      // error case
      if (!hasASelectedTopic) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: "At least one topic must be selected..!",
        };
        return;
      }

      // success case
      await this.handleSubmit(await this.handleSanitizeFormValues(values));
    },
    handleSanitizeFormValues(values) {
      return { topics: Object.keys(values).filter((key) => values[key]) };
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const { topics } = values;

      // payload
      const classId = this.classId;
      const payload = { topics };

      // api call
      const response = await ClassService.AddTopics(classId, payload).catch(
        () => {
          return {
            error: "Could not add class topic/s..!",
          };
        }
      );

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
        message: "Class Topics Added. Redirecting..!",
      };
    },
  },
};
</script>

<style>
.class-choose-topics-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
}
.class-choose-topics-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.class-choose-topics-info-header {
  font-family: var(--t-ff-medium);
}
.class-choose-topics-form,
.class-choose-topics-sub-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-choose-topics-wrapper {
    flex-direction: column;
    padding: var(--t-space-32);
    margin-top: var(--t-space-12);
  }
  .class-choose-topics-info {
    gap: var(--t-space-12);
  }
  .class-choose-topics-info-header {
    font-family: var(--t-ff-regular);
  }
  .class-choose-topics-form {
    gap: var(--t-space-24);
    margin-top: var(--t-space-24);
  }
  .class-choose-topics-sub-form {
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .class-choose-topics-wrapper {
    flex-direction: column;
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .class-choose-topics-info {
    gap: var(--t-space-12);
  }
  .class-choose-topics-form {
    gap: var(--t-space-36);
    margin-top: var(--t-space-36);
  }
  .class-choose-topics-sub-form {
    gap: var(--t-space-12);
  }
}
@media (min-width: 900px) {
  .class-choose-topics-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .class-choose-topics-form {
    margin-top: 0;
  }
}
@media (min-width: 1200px) {
  .class-choose-topics-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24) 0;
  }
  .class-choose-topics-info {
    gap: var(--t-space-16);
  }
  .class-choose-topics-form {
    gap: var(--t-space-48);
  }
  .class-choose-topics-sub-form {
    gap: var(--t-space-16);
  }
}
</style>

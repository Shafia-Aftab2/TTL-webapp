<template>
  <div class="class-update-convo-wrapper">
    <h2 class="class-update-convo-header h2">Edit Task</h2>
    <div class="class-update-convo-form">
      <talkie-select :name="'topic'" :placeholder="'Choose topic'" />
      <talkie-input :name="'title'" :placeholder="'Title (required)'" />
      <talkie-input
        :multiline="true"
        :name="'questionText'"
        :placeholder="'Question text (optional)'"
      />
    </div>
    <div class="class-update-convo-form-options">
      <talkie-button> Update </talkie-button>
    </div>
  </div>
  <div class="class-update-convo-footer">
    <a :href="`/classes/${classId}`" class="class-update-convo-footer-link">
      Not now
    </a>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton, TalkieSelect } from "@/components/UICore";

export default {
  name: "ClassTaskUpdate",
  components: {
    TalkieInput,
    TalkieButton,
    TalkieSelect,
  },
  data() {
    return {
      classId: null,
      taskId: null,
    };
  },
  async created() {
    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;

    // task id from params
    const taskId = this.$route.params.taskId;
    this.taskId = taskId;
  },
};
</script>

<style scoped>
.class-update-convo-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.class-update-convo-header {
  text-align: center;
  --font-size: var(--t-fs-h2);
}
.class-update-convo-form {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.class-update-convo-form-options {
  display: flex;
  margin: auto;
}
.class-update-convo-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.class-update-convo-footer-link {
  text-decoration: underline;
}
.class-update-convo-footer-link,
.class-update-convo-footer-link:hover,
.class-update-convo-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}
.class-update-convo-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-40);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .class-update-convo-form {
    gap: var(--t-space-12);
    width: 100%;
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-update-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-32);
    padding-bottom: var(--t-space-36);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .class-update-convo-form {
    gap: var(--t-space-16);
    width: 65%;
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-64);
  }
  .class-update-convo-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
  }
}
@media (min-width: 900px) {
  .class-update-convo-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-update-convo-wrapper {
    padding: var(--t-space-48);
    padding-bottom: var(--t-space-58);
    margin-top: var(--t-space-48);
  }
  .class-update-convo-header {
    font-size: var(--font-size);
  }
  .class-update-convo-form {
    gap: var(--t-space-24);
    width: 70%;
  }
  .class-update-convo-footer {
    margin-top: var(--t-space-70);
    padding: var(--t-space-50);
  }
  .class-update-convo-footer-link {
    font-size: var(--t-fs-small);
  }
  .class-update-convo-loading-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
}
</style>

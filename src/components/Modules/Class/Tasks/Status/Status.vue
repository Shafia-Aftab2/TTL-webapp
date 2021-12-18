<template>
  <div class="class-convo-status-wrapper">
    <h2 class="class-convo-status-header h2">Woop..! Its out there</h2>
    <div class="class-convo-status-question-card-wrapper">
      <talkie-question-card
        :title="taskDetails.title"
        :topic="taskDetails.topic"
        :audioSource="taskDetails.audioSource"
        :fullWidth="false"
      />
    </div>
    <div class="class-convo-status-options-wrapper">
      <talkie-button>Create New</talkie-button>
      <talkie-button :outlined="true">Home</talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";
import { TalkieQuestionCard } from "@/components/SubModules/Cards";

export default {
  name: "TeacherConvoSent",
  components: {
    TalkieButton,
    TalkieQuestionCard,
  },
  data() {
    return {
      taskDetails: {
        title: "Desert Island",
        topic: "Miscellaneous",
        audioSource:
          "https://thepaciellogroup.github.io/AT-browser-tests/audio/jeffbob.mp3",
      },
    };
  },
};
</script>

<style scoped>
.class-convo-status-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background: var(--t-white);
  gap: var(--t-space-36);
}
.class-convo-status-header {
  text-align: center;
  color: var(--t-secondary);
  --font-size: var(--t-fs-h2);
}
.class-convo-status-question-card-wrapper {
  border: var(--t-space-1) solid var(--t-gray-75);
  border-radius: var(--t-br-large);
}
.class-convo-status-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-12);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-small);
    min-width: 80%;
  }
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.7);
  }
  .class-convo-status-question-card-wrapper {
    width: 100%;
  }
}
@media (min-width: 600px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-32);
    margin-top: var(--t-space-24);
    border-radius: var(--t-br-large);
    max-width: 80%;
  }
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.75);
  }
  .class-convo-status-question-card-wrapper {
    width: 80%;
  }
}
@media (min-width: 900px) {
  .class-convo-status-header {
    font-size: calc(var(--font-size) * 0.85);
  }
}
@media (min-width: 1200px) {
  .class-convo-status-wrapper {
    padding: var(--t-space-48);
    margin-top: var(--t-space-48);
  }
  .class-convo-status-header {
    font-size: var(--font-size);
  }
}
</style>

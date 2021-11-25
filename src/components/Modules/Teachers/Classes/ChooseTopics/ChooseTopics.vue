<template>
  <div class="teachers-choose-class-topics-wrapper">
    <!-- on Left of Screen -->
    <div class="teachers-choose-class-topics-info">
      <h3 class="h3">Choose Topics</h3>
      <p class="teachers-choose-class-topics-info-header p">
        Select as many topics as you want for your class. This way, we get to
        tailor the quizzes...
      </p>
    </div>

    <!-- On Right of Screen -->
    <div class="teachers-choose-class-topics-form">
      <div class="teachers-choose-class-topics-sub-form">
        <h4 class="h4">Beginners/Intermediate</h4>
        <p class="p">GCSE Level</p>
        <talkie-check-box :label="'⚽️ Free-time activities'" />
        <talkie-check-box :label="'✈️ Travel and tourism'" />
        <talkie-check-box :label="'🍔 Food and drink'" />
        <talkie-check-box :label="'🤳 Social media and technology'" />
      </div>
      <div class="teachers-choose-class-topics-sub-form">
        <h4 class="h4">Beginners</h4>
        <p class="p">KS3 Level</p>
        <talkie-check-box :label="'😊 My family and friends'" />
        <talkie-check-box :label="'🏡 Where I live'" />
        <talkie-check-box :label="'🐶 Pets'" />
        <talkie-check-box :label="'👖 Clothing'" />
      </div>
      <talkie-button :size="'medium'">Next</talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieCheckBox, TalkieButton } from "../../../../UICore";

export default {
  name: "ChooseTopics",
  components: { TalkieCheckBox, TalkieButton },
};
</script>

<style>
.teachers-choose-class-topics-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
}
.teachers-choose-class-topics-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.teachers-choose-class-topics-info-header {
  font-family: var(--t-ff-medium);
}
.teachers-choose-class-topics-form,
.teachers-choose-class-topics-sub-form {
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
  .teachers-choose-class-topics-wrapper {
    flex-direction: column;
    padding: var(--t-space-32);
    margin-top: var(--t-space-12);
  }
  .teachers-choose-class-topics-info {
    gap: var(--t-space-12);
  }
  .teachers-choose-class-topics-info-header {
    font-family: var(--t-ff-regular);
  }
  .teachers-choose-class-topics-form {
    gap: var(--t-space-24);
    margin-top: var(--t-space-24);
  }
  .teachers-choose-class-topics-sub-form {
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .teachers-choose-class-topics-wrapper {
    flex-direction: column;
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .teachers-choose-class-topics-info {
    gap: var(--t-space-12);
  }
  .teachers-choose-class-topics-form {
    gap: var(--t-space-36);
    margin-top: var(--t-space-36);
  }
  .teachers-choose-class-topics-sub-form {
    gap: var(--t-space-12);
  }
}
@media (min-width: 900px) {
  .teachers-choose-class-topics-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .teachers-choose-class-topics-form {
    margin-top: 0;
  }
}
@media (min-width: 1200px) {
  .teachers-choose-class-topics-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24) 0;
  }
  .teachers-choose-class-topics-info {
    gap: var(--t-space-16);
  }
  .teachers-choose-class-topics-form {
    gap: var(--t-space-48);
  }
  .teachers-choose-class-topics-sub-form {
    gap: var(--t-space-16);
  }
}
</style>

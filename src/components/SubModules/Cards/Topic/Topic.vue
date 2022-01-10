<template>
  <div :class="['talkie-topic-card-wrapper', customClass.toString()]">
    <talkie-check-box :defaultChecked="topicSelected" :label="topicName" />
  </div>
</template>

<script>
import { TalkieCheckBox } from "@/components/UICore";

export default {
  name: "TopicCard",
  data() {
    return {};
  },
  components: {
    TalkieCheckBox,
  },
  props: {
    topicName: {
      type: String,
    },
    topicSelected: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.talkie-topic-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--t-white);
  width: fit-content;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-topic-card-wrapper {
    border-radius: var(--t-br-small);
    padding: var(--t-space-16) var(--t-space-12);
    gap: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .talkie-topic-card-wrapper {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-24) var(--t-space-16);
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .talkie-topic-card-wrapper {
    border-radius: var(--t-br-large);
  }
}
</style>

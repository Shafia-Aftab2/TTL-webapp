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
  border-radius: var(--t-br-large);
  padding: var(--t-space-24) var(--t-space-16);
  gap: var(--t-space-16);
}
</style>

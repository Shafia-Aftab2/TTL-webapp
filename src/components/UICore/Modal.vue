<template>
  <talkie-back-drop>
    <div :class="['talkie-modal-content', customClass.toString()]">
      <slot v-if="type === 'default'" />
    </div>
  </talkie-back-drop>
</template>

<script>
import TalkieBackDrop from "./BackDrop.vue";

export default {
  name: "TalkieModal",
  components: { TalkieBackDrop },
  props: {
    type: {
      type: String,
      default: "default",
      validator: val => ["default"].includes(val)
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-modal-content {
  display: flex;
  flex-direction: column;
  background-color: var(--t-white);
  border-radius: var(--t-br-large);
  z-index: var(--t-zindex-70);
  max-width: 445px;
  width: 100%;
  gap: var(--t-space-24);
  padding: var(--t-space-36) var(--t-space-40);
}
</style>

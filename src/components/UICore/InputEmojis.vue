<template>
  <div :class="['talkie-input-emojis-wrapper']">
    <div
      :class="[
        'talkie-input-emojis-content-wrapper',
        'talkie-input-emojis-content-placeholder',
      ]"
      id="talkie-input-emojis-content-wrapper"
      :contenteditable="true"
      :emojis-content-placeholder="placeholder"
    ></div>
    <div class="talkie-input-emojis-keyboard-wrapper">
      <talkie-emoji-keyboard />
    </div>
  </div>
</template>

<script>
import TalkieEmojiKeyboard from "./EmojiKeyboard.vue";

export default {
  name: "TalkieInputEmojis",
  components: { TalkieEmojiKeyboard },
  props: {
    placeholder: {
      type: String,
      default: "Pick Emojis",
    },
  },
};
</script>

<style scoped>
.talkie-input-emojis-wrapper {
  position: relative;
  width: 100%;
}
.talkie-input-emojis-wrapper:focus-within
  .talkie-input-emojis-keyboard-wrapper {
  z-index: inherit;
  visibility: inherit;
}
.talkie-input-emojis-content-wrapper {
  border: var(--t-space-2) solid transparent;
  background-color: var(--t-white-100);
  display: flex;
  align-items: center;
  --size: 16px;
  --font-size: var(--t-fs-small);
  padding: calc(var(--size) / 1.75);
  font-size: calc(var(--font-size) / 1.35);
  min-height: calc(var(--t-space-70) + calc(var(--t-space-15) * 1));
  border-radius: calc(var(--t-br-small) * 0.7);
}
.talkie-input-emojis-content-wrapper:focus {
  border: var(--t-space-2) solid var(--t-black-50);
  box-shadow: rgba(0, 0, 0, 0.35) 0 var(--t-space-5) var(--t-space-15);
}
.talkie-input-emojis-content-item {
  height: 80px;
  width: 80px;
}
.talkie-input-emojis-content-placeholder:empty:not(:focus):before {
  content: attr(emojis-content-placeholder);
  color: var(--t-gray-50);
}
.talkie-input-emojis-keyboard-wrapper {
  z-index: var(--t-zindex-nv-50);
  visibility: hidden;
  height: fit-content;
  width: 100%;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.35) 0 var(--t-space-5) var(--t-space-15);
  margin-top: var(--t-space-10);
  max-height: 400px;
}
</style>

<template>
  <div
    :class="[
      'talkie-input-emojis-wrapper',
      `talkie-input-emojis-${size.toString()}-wrapper`,
    ]"
  >
    <div
      :class="[
        'talkie-input-emojis-content-wrapper',
        'talkie-input-emojis-content-placeholder',
      ]"
      id="talkie-input-emojis-content-wrapper"
      :contenteditable="true"
      @keydown="handleEmojiContentKeyEvent"
      @keypress="handleEmojiContentKeyEvent"
      @keyup="handleEmojiContentKeyEvent"
      @drag="handleEmojiContentEventBlock"
      @dragenter="handleEmojiContentEventBlock"
      @dragend="handleEmojiContentEventBlock"
      @dragleave="handleEmojiContentEventBlock"
      @dragover="handleEmojiContentEventBlock"
      @dragstart="handleEmojiContentEventBlock"
      @change="handleEmojiContentEventBlock"
      @forminput="handleEmojiContentEventBlock"
      @drop="handleEmojiContentEventBlock"
      @input="handleEmojiContentEventBlock"
      @paste="handleEmojiContentEventBlock"
      :emojis-content-placeholder="placeholder"
    ></div>
    <div class="talkie-input-emojis-keyboard-wrapper">
      <talkie-emoji-keyboard :onEmojiPicked="handleEmojiPicked" />
    </div>
  </div>
</template>

<script>
import TalkieEmojiKeyboard from "./EmojiKeyboard.vue";

export default {
  name: "TalkieInputEmojis",
  components: { TalkieEmojiKeyboard },
  data() {
    return {
      emojis: [],
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "Pick Emojis",
    },
    onChange: {
      type: Function,
      default: () => {},
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
  },
  methods: {
    handleEmojiContentKeyEvent(e) {
      // allow arrow and backspace keys
      const allowedKeys = [8, 37, 38, 39, 40]; // [Backspace, ArrowLeft, ArrowUp, ArrowRight, ArrowDown]
      if (!allowedKeys.includes(e.keyCode)) e.preventDefault();

      // remove last emoji from form state if backspace was pressed.
      if (e.keyCode === 8) {
        this.getActiveEmojis();
      }
    },
    handleEmojiContentEventBlock(e) {
      e.preventDefault();
    },
    addEmojiToInput(emojiName, emojiURL) {
      const input = document.getElementById(
        "talkie-input-emojis-content-wrapper"
      );

      const emojiElement = document.createElement("img");
      emojiElement.classList.add("talkie-input-emojis-content-item");
      emojiElement.src = emojiURL;
      emojiElement.alt = emojiName;
      emojiElement.contentEditable = false;
      emojiElement.height = 80;
      emojiElement.width = 80;
      input.appendChild(emojiElement);
    },
    getActiveEmojis() {
      const input = document
        .getElementById("talkie-input-emojis-content-wrapper")
        .querySelectorAll(".talkie-input-emojis-content-item");

      const _input = [...input];

      const emojis = _input
        ?.filter((x) => x.nodeName === "IMG")
        ?.map((x) => x.src);

      this.emojis = emojis;
    },
    async handleEmojiPicked(emoji) {
      this.emojis = [...this.emojis, emoji.url];
      this.onChange && (await this.onChange(this.emojis));
      this.addEmojiToInput(emoji.name, emoji.url);
      this.getActiveEmojis();
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
}

/* Size variants */
.talkie-input-emojis-small-wrapper {
  --size: var(--t-space-12);
  --font-size: var(--t-fs-base);
}
.talkie-input-emojis-medium-wrapper {
  --size: var(--t-space-16);
  --font-size: var(--t-fs-body);
}
.talkie-input-emojis-large-wrapper {
  --size: var(--t-space-20);
  --font-size: var(--t-fs-sub);
}

  margin-top: var(--t-space-10);
  max-height: 400px;
}
</style>

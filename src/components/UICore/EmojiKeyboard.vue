<template>
  <div
    class="talkie-emoji-keyboard-wrapper"
    id="talkie-emoji-keyboard-wrapper"
    :style="`--emoji-keyboard-size: ${keyboard.width}`"
  >
    <div class="talkie-emoji-keyboard-header-wrapper"></div>
    <div
      class="talkie-emoji-keyboard-content-wrapper"
      id="talkie-emoji-keyboard-content-wrapper"
    >
      <template
        v-for="(emojiItemValue, emojiItemKey) in emojis[activeEmojiCategory]"
        :key="emojiItemKey"
      >
        <button :class="['talkie-emoji-keyboard-content-item']">
          <img
            :src="emojiItemValue"
            class="talkie-emoji-keyboard-content-item-image"
          />
        </button>
      </template>
    </div>
    <div
      class="talkie-emoji-keyboard-categories-wrapper"
      :style="`--emoji-categories: ${Object.keys(emojis).length}`"
    >
      <template
        v-for="(emojiCategoryItems, emojiCategory) in emojis"
        :key="emojiCategoryItems"
      >
        <button
          :class="[
            'talkie-emoji-keyboard-categories-emoji-item',
            activeEmojiCategory === emojiCategory &&
              'talkie-emoji-keyboard-categories-emoji-item-active',
          ]"
          @click="() => handleEmojiCategoryClick(emojiCategory)"
        >
          <img
            :src="Object.values(emojiCategoryItems)[0]"
            class="talkie-emoji-keyboard-categories-emoji-item-image"
          />
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import emojis from "./EmojiKeyboard";

export default {
  name: "TalkieEmojiKeyboard",
  data() {
    return {
      emojis: emojis,
      activeEmojiCategory: Object.keys(emojis)[0],
      keyboard: {
        width: "0px",
        height: "0px",
        hasVerticalScrollbar: false,
      },
    };
  },
  created() {
    window.addEventListener("resize", this.handleDetectKeyboardSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleDetectKeyboardSize);
  },
  mounted() {
    this.handleDetectKeyboardSize();
  },
  methods: {
    handleEmojiCategoryClick(category) {
      this.activeEmojiCategory = category;
    },
    handleDetectKeyboardSize() {
      // detect keyboard width change
      const keyboard = document.getElementById("talkie-emoji-keyboard-wrapper");
      if (this.keyboard.width !== keyboard.clientWidth) {
        this.keyboard.width = keyboard.clientWidth + "px";
      }
    },
  },
};
</script>

<style scoped>
.talkie-emoji-keyboard-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-1);
}
.talkie-emoji-keyboard-content-wrapper {
  border: var(--t-space-1) solid var(--t-gray-50);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    8,
    calc(calc(var(--emoji-keyboard-size) / 8) - 1.5px)
  );
  max-height: 300px;
  overflow-x: scroll;
}
.talkie-emoji-keyboard-content-item {
  border: var(--t-space-1) solid var(--t-gray-75);
  height: calc(var(--emoji-keyboard-size) / 8);
  width: calc(var(--emoji-keyboard-size) / 8);
  transition: 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.talkie-emoji-keyboard-content-item:hover {
  background-color: var(--t-gray-100);
  cursor: pointer;
}
.talkie-emoji-keyboard-content-item-image {
  height: calc(calc(var(--emoji-keyboard-size) / 8) - var(--t-space-20));
  width: calc(calc(var(--emoji-keyboard-size) / 8) - var(--t-space-20));
}
.talkie-emoji-keyboard-categories-wrapper {
  border: var(--t-space-1) solid var(--t-gray-50);
  display: grid;
  grid-template-columns: repeat(
    var(--emoji-categories),
    calc(calc(var(--emoji-keyboard-size) / 12) - 1.5px)
  );
}
.talkie-emoji-keyboard-categories-emoji-item {
  background: transparent;
  background-color: var(--t-gray-75);
  border: var(--t-space-1) solid var(--t-gray-50);
  height: calc(var(--emoji-keyboard-size) / 12);
  width: calc(var(--emoji-keyboard-size) / 12);
  transition: 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.talkie-emoji-keyboard-categories-emoji-item:hover {
  background-color: var(--t-black-100);
  cursor: pointer;
}
.talkie-emoji-keyboard-categories-emoji-item-active {
  background-color: var(--t-black-100);
}
.talkie-emoji-keyboard-categories-emoji-item-image {
  height: calc(var(--emoji-keyboard-size) / 20);
  width: calc(var(--emoji-keyboard-size) / 20);
}
</style>

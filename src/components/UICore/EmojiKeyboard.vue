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
  overflow-x: scroll;
}
.talkie-emoji-keyboard-content-item {
  border: var(--t-space-1) solid var(--t-gray-75);
  transition: 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.talkie-emoji-keyboard-content-item:hover {
  background-color: var(--t-gray-75);
  cursor: pointer;
}
.talkie-emoji-keyboard-categories-overflow-wrapper {
  overflow: scroll;
  width: 100%;
  margin: auto;
}
.talkie-emoji-keyboard-categories-wrapper {
  border: var(--t-space-1) solid var(--t-gray-50);
  display: grid;
  background-color: var(--t-black-50);
}
.talkie-emoji-keyboard-categories-emoji-item {
  background: transparent;
  background-color: var(--t-black-50);
  border: var(--t-space-1) solid var(--t-black);
  transition: 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.talkie-emoji-keyboard-categories-emoji-item:hover {
  background-color: var(--t-black);
  cursor: pointer;
}
.talkie-emoji-keyboard-categories-emoji-item-active {
  background-color: var(--t-black-100);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-emoji-keyboard-content-wrapper {
    grid-template-columns: repeat(
      6,
      calc(calc(var(--emoji-keyboard-size) / 6) - 2px)
    );
    max-height: 250px;
  }
  .talkie-emoji-keyboard-content-wrapper::-webkit-scrollbar {
    height: var(--t-space-5) !important;
    width: var(--t-space-5) !important;
  }
  .talkie-emoji-keyboard-content-item {
    height: calc(var(--emoji-keyboard-size) / 6);
    width: calc(var(--emoji-keyboard-size) / 6);
  }
  .talkie-emoji-keyboard-content-item-image {
    height: calc(calc(var(--emoji-keyboard-size) / 6) - var(--t-space-16));
    width: calc(calc(var(--emoji-keyboard-size) / 6) - var(--t-space-16));
  }
  .talkie-emoji-keyboard-categories-overflow-wrapper::-webkit-scrollbar {
    height: var(--t-space-5) !important;
    width: var(--t-space-5) !important;
  }
  .talkie-emoji-keyboard-categories-wrapper {
    grid-template-columns: repeat(
      var(--emoji-categories),
      calc(calc(var(--emoji-keyboard-size) / 9) - 1.5px)
    );
  }
  .talkie-emoji-keyboard-categories-emoji-item {
    height: calc(var(--emoji-keyboard-size) / 9);
    width: calc(var(--emoji-keyboard-size) / 9);
  }
  .talkie-emoji-keyboard-categories-emoji-item-image {
    height: calc(var(--emoji-keyboard-size) / 15);
    width: calc(var(--emoji-keyboard-size) / 15);
  }
}
@media (min-width: 600px) {
  .talkie-emoji-keyboard-content-wrapper {
    grid-template-columns: repeat(
      10,
      calc(calc(var(--emoji-keyboard-size) / 10) - 1.25px)
    );
    max-height: 300px;
  }
  .talkie-emoji-keyboard-content-wrapper::-webkit-scrollbar {
    height: var(--t-space-8) !important;
    width: var(--t-space-8) !important;
  }
  .talkie-emoji-keyboard-content-item {
    height: calc(var(--emoji-keyboard-size) / 10);
    width: calc(var(--emoji-keyboard-size) / 10);
  }
  .talkie-emoji-keyboard-content-item-image {
    height: calc(calc(var(--emoji-keyboard-size) / 10) - var(--t-space-20));
    width: calc(calc(var(--emoji-keyboard-size) / 10) - var(--t-space-20));
  }
  /* Footer */
  .talkie-emoji-keyboard-categories-overflow-wrapper::-webkit-scrollbar {
    height: var(--t-space-8) !important;
    width: var(--t-space-8) !important;
  }
  .talkie-emoji-keyboard-categories-wrapper {
    grid-template-columns: repeat(
      calc(var(--emoji-categories) + 5),
      calc(calc(var(--emoji-keyboard-size) / 12) - 1.5px)
    );
  }
  .talkie-emoji-keyboard-categories-emoji-item {
    height: calc(var(--emoji-keyboard-size) / 12);
    width: calc(var(--emoji-keyboard-size) / 12);
  }
  .talkie-emoji-keyboard-categories-emoji-item-image {
    height: calc(var(--emoji-keyboard-size) / 20);
    width: calc(var(--emoji-keyboard-size) / 20);
  }
}
@media (min-width: 1200px) {
  .talkie-emoji-keyboard-content-wrapper {
    grid-template-columns: repeat(
      9,
      calc(calc(var(--emoji-keyboard-size) / 9) - 1.5px)
    );
  }
  .talkie-emoji-keyboard-content-item {
    height: calc(var(--emoji-keyboard-size) / 9);
    width: calc(var(--emoji-keyboard-size) / 9);
  }
  .talkie-emoji-keyboard-content-item-image {
    height: calc(calc(var(--emoji-keyboard-size) / 9) - var(--t-space-20));
    width: calc(calc(var(--emoji-keyboard-size) / 9) - var(--t-space-20));
  }
  /* Footer */
  .talkie-emoji-keyboard-categories-wrapper {
    grid-template-columns: repeat(
      var(--emoji-categories),
      calc(calc(var(--emoji-keyboard-size) / 15) - 1.5px)
    );
  }
  .talkie-emoji-keyboard-categories-emoji-item {
    height: calc(var(--emoji-keyboard-size) / 15);
    width: calc(var(--emoji-keyboard-size) / 15);
  }
  .talkie-emoji-keyboard-categories-emoji-item-image {
    height: calc(var(--emoji-keyboard-size) / 25);
    width: calc(var(--emoji-keyboard-size) / 25);
  }
}
</style>

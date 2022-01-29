<template>
  <div
    class="talkie-emoji-keyboard-wrapper"
    id="talkie-emoji-keyboard-wrapper"
    :style="`--emoji-keyboard-size: ${keyboard.width}`"
  >
    <template v-if="!computedPageLoading && !error">
      <!-- Header -->
      <div class="talkie-emoji-keyboard-header-wrapper">
        <!-- TODO: add search emojis option here -->
      </div>
      <!-- Content -->
      <div
        class="talkie-emoji-keyboard-content-wrapper"
        id="talkie-emoji-keyboard-content-wrapper"
      >
        <template
          v-for="(emojiItemURL, emojiItemName) in emojis[activeCategory]"
          :key="emojiItemName"
        >
          <button
            :class="['talkie-emoji-keyboard-content-item']"
            @click="
              async () => await handleEmojiPick(emojiItemName, emojiItemURL)
            "
          >
            <img
              :src="emojiItemURL"
              :alt="emojiItemName"
              class="talkie-emoji-keyboard-content-item-image"
            />
          </button>
        </template>
      </div>
      <!-- Footer -->
      <div class="talkie-emoji-keyboard-categories-overflow-wrapper">
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
                activeCategory === emojiCategory &&
                  'talkie-emoji-keyboard-categories-emoji-item-active',
              ]"
              @click="async () => await handleEmojiCategoryClick(emojiCategory)"
            >
              <img
                :src="Object.values(emojiCategoryItems)[0]"
                :alt="Object.values(emojiCategoryItems)[0]"
                class="talkie-emoji-keyboard-categories-emoji-item-image"
              />
            </button>
          </template>
        </div>
      </div>
    </template>

    <!-- Loading Wrapper -->
    <div class="talkie-emoji-keyboard-load-wrapper" v-if="computedPageLoading">
      <talkie-loader :size="'large'" />
    </div>

    <!-- Error Wrapper -->
    <div class="talkie-emoji-keyboard-error-wrapper" v-if="error">
      <p class="p">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import _emojis from "./EmojiKeyboard";
import { AssetService } from "@/api/services";
import TalkieLoader from "./Loader";

export default {
  name: "TalkieEmojiKeyboard",
  components: {
    TalkieLoader,
  },
  data() {
    return {
      emojis: _emojis,
      activeCategory: Object.keys(_emojis)[0],
      keyboard: {
        width: "0px",
        height: "0px",
        hasVerticalScrollbar: false,
      },
      loading: false,
      error: null,
    };
  },
  computed: {
    computedPageLoading() {
      return this.loading;
    },
  },
  async created() {
    // get emojis
    await this.getEmojis();

    // add event listeners
    window.addEventListener("resize", this.handleDetectKeyboardSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleDetectKeyboardSize);
  },
  mounted() {
    this.handleDetectKeyboardSize();
  },
  props: {
    onEmojiPicked: {
      type: Function,
      default: () => {},
    },
    onEmojiCategoryChange: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    async getEmojis() {
      // update component state
      this.loading = true;

      // api call
      const emojis = await AssetService.GetEmojis().catch(() => null);

      // failure case
      if (!emojis || Object.keys(emojis || {}).length === 0) {
        this.error = "Failed to load emojis";
        this.loading = false;
        this.handleDetectKeyboardSize();
        return;
      }

      // success case
      this.loading = false;
      this.error = null;
      this.handleDetectKeyboardSize();
    },
    handleDetectKeyboardSize() {
      // detect keyboard width change
      const keyboard = document.getElementById("talkie-emoji-keyboard-wrapper");
      if (keyboard && this.keyboard.width !== keyboard.clientWidth) {
        this.keyboard.width = keyboard.clientWidth + "px";
      }
    },
    async handleEmojiPick(emojiName, emojiURL) {
      const emojiPicked = {
        name: emojiName,
        url: emojiURL,
      };
      this.onEmojiPicked && (await this.onEmojiPicked(emojiPicked));
    },
    async handleEmojiCategoryClick(category) {
      this.activeCategory = category;

      this.onEmojiCategoryChange &&
        (await this.onEmojiCategoryChange(category));
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
  border: var(--t-space-2) solid transparent;
  background: var(--t-white-100);
}
.talkie-emoji-keyboard-wrapper:focus-within {
  border-color: var(--t-black-100);
}

/* Content */
.talkie-emoji-keyboard-content-wrapper {
  width: 100%;
  display: grid;
  overflow-x: scroll;
}
.talkie-emoji-keyboard-content-item {
  border: var(--t-space-1) solid var(--t-gray-125);
  transition: 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--t-white);
}
.talkie-emoji-keyboard-content-item:hover {
  background-color: var(--t-gray-75);
  cursor: pointer;
}
/* Footer */
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
/* Load, Error Wrappers */
.talkie-emoji-keyboard-load-wrapper,
.talkie-emoji-keyboard-error-wrapper {
  margin: auto;
}
.talkie-emoji-keyboard-load-wrapper {
  padding: var(--t-space-12);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-emoji-keyboard-wrapper {
    border-radius: calc(var(--t-br-small) * 0.7);
  }
  /* Content */
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
  /* Footer */
  .talkie-emoji-keyboard-categories-overflow-wrapper::-webkit-scrollbar {
    height: var(--t-space-5) !important;
    width: var(--t-space-5) !important;
  }
  .talkie-emoji-keyboard-categories-wrapper {
    grid-template-columns: repeat(
      var(--emoji-categories),
      calc(calc(var(--emoji-keyboard-size) / 8) - 1.5px)
    );
  }
  .talkie-emoji-keyboard-categories-emoji-item {
    height: calc(var(--emoji-keyboard-size) / 8);
    width: calc(var(--emoji-keyboard-size) / 8);
  }
  .talkie-emoji-keyboard-categories-emoji-item-image {
    height: calc(var(--emoji-keyboard-size) / 15);
    width: calc(var(--emoji-keyboard-size) / 15);
  }
  /* Load, Error Wrappers */
  .talkie-emoji-keyboard-load-wrapper,
  .talkie-emoji-keyboard-error-wrapper {
    min-height: 70px;
  }
}
@media (min-width: 600px) {
  .talkie-emoji-keyboard-wrapper {
    border-radius: var(--t-br-small);
  }
  /* Content */
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
      var(--emoji-categories),
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
  /* Load, Error Wrappers */
  .talkie-emoji-keyboard-load-wrapper,
  .talkie-emoji-keyboard-error-wrapper {
    min-height: 100px;
  }
}
@media (min-width: 1200px) {
  /* Content */
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

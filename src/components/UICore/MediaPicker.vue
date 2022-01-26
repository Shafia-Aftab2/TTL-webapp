<template>
  <div class="talkie-media-picker">
    <!-- if there is no media item -->
    <template v-if="!mediaPicked?.src">
      <label class="talkie-media-picker-label" :htmlFor="id">
        <talkie-icon
          :name="'upload'"
          :size="50"
          :iconToSizeRatio="0.5"
          :noHighlights="true"
        />
      </label>
      <input
        :id="id"
        :name="name"
        :accept="computedAllowedMediaTypes"
        type="file"
        @change="handleMediaChange"
        @input="handleChange"
        @blur="handleBlur"
        class="talkie-media-picker-input"
      />
    </template>

    <!-- if there is a media item -->
    <template v-if="mediaPicked?.src">
      <img
        :src="mediaPicked?.src"
        v-if="mediaPicked?.src?.includes('image')"
        class="talkie-media-picked"
      />
      <video
        controls
        :src="mediaPicked?.src"
        v-if="mediaPicked?.src?.includes('video')"
        class="talkie-media-picked"
      ></video>
      <span class="talkie-media-picked-remove-icon">
        <talkie-icon
          :name="'x-mark'"
          :variant="'secondary'"
          :isActive="true"
          :onClick="handleMediaRemove"
        />
      </span>
    </template>
  </div>
</template>

<script>
import TalkieIcon from "./Icon";
import { notifications } from "@/components/UIActions";

export default {
  name: "MediaPicker",
  components: { TalkieIcon },
  data() {
    return {
      id: `talkie-media-picker`,
      mediaPicked: null,
    };
  },
  methods: {
    handleMediaChange(e) {
      const file = e?.target?.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaPicked = {
          src: e.target.result,
          file,
        };
        if (!mediaPicked?.file?.type?.includes("image")) {
          notifications.show("Invalid Media Type..!", {
            variant: "error",
            displayIcon: true,
          });
          return;
        }
        this.mediaPicked = mediaPicked;
      };
      reader.readAsDataURL(file);
    },
    handleMediaRemove() {
      this.mediaPicked = null;
    },
  },
};
</script>

<style scoped>
.talkie-media-picker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--t-white-100);
  font-family: var(--t-ff-regular);
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  border: var(--t-space-2) solid transparent;
  border-radius: var(--t-br-small);
  gap: var(--t-space-16);
}
.talkie-media-picker:focus-within {
  border-color: var(--t-black-100);
}
.talkie-media-picker-label {
  cursor: pointer;
}
.talkie-media-picker-label button {
  pointer-events: none;
}
.talkie-media-picker-input {
  display: none;
}
.talkie-media-picked {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 500px;
  border-top: var(--t-space-2) solid transparent;
  border-bottom: var(--t-space-2) solid transparent;
  border-radius: var(--t-br-small);
}
.talkie-media-picked-remove-icon {
  position: absolute;
  top: var(--t-space-16);
  right: var(--t-space-16);
}
</style>

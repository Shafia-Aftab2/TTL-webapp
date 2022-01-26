<template>
  <div class="talkie-media-picker">
    <!-- if there is no media item -->
    <template v-if="!mediaPicked?.src">
      <p class="p talkie-media-picker-placeholder" v-if="placeholder">
        {{ placeholder }}
        {{ placeholder && showBrowseFilesLink ? " or " : "" }}
        <a
          class="talkie-media-picker-browse-files-link"
          v-if="showBrowseFilesLink"
        >
          <label class="talkie-media-picker-label" :htmlFor="id">
            Browse Files
          </label>
        </a>
      </p>
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
  computed: {
    computedAllowedMediaTypes() {
      return this.allowedMediaTypes?.map((x) => `${x}/*`).join(",");
    },
  },
  props: {
    allowedMediaTypes: {
      type: Array,
      default: () => ["image", "video"],
    },
    placeholder: {
      type: [String, Boolean],
      default: "Drag and drop your media here",
    },
    showBrowseFilesLink: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    isValidMedia(mediaType) {
      return this.allowedMediaTypes?.includes(mediaType?.split("/")[0]);
    },
    handleMediaChange(e) {
      const file = e?.target?.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaPicked = {
          src: e.target.result,
          file,
        };
        if (!this.isValidMedia(mediaPicked?.file?.type)) {
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
}
.talkie-media-picker:focus-within {
  border-color: var(--t-black-100);
}
.talkie-media-picker-placeholder {
  max-width: 80%;
  text-align: center;
  line-height: 1.3;
}
.talkie-media-picker-browse-files-link,
.talkie-media-picker-browse-files-link:visited {
  color: var(--t-red);
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
}
.talkie-media-picked-remove-icon {
  position: absolute;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-media-picker {
    border-radius: calc(var(--t-br-small) * 0.7);
    gap: var(--t-space-12);
  }
  .talkie-media-picked {
    border-radius: calc(var(--t-br-small) * 0.7);
  }
  .talkie-media-picked-remove-icon {
    top: var(--t-space-10);
    right: var(--t-space-10);
  }
}
@media (min-width: 600px) {
  .talkie-media-picker {
    border-radius: var(--t-br-small);
    gap: var(--t-space-16);
  }
  .talkie-media-picked {
    border-radius: var(--t-br-small);
  }
  .talkie-media-picked-remove-icon {
    top: var(--t-space-12);
    right: var(--t-space-12);
  }
}
@media (min-width: 1200px) {
  .talkie-media-picked-remove-icon {
    top: var(--t-space-16);
    right: var(--t-space-16);
  }
}
</style>

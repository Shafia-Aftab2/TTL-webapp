<template>
  <div class="talkie-media-picker-wrapper">
    <talkie-drag-drop
      :customClass="
        [
          'talkie-media-picker',
          hint &&
            hint.type &&
            `talkie-media-picker-${hint?.type?.toString()}-wrapper`,
          isMediaOnHover && `talkie-media-picker-media-hover`,
        ]?.join(' ')
      "
      :onDragEnter="handleMediaDragEnter"
      :onDragLeave="handleMediaDragLeave"
      :onDrop="handleMediaDrop"
      v-slot="{ getDroppedFiles }"
    >
      <span hidden>
        <!-- update these files via a handler -->
        {{ (this.getDroppedFiles = getDroppedFiles) }}
      </span>
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
          :class="[
            'talkie-media-picked',
            hint &&
              hint.type &&
              `talkie-media-picker-${hint?.type?.toString()}-wrapper`,
          ]"
        />
        <video
          controls
          :src="mediaPicked?.src"
          v-if="mediaPicked?.src?.includes('video')"
          :class="[
            'talkie-media-picked',
            hint &&
              hint.type &&
              `talkie-media-picker-${hint?.type?.toString()}-wrapper`,
          ]"
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
    </talkie-drag-drop>
    <p
      v-if="hint && hint.type && hint.message"
      :class="[
        `talkie-media-picker-message`,
        `talkie-media-picker-${hint.type.toString()}-message`,
      ]"
    >
      {{ hint.message }}
    </p>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import TalkieIcon from "./Icon";
import TalkieDragDrop from "./DragDrop";
import { notifications } from "@/components/UIActions";

export default {
  name: "MediaPicker",
  components: { TalkieIcon, TalkieDragDrop },
  data() {
    const {
      value: t_value,
      handleChange,
      handleBlur,
      setValue,
    } = useField(this.name);

    if (this.value) setValue(this.value);

    return {
      id: `talkie-media-picker`,
      mediaPicked: null,
      t_value,
      handleChange,
      handleBlur,
      setValue,
      getDroppedFiles: () => {},
      isMediaOnHover: false,
    };
  },
  computed: {
    computedAllowedMediaTypes() {
      return this.allowedMediaTypes?.map((x) => `${x}/*`).join(",");
    },
  },
  props: {
    name: {
      type: String,
      default: `talkie-media-picker-${Math.random() * 101010105}`,
    },
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
    hint: {
      type: Object,
      default: () => ({
        type: null,
        message: null,
      }),
    },
  },
  methods: {
    isValidMedia(mediaType) {
      return this.allowedMediaTypes?.includes(mediaType?.split("/")[0]);
    },
    handleFileProcessing(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaPicked = {
          src: e.target.result,
          file: file,
        };
        if (!this.isValidMedia(mediaPicked?.file?.type)) {
          notifications.show("Invalid Media Type!", {
            variant: "error",
            displayIcon: true,
          });
          this.setValue(null);
          this.isMediaOnHover = false;
          return;
        }
        this.mediaPicked = mediaPicked;
        this.setValue(file);
        this.isMediaOnHover = false;
      };
      reader.readAsDataURL(file);
    },
    handleMediaChange(e) {
      const file = e?.target?.files[0];
      if (!file) return;
      this.handleFileProcessing(file);
    },
    handleMediaRemove() {
      this.mediaPicked = null;
      this.setValue(null);
    },
    handleMediaDrop(e) {
      e.preventDefault();
      const files = this.getDroppedFiles(e);
      if (!files[0]) return;
      this.handleFileProcessing(files[0]);
    },
    handleMediaDragEnter(e) {
      e.preventDefault();
      this.isMediaOnHover = true;
    },
    handleMediaDragLeave(e) {
      e.preventDefault();
      this.isMediaOnHover = false;
    },
  },
};
</script>

<style scoped>
.talkie-media-picker-wrapper {
  display: block;
}
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
.talkie-media-picker-media-hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0 var(--t-space-5) var(--t-space-15);
}
.talkie-media-picker-media-hover > * {
  pointer-events: none;
  animation: shake 0.9s;
  animation-iteration-count: infinite;
}
.talkie-media-picker:focus-within {
  border-color: var(--t-black-100);
}
.talkie-media-picker-placeholder {
  max-width: 80%;
  text-align: center;
  line-height: 1.3;
  color: var(--t-gray-50);
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

/* Hint variants */
.talkie-media-picker-success-wrapper {
  border-color: var(--t-green) !important;
}
.talkie-media-picker-success-message {
  color: var(--t-green);
}
.talkie-media-picker-error-wrapper {
  border-color: var(--t-red) !important;
}
.talkie-media-picker-error-message {
  color: var(--t-red);
}
.talkie-media-picker-warning-wrapper {
  border-color: var(--t-primary) !important;
}
.talkie-media-picker-warning-message {
  color: var(--t-primary);
}
.talkie-media-picker-info-wrapper {
  border-color: var(--t-black-100) !important;
}
.talkie-media-picker-info-message {
  color: var(--t-black-100);
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
  .talkie-media-picker-message {
    margin-top: var(--t-space-2);
    font-size: calc(var(--t-fs-small) * 0.8);
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
  .talkie-media-picker-message {
    margin-top: var(--t-space-3);
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 1200px) {
  .talkie-media-picked-remove-icon {
    top: var(--t-space-16);
    right: var(--t-space-16);
  }
}

/* Animation */
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>

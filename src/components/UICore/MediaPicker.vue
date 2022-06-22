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
      <template
        v-if="
          mediaPicked?.src &&
          !(
            this.allowedMediaTypes?.includes('text/csv') &&
            this.allowedMediaTypes?.length === 1
          )
        "
      >
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

      <!-- if there is a file item picked -->
      <template
        v-if="
          mediaPicked?.src &&
          this.allowedMediaTypes?.includes('text/csv') &&
          this.allowedMediaTypes?.length === 1
        "
      >
        <span
          class="talkie-csv-file-uploaded"
          v-if="
            this.allowedMediaTypes?.includes('text/csv') &&
            this.allowedMediaTypes?.length === 1
          "
        >
          <talkie-icon
            :name="'file'"
            :variant="'secondary'"
            :size="50"
            :noHighlights="true"
          />
          {{ mediaPicked.file.name }}
          <talkie-button
            :type="'button'"
            :variant="'secondary'"
            :size="'small'"
            :onClick="showCSVPreview"
          >
            Preview
          </talkie-button>
        </span>
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
    <div
      class="csv-data-preview"
      v-if="csvDataPreview.length > 0"
      @click="handleCSVPreviewContainerClick"
    >
      <div class="csv-data-preview-container">
        <table class="csv-data-preview-table">
          <tr>
            <th
              v-for="headerData in Object.keys(csvDataPreview[0])"
              :key="headerData"
            >
              {{ headerData }}
            </th>
          </tr>
          <tr v-for="row in Object.values(csvDataPreview)" :key="row">
            <td v-for="cellValue in Object.values(row)" :key="cellValue">
              {{ cellValue }}
            </td>
          </tr>
        </table>
        <talkie-button
          :type="'button'"
          :variant="'secondary'"
          :size="'small'"
          :onClick="closeCSVPreview"
          class="ml-auto mt-8"
        >
          Close
        </talkie-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import TalkieIcon from "./Icon";
import TalkieButton from "./Button";
import TalkieDragDrop from "./DragDrop";
import { notifications } from "@/components/UIActions";
import csvParser from "papaparse";

export default {
  name: "MediaPicker",
  components: { TalkieIcon, TalkieButton, TalkieDragDrop },
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
      csvDataPreview: [],
    };
  },
  computed: {
    computedAllowedMediaTypes() {
      return this.allowedMediaTypes?.includes("text/csv") &&
        this.allowedMediaTypes?.length === 1
        ? this.allowedMediaTypes
        : this.allowedMediaTypes?.map((x) => `${x}/*`).join(",");
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
      // , "text/csv"
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
      return this.allowedMediaTypes?.includes(
        this.allowedMediaTypes?.includes("text/csv") &&
          this.allowedMediaTypes?.length === 1
          ? mediaType
          : mediaType?.split("/")[0]
      );
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
    async readCSV(file) {
      return new Promise((resolve, reject) => {
        try {
          csvParser.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              resolve(results.data);
            },
          });
        } catch {
          reject();
        }
      });
    },
    async showCSVPreview() {
      const csvData = await this.readCSV(this.mediaPicked.file).catch(
        () => null
      );

      if (!csvData || csvData?.length === 0) {
        notifications.show("CSV file broken or no records found!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      this.csvDataPreview = csvData;
    },
    handleCSVPreviewContainerClick(e) {
      if (e.target === e.currentTarget) {
        this.closeCSVPreview();
      }
    },
    closeCSVPreview() {
      this.csvDataPreview = [];
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
.talkie-csv-file-uploaded {
  padding: var(--t-space-8) var(--t-space-12);
  border-radius: var(--t-br-medium);
  gap: var(--t-space-12);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}
.csv-data-preview {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: var(--t-zindex-100);
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.csv-data-preview-container {
  padding: var(--t-space-16);
  background: var(--t-white);
  color: var(--t-black);
  border-radius: var(--t-br-small);
}
.csv-data-preview-table,
th,
td {
  border: var(--t-space-1) solid var(--t-black);
  border-collapse: collapse;
}
.csv-data-preview-table th {
  text-transform: capitalize;
  font-family: var(--t-ff-bold);
}
.csv-data-preview-table th,
.csv-data-preview-table td {
  padding: var(--t-space-5);
  text-align: left;
}
.ml-auto {
  margin-left: auto !important;
}
.mt-8 {
  margin-top: var(--t-space-8);
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

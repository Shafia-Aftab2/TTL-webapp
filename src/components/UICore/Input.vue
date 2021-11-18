<template>
  <div>
    <div
      :class="[
        'talkie-input-wrapper',
        hint && hint.type && `talkie-input-${hint.type.toString()}-wrapper`,
        disabled && `talkie-input-disabled-wrapper`
      ]"
    >
      <input
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="onChange"
        :type="type"
        :class="[
          'talkie-input',
          `talkie-input-${size.toString()}`,
          customClass.toString()
        ]"
      />
    </div>
    <p
      v-if="hint && hint.type && hint.message"
      :class="[
        `talkie-input-message`,
        `talkie-input-${hint.type.toString()}-message`
      ]"
    >
      {{ hint.message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TalkieInput",
  components: {},
  props: {
    name: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: "text",
      validator: val => ["text", "password", "email"].includes(val)
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    hint: {
      type: Object,
      default: {
        type: null,
        message: null
      }
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  methods: {}
};
</script>

<style scoped>
.talkie-input-wrapper {
  display: block;
  color: var(--t-black-100);
  background: var(--t-white-100);
  border-radius: var(--t-br-small);
  width: 100%;
  border: var(--t-space-2) solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--t-ff-regular);
}
.talkie-input-wrapper:focus-within {
  border-color: var(--t-black-100);
}
.talkie-input {
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--t-ff-regular);
  width: 100%;
  padding: var(--size);
}

/* Size variants */
.talkie-input-small {
  --size: var(--t-space-12);
  font-size: var(--t-fs-base);
}
.talkie-input-medium {
  --size: var(--t-space-16);
  font-size: var(--t-fs-body);
}
.talkie-input-large {
  --size: var(--t-space-20);
  font-size: var(--t-fs-sub);
}

/* Hint variants */
.talkie-input-message {
  margin-top: var(--t-space-3);
  font-size: var(--t-fs-small);
}
.talkie-input-success-wrapper {
  border-color: var(--t-green) !important;
}
.talkie-input-success-message {
  color: var(--t-green);
}
.talkie-input-error-wrapper {
  border-color: var(--t-red) !important;
}
.talkie-input-error-message {
  color: var(--t-red);
}
.talkie-input-warning-wrapper {
  border-color: var(--t-primary) !important;
}
.talkie-input-warning-message {
  color: var(--t-primary);
}
.talkie-input-info-wrapper {
  border-color: var(--t-black-100) !important;
}
.talkie-input-info-message {
  color: var(--t-black-100);
}

/* Disabled variant */
.talkie-input-disabled-wrapper,
.talkie-input-disabled-wrapper > input {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
  cursor: not-allowed;
}
</style>

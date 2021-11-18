<template>
  <div>
    <select
      :name="name"
      :required="required"
      @change="onChange"
      :class="[
        'talkie-select-wrapper',
        `talkie-select-${size.toString()}-wrapper`,
        hint && hint.type && `talkie-select-${hint.type.toString()}-wrapper`,
        customClass.toString()
      ]"
    >
      <option class="talkie-select-option" value="">{{
        placeholder || "Choose an option"
      }}</option>
      <option
        v-for="option in options"
        :key="Math.random() * 1651566514 * option"
        class="talkie-select-option"
        >{{ option }}</option
      >
    </select>
    <p
      v-if="hint && hint.type && hint.message"
      :class="[
        `talkie-select-message`,
        hint && hint.type && `talkie-select-${hint.type.toString()}-message`
      ]"
    >
      {{ hint.message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TalkieSelect",
  components: {},
  props: {
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean
    },
    onChange: {
      type: Function
    },
    options: {
      type: Array,
      default: []
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
  }
};
</script>

<style scoped>
.talkie-select-wrapper {
  display: block;
  display: flex;
  align-items: center;
  width: 100%;
  border: var(--t-space-2) solid transparent;
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  justify-content: space-between;
  text-transform: capitalize;
  cursor: pointer;
  border-radius: var(--t-br-small);
  /* Hide Default Right Icon */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* Custom Right Icon */
  background-image: url("../../assets/images/selectBoxIcon.png");
  background-position: 98%;
  background-repeat: no-repeat;
  padding: var(--size);
  background-size: calc(var(--size) + 4) calc(var(--size) - 4);
}
.talkie-select-wrapper:focus {
  border: var(--t-space-2) solid var(--t-black-100);
}
.talkie-select-option {
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  text-transform: capitalize;
}

/* Size variants */
.talkie-select-small-wrapper {
  --size: var(--t-space-12);
  font-size: var(--t-fs-base);
}
.talkie-select-medium-wrapper {
  --size: var(--t-space-16);
  font-size: var(--t-fs-body);
}
.talkie-select-large-wrapper {
  --size: var(--t-space-20);
  font-size: var(--t-fs-sub);
}

/* Hint variants */
.talkie-select-message {
  margin-top: var(--t-space-3);
}
.talkie-select-success-wrapper {
  border-color: var(--t-green) !important;
}
.talkie-select-success-message {
  color: var(--t-green);
}
.talkie-select-error-wrapper {
  border-color: var(--t-red) !important;
}
.talkie-select-error-message {
  color: var(--t-red);
}
.talkie-select-warning-wrapper {
  border-color: var(--t-primary) !important;
}
.talkie-select-warning-message {
  color: var(--t-primary);
}
.talkie-select-info-wrapper {
  border-color: var(--t-black-100) !important;
}
.talkie-select-info-message {
  color: var(--t-black-100);
}
</style>

<template>
  <div>
    <div :class="['talkie-input-wrapper']">
      <input
        :name="name"
        :value="value"
        :required="required"
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
    onChange: {
      type: Function,
      default: () => {}
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
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
  font-size: var(--t-fs-body);
}
.talkie-input-wrapper:focus-within {
  border: var(--t-space-2) solid var(--t-black-100);
}
.talkie-input {
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--t-ff-regular);
  font-size: var(--t-fs-body);
  width: 100%;
  padding: var(--size);
}

/* Size variants */
.talkie-input-small {
  --size: var(--t-space-12);
}
.talkie-input-medium {
  --size: var(--t-space-16);
}
.talkie-input-large {
  --size: var(--t-space-20);
}
</style>

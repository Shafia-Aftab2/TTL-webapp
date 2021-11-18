<template>
  <div>
    <div :class="['talkie-input-wrapper', customClass.toString()]">
      <input
        :name="name"
        :value="value"
        :required="required"
        :placeholder="placeholder"
        @change="onChange"
        :type="type"
        class="talkie-input"
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
      type: Function
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
}
</style>

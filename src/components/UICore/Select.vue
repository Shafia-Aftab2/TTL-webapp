<template>
  <div>
    <select
      :name="name"
      :required="required"
      @change="onChange"
      :class="['talkie-select-wrapper', customClass.toString()]"
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
  font-size: var(--t-fs-body);
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  justify-content: space-between;
  text-transform: capitalize;
  font-family: "Inter";
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
}
.talkie-select-wrapper:focus {
  border: var(--t-space-2) solid var(--t-black-100);
}
.talkie-select-option {
  color: var(--t-black-100);
  background-color: var(--t-white-100);
  text-transform: capitalize;
}
</style>

<template>
  <button
    :type="type"
    :class="['talkie-button', customClass.toString()]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "TalkieButton",
  components: {},
  props: {
    type: {
      type: String,
      default: "submit"
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-button {
  background: transparent;
  border: transparent;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease;
  color: var(--t-black-100);
  border-radius: var(--t-br-medium);
  font-family: var(--t-ff-regular);
  font-size: var(--t-fs-base);
}
</style>

<template>
  <button
    type="button"
    :class="['talkie-chip', customClass.toString()]"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TalkieChip",
  props: {
    label: {
      type: String,
      default: "Chip"
    },
    onClick: { type: Function, default: () => {} },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-chip {
  display: inline-block;
  color: var(--t-black-100);
  background: transparent;
  border-radius: var(--t-br-large);
  width: fit-content;
  cursor: pointer;
  border: transparent;
  transition: 0.1s ease;
  text-transform: capitalize;
}
.talkie-chip:hover {
  filter: opacity(0.8);
}
</style>

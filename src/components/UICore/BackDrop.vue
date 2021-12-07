<template>
  <div :class="[`talkie-backdrop`, customClass.toString()]"><slot /></div>
</template>

<script>
export default {
  name: "TalkieBackDrop",
  components: {},
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.talkie-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--t-zindex-20);
  background-color: rgba(128, 128, 128, 0.5);
}
</style>

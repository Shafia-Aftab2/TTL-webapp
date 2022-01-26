<template>
  <div
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <slot :getDroppedFiles="getDroppedFiles" />
  </div>
</template>

<script>
export default {
  name: "DragDrop",
  props: {
    onDragEnter: {
      type: Function,
      default: (e) => e.preventDefault(),
    },
    onDragOver: {
      type: Function,
      default: (e) => e.preventDefault(),
    },
    onDragLeave: {
      type: Function,
      default: (e) => e.preventDefault(),
    },
    onDrop: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    getDroppedFiles(e) {
      return e?.dataTransfer?.files;
    },
  },
};
</script>

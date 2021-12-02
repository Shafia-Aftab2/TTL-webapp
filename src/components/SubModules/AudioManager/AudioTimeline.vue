<template>
  <div :ref="refId" @mousedown="handleMouseDown" class="audio-timeline-wrapper">
    <div class="audio-timeline-head" :style="getAudioTimelineHeadSize"></div>
  </div>
</template>

<script>
import { calculateLineHeadPosition } from "./lib/utils";

export default {
  name: "AudioTimeline",
  props: {
    refId: { type: String, default: "0" },
    percentage: { type: Number, default: 0 },
    onHeadChange: { type: String },
  },
  computed: {
    getAudioTimelineHeadSize() {
      const value =
        this.percentage < 1 ? this.percentage * 100 : this.percentage;
      return `${"width"}: ${value}%`;
    },
  },
  methods: {
    handleMouseDown(ev) {
      const newHeadPosition = calculateLineHeadPosition(
        ev,
        this.$refs[this.refId]
      );
      this.onHeadChange && this.onHeadChange(newHeadPosition);
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp(ev) {
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
      const newHeadPosition = calculateLineHeadPosition(
        ev,
        this.$refs[this.refId]
      );
      this.onHeadChange && this.onHeadChange(newHeadPosition);
    },
    handleMouseMove(ev) {
      const newHeadPosition = calculateLineHeadPosition(
        ev,
        this.$refs[this.refId]
      );
      this.onHeadChange && this.onHeadChange(newHeadPosition);
    },
  },
};
</script>

<style scoped>
.audio-timeline-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  height: 10px;
  border-style: solid;
  border-color: var(--t-secondary);
  position: relative;
  height: var(--t-space-10);
  border-width: var(--t-space-2);
}
.audio-timeline-head {
  position: absolute;
  height: inherit;
  background-color: var(--t-secondary);
}
</style>

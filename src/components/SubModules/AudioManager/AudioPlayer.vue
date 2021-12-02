<template>
  <slot
    :togglePlayer="togglePlayer"
    :startPlayer="startPlayer"
    :stopPlayer="stopPlayer"
    :isPlaying="isPlaying"
    :updateAudioPercentage="updateAudioPercentage"
    :currentAudioPercentage="currentAudioPercentage"
    :totalAudioPlaybackTime="totalAudioPlaybackTime"
    :currentAudioPlaybackTime="currentAudioPlaybackTime"
    :playerId="audioPlayerId"
  />
  <audio :id="audioPlayerId" :src="audioSource"></audio>
</template>

<script>
import { convertTimeMMSS } from "./lib/utils";

export default {
  data() {
    return {
      isPlaying: false,
      currentAudioPercentage: 0,
      totalAudioPlaybackTime: convertTimeMMSS(0),
      currentAudioPlaybackTime: convertTimeMMSS(0),
    };
  },
  props: {
    source: { type: String },
    recording: { type: Object },
  },
  mounted: function () {
    this.player = document.getElementById(this.audioPlayerId);
    this.player.addEventListener("ended", () => (this.isPlaying = false));
    this.player.addEventListener("loadeddata", (ev) => {
      this.handlePlayerPercentageReset();
      this.totalAudioPlaybackTime = convertTimeMMSS(this.player.duration);
    });
    this.player.addEventListener("timeupdate", this.handlePlayerTimelineUpdate);
  },
  computed: {
    audioSource() {
      const url = this.source || this.recording.url;
      if (url) {
        return url;
      } else {
        this.handlePlayerPercentageReset();
      }
      return null;
    },
    audioPlayerId() {
      return `audio-player-${Math.random() * 486514321}`;
    },
  },
  methods: {
    // slot handlers
    togglePlayer() {
      if (!this.audioSource) return;

      if (this.isPlaying) {
        this.player.pause();
      } else {
        setTimeout(() => {
          this.player.play();
        }, 0);
      }
      this.isPlaying = !this.isPlaying;
    },
    stopPlayer() {
      if (!this.audioSource) return;
      this.player.pause();
      this.isPlaying = false;
    },
    startPlayer() {
      if (!this.audioSource) return;
      setTimeout(() => this.player.play(), 0);
      this.isPlaying = true;
    },
    updateAudioPercentage(pos) {
      this.handlePlayerPercentageUpdate(pos);
    },

    // private handlers
    handlePlayerPercentageReset() {
      if (this.isPlaying) {
        this.player.pause();
      }
      this.totalAudioPlaybackTime = convertTimeMMSS(0);
      this.currentAudioPlaybackTime = convertTimeMMSS(0);
      this.currentAudioPercentage = 0;
      this.isPlaying = false;
    },
    handlePlayerTimelineUpdate() {
      this.currentAudioPlaybackTime = convertTimeMMSS(this.player.currentTime);
      this.currentAudioPercentage =
        (this.player.currentTime / this.player.duration) * 100;
    },
    handlePlayerPercentageUpdate(pos) {
      if (pos) {
        this.player.currentTime = pos * this.player.duration;
      }
    },
  },
};
</script>

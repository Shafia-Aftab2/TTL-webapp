<template>
  <slot
    :toggleRecording="toggleRecording"
    :startRecording="startRecording"
    :stopRecording="stopRecording"
    :pauseRecording="pauseRecording"
    :downloadRecording="downloadRecording"
    :isRecording="isRecording"
    :isPaused="isPaused"
    :recordingVolume="recordingVolume"
    :recordingDuration="recordingDuration"
  />
</template>

<script>
import Recorder from "./lib/recorder";
import { convertTimeMMSS } from "./lib/utils";
export default {
  name: "AudioRecorder",
  data() {
    return {
      recorder: this._initRecorder(),
      recordList: [],
    };
  },
  props: {
    audioFilename: { type: String, default: "talkie-audio" },
    audioFormat: { type: String, default: "mp3" },
    audioTimeLimitInMinutes: { type: Number },
    audioSampleBitRate: { type: Number, default: 128 },
    audioSampleRate: { type: Number, default: 44100 },
    onRecordingStart: { type: Function },
    onRecordingPaused: { type: Function },
    onRecordingStopped: { type: Function },
    onMikeFailure: { type: Function },
  },
  beforeUnmount() {
    this.stopRecorder();
  },
  methods: {
    _initRecorder() {
      return new Recorder({
        onRecordingStart: this.onRecordingStart,
        onRecordingStopped: this.onRecordingStopped,
        onRecordingPaused: this.onRecordingPaused,
        micFailed: this.onMikeFailure,
        bitRate: this.audioSampleBitRate,
        sampleRate: this.audioSampleRate,
        format: this.audioFormat,
      });
    },
    toggleRecording() {
      if (!this.isRecording || (this.isRecording && this.isPaused)) {
        this.recorder.start();
      } else {
        this.recorder.pause();
      }
    },
    stopRecording() {
      if (!this.isRecording) return;
      this.recorder.stop();
      this.recordList = this.recorder.recordList();
    },
    startRecording() {
      if (!this.isRecording || (this.isRecording && this.isPaused)) {
        this.recordList = [];
        this.recorder.start();
      }
    },
    pauseRecording() {
      if (!(!this.isRecording || (this.isRecording && this.isPaused))) {
        this.recorder.pause();
      }
    },
    downloadRecording() {
      if (this.recordList.length === 0 || !this.recordList[0].url) return;
      const type = this.recordList[0].blob.type.split("/")[1];
      const link = document.createElement("a");
      link.href = this.recordList[0].url;
      link.download = `${
        this.audioFilename
      }-${new Date().toISOString()}.${type}`;
      link.click();
    },
  },
  computed: {
    isPaused() {
      return this.recorder.isPause;
    },
    isRecording() {
      return this.recorder.isRecording;
    },
    recordingVolume() {
      return parseFloat(this.recorder.volume);
    },
    recordingDuration() {
      if (
        this.audioTimeLimitInMinutes &&
        this.recorder.duration >= this.audioTimeLimitInMinutes * 60
      ) {
        this.stopRecorder();
      }
      return convertTimeMMSS(this.recorder.duration);
    },
  },
};
</script>

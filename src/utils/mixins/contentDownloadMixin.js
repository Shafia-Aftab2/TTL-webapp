export default {
  methods: {
    downloadAudio(downloadFilename, audioUrl) {
      const element = document.createElement("a");

      element.setAttribute("href", audioUrl);
      element.setAttribute("download", downloadFilename); // TODO: fix this (filename)
      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};

export default {
  methods: {
    downloadDocument(downloadFilename, documentUrl) {
      const element = document.createElement("a");

      element.setAttribute("href", documentUrl);
      element.setAttribute("download", downloadFilename); // TODO: fix this (filename)
      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};

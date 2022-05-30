export default {
  data() {
    const mobileSize = 900;
    const _isMobileScreen = window.innerWidth < mobileSize;

    return {
      mobileSize: mobileSize,
      isMobileScreen: _isMobileScreen,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onWindowResize);
    });
  },
  methods: {
    onWindowResize() {
      this.isMobileScreen = window.innerWidth < this.mobileSize;
    },
  },
};

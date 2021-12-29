<template>
  <div class="comming-soon-wrapper">
    <img
      :src="require(`@/assets/images/warning-logo.png`)"
      class="comming-soon-image"
    />
    <h4 class="h4">Comming Soon</h4>
    <p class="p">This page is under construction. Stay Tuned..!</p>
    <talkie-button
      :size="'medium'"
      :onClick="handleBackClick"
      :noHighlights="true"
    >
      Go Back
    </talkie-button>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "Error404",
  components: {
    TalkieButton,
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.comming-soon-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.comming-soon-image {
  height: var(--image-size);
  width: var(--image-size);
}

/* Responsive Variants */
@media (max-width: 599px) {
  .comming-soon-wrapper {
    gap: var(--t-space-16);
    flex-direction: column;
  }
  .comming-soon-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
}
@media (min-width: 600px) {
  .comming-soon-wrapper {
    gap: var(--t-space-24);
  }
  .comming-soon-image {
    --image-size: calc(var(--t-space-70) * 1.7);
  }
}
@media (min-width: 900px) {
  .comming-soon-image {
    --image-size: calc(var(--t-space-70) * 2);
  }
}
</style>

<template>
  <div class="upgrade-success-wrapper">
    <div class="upgrade-success-header-wrapper">
      <h3 class="h3">Hooray!</h3>
      <h3 class="h3">Now, let’s get your students speaking!</h3>
    </div>

    <img
      :src="require(`@/assets/images/upgrade-success-hero.png`)"
      class="upgrade-success-hero"
    />

    <h3 class="h3 m-auto">Need some ideas!</h3>

    <talkie-icon
      class="m-auto"
      :name="'arrow-bottom'"
      :noHighlights="true"
      :size="50"
    />

    <div class="upgrade-success-guide-wrapper">
      <div class="upgrade-success-guide-hero"></div>
      <div class="upgrade-success-guide-content">
        <h3 class="h3">Download our FREE guide</h3>
        <p class="p">
          Tired of limiting your students to general conversation? You’ve come
          to the right place. Let’s get creative with speaking! Find out how you
          can make the most of talkie with our free guide.
        </p>
        <!-- TODO: what happens when this button is clicked -->
        <talkie-button :variant="'dark'">Get my copy</talkie-button>
      </div>
    </div>

    <talkie-button
      class="m-auto"
      :variant="'dark'"
      :outlined="true"
      :onClick="handleHomeButtonClick"
    >
      Home
    </talkie-button>
  </div>
</template>

<script>
import { TalkieButton, TalkieIcon } from "@/components/UICore";

export default {
  name: "ServicesUpgrade",
  components: { TalkieButton, TalkieIcon },
  data() {
    return {};
  },
  methods: {
    handleHomeButtonClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.upgrade-success-wrapper {
  width: 100%;
  padding: var(--t-space-40) 0;
  padding-bottom: var(--t-space-70);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-36);
}
.upgrade-success-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-5);
  text-align: center;
  line-height: 1.25;
  color: var(--t-black-50);
}
.m-auto {
  margin: auto;
}
.upgrade-success-guide-wrapper {
  display: grid;
  place-items: center;
}
.upgrade-success-hero {
  aspect-ratio: 16 / 9;
  margin: auto;
}
.upgrade-success-guide-hero {
  background: gray;
  border-radius: 8px;
  /* TODO: box size and add image */
}
.upgrade-success-guide-content {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
}

/* Responsive variants */
@media (max-width: 599px) {
  .upgrade-success-guide-wrapper {
    grid-template-rows: 1fr 1fr;
    padding: var(--t-space-16) var(--t-space-36);
    gap: var(--t-space-20);
  }
  .upgrade-success-hero {
    width: 300px;
  }
  .upgrade-success-guide-hero {
    width: 200px;
    height: 200px;
  }
  .upgrade-success-guide-content {
    gap: var(--t-space-24);
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
@media (min-width: 600px) {
  .upgrade-success-guide-wrapper {
    grid-template-rows: 1fr 1fr;
    padding: var(--t-space-16) var(--t-space-50);
  }
  .upgrade-success-hero {
    width: 400px;
  }
  .upgrade-success-guide-hero {
    width: 300px;
    height: 300px;
  }
  .upgrade-success-guide-content {
    gap: var(--t-space-24);
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
@media (min-width: 900px) {
  .upgrade-success-guide-wrapper {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: initial;
    padding: var(--t-space-36);
    gap: var(--t-space-36);
  }
  .upgrade-success-hero {
    width: 550px;
  }
  .upgrade-success-guide-hero {
    width: 400px;
    height: 400px;
  }
  .upgrade-success-guide-content {
    gap: var(--t-space-28);
    justify-content: initial;
    align-items: initial;
    text-align: initial;
  }
}
@media (min-width: 1200px) {
  .upgrade-success-guide-wrapper {
    padding: var(--t-space-36);
  }
  .upgrade-success-hero {
    width: 700px;
  }
  .upgrade-success-guide-hero {
    width: 450px;
    height: 450px;
  }
  .upgrade-success-guide-content {
    gap: var(--t-space-28);
  }
}
</style>

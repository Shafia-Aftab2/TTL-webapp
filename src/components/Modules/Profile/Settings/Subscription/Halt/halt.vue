<template>
  <div class="profile-subscription-halt-wrapper">
    <h2 class="h2">
      {{ this.copy?.[this.haltMode]?.title }}
    </h2>

    <p
      class="p profile-subscription-halt-description"
      v-html="this.copy?.[this.haltMode]?.description"
    ></p>

    <div class="profile-subscription-halt-topics-wrapper">
      <talkie-topic-card
        v-for="reason in this.copy?.[this.haltMode]?.reasons"
        :key="reason"
        :fullWidth="true"
        :topicName="reason?.text"
      />
      <talkie-button class="ml-auto" :variant="'dark'">
        {{ this.copy?.[this.haltMode]?.ctaText }}
      </talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";
import { TalkieTopicCard } from "@/components/SubModules/Cards";

export default {
  name: "ServicesUpgrade",
  components: { TalkieButton, TalkieTopicCard },
  data() {
    return {
      copy: {
        pause: {
          title: "Taking a break?",
          description: `
          We totally understand, rest is productive. That said, if there are other
          reasons, we’d hugely appreciate it if you could share it with us.

          <br />
          <br />
          Why do you want to pause?
          <br />
          Please tick as many as you want:`,
          reasons: [
            {
              checked: false,
              text: "It’s too expensive",
            },
            {
              checked: false,
              text: "Products and features are too complicated for me",
            },
            {
              checked: false,
              text: "The app didn’t work as expected",
            },
            {
              checked: false,
              text: "I’m not using it enough",
            },
            {
              checked: false,
              text: "I only needed it for this term / for a short period",
            },
            {
              checked: false,
              text: "Other (please specify)",
            },
          ],
          ctaText: "Pause plan",
        },
        cancel: {
          title: "Cancel subscription",
          description: `
            We’re sorry to see you go :( 

            <br />
            <br />
            We’d love to know why you want to cancel. 
            <br />
            Please tick as many as you want:`,
          reasons: [
            {
              checked: false,
              text: "It’s too expensive",
            },
            {
              checked: false,
              text: "Products and features are too complicated for me",
            },
            {
              checked: false,
              text: "The app didn’t work as expected",
            },
            {
              checked: false,
              text: "I’m not using it enough",
            },
            {
              checked: false,
              text: "I only needed it for this term / for a short period",
            },
            {
              checked: false,
              text: "Other (please specify)",
            },
          ],
          ctaText: "Cancel plan",
        },
      },
    };
  },
  props: {
    haltMode: {
      type: String,
      default: "pause",
      validator: (val) => ["pause", "cancel"].includes(val),
    },
  },
};
</script>

<style scoped>
.profile-subscription-halt-wrapper {
  display: flex;
  flex-direction: column;
}
.profile-subscription-halt-description {
  line-height: 1.5;
}
.profile-subscription-halt-topics-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-16);
  width: 55%;
}
.ml-auto {
  margin-left: auto;
}
/* Responsive variants */
@media (max-width: 599px) {
  .profile-subscription-halt-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-36) var(--t-space-24);
    padding-bottom: var(--t-space-50);
  }
  .profile-subscription-halt-topics-wrapper {
    gap: var(--t-space-12);
    width: 100%;
  }
}
@media (min-width: 600px) {
  .profile-subscription-halt-wrapper {
    gap: var(--t-space-36);
    padding: var(--t-space-36) var(--t-space-36);
    padding-bottom: calc(var(--t-space-36) * 2);
  }
  .profile-subscription-halt-topics-wrapper {
    gap: var(--t-space-16);
    width: 100%;
  }
}
@media (min-width: 900px) {
  .profile-subscription-halt-wrapper {
    padding: var(--t-space-36) 0;
    padding-bottom: calc(var(--t-space-50) * 2);
  }
  .profile-subscription-halt-topics-wrapper {
    width: 70%;
  }
}
@media (min-width: 1200px) {
  .profile-subscription-halt-topics-wrapper {
    width: 55%;
  }
}
</style>

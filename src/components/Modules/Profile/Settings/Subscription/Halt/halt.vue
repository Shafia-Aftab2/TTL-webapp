<template>
  <div class="profile-subscription-halt-wrapper" v-if="!isHalted">
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
        :onTopicCheckToggle="
          (isSelected) => handleHaltReasonToggle(reason.text, isSelected)
        "
      />
      <talkie-topic-card
        :fullWidth="true"
        :topicName="'Other (please specify)'"
        :onTopicCheckToggle="
          () => setShowExtendedHaltReasonsBox(!showExtendedHaltReasonsBox)
        "
      />
      <talkie-input
        v-if="showExtendedHaltReasonsBox"
        :customClass="'profile-subscription-halt-topics-input'"
        :multiline="true"
        :placeholder="'Please tell us more so we can improve our offering.'"
        :onChange="handleCustomReasonInputChange"
      />
      <talkie-alert v-if="error" :text="error" :variant="'error'" />
      <talkie-button
        class="ml-auto"
        :variant="'dark'"
        :onClick="checkIfReasonsAreSelected"
      >
        {{ this.copy?.[this.haltMode]?.ctaText }}
      </talkie-button>
    </div>
    <talkie-modal
      :type="'confirm'"
      :contentPadded="true"
      :closeButton="true"
      :centered="true"
      :maxWidth="700"
      :title="'Before you go...'"
      :description="'Please note we’ll keep your data for another 3 months. <br> After that, it’ll be a clean slate and you’ll no longer have access to your previous data. Are you sure you want to pause?'"
      :onClose="() => setShowConfirmationModal(false)"
      :onConfirm="haltSubscription"
      :confirmButtonText="'Yes, I’m sure'"
      :confirmButtonVariant="'dark'"
      v-if="showConfirmationModal"
    />
  </div>
  <div class="profile-subscription-halt-success-message" v-if="isHalted">
    <h3 class="h3 text-center">
      {{ haltMode === "cancel" ? "Sad to see you go! :(" : "See you soon!" }}
    </h3>

    <img
      :src="require(`@/assets/images/message-received.png`)"
      class="message-received-hero"
    />

    <talkie-button :variant="'dark'" :onClick="redirectHome">
      Home
    </talkie-button>
  </div>
  <talkie-back-drop-loader v-if="backdropLoading" />
</template>

<script>
import {
  TalkieButton,
  TalkieBackDropLoader,
  TalkieInput,
  TalkieModal,
  TalkieAlert,
} from "@/components/UICore";
import { TalkieTopicCard } from "@/components/SubModules/Cards";
import { SubscriptionService } from "@/api/services";
import { notifications } from "@/components/UIActions";

export default {
  name: "SettingsSubscriptionHalt",
  components: {
    TalkieButton,
    TalkieBackDropLoader,
    TalkieInput,
    TalkieModal,
    TalkieAlert,
    TalkieTopicCard,
  },
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
          ],
          ctaText: "Cancel plan",
        },
      },
      showConfirmationModal: false,
      isHalted: false,
      haltReasons: [],
      customReason: "",
      showExtendedHaltReasonsBox: false,
      backdropLoading: false,
      error: null,
    };
  },
  props: {
    haltMode: {
      type: String,
      default: "pause",
      validator: (val) => ["pause", "cancel"].includes(val),
    },
  },
  methods: {
    redirectHome() {
      this.$router.push("/");
    },
    setShowConfirmationModal(show) {
      this.showConfirmationModal = show;
    },
    handleHaltReasonToggle(reason, isSelected) {
      let haltReasons = [...this.haltReasons];
      if (isSelected) {
        haltReasons.push(reason);
      } else {
        haltReasons = haltReasons.filter((x) => x !== reason);
      }
      this.haltReasons = haltReasons;
    },
    handleCustomReasonInputChange(e) {
      this.customReason = e.target.value?.trim();
    },
    setShowExtendedHaltReasonsBox(show) {
      this.showExtendedHaltReasonsBox = show;
    },
    async haltSubscription() {
      // update page state
      this.backdropLoading = true;
      this.showConfirmationModal = false;

      // api payload
      const payload = {
        reason: (() => {
          let _reason = "";

          this.haltReasons?.map((x) => {
            _reason = _reason + ` {_{ ${x} }_} `;
          });

          if (this.customReason) {
            _reason = _reason + ` {_custom_{ ${this.customReason?.trim()} }_}`;
          }

          return _reason?.trim();
        })(),
        ...(this.haltMode === "pause" && { status: "pause" }),
      };

      // api call
      const response = await (this.haltMode === "pause"
        ? SubscriptionService.ChangeSubscriptionStatus
        : SubscriptionService.CancelSubscription)(payload).catch(() => {
        return {
          error: `Oops, we can't seem to ${this.haltMode} your subscription. Please try again later.`,
        };
      });

      // failure case
      if (response?.error) {
        this.backdropLoading = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      this.isHalted = true;
      notifications.show(
        `Subscription ${this.haltMode}${
          this.haltMode === "pause" ? "d" : "ed"
        } successfully.`,
        {
          variant: "success",
          displayIcon: true,
        }
      );
    },
    checkIfReasonsAreSelected() {
      if (this.haltReasons?.length === 0 && !this.customReason) {
        this.error = "Please select an option!";
        return;
      }
      this.error = "";
      this.setShowConfirmationModal(true);
    },
  },
};
</script>

<style>
.profile-subscription-halt-topics-input {
  background: var(--t-white) !important;
}
</style>

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
.text-center {
  text-align: center;
}
.profile-subscription-halt-success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--t-space-36);
  padding: var(--t-space-36);
}
.message-received-hero {
  height: auto;
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
  .profile-subscription-halt-success-message {
    gap: var(--t-space-24);
    padding: var(--t-space-36);
  }
  .message-received-hero {
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
  .profile-subscription-halt-success-message {
    gap: var(--t-space-24);
    padding: var(--t-space-36);
  }
  .message-received-hero {
    width: 70%;
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
  .profile-subscription-halt-success-message {
    gap: var(--t-space-36);
  }
  .message-received-hero {
    width: 60%;
  }
}
@media (min-width: 1200px) {
  .profile-subscription-halt-topics-wrapper {
    width: 55%;
  }
}
</style>

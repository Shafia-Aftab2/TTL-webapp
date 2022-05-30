<template>
  <div class="profile-account-settings-wrapper">
    <h2 class="h2">Your Account</h2>

    <div class="profile-account-settings-section">
      <h5 class="h5">Subscription status</h5>
      <div class="profile-account-settings-section-card">
        <div class="profile-account-settings-section-card-header">
          <span class="profile-account-settings-section-card-circle"></span>
          <h5 class="h5 profile-account-settings-section-card-header-text">
            Active
          </h5>
        </div>
        <talkie-chip :variant="'neutral'" :label="'Change my status'" />
      </div>
    </div>

    <div class="profile-account-settings-section">
      <h5 class="h5">Current Plan</h5>
      <div class="profile-account-settings-section-card">
        <div class="profile-account-settings-section-card-header">
          <h5 class="h5">Exam-ready</h5>
          <p class="p">£10/month</p>
        </div>
        <talkie-chip :variant="'neutral'" :label="'Change my plan'" />
      </div>
    </div>

    <div class="profile-account-settings-section">
      <h5 class="h5">Payment Details</h5>
      <div class="profile-account-settings-section-card">
        <div class="profile-account-settings-section-card-header">
          <p class="p">XXXX-XXXX-XXXX-8732</p>
        </div>
        <talkie-chip
          :variant="'neutral'"
          :label="'Change my payment details'"
        />
      </div>
    </div>

    <div class="profile-account-settings-section">
      <h5 class="h5">Billing</h5>
      <div class="profile-account-settings-section-card">
        <div class="profile-account-settings-section-card-header">
          <p class="p">May 13, 2022 - £10.00</p>
        </div>
        <talkie-icon
          :name="'arrow-head-bottom'"
          :variant="'secondary'"
          :isActive="true"
          :size="35"
        />
      </div>
    </div>

    <div class="profile-account-settings-section">
      <h5 class="h5">Got a question?</h5>
      <talkie-button
        :variant="'dark'"
        :outlined="true"
        :onClick="redirectToContactUs"
      >
        Ask away!
      </talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieButton, TalkieChip, TalkieIcon } from "@/components/UICore";

export default {
  name: "SettingsAccount",
  components: { TalkieChip, TalkieIcon, TalkieButton },
  data() {
    return {};
  },
  methods: {
    redirectToContactUs() {
      this.$router.push("/contact");
    },
  },
};
</script>

<style scoped>
.profile-account-settings-wrapper {
  display: flex;
  flex-direction: column;
}
.profile-account-settings-section {
  display: flex;
  flex-direction: column;
}
.profile-account-settings-section-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--t-white);
  border: var(--t-space-1) solid var(--t-gray-100);
}
.profile-account-settings-section-card-header {
  display: flex;
  align-items: center;
}
.profile-account-settings-section-card-circle {
  border-radius: 50%;
  background: var(--t-green);
  display: block;
}
.profile-account-settings-section-card-header-text {
  color: var(--t-green);
}

/* Responsive variants */
@media (max-width: 599px) {
  .profile-account-settings-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-36) var(--t-space-24);
    padding-bottom: var(--t-space-50);
  }
  .profile-account-settings-section {
    gap: var(--t-space-8);
  }
  .profile-account-settings-section-card {
    flex-direction: column;
    justify-content: center;
    gap: var(--t-space-12);
    border-radius: var(--t-br-medium);
    padding: var(--t-space-16) var(--t-space-24);
  }
  .profile-account-settings-section-card-header {
    gap: var(--t-space-8);
  }
  .profile-account-settings-section-card-circle {
    height: var(--t-space-12);
    width: var(--t-space-12);
  }
}
@media (min-width: 600px) {
  .profile-account-settings-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-36) var(--t-space-24);
    padding-bottom: calc(var(--t-space-36) * 2);
  }
  .profile-account-settings-section {
    gap: var(--t-space-12);
  }
  .profile-account-settings-section-card {
    border-radius: var(--t-br-large);
    padding: var(--t-space-24) var(--t-space-24);
  }
  .profile-account-settings-section-card-header {
    gap: var(--t-space-12);
  }
  .profile-account-settings-section-card-circle {
    height: var(--t-space-16);
    width: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .profile-account-settings-wrapper {
    gap: var(--t-space-44);
    padding: var(--t-space-36) var(--t-space-24);
    padding-bottom: calc(var(--t-space-50) * 2);
  }
}
@media (min-width: 1200px) {
  .profile-account-settings-wrapper {
    padding: var(--t-space-36) 0;
  }
}
</style>

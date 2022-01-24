<template>
  <div class="upgrade-wrapper">
    <div class="upgrade-info-wrapper">
      <h2 class="h2" v-if="!userIsSubscribed">Upgrade - Pricing</h2>
      <h2 class="h2" v-if="userIsSubscribed">
        You account is Already Upgraded..!
      </h2>

      <h4 class="h4">£30 individual teacher / annual</h4>
      <h3 class="h3">£2.50/month</h3>
    </div>

    <div
      class="upgrade-fields-wrapper"
      :class="!showPaymentCardDetailsForm && 'upgrade-fields-wrapper-hidden'"
    >
      <form
        class="talkie-stripe-payments-form"
        id="talkie-stripe-payments-form"
      >
        <h3 class="h3">Add Payment Method</h3>
        <div id="talkie-stripe-payments-element">
          <!-- Elements will create form elements here -->
        </div>
        <div
          class="talkie-stripe-payments-form-error-message-wrapper"
          id="talkie-stripe-payments-form-error-message-wrapper"
        >
          <!-- Display error message to your customers here -->
        </div>
        <talkie-button :type="'submit'">Upgrade</talkie-button>
      </form>
      <div class="talkie-stripe-payments-form-wrapper"></div>
    </div>

    <div class="upgrade-options-wrapper">
      <talkie-button
        :onClick="handleUpgradeAccountFlow"
        v-if="!userIsSubscribed && !showPaymentCardDetailsForm"
      >
        Upgrade
      </talkie-button>

      <talkie-button
        :onClick="handleDowngradeAccountFlow"
        v-if="userIsSubscribed"
      >
        Downgrade
      </talkie-button>
    </div>
  </div>
  <talkie-back-drop-loader v-if="backdropLoading" />
</template>

<script>
import { TalkieButton, TalkieBackDropLoader } from "@/components/UICore";
import { AuthService, UserService, SubscriptionService } from "@/api/services";
import { loadStripe } from "@stripe/stripe-js";
import { notifications } from "@/components/UIActions";
import authUser from "@/utils/helpers/auth";
import subscriptionStatus from "@/utils/constants/subscriptionStatus";

export default {
  name: "ServicesUpgrade",
  components: { TalkieButton, TalkieBackDropLoader },
  data() {
    return {
      user: {},
      backdropLoading: false,
      userHasPaymentMethod: false,
      userIsSubscribed: false,
      showPaymentCardDetailsForm: false,
    };
  },
  async created() {
    // update user profile data (+failure case)
    const isProfileUpdated = await this.updateUserProfile();
    if (!isProfileUpdated) return this.$router.push("/404");

    // get auth user data
    const user = authUser.getUser();
    this.user = user;

    // check if user has a payment method
    const userHasPaymentMethod =
      user?.stripe?.customer?.paymentMethods?.length > 0;
    this.userHasPaymentMethod = userHasPaymentMethod;

    // check if the user is subscribed
    const subscription = await this.getMySubscription();
    const isActive = [
      subscriptionStatus.ACTIVE,
      subscriptionStatus.PAST_DUE,
      subscriptionStatus.UNPAID,
    ]?.includes(subscription?.status);
    this.userIsSubscribed = isActive;
  },
  async mounted() {
    await this.mountStripePaymentElementsFormToUI();
  },
  methods: {
    async getStripeClientSecret() {
      const response = await AuthService.GenerateClientSecret().catch();

      return response?.data?.client_secret || null;
    },
    async mountStripePaymentElementsFormToUI() {
      //  get stripe pk from env
      const stripePK = process.env.VUE_APP_TALKIE_MONO_API_STRIPE_PK;

      // init stripe
      const stripe = await loadStripe(stripePK);

      // generate client secret (+ failure case)
      const stripeClientSecret = await this.getStripeClientSecret();
      if (!stripeClientSecret) return this.$router.push("/404");

      // create stripe elements
      const options = { clientSecret: stripeClientSecret };
      const elements = stripe.elements(options);

      // mount stripe elements to ui
      const paymentElement = elements.create("payment");
      paymentElement.mount("#talkie-stripe-payments-element");

      // get stripe payments element form
      const form = document.getElementById("talkie-stripe-payments-form");

      // add submit handler
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // update page state
        this.backdropLoading = true;

        // setup options
        const confirmSetupOptions = {
          elements,
          confirmParams: { return_url: window.location.origin },
          redirect: "if_required",
        };

        // api call (add payment method)
        const { error } = await stripe.confirmSetup(confirmSetupOptions);

        // failure case
        if (error) {
          this.backdropLoading = false;
          const errorMessageContainer = document.querySelector(
            "#talkie-stripe-payments-form-error-message-wrapper"
          );
          errorMessageContainer.textContent = error.message;
          return;
        }

        // success case
        await new Promise((r) => setTimeout(r, 2000));
        this.backdropLoading = false;
        await this.handleUpgradeAccountFlow(false);
      });
    },
    async handleUpgradeAccountFlow(handleCardCheck = true) {
      // check if user has a payment method
      if (!this.userHasPaymentMethod && handleCardCheck) {
        this.showPaymentCardDetailsForm = true;
        return;
      }

      // update page state
      this.backdropLoading = true;

      // api call
      const response = await SubscriptionService.CreateSubscription().catch(
        () => {
          return {
            error: "Failed to create subscription..!",
          };
        }
      );

      // failure case
      if (response.error) {
        this.backdropLoading = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      this.userIsSubscribed = true;
      notifications.show("Subscription created successfully..!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async handleDowngradeAccountFlow() {
      // update page state
      this.backdropLoading = true;

      // api call
      const response = await SubscriptionService.RemoveSubscription().catch(
        () => {
          return {
            error: "Failed to remove subscription..!",
          };
        }
      );

      // failure case
      if (response.error) {
        this.backdropLoading = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      this.backdropLoading = false;
      this.userIsSubscribed = false;
      notifications.show("Subscription removed successfully..!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async updateUserProfile() {
      // api call
      const response = await UserService.GetMyProfile().catch();

      // failure case
      if (!response?.data) return false;

      // success case
      const expires = (date) => ({ expires: new Date(date) });
      const nextDay = new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString();
      authUser.setUser(response?.data, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
      return true;
    },
    async getMySubscription() {
      const response = await SubscriptionService.GetMySubscription().catch(
        () => null
      );

      return response?.data || null;
    },
  },
};
</script>

<style scoped>
.upgrade-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
}
.upgrade-info-wrapper,
.upgrade-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
}
.upgrade-fields-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: var(--t-space-12);
}
.upgrade-fields-wrapper-hidden {
  display: none;
}
.upgrade-input {
  margin: auto;
}
.upgrade-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.upgrade-footer-link {
  text-decoration: underline;
}
.upgrade-footer-link,
.upgrade-footer-link:hover,
.upgrade-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .upgrade-wrapper {
    max-width: 100%;
    gap: var(--t-space-36);
    padding: var(--t-space-32);
    margin-top: var(--t-space-50);
    border-radius: var(--t-br-medium);
  }
  .upgrade-fields-wrapper {
    width: 100%;
  }
  .upgrade-input {
    max-width: 100%;
  }
  .upgrade-footer {
    padding: var(--t-space-50);
  }
  .upgrade-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .upgrade-wrapper {
    max-width: 65%;
    gap: var(--t-space-48);
    padding: var(--t-space-48);
    margin-top: var(--t-space-70);
    border-radius: var(--t-br-medium);
  }
  .upgrade-fields-wrapper {
    width: 80%;
  }
  .upgrade-input {
    max-width: 100%;
  }
  .upgrade-footer {
    margin-top: var(--t-space-24);
    padding: var(--t-space-36);
  }
  .upgrade-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .upgrade-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .upgrade-input {
    max-width: 85%;
  }
  .upgrade-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

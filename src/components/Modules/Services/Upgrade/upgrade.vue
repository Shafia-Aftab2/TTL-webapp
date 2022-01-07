<template>
  <div class="box-container">
    <div>
      <div class="back-default">
        <a class="back"><span>&#8592; </span>back</a>
      </div>
    </div>
    <div class="box-content">
      <div class="text-center box-header">
        <h1 v-if="!userIsSubscribed">Upgrade - Pricing</h1>
        <h1 v-if="userIsSubscribed">You account is Already Upgraded..!</h1>

        <template v-if="!userIsSubscribed">
          <p></p>
          <p>When you upgrade your account, you get to:</p>
          <div class="box-benefits">
            <p>> Create up to 8 classes (max of 32 students)</p>
            <p></p>
            <p>> Access all features</p>
            <p></p>
            <p>> Set an unlimited number of questions across all topics</p>
            <p></p>
            <p>> Students get unlimited access to all quizzes (March 2022)</p>
            <p></p>
          </div>
          <div class="yellow-text">
            <p>Limited Offer</p>
          </div>
        </template>

        <h2>£30 individual teacher / annual</h2>
        <h1>£2.50/month</h1>
        <p></p>

        <div
          class="talkie-stripe-payments-form-wrapper"
          :class="
            !showPaymentCardDetailsForm &&
            'talkie-stripe-payments-form-wrapper-hidden'
          "
        >
          <h3 class="h3">Add Payment Method</h3>
          <form
            class="talkie-stripe-payments-form"
            id="talkie-stripe-payments-form"
          >
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
        </div>

        <div class="upgrade" v-if="!userIsSubscribed">
          <talkie-button
            :onClick="handleUpgradeAccountFlow"
            v-if="!showPaymentCardDetailsForm"
          >
            Upgrade
          </talkie-button>
        </div>

        <div class="upgrade" v-if="userIsSubscribed">
          <talkie-button :onClick="handleDowngradeAccountFlow">
            Downgrade
          </talkie-button>
        </div>
      </div>
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
        const { error, setupIntent } = await stripe.confirmSetup(
          confirmSetupOptions
        );

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
  },
};
</script>

<style scoped>
.talkie-stripe-payments-form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--t-space-24);
}
.talkie-stripe-payments-form-wrapper-hidden {
  display: none;
}
.talkie-stripe-payments-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--t-space-16);
}
.talkie-stripe-payments-form-error-message-wrapper {
  color: var(--t-red);
  font-size: var(--t-fs-small);
}

.box-benefits {
  text-align: left;
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
  margin-top: 20px;
  margin-left: 245px;
}
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  display: grid;
  width: 100%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-70);
  gap: 10px;
  margin-top: 20px;
}
.box-header {
  display: grid;
  gap: 10px;
}
.box-head {
  display: flex;
  justify-content: space-between;
}
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-style {
  font-size: 20px;
  color: var(--t-secondary);
}
.upgrade {
  font-weight: bold;
}
.yellow-text {
  color: rgb(255, 166, 0);
  font-size: 20px;
  font-weight: bold;
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .content {
    width: 50%;
    padding: var(--t-space-10);
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}

@media (min-width: 900px) {
  .content {
    width: 35%;
    padding: var(--t-space-50);
  }
}

@media (min-width: 1200px) {
  .back-default {
    position: absolute;
    left: 5px;
  }
}
</style>

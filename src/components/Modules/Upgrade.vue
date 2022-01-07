<template>
  <div>
    <h2>Limited offer</h2>
    <h3>£30 individual teacher / annual</h3>
    <h3>£2.50/month</h3>
    <talkie-button :onClick="handleUpgradeAccountFlow" :loading="loading">
      Upgrade
    </talkie-button>
    <!-- Add Payment method block -->
    <div style="border: 5px solid red" v-if="!userHasPaymentMethod">
      <p>
        Note: you dont have any payment methods added. Please add one before
        upgrading your account.
      </p>
      <talkie-button :onClick="handleAddPaymentMethod" :loading="loading">
        Add Payment Method
      </talkie-button>
      <talkie-alert
        :text="formStatus.message"
        :variant="formStatus.type"
        v-if="formStatus.type && formStatus.message"
      />
    </div>
  </div>
</template>

<script>
import { TalkieButton, TalkieAlert } from "@/components/UICore";
import { notifications } from "@/components/UIActions";
import { AuthService, UserService, SubscriptionService } from "@/api/services";
import authUser from "@/utils/helpers/auth";
import URLModifier from "@/utils/helpers/URLModifier";
// import "./stripev3.js"; // https://js.stripe.com/v3/
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "Upgrade",
  components: {
    TalkieButton,
    TalkieAlert,
  },
  data() {
    return {
      user: {},
      userHasPaymentMethod: false,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      stripe: null,
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

    // check if a new payment method was added
    const redirectParamFromStripe = "session_id";
    const hasSessionIDParam = URLModifier.getURLParam(redirectParamFromStripe);
    if (hasSessionIDParam && userHasPaymentMethod) {
      notifications.show("Payment method added successfully..!", {
        variant: "success",
        displayIcon: true,
      });
      URLModifier.removeFromURL(redirectParamFromStripe);
    }
  },
  async mounted() {
    // init stripe
    const stripe = await loadStripe(
      "pk_test_51IxcQjIegXxLGKMwKuwNmN1lJ8je9agv6FiPtZncSGoE0Dt6ksZA9htP0zCssJif5IFJZ3BJMLjRyLjqKFUjqcEy00fSvYohvp"
    );
    this.stripe = stripe;
    console.log("stripe => ", stripe);
  },
  methods: {
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
    async handleAddPaymentMethod() {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // api payload
      const url = (path) => `${window.location.origin}${path}`;
      const payload = {
        successURL: url("/upgrade"),
        cancelURL: url("/upgrade"),
      };

      // api call
      const response = await AuthService.CreatePaymentMethodSession(
        payload
      ).catch(() => {
        return {
          error: "Failed to create payment method session..!",
        };
      });

      // failure case
      if (response.error) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: response.error,
        };
        return;
      }

      // success case
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Session Created. Redirecting..!",
      };
      const redirectURI = response?.data?.url;
      window.location = redirectURI;
    },
    async handleUpgradeAccountFlow() {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // api payload
      const url = (path) => `${window.location.origin}${path}`;
      const payload = {
        successURL: url("/upgrade"),
        cancelURL: url("/upgrade"),
      };

      // api call
      const response = await AuthService.CreatePaymentMethodSession(
        payload
      ).catch(() => {
        return {
          error: "Failed to create payment method session..!",
        };
      });

      // failure case
      if (response.error) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: response.error,
        };
        return;
      }

      // success case
      this.loading = false;
      this.formStatus = {
        type: "success",
        message: "Session Created. Redirecting..!",
      };
      const redirectURI = response?.data?.url;
      window.location = redirectURI;
    },
  },
};
</script>

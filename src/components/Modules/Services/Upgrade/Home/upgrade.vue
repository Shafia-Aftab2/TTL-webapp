<template>
  <div
    class="talkie-upgrade-wrapper"
    v-if="!computedBackdropLoading && !accountUpgraded"
  >
    <template v-if="computedPlanToSubscribe">
      <talkie-alert
        v-if="pageLoadError"
        :text="pageLoadError"
        :variant="'error'"
      />
      <h2 class="h2 m-auto text-center lh-1.5">
        Upgrade to
        <span>{{ computedPlanToSubscribe?.name }}</span>
      </h2>

      <div class="talkie-upgrade-timeline-selectors">
        <talkie-tab
          :label="'Monthly'"
          :active="activePlanTimeline === planTimelines.MONTH"
          :onClick="() => handlePlanTimelineChange(planTimelines.MONTH)"
        />
        <talkie-tab
          :label="'Annually - save 10%!'"
          :active="activePlanTimeline === planTimelines.YEAR"
          :onClick="() => handlePlanTimelineChange(planTimelines.YEAR)"
        />
      </div>

      <div class="talkie-upgrade-content-wrapper">
        <talkie-price-plan-card
          :name="computedPlanToSubscribe?.name"
          :price="
            computedPlanToSubscribe?.prices[
              activePlanTimeline === planTimelines.MONTH ? 0 : 1
            ]?.price
          "
          :payPeriod="
            computedPlanToSubscribe?.prices[
              activePlanTimeline === planTimelines.MONTH ? 0 : 1
            ]?.showPeriod
              ? `/${
                  computedPlanToSubscribe?.prices[
                    activePlanTimeline === planTimelines.MONTH ? 0 : 1
                  ]?.period
                }`
              : ''
          "
          :features="computedPlanToSubscribe?.features"
          :description="computedPlanToSubscribe?.description"
          :variant="computedPlanToSubscribe?.theme"
          :expandable="isMobileScreen ? true : false"
          :defaultExpanded="false"
        />

        <form
          class="talkie-upgrade-content-stripe-form-wrapper"
          id="talkie-stripe-payments-form"
        >
          <!-- If the user has no payment method -->
          <template v-if="!hasPaymentMethod">
            <p class="p text-center lh-1.5">
              <strong>IMPORTANT:</strong> It looks like you haven't added any
              payment methods yet. To continue, please add one below.
            </p>

            <h3 class="h3">Add Payment Method</h3>

            <talkie-loader v-if="isStripeElementsLoading" />

            <div
              style="display: none"
              class="talkie-upgrade-content-stripe-form-elements"
              id="talkie-stripe-payments-element"
            >
              <!-- Stripe elements will be plugged in here -->
            </div>

            <talkie-alert v-if="error" :text="error" :variant="'error'" />

            <talkie-button
              :type="'submit'"
              :loading="addingPaymentMethod"
              :disabled="addingPaymentMethod"
              v-if="!isStripeElementsLoading"
            >
              Add
            </talkie-button>
          </template>

          <!-- If the user has a payment method -->
          <template v-if="hasPaymentMethod">
            <p class="p text-center lh-1.5">
              <strong>IMPORTANT:</strong> You will be charged
              {{
                computedPlanToSubscribe?.prices[
                  activePlanTimeline === planTimelines.MONTH ? 0 : 1
                ]?.price
              }}
              on a {{ `${activePlanTimeline}ly` }} basis from your selected card
              below.
              <br />
              <br />
              Also note that your selected card will be set as default.
            </p>
            <div class="talkie-stripe-payments-form-bankcards-list">
              <talkie-bank-card
                v-for="card in userPaymentMethods"
                :key="card"
                :number="card?.number"
                :isSelected="card?.id === selectedCardId"
                :isDefault="card?.id === userDefaultPaymentMethod?.id"
                :expiry="card?.expiry"
                :brand="card?.brand"
                :onClick="() => setSelectedCardId(card?.id)"
              />
            </div>

            <talkie-alert v-if="error" :text="error" :variant="'error'" />

            <div class="talkie-stripe-payments-form-bankcards-action-buttons">
              <talkie-button
                :type="'button'"
                :variant="'danger'"
                :onClick="handleHomeRedirection"
                :disabled="subscribingToPlan"
              >
                No, Not Now
              </talkie-button>
              <talkie-button
                :type="'button'"
                :loading="subscribingToPlan"
                :disabled="subscribingToPlan"
                :onClick="handlePlanSubscription"
              >
                Yes, Subscribe
              </talkie-button>
            </div>
          </template>
        </form>
      </div>

      <p class="p m-auto text-center lh-1.5 px-12">
        Not the plan you are looking for? Choose a different one from
        <router-link to="/pricing"><a>here.</a></router-link>
      </p>
    </template>
    <template v-if="!computedPlanToSubscribe">
      <h2 class="h2 m-auto text-center lh-1.5">NOT FOUND</h2>

      <p class="p m-auto text-center lh-1.5 px-12">
        Looks like the link is broken!
        <br />
        <br />
        This page is for subscribing to our payment plans, check them out
        <router-link to="/pricing"><a>here.</a></router-link>
      </p>
    </template>
  </div>
  <upgrade-success v-if="accountUpgraded" />
  <talkie-back-drop-loader v-if="computedBackdropLoading" />
</template>

<script>
import { AuthService, SubscriptionService, UserService } from "@/api/services";
import {
  TalkieBankCard,
  TalkiePricePlanCard,
} from "@/components/SubModules/Cards";
import { notifications } from "@/components/UIActions";
import {
  TalkieAlert,
  TalkieBackDropLoader,
  TalkieButton,
  TalkieLoader,
  TalkieTab,
} from "@/components/UICore";
import { pricingPlans } from "@/utils/constants";
import authUser from "@/utils/helpers/auth";
import { getDomain } from "@/utils/helpers/URLModifier";
import isMobileScreen from "../_common/mixins/isMobileScreen";
import UpgradeSuccess from "../Success";

export default {
  name: "ServicesUpgrade",
  mixins: [isMobileScreen],
  components: {
    TalkieButton,
    TalkieLoader,
    TalkiePricePlanCard,
    TalkieTab,
    TalkieAlert,
    TalkieBackDropLoader,
    TalkieBankCard,
    UpgradeSuccess,
  },
  data() {
    return {
      planToSubscribe: null,
      activePlanTimeline: "month",
      planTimelines: {
        MONTH: "month",
        YEAR: "year",
        TRIAL: "",
      },
      isStripeElementsLoading: true,
      error: null,
      subscribingToPlan: false,
      hasPaymentMethod: false,
      user: {},
      addingPaymentMethod: false,
      userPaymentMethods: [],
      userDefaultPaymentMethod: null,
      selectedCardId: null,
      backdropLoading: false,
      accountUpgraded: false,
      isChangeSubscriptionPlanMode: false,
      pageLoadError: null,
    };
  },
  computed: {
    computedPlanToSubscribe() {
      return this.planToSubscribe;
    },
    computedBackdropLoading() {
      return this.backdropLoading;
    },
  },
  async created() {
    // check if the subscription plan is required to be changed
    const isChangeMode = this.$route.query.changeMode;
    if (isChangeMode) this.isChangeSubscriptionPlanMode = true;

    this.backdropLoading = true;

    // check if user has subscription (could be canceled also)
    const subscription = await this.getMySubscription();

    this.backdropLoading = false;
    if (
      subscription?.status &&
      subscription?.status !== "canceled" &&
      !isChangeMode
    ) {
      this.$router.push("/profile/settings/account");
      return;
    }

    // get the plan & period name from url
    const plan = this.$route.query.plan;
    const period = this.$route.query.period;

    // set the active timeline period (if present in url), else use default one
    if (
      [this.planTimelines.MONTH, this.planTimelines.YEAR]?.includes(
        period?.toLowerCase()
      )
    ) {
      this.activePlanTimeline = period?.toLowerCase();
    }

    // check if plan exists
    const foundPlan = pricingPlans?.planData?.find(
      (x) =>
        x?.name?.toLowerCase()?.split("-")?.join(" ") ===
        plan?.toLowerCase()?.split("-")?.join(" ")
    );

    if (foundPlan) {
      this.planToSubscribe = {
        name: foundPlan?.name,
        description: foundPlan?.description,
        theme: "primary", // todo: have consistency
        features: foundPlan?.features,
        prices: foundPlan?.prices,
      };
    }

    // update user profile cookies
    await this.updateUserProfile();

    // get auth user data
    const user = await this.getMyProfile();
    this.user = user;
    if (!user) {
      this.pageLoadError =
        "Hmm.. something has gone wrong. Please reload the page.";
    }

    // check if the user has a payment method or bank cards
    this.updateUserPaymentMethodsInfo(); // TODO: delete payment methods token issue
  },
  async mounted() {
    await this.mountStripePaymentElementsFormToUI();
  },
  methods: {
    async getMyProfile() {
      // api call
      const response = await UserService.GetMyProfile().catch();

      // failure case
      if (!response?.data) return false;

      // success case
      return response?.data;
    },
    setSelectedCardId(id) {
      this.selectedCardId = id;
    },
    handlePlanTimelineChange(newTimeline) {
      this.activePlanTimeline = newTimeline;
    },
    async getStripeClientSecret() {
      const response = await AuthService.GenerateClientSecret().catch();

      return response?.data?.client_secret || null;
    },
    async mountStripePaymentElementsFormToUI() {
      //  get stripe key from env
      const stripeKey = process.env.VUE_APP_TALKIE_MONO_API_STRIPE_PK;

      const stripePkg = async () => await import("@stripe/stripe-js");
      const { loadStripe } = await stripePkg();

      // init stripe
      const stripe = await loadStripe(stripeKey);

      // generate client secret (+ failure case)
      const stripeClientSecret = await this.getStripeClientSecret();
      if (!stripeClientSecret) {
        this.isStripeElementsLoading = false;
        this.error =
          "Error loading the payment form! Make sure that your internet connection is working";
      }

      // create stripe elements
      const options = { clientSecret: stripeClientSecret };
      const elements = stripe.elements(options);

      // mount stripe elements to ui
      const paymentElement = elements.create("payment");
      paymentElement.mount("#talkie-stripe-payments-element");

      this.isStripeElementsLoading = false;
      if (!!paymentElement) {
        document.getElementById(
          "talkie-stripe-payments-element"
        ).style.display = "initial";
      } else {
        this.error =
          "Error loading the payment form! Make sure that your internet connection is working";
        return;
      }

      // get stripe payments element form
      const form = document.getElementById("talkie-stripe-payments-form");

      // add submit handler
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await this.addPaymentMethod(stripe, elements);
      });
    },
    async addPaymentMethod(stripeInstance, stripeElements) {
      // reset form state
      this.error = null;
      this.addingPaymentMethod = true;

      // setup options
      const confirmSetupOptions = {
        elements: stripeElements,
        confirmParams: { return_url: getDomain() },
        redirect: "if_required",
      };

      // api call (add payment method)
      const stripeRes = await stripeInstance.confirmSetup(confirmSetupOptions);

      // failure case
      if (stripeRes?.error) {
        this.addingPaymentMethod = false;
        this.error = stripeRes?.error?.message;
        return false;
      }

      // success case
      await new Promise((r) => setTimeout(r, 3500)); // stripe will take the card no, send a webhook to server, wait for that
      await this.updateUserProfile(); // update user profile cookies
      const user = await this.getMyProfile(); // get auth user data
      this.user = user;
      this.updateUserPaymentMethodsInfo();
      this.hasPaymentMethod = true;
      this.addingPaymentMethod = false;
      notifications.show("Success!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async updateUserProfile() {
      // TODO: store max age as a cookie
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
    updateUserPaymentMethodsInfo() {
      const stripeCustomer = { ...(this.user?.stripe?.customer || {}) };
      const paymentMethods = stripeCustomer?.paymentMethods?.map((x) => ({
        id: x?.id,
        brand: x?.card?.brand,
        // TODO
        expiry: `${x?.card?.exp_month?.length === 1 ? "0" : ""}${
          x?.card?.exp_month
        }/${x?.card?.exp_year}`,
        number: `XXXX XXXX XXXX ${x?.card?.last4}`,
      }));
      const defaultPaymentMethod = paymentMethods?.find(
        (x) => x?.id === stripeCustomer?.defaultPayMethodId
      );
      this.userPaymentMethods = paymentMethods;
      this.userDefaultPaymentMethod = defaultPaymentMethod;
      if (defaultPaymentMethod) {
        this.hasPaymentMethod = true;
        this.selectedCardId = defaultPaymentMethod?.id;
      }
    },
    async handleHomeRedirection() {
      this.$router.push("/");
    },
    async updateUserDefaultCard() {
      const response = await AuthService.SetDefaultPaymentMethod(
        this.selectedCardId
      );

      return response?.data;
    },
    async handlePlanSubscription() {
      this.subscribingToPlan = true;

      // check if the user has used a non-default card, set it default
      if (this.selectedCardId !== this.userDefaultPaymentMethod?.id) {
        const isDefaultCardSet = await this.updateUserDefaultCard();
        if (!isDefaultCardSet) {
          this.subscribingToPlan = false;
          this.error =
            "Could not use your selected card at the moment! Please try again.";
          return;
        }
      }

      const query = (() => {
        const payloadDataMap = {
          plans: {
            [this.planTimelines.MONTH]: "monthly",
            [this.planTimelines.YEAR]: "annually",
          },
          period: {
            [pricingPlans.planNames.STANDARD_PLAN]: "standard-plan",
            // [pricingPlans.planNames.EXAM_READY]: "exam-ready",
            // [pricingPlans.planNames.BUDDING_SPEAKERS]: "budding-speakers",
          },
        };
        return {
          planName: payloadDataMap.plans?.[this.activePlanTimeline],
          priceName: payloadDataMap.period?.[this.planToSubscribe?.name],
        };
      })();

      // api call
      const response = await (this.isChangeSubscriptionPlanMode
        ? SubscriptionService.ChangeSubscriptionPlan
        : SubscriptionService.CreateSubscription)(query).catch((e) => {
        const errorMap = {
          "plan is already subscribed":
            "You're already subscribed to this plan :)",
        };

        return {
          // todo: added message "user has no payment-method"
          error:
            errorMap?.[e?.response?.data?.message?.toLowerCase()] ||
            "Sorry. we can't subscribe you at the moment. Please try again later.",
        };
      });

      // failure case
      if (response?.error) {
        this.subscribingToPlan = false;
        this.error = response?.error;
        return;
      }

      // success case
      await this.updateUserProfile();
      this.subscribingToPlan = false;
      this.accountUpgraded = true;
      notifications.show("Your subscription is now active.", {
        variant: "success",
        displayIcon: true,
      });
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
.talkie-upgrade-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.talkie-upgrade-timeline-selectors {
  display: flex;
  justify-content: center;
  gap: var(--t-space-12);
}
.m-auto {
  margin: auto;
}
.text-center {
  text-align: center;
}
.lh-1\.5 {
  line-height: 1.5;
}
.px-12 {
  padding: 0 var(--t-space-12);
}
.talkie-upgrade-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.talkie-upgrade-content-stripe-form-wrapper {
  border: var(--t-space-2) solid var(--t-gray-100);
  background: var(--t-white);
  border-radius: var(--t-br-large);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.talkie-upgrade-content-stripe-form-elements {
  width: 100%;
}

/*  */
.talkie-stripe-payments-form-bankcards-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--t-space-12);
}
.talkie-stripe-payments-form-bankcards-action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-24);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-upgrade-wrapper {
    padding: var(--t-space-40) 0;
    padding-bottom: var(--t-space-50);
    gap: var(--t-space-24);
  }
  .talkie-upgrade-timeline-selectors {
    /* TODO: proper layout */
    margin: -12px 0;
  }
  .talkie-upgrade-content-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-12);
  }
  .talkie-upgrade-content-stripe-form-wrapper {
    padding: var(--t-space-20);
    gap: var(--t-space-24);
    width: 100%;
  }
}
@media (min-width: 600px) {
  .talkie-upgrade-wrapper {
    padding: var(--t-space-40) 0;
    padding-bottom: var(--t-space-70);
    gap: var(--t-space-36);
  }
  .talkie-upgrade-timeline-selectors {
    /* TODO: proper layout */
    margin: -12px 0;
  }
  .talkie-upgrade-content-wrapper {
    gap: var(--t-space-24);
  }
  .talkie-upgrade-content-stripe-form-wrapper {
    padding: var(--t-space-24);
    gap: var(--t-space-24);
    width: 70%;
  }
}
@media (min-width: 900px) {
  .talkie-upgrade-wrapper {
    padding: var(--t-space-40) var(--t-space-40);
  }
  .talkie-upgrade-content-wrapper {
    gap: var(--t-space-36);
    flex-direction: row;
    align-items: initial;
  }
  .talkie-upgrade-content-stripe-form-wrapper {
    gap: var(--t-space-36);
    width: 100%;
  }
}
@media (min-width: 1200px) {
  .talkie-upgrade-wrapper {
    gap: var(--t-space-50);
    padding: var(--t-space-24) 0;
    padding-bottom: var(--t-space-70);
  }
  .talkie-upgrade-timeline-selectors {
    /* TODO: proper layout */
    margin: -20px 0;
  }
}
</style>

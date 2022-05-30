<template>
  <div class="profile-account-settings-wrapper">
    <h2 class="h2">Your Account</h2>

    <div class="profile-account-settings-section">
      <h5 class="h5">Subscription status</h5>
      <div class="profile-account-settings-section-card">
        <div class="profile-account-settings-section-card-header">
          <template v-if="userSubscription?.currentPlan">
            <span
              :class="[
                'profile-account-settings-section-card-circle',
                userSubscription?.status?.toLowerCase() === 'active'
                  ? 'success-bg'
                  : 'error-bg',
              ]"
            ></span>
            <h5
              :class="[
                'h5',
                userSubscription?.status?.toLowerCase() === 'active'
                  ? 'success-text'
                  : 'error-text',
                'capitalize',
              ]"
            >
              {{ userSubscription?.status }}
            </h5>
          </template>
          <template v-if="!userSubscription?.currentPlan">
            <p class="p">You are not subscribed</p>
          </template>
        </div>
        <div class="profile-account-settings-section-manage-dropdown">
          <talkie-chip
            v-if="userSubscription?.currentPlan"
            :variant="'neutral'"
            :label="'Change my status'"
            :onClick="
              () => setShowStatusManageOptions(!showStatusManageOptions)
            "
          />
          <ul
            class="profile-account-settings-section-manage-dropdown-list"
            v-if="showStatusManageOptions"
          >
            <li>
              <button @click="() => redirectToHaltSubscription('pause')">
                Pause
              </button>
            </li>
            <li>
              <button
                @click="() => redirectToHaltSubscription('cancel')"
                class="color-red"
              >
                Cancel
              </button>
            </li>
          </ul>
        </div>
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
      <talkie-modal
        :type="'confirm'"
        :contentPadded="true"
        :closeButton="true"
        :centered="true"
        :maxWidth="700"
        :title="'Remove payment method.'"
        :description="'Are you sure to remove this payment method? This will affect your active subscriptions with this cards.'"
        :onClose="() => setAskConfirmationToDelCard(false)"
        :onConfirm="removePaymentMethod"
        :confirmButtonText="'Yes, Remove!'"
        :confirmButtonVariant="'dark'"
        v-if="askConfirmationToDelCard"
      />

      <talkie-back-drop-loader v-if="removingPaymentMethod" />

      <h5 class="h5">Payment Details</h5>
      <div
        :class="[
          'profile-account-settings-section-card-wrapper',
          (activeMode === modes.EDIT_PAYMENT || showAddNewPaymentMethodForm) &&
            'profile-account-settings-section-card-active',
        ]"
      >
        <div class="profile-account-settings-section-card">
          <template v-if="userPaymentMethods.length === 0">
            <div class="profile-account-settings-section-card-header">
              <p class="p" v-if="!showAddNewPaymentMethodForm">
                <strong>IMPORTANT:</strong> It looks like you haven't added any
                payment methods yet.
              </p>
              <p class="p" v-if="showAddNewPaymentMethodForm"></p>
            </div>
            <talkie-button
              :size="'small'"
              :variant="!showAddNewPaymentMethodForm ? 'primary' : 'dark'"
              :disabled="addingPaymentMethod || settingDefaultPaymentMethod"
              :onClick="
                () =>
                  setShowAddNewPaymentMethodForm(!showAddNewPaymentMethodForm)
              "
            >
              {{
                !showAddNewPaymentMethodForm ? "Add payment method" : "Go back"
              }}
            </talkie-button>
          </template>

          <template v-if="userPaymentMethods.length > 0">
            <div
              class="profile-account-settings-section-card-header"
              v-if="activeMode !== modes.EDIT_PAYMENT"
            >
              <p class="p">
                {{
                  userDefaultPaymentMethod?.number ||
                  "Please set a default pay method"
                }}
              </p>
            </div>
            <talkie-button
              :size="'small'"
              :variant="!showAddNewPaymentMethodForm ? 'primary' : 'dark'"
              v-if="activeMode === modes.EDIT_PAYMENT"
              :disabled="addingPaymentMethod || settingDefaultPaymentMethod"
              :onClick="
                () =>
                  setShowAddNewPaymentMethodForm(!showAddNewPaymentMethodForm)
              "
            >
              {{
                !showAddNewPaymentMethodForm
                  ? "Add new method"
                  : "Back to existing methods"
              }}
            </talkie-button>
            <talkie-chip
              :disabled="addingPaymentMethod || settingDefaultPaymentMethod"
              :variant="
                activeMode === modes.EDIT_PAYMENT ? 'danger' : 'neutral'
              "
              :label="
                activeMode === modes.EDIT_PAYMENT
                  ? 'Exit edit mode'
                  : 'Change my payment details'
              "
              :onClick="
                () =>
                  handleModeChange(
                    activeMode === modes.EDIT_PAYMENT
                      ? null
                      : modes.EDIT_PAYMENT
                  )
              "
            />
          </template>
        </div>
        <div
          class="profile-account-settings-section-card-expand-content"
          v-if="
            activeMode === modes.EDIT_PAYMENT || showAddNewPaymentMethodForm
          "
        >
          <div
            class="profile-account-settings-section-card-bankcards"
            v-if="!showAddNewPaymentMethodForm"
          >
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
          <form
            id="talkie-stripe-payments-form"
            class="profile-account-settings-section-card-add-form"
            v-if="showAddNewPaymentMethodForm"
          >
            <h3 class="h3">Add Payment Method</h3>

            <talkie-loader v-if="isStripeElementsLoading" />

            <div
              class="talkie-upgrade-content-stripe-form-elements"
              id="talkie-stripe-payments-element"
            >
              <!-- Stripe elements will be plugged in here -->
            </div>

            <talkie-alert
              v-if="addPaymentMethodError"
              :text="addPaymentMethodError"
              :variant="'error'"
            />

            <talkie-button
              :type="'submit'"
              :loading="addingPaymentMethod"
              :disabled="addingPaymentMethod"
              v-if="!isStripeElementsLoading"
            >
              Add
            </talkie-button>
          </form>
          <div
            class="profile-account-settings-section-card-expand-content-buttons"
          >
            <template v-if="!showAddNewPaymentMethodForm">
              <talkie-button
                :variant="'danger'"
                :size="'small'"
                :disabled="
                  settingDefaultPaymentMethod ||
                  userPaymentMethods?.length === 0
                "
                :onClick="() => setAskConfirmationToDelCard(true)"
              >
                Remove
              </talkie-button>
              <talkie-button
                :variant="'secondary'"
                :size="'small'"
                :disabled="
                  settingDefaultPaymentMethod ||
                  selectedCardId == userDefaultPaymentMethod?.id ||
                  userPaymentMethods?.length === 0
                "
                :onClick="updateUserDefaultCard"
                :loading="settingDefaultPaymentMethod"
              >
                Set Default
              </talkie-button>
            </template>
          </div>
        </div>
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
import {
  TalkieButton,
  TalkieModal,
  TalkieChip,
  TalkieAlert,
  TalkieIcon,
  TalkieLoader,
  TalkieBackDropLoader,
} from "@/components/UICore";
import { TalkieBankCard } from "@/components/SubModules/Cards";
import { notifications } from "@/components/UIActions";
import { loadStripe } from "@stripe/stripe-js";
import { AuthService, UserService, SubscriptionService } from "@/api/services";
import { getDomain } from "@/utils/helpers/URLModifier";
import authUser from "@/utils/helpers/auth";

export default {
  name: "SettingsAccount",
  components: {
    TalkieChip,
    TalkieAlert,
    TalkieIcon,
    TalkieLoader,
    TalkieBackDropLoader,
    TalkieButton,
    TalkieModal,
    TalkieBankCard,
  },
  data() {
    return {
      modes: {
        EDIT_PAYMENT: "edit-payment",
      },
      activeMode: null,

      user: {},
      hasPaymentMethod: false,
      userPaymentMethods: [],
      userDefaultPaymentMethod: null,
      selectedCardId: null,
      settingDefaultPaymentMethod: false,
      askConfirmationToDelCard: false,
      removingPaymentMethod: false,
      showAddNewPaymentMethodForm: false,

      isStripeElementsLoading: false,
      addPaymentMethodError: null,
      addingPaymentMethod: false,
      stripeElementsFormListenerAdded: false,

      userSubscription: {},

      showStatusManageOptions: false,
    };
  },
  async created() {
    // update user profile cookies
    await this.updateUserProfile();

    // get auth user data
    const user = authUser.getUser();
    this.user = user;

    // check if the user has a payment method or bank cards
    this.updateUserPaymentMethodsInfo();

    // get user subscription
    const periods = { monthly: "month", annually: "year" };
    const subscription = await this.getMySubscription();
    if (Object.keys(subscription || {}).length > 0) {
      this.userSubscription = {
        currentPlan: {
          name: subscription?.priceName,
          price: `£${subscription?.amount}`,
          period: periods[subscription?.planName?.toLowerCase()],
        },
        status: subscription?.status,
      };
    }
  },
  async updated() {
    const stripeElementsForm = document.getElementById(
      "talkie-stripe-payments-element"
    );

    if (stripeElementsForm && !this.stripeElementsFormListenerAdded) {
      this.stripeElementsFormListenerAdded = true;
      await this.mountStripeElementsToForm();
    }
  },
  methods: {
    redirectToHaltSubscription(haltMode) {
      this.$router.push(`/profile/settings/${haltMode}-subscription`);
    },
    setShowStatusManageOptions(show) {
      this.showStatusManageOptions = show;
    },
    redirectToContactUs() {
      this.$router.push("/contact");
    },
    setShowAddNewPaymentMethodForm(show) {
      this.showAddNewPaymentMethodForm = show;

      if (!show) {
        this.stripeElementsFormListenerAdded = false;
        this.addPaymentMethodError = null;
        this.addingPaymentMethod = false;
      }
    },
    setAskConfirmationToDelCard(ask) {
      this.askConfirmationToDelCard = ask;
    },
    setSelectedCardId(id) {
      this.selectedCardId = id;
    },
    handleModeChange(mode) {
      this.activeMode = mode;
    },
    updateUserPaymentMethodsInfo() {
      const stripeCustomer = { ...(this.user?.stripe?.customer || {}) };
      const paymentMethods = stripeCustomer?.paymentMethods?.map((x) => ({
        id: x?.id,
        brand: x?.card?.brand,
        // TODO: add 0
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
    async updateUserDefaultCard() {
      this.settingDefaultPaymentMethod = true;

      const response = await AuthService.SetDefaultPaymentMethod(
        this.selectedCardId
      );

      // failure case
      if (!response.data) {
        this.settingDefaultPaymentMethod = false;
        notifications.show("Failed to set card as default! Please try again!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      await this.updateUserProfile();
      const user = authUser.getUser(); // get auth user data
      this.user = user;
      this.updateUserPaymentMethodsInfo();
      this.settingDefaultPaymentMethod = false;
      notifications.show("Card set as default!", {
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
    async removePaymentMethod() {
      this.askConfirmationToDelCard = false;
      this.removingPaymentMethod = true;

      const response = await AuthService.RemovePaymentMethod(
        this.selectedCardId
      ).catch(() => {
        return {
          error: "Failed to remove payment method! Please try again!",
        };
      });

      // failure case
      if (response.error) {
        this.removingPaymentMethod = false;
        notifications.show(response.error, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // success case
      await this.updateUserProfile();
      const user = authUser.getUser(); // get auth user data
      this.user = user;
      this.updateUserPaymentMethodsInfo();
      this.removingPaymentMethod = false;
      notifications.show("Payment method removed!", {
        variant: "success",
        displayIcon: true,
      });
    },
    async getStripeClientSecret() {
      const response = await AuthService.GenerateClientSecret().catch();

      return response?.data?.client_secret || null;
    },
    async mountStripeElementsToForm() {
      this.isStripeElementsLoading = true;

      //  get stripe key from env
      const stripeKey = process.env.VUE_APP_TALKIE_MONO_API_STRIPE_PK;

      // init stripe
      const stripe = await loadStripe(stripeKey);

      // generate client secret (+ failure case)
      const stripeClientSecret = await this.getStripeClientSecret();
      if (!stripeClientSecret) {
        this.isStripeElementsLoading = false;
        this.addPaymentMethodError =
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
        // TODO: check if this logic is correct (paymentElement data type)
        document.getElementById(
          "talkie-stripe-payments-element"
        ).style.display = "flex";
      } else {
        this.addPaymentMethodError =
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
      this.addPaymentMethodError = null;
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
        this.addPaymentMethodError = stripeRes?.error?.message;
        return false;
      }

      // success case
      await new Promise((r) => setTimeout(r, 3500)); // stripe will take the card no, send a webhook to server, wait for that
      await this.updateUserProfile(); // update user profile cookies
      const user = authUser.getUser(); // get auth user
      this.user = user;
      this.updateUserPaymentMethodsInfo();
      this.hasPaymentMethod = true;
      this.addingPaymentMethod = false;
      notifications.show("Your bank card was added successfully!", {
        variant: "success",
        displayIcon: true,
      });
      this.setShowAddNewPaymentMethodForm(false);
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
.profile-account-settings-wrapper {
  display: flex;
  flex-direction: column;
}
.profile-account-settings-section {
  display: flex;
  flex-direction: column;
}
.profile-account-settings-section-card-wrapper {
  display: flex;
  flex-direction: column;
  border: var(--t-space-1) solid var(--t-gray-100);
}
.profile-account-settings-section-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--t-white);
  border: var(--t-space-1) solid var(--t-gray-100);
}
.profile-account-settings-section-card-active {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
}
.profile-account-settings-section-card-header {
  display: flex;
  align-items: center;
}
.profile-account-settings-section-card-circle {
  border-radius: 50%;
  display: block;
}
.success-bg {
  background: var(--t-green);
}
.error-bg {
  background: var(--t-red);
}
.success-text {
  color: var(--t-green);
}
.error-text {
  color: var(--t-red);
}
.profile-account-settings-section-manage-dropdown {
  position: relative;
}
.profile-account-settings-section-manage-dropdown-list {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--t-white);
  list-style-type: none;
  color: var(--t-black-100);
  border: var(--t-space-1) solid var(--t-gray-100);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border-radius: var(--t-br-medium);
}
.profile-account-settings-section-manage-dropdown-list button {
  background-color: transparent;
  border: 0;
  width: 100%;
  cursor: pointer;
  transition: 0.2s ease;
  border-radius: var(--t-br-medium);
}
.profile-account-settings-section-manage-dropdown-list button:hover {
  background-color: var(--t-white-100);
}
.color-red {
  color: var(--t-red);
}

/* todo: responsiveness */
.profile-account-settings-section-card-expand-content {
  padding: var(--t-space-24);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-24);
}
.profile-account-settings-section-card-bankcards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--t-space-12);
}
.profile-account-settings-section-card-add-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-24);
  width: 50%;
  margin: auto;
}
.profile-account-settings-section-card-expand-content-buttons {
  display: flex;
  gap: var(--t-space-12);
  margin-left: auto;
}
.talkie-upgrade-content-stripe-form-elements {
  width: 100%;
  justify-content: center;
}

.capitalize {
  text-transform: capitalize;
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
  .profile-account-settings-section-card-wrapper {
    border-radius: var(--t-br-medium);
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

  .profile-account-settings-section-manage-dropdown-list {
    top: var(--t-space-28);
  }
  .profile-account-settings-section-manage-dropdown-list button {
    padding: var(--t-space-5);
    font-size: calc(var(--t-fs-small) * 0.8);
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
  .profile-account-settings-section-card-wrapper {
    border-radius: var(--t-br-large);
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

  .profile-account-settings-section-manage-dropdown-list {
    top: var(--t-space-30);
  }
  .profile-account-settings-section-manage-dropdown-list button {
    padding: var(--t-space-8);
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 900px) {
  .profile-account-settings-wrapper {
    gap: var(--t-space-44);
    padding: var(--t-space-36) var(--t-space-24);
    padding-bottom: calc(var(--t-space-50) * 2);
  }

  .profile-account-settings-section-manage-dropdown-list {
    top: var(--t-space-36);
  }
}
@media (min-width: 1200px) {
  .profile-account-settings-wrapper {
    padding: var(--t-space-36) 0;
  }
}
</style>

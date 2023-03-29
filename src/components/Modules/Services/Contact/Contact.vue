<template>
  <template v-if="!messageReceived">
    <div class="talkie-contact-wrapper">
      <talkie-form
        class="talkie-contact-form"
        v-slot="{ errors }"
        :validationSchema="contactUsSchema"
        :onSubmit="handleSubmit"
      >
        <h3 class="h3">How can we help you?</h3>
        <div class="talkie-contact-form-rows-items">
          <talkie-input
            :name="'name'"
            :placeholder="'Your name'"
            :hint="{
              type: errors.name ? 'error' : null,
              message: errors.name ? errors.name : null,
            }"
          />
          <talkie-input
            :type="'email'"
            :name="'email'"
            :placeholder="'Your email address'"
            :hint="{
              type: errors.email ? 'error' : null,
              message: errors.email ? errors.email : null,
            }"
          />
        </div>
        <talkie-input
          :name="'subject'"
          :placeholder="'Subject (I’m having technical issues - send help!)'"
          :hint="{
            type: errors.subject ? 'error' : null,
            message: errors.subject ? errors.subject : null,
          }"
        />
        <talkie-input
          :name="'message'"
          :multiline="true"
          :rows="3"
          :placeholder="'Leave a message'"
          :hint="{
            type: errors.message ? 'error' : null,
            message: errors.message ? errors.message : null,
          }"
        />

        <talkie-alert
          :text="formStatus.message"
          :variant="formStatus.type"
          v-if="formStatus.type && formStatus.message"
        />

        <talkie-button
          class="ml-auto"
          :variant="'dark'"
          :loading="loading"
          :disabled="loading"
        >
          Send message
        </talkie-button>
      </talkie-form>
      <div class="talkie-contact-hero">
        <!-- Image Placeholder -->
      </div>
    </div>
  </template>
  <template v-if="messageReceived">
    <div class="talkie-contact-message-received-wrapper">
      <h3 class="h3">Message received!</h3>
      <p class="p">
        Thank you for your message. We’ll aim to get back to you in 2 working
        days. If it’s urgent, please feel free to also reach out to us on
        Twitter
        <a href="https://twitter.com/talkietheapp" class="link-black"
          >@talkietheapp</a
        >
      </p>
      <img
        class="talkie-contact-message-received-hero"
        :src="require(`@/assets/images/message-received.png`)"
      />
      <talkie-button :variant="'dark'" :onClick="redirectHome">
        Home
      </talkie-button>
    </div>
  </template>
</template>

<script>
import {
  TalkieForm,
  TalkieInput,
  TalkieButton,
  TalkieAlert,
} from "@/components/UICore";
import { contactUsSchema } from "@/utils/validations/custom.validation";
import { ContactService } from "@/api/services";

export default {
  name: "ServicesContact",
  components: {
    TalkieForm,
    TalkieInput,
    TalkieButton,
    TalkieAlert,
  },
  data() {
    return {
      contactUsSchema: contactUsSchema,
      loading: false,
      formStatus: {
        type: null,
        message: null,
      },
      messageReceived: false,
    };
  },
  methods: {
    redirectHome() {
      this.$router.push("/");
    },
    isValidEmail(email) {
      const emailTestRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailTestRegex?.test(email);
    },
    async handleSubmit(values) {
      // update page state
      this.loading = true;
      this.formStatus = { type: null, message: null };

      // form data
      const payload = {
        name: values?.name?.trim(),
        email: values?.email?.trim(),
        subject: values?.subject?.trim(),
        message: values?.message?.trim(),
      };

      // api call
      const response = await ContactService.SendMessage(payload).catch(() => {
        return {
          error: "Your message has not been sent. Please try again.",
        };
      });

      // failure case
      if (response?.error) {
        this.loading = false;
        this.formStatus = {
          type: "error",
          message: response.error,
        };
        return;
      }

      // success case
      this.loading = false;
      this.messageReceived = true;
    },
  },
};
</script>

<style scoped>
.talkie-contact-wrapper {
  display: grid;
  height: fit-content;
}
.talkie-contact-form {
  display: flex;
  flex-direction: column;
}
.talkie-contact-form-rows-items {
  display: grid;
}
.talkie-contact-hero {
  background: gray;
}
.ml-auto {
  margin-left: auto;
}
.link-black {
  color: var(--t-black);
}
.talkie-contact-message-received-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  width: 100%;
}
.talkie-contact-message-received-hero {
  width: 100%;
  height: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-contact-wrapper {
    grid-template-rows: 1fr 1fr;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .talkie-contact-form {
    gap: var(--t-space-16);
  }
  .talkie-contact-form-rows-items {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: var(--t-space-16);
  }
  .talkie-contact-hero {
    grid-row: 1;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    margin: auto;
  }
  .talkie-contact-message-received-wrapper {
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .talkie-contact-message-received-hero {
    width: 80%;
  }
}
@media (min-width: 600px) {
  .talkie-contact-wrapper {
    grid-template-rows: 1fr 1fr;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .talkie-contact-form {
    gap: var(--t-space-16);
  }
  .talkie-contact-form-rows-items {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: var(--t-space-16);
  }
  .talkie-contact-hero {
    grid-row: 1;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    margin: auto;
  }
  .talkie-contact-message-received-wrapper {
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .talkie-contact-message-received-hero {
    width: 65%;
  }
}
@media (min-width: 900px) {
  .talkie-contact-wrapper {
    grid-template-rows: initial;
    grid-template-columns: 2fr 1fr;
    gap: var(--t-space-36);
    padding: var(--t-space-44) var(--t-space-36);
  }
  .talkie-contact-form {
    gap: var(--t-space-16);
  }
  .talkie-contact-form-rows-items {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: initial;
    gap: var(--t-space-16);
  }
  .talkie-contact-hero {
    grid-row: initial;
    width: 300px;
    height: 300px;
    aspect-ratio: 1/1;
    margin: auto;
  }
  .talkie-contact-message-received-wrapper {
    width: 90%;
    margin: auto;
    gap: var(--t-space-24);
    padding: var(--t-space-44) var(--t-space-36);
  }
  .talkie-contact-message-received-hero {
    width: 65%;
  }
}
@media (min-width: 900px) {
  .talkie-contact-wrapper {
    padding: var(--t-space-44) 0;
  }
  .talkie-contact-message-received-wrapper {
    padding: var(--t-space-44) 0;
  }
}
</style>

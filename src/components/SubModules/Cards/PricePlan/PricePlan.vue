<template>
  <div class="talkie-pricing-plan-card">
    <div
      :class="[
        'talkie-pricing-plan-card-header',
        `talkie-pricing-${variant?.toString()}-plan-card-header`,
      ]"
    >
      <p class="p">{{ name }}</p>
      <p class="p">
        <span class="h2">{{ price }} </span>
        <template v-if="payPeriod">
          {{ payPeriod }}
        </template>
      </p>
    </div>

    <div
      class="talkie-pricing-plan-card-content"
      v-if="expandable ? isExpanded : true"
    >
      <ul class="talkie-pricing-plan-card-features-list">
        <li v-for="feature in features" :key="feature">
          {{ feature }}
        </li>
      </ul>

      <div class="talkie-pricing-plan-card-divider"></div>

      <p class="p talkie-pricing-plan-card-description">
        {{ description }}
      </p>

      <talkie-button
        :outlined="true"
        class="talkie-pricing-plan-card-cta"
        :onClick="ctaAction"
        :variant="'dark'"
      >
        {{ ctaText }}
      </talkie-button>
    </div>

    <button
      class="p talkie-pricing-plan-card-expand-button"
      @click="handleExpandButtonClick"
      v-if="expandable"
    >
      {{ !isExpanded ? "Expand" : "Hide" }} details
      <br />
      {{ !isExpanded ? `&#65086;` : `&#65085;` }}
    </button>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "PricePlanCard",
  components: { TalkieButton },
  data() {
    const _isExpanded = this.defaultExpanded;

    return {
      isExpanded: _isExpanded,
    };
  },
  props: {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    payPeriod: {
      type: String,
    },
    description: {
      type: String,
    },
    features: {
      type: Function,
      default: () => [],
    },
    ctaText: {
      type: String,
      default: "Subscribe",
    },
    ctaAction: {
      type: Function,
      default: () => {},
    },
    expandable: {
      type: Boolean,
      default: true,
    },
    defaultExpanded: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (val) => ["primary", "secondary", "light"].includes(val),
    },
  },
  methods: {
    handleExpandButtonClick() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.talkie-pricing-plan-card {
  background: var(--t-white);
  line-height: 1.2;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
  border-radius: var(--t-br-large);
}
.talkie-pricing-plan-card:hover {
  /* transform: scale(1.02); */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
}
.talkie-pricing-plan-card-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top-left-radius: var(--t-br-large);
  border-top-right-radius: var(--t-br-large);
}

/* Header variants */
.talkie-pricing-primary-plan-card-header {
  background: var(--t-primary);
}
.talkie-pricing-secondary-plan-card-header {
  background: var(--t-secondary);
}
.talkie-pricing-light-plan-card-header {
  background: var(--t-secondary-100);
}

.talkie-pricing-plan-card-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: var(--t-space-2) solid var(--t-gray-100);
  border-bottom-left-radius: var(--t-br-large);
  border-bottom-right-radius: var(--t-br-large);
}
.talkie-pricing-plan-card-features-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}
.talkie-pricing-plan-card-divider {
  background-color: var(--t-gray-75);
  width: 100%;
  height: var(--t-space-3);
}
.talkie-pricing-plan-card-description {
  font-size: var(--t-fs-small);
}
.talkie-pricing-plan-card-cta {
  margin: auto;
}
.talkie-pricing-plan-card-expand-button {
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 1.5;
  color: var(--t-black-50);
  width: 100%;
  padding: var(--t-space-5);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-pricing-plan-card {
    min-width: 300px;
    max-width: 300px;
  }
  .talkie-pricing-plan-card-header {
    padding: var(--t-space-12) var(--t-space-20);
    gap: var(--t-space-5);
  }
  .talkie-pricing-plan-card-content {
    padding: var(--t-space-12) var(--t-space-20);
    gap: var(--t-space-20);
  }
  .talkie-pricing-plan-card-features-list {
    gap: var(--t-space-12);
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 600px) {
  .talkie-pricing-plan-card {
    min-width: 310px;
    max-width: 310px;
  }
  .talkie-pricing-plan-card-header {
    padding: var(--t-space-20) var(--t-space-24);
    gap: var(--t-space-8);
  }
  .talkie-pricing-plan-card-content {
    padding: var(--t-space-20) var(--t-space-24);
    gap: var(--t-space-20);
  }
  .talkie-pricing-plan-card-features-list {
    gap: var(--t-space-20);
    font-size: var(--t-fs-base);
  }
}
@media (min-width: 1200px) {
  .talkie-pricing-plan-card {
    min-width: 320px;
    max-width: 320px;
  }
  .talkie-pricing-plan-card-content {
    gap: var(--t-space-24);
  }
  .talkie-pricing-plan-card-features-list {
    gap: var(--t-space-24);
  }
}
</style>

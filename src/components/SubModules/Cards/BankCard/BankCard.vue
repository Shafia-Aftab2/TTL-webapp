<template>
  <button
    :class="['bank-card', isSelected && 'bank-card-active']"
    @click="onClick"
    type="button"
  >
    <div class="bank-card-header">
      <div class="bank-card-header-left">
        <span class="p bank-card-brand">
          {{ brand }}
        </span>
        <span class="p bank-card-brand">
          {{ expiry }}
        </span>
        <span class="p bank-card-brand" v-if="isDefault"> Default </span>
      </div>

      <span v-if="isSelected" class="p"> Selected </span>
    </div>
    <span class="bank-card-number h3">
      {{ number }}
    </span>
  </button>
</template>

<script>
export default {
  name: "BankCard",
  components: {},
  props: {
    number: {
      type: Number,
    },
    brand: {
      type: String,
    },
    isSelected: {
      type: Boolean,
    },
    isDefault: {
      type: Boolean,
    },
    expiry: {
      type: String,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.bank-card {
  background: var(--t-white);
  border-radius: var(--t-br-medium);
  border: var(--t-space-1) solid var(--t-gray-75);
  padding: var(--t-space-12);
  cursor: pointer;
  transition: 0.2s ease;
  color: var(--t-black-100);
  display: flex;
  flex-direction: column;
  gap: var(--t-space-8);
}
.bank-card:hover {
  background: var(--t-gray-100);
}
.bank-card-active {
  background: var(--t-gray-100);
}
.bank-card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--t-space-12);
}
.bank-card-header-left {
  display: flex;
  align-items: center;
  gap: var(--t-space-12);
}
.bank-card-brand {
  background: var(--t-green);
  color: var(--t-black-50);
  padding: var(--t-space-5);
  border-radius: var(--t-br-small);
}
.bank-card-number {
  font-style: italic;
}

/* TODO: add responsive variants */

/* Responsive variants */
@media (max-width: 599px) {
}
@media (min-width: 600px) {
}
@media (min-width: 900px) {
}
@media (min-width: 1200px) {
}
</style>

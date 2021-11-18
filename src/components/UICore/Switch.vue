<template>
  <div
    :class="[
      'talkie-switch-wrapper',
      `talkie-switch-${variant.toString()}`,
      `talkie-switch-${size.toString()}`,
      customClass.toString()
    ]"
  >
    <div>
      <input
        :id="key"
        :name="name"
        :class="['talkie-switch']"
        type="checkbox"
        :checked="isChecked"
        @change="handleSwitchToggle"
      />
      <label :for="key"></label>
    </div>
  </div>
</template>

<script>
export default {
  name: "TalkieSwitch",
  components: {},
  data() {
    return {
      isChecked: false,
      key: `talkie-switch-${Math.floor(Math.random() * 1234567890)}`
    };
  },
  props: {
    onToggle: { type: Function, default: () => {} },
    name: {
      type: String
    },
    variant: {
      type: String,
      default: "dark",
      validator: val => ["primary", "secondary", "light", "dark"].includes(val)
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    async handleSwitchToggle(e) {
      const checkStatus = e.target.checked;
      this.isChecked = checkStatus;
      if (this.onToggle) await this.onToggle(!!checkStatus);
    }
  }
};
</script>

<style scoped>
.talkie-switch-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* Default variant */
  --background: var(--t-black-100);
  --stale: var(--t-white-100);
  --active: var(--t-green);
  /* Default Size */
  --width: var(--t-space-50);
  --height: var(--t-space-24);
  --padding: var(--t-space-4);
  --ball-size: calc(var(--height) - (var(--padding) * 2));
}

/* Color variants */
.talkie-switch-primary {
  --background: var(--t-primary);
  --stale: var(--t-white-100);
  --active: var(--t-black-100);
}
.talkie-switch-secondary {
  --background: var(--t-secondary);
  --stale: var(--t-white-100);
  --active: var(--t-black-100);
}
.talkie-switch-light {
  --background: var(--t-white-100);
  --stale: var(--t-black-100);
  --active: var(--t-green);
}
.talkie-switch-dark {
  --background: var(--t-black-100);
  --stale: var(--t-white-100);
  --active: var(--t-green);
}

/* Size variants */
.talkie-switch-small {
  --width: var(--t-space-38);
  --height: var(--t-space-18);
  --padding: var(--t-space-3);
  --ball-size: calc(var(--height) - (var(--padding) * 2));
}
.talkie-switch-medium {
  --width: var(--t-space-50);
  --height: var(--t-space-24);
  --padding: var(--t-space-4);
  --ball-size: calc(var(--height) - (var(--padding) * 2));
}
.talkie-switch-large {
  --width: var(--t-space-64);
  --height: var(--t-space-30);
  --padding: var(--t-space-5);
  --ball-size: calc(var(--height) - (var(--padding) * 2));
}

/* Switch Function */
.talkie-switch {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
.talkie-switch + label {
  display: inline-flex;
  align-items: center;
  width: var(--width);
  height: var(--height);
  background-color: var(--background);
  border-radius: 100px;
  cursor: pointer;
  transition: 0.25s ease;
}
.talkie-switch + label:after {
  content: "";
  width: var(--ball-size);
  height: var(--ball-size);
  background-color: var(--stale);
  border-radius: 50%;
  margin-left: calc((var(--height) - var(--ball-size)) / 2);
  transition: 0.25s ease;
  transform: translateX(0);
}
.talkie-switch:checked + label {
  background-color: var(--active);
}
.talkie-switch:checked + label:after {
  background-color: var(--background);
  transform: translateX(
    calc(var(--width) - var(--ball-size) - var(--padding) * 2)
  );
}
</style>

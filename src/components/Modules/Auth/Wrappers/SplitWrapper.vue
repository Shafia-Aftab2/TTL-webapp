<template>
  <div class="auth-split-wrapper">
    <!-- On Left of Screen -->
    <div class="auth-split-avatar">
      <logo-auth-signup />
    </div>

    <!-- on Right of Screen -->
    <slot />
  </div>
</template>

<script>
import LogoAuthSignup from "@/components/SVGs/LogoAuthSignup.vue";

export default {
  name: "SplitWrapper",
  components: {
    LogoAuthSignup,
  },
};
</script>

<style>
.auth-split-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-top: var(--t-space-12);
}
.auth-split-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  --logo-width: 500px;
  --logo-height: 500px;
}

/* Responsive variants */
@media (max-width: 599px) {
  .auth-split-wrapper {
    flex-direction: column;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
  }
  .auth-split-avatar {
    display: none;
  }
}
@media (min-width: 600px) {
  .auth-split-wrapper {
    flex-direction: column;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .auth-split-avatar {
    display: flex;
  }
  .auth-split-avatar > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-150%, -30%);
    opacity: 0.5;
    z-index: var(--t-zindex-nv-10);
    width: calc(var(--logo-width) * 0.9);
    height: calc(var(--logo-height) * 0.9);
  }
}
@media (min-width: 900px) {
  .auth-split-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .auth-split-avatar > svg {
    position: static;
    opacity: 1;
    transform: translate(0, 0);
    z-index: var(--t-zindex-10);
    width: calc(var(--logo-width) * 0.8);
    height: calc(var(--logo-height) * 0.8);
  }
}
@media (min-width: 1200px) {
  .auth-split-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-48) 0;
  }
  .auth-split-avatar > svg {
    width: var(--logo-width);
    height: var(--logo-height);
  }
}
</style>

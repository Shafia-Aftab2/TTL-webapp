<template>
  <div class="talkie-navbar-wrapper-container">
    <nav :class="['talkie-navbar-wrapper']">
      <!-- Left Side -->
      <ul class="talkie-navbar-brand-wrapper">
        <span
          :class="[
            hideSideBarIconOn
              .map((x) =>
                `talkie-navbar-brand-wrapper-toggle-button-${x}-hidden`.toString()
              )
              .join(' '),
          ]"
        >
          <talkie-icon :name="'hamburger'" :onClick="onSidebarIconClick" />
        </span>
        <router-link to="#" class="talkie-navbar-brand-logo-link">
          <logo-talkie />
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import LogoTalkie from "@/components/SVGs/LogoTalkie.vue";
import TalkieIcon from "@/components/UICore/Icon.vue";

export default {
  name: "Header",
  components: { TalkieIcon, LogoTalkie },
  props: {
    hideLinksAndProfile: {
      type: Boolean,
      default: false,
    },
    hideLinks: {
      type: Boolean,
      default: false,
    },
    onSidebarIconClick: {
      type: Function,
      default: () => {},
    },
    hideSideBarIconOn: {
      type: Array,
      default: () => ["tablet", "desktop"],
      // validator: (val) => ["phone", "tablet", "desktop"].includes(val), TODO: fix validation
    },
  },
};
</script>

<style scoped>
.talkie-navbar-wrapper-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--t-zindex-80);
}
.talkie-navbar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--t-shadow-dark);
  background-color: var(--t-white);
  width: 100%;
  z-index: var(--t-zindex-80);
}
.talkie-navbar-brand-wrapper {
  display: flex;
  align-items: center;
}
.talkie-navbar-brand-logo-link > svg {
  width: calc(var(--logo-svg-size) * 3);
  height: var(--logo-svg-size);
}
.talkie-navbar-links-wrapper {
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: var(--t-fs-base);
}
.talkie-navbar-link-item,
.talkie-navbar-profile-link-item {
  margin-left: var(--t-space-36);
}
.talkie-navbar-link-item > a {
  text-decoration: none;
}
.talkie-navbar-link-item > a:hover {
  text-decoration: underline;
  text-decoration-color: var(--t-primary);
  text-underline-offset: var(--t-space-16);
  text-decoration-thickness: var(--t-space-2);
}
.talkie-navbar-link-item > a:visited {
  color: var(--t-black);
}

/* Responsiveness */
@media (max-width: 599px) {
  .talkie-navbar-wrapper-trail-pad {
    margin-top: var(--t-space-24);
  }
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-16);
    min-height: var(--t-space-50);
    max-height: var(--t-space-50);
  }
  .talkie-navbar-brand-wrapper {
    gap: var(--t-space-4);
  }
  .talkie-navbar-brand-wrapper-toggle-button-phone-hidden {
    display: none !important;
  }
  .talkie-navbar-brand-logo-link > svg {
    --logo-svg-size: var(--t-space-24);
  }
  .talkie-navbar-link-item {
    display: none;
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .talkie-navbar-link-item-always-visiable {
    display: inherit;
  }
}
@media (min-width: 600px) {
  .talkie-navbar-wrapper-trail-pad {
    margin-top: var(--t-space-32);
  }
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-24);
    min-height: var(--t-space-58);
    max-height: var(--t-space-58);
  }
  .talkie-navbar-brand-wrapper {
    gap: var(--t-space-8);
  }
  .talkie-navbar-brand-logo-link > svg {
    --logo-svg-size: var(--t-space-28);
  }
  .talkie-navbar-link-item {
    font-size: var(--t-fs-small);
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .talkie-navbar-brand-wrapper-toggle-button-tablet-hidden {
    display: none !important;
  }
}
@media (min-width: 900px) and (max-width: 1199px) {
  .talkie-navbar-brand-wrapper-toggle-button-tablet-hidden {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-32);
    min-height: var(--t-space-70);
    max-height: var(--t-space-70);
  }
  .talkie-navbar-brand-wrapper-toggle-button-desktop-hidden {
    display: none !important;
  }
  .talkie-navbar-brand-logo-link > svg {
    --logo-svg-size: var(--t-space-33);
  }
  .talkie-navbar-link-item {
    font-size: var(--t-fs-base);
  }
}
</style>

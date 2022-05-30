<template>
  <div class="talkie-navbar-wrapper-container">
    <!-- display if there are trial days remaining -->
    <div class="trial-bar" v-if="remainingTrialDays > 0">
      Your free trial ends in {{ remainingTrialDays }}
      {{ remainingTrialDays > 1 ? "days" : "day" }}.
      <span class="trial-bar-close">
        <talkie-icon
          :size="16"
          :noHighlights="true"
          :name="'x-mark'"
          :onClick="onCloseTrailBarClick"
        />
      </span>
    </div>

    <nav
      :class="[
        'talkie-navbar-wrapper',
        remainingTrialDays > 0 && 'talkie-navbar-wrapper-trail-pad',
      ]"
    >
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
        <router-link to="/" class="talkie-navbar-brand-logo-link">
          <logo-talkie />
        </router-link>
      </ul>
      <!-- Right Side -->
      <ul class="talkie-navbar-links-wrapper" v-if="!hideLinksAndProfile">
        <template v-if="computedIsLoggedIn">
          <template v-if="!hideLinks" class="talkie-navbar">
            <template v-for="link in links" :key="link">
              <template
                v-if="link?.displayForRoles?.includes(computedUser.role)"
              >
                <li
                  class="talkie-navbar-link-item"
                  v-if="
                    link?.text?.toLowerCase() === 'upgrade' &&
                    !computedIsSubscribed
                  "
                >
                  <a :href="link.url">{{ link.text }}</a>
                </li>
              </template>
            </template>
          </template>
          <li class="talkie-navbar-profile-link-item">
            <div class="talkie-navbar-profile-wrapper" tabindex="0">
              <a class="talkie-navbar-profile-name" href="#">
                {{ computedUser?.name }}
              </a>
              <talkie-icon
                v-if="!computedUser?.image"
                :size="25"
                :name="'profile'"
                :isActive="true"
              />
              <span
                class="talkie-navbar-profile-avatar"
                v-html="computedUser?.image"
                v-if="computedUser?.image"
              >
              </span>
              <div class="talkie-navbar-profile-options-wrapper">
                <ul class="talkie-navbar-profile-options-list">
                  <li class="talkie-navbar-profile-options-list-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="talkie-navbar-profile-options-list-item">
                    <router-link to="/profile/self">Profile</router-link>
                  </li>
                  <li class="talkie-navbar-profile-options-list-item">
                    <router-link to="/profile/settings">Account</router-link>
                  </li>
                  <template v-for="link in links" :key="link.text">
                    <template
                      v-if="link?.displayForRoles?.includes(computedUser.role)"
                    >
                      <li
                        :class="[
                          'talkie-navbar-profile-options-list-item',
                          'talkie-navbar-profile-options-list-link',
                        ]"
                        v-if="
                          link.text?.toLowerCase() === 'upgrade' &&
                          !computedIsSubscribed
                        "
                      >
                        <router-link :to="link.url">
                          {{ link.text }}
                        </router-link>
                      </li>
                    </template>
                  </template>
                  <li class="talkie-navbar-profile-options-list-item">
                    <router-link to="/auth/logout">Logout</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </template>
        <template v-if="!computedIsLoggedIn">
          <li
            :class="[
              'talkie-navbar-link-item',
              'talkie-navbar-link-item-always-disable',
            ]"
          >
            <router-link to="/auth/login">Login</router-link>
            &nbsp;<strong>/</strong>&nbsp;
            <router-link to="/auth/signup">Signup</router-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import LogoTalkie from "@/components/SVGs/LogoTalkie.vue";
import TalkieIcon from "@/components/UICore/Icon.vue";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";
import roles from "@/utils/constants/roles";

export default {
  name: "Header",
  components: { TalkieIcon, LogoTalkie },
  data() {
    return {
      links: [
        // TEMP: nav links hidden for first deployment
        {
          text: "Upgrade",
          url: "/pricing",
          displayForRoles: [roles.TEACHER, roles.ADMIN],
        },
        // {
        //   text: "Help",
        //   url: "#",
        // },
      ],
      remainingTrialDays: 0, // TODO: get this from api
    };
  },
  computed: {
    computedUser() {
      return {
        ...this.$store.state.user,
        ...(this.$store.state.user?.image && {
          image: this.$store.state.user?.image
            ? generateAvatar(
                this.$store.state.user?.image?.split("-")[1],
                this.$store.state.user?.image
              )
            : null,
        }),
      };
    },
    computedIsLoggedIn() {
      return Object.keys(this.$store.state.user)?.length > 0;
    },
    computedIsSubscribed() {
      return this.$store.state.userIsSubscribed;
    },
  },
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
  methods: {
    onCloseTrailBarClick() {
      this.remainingTrialDays = null;
    },
  },
};
</script>

<style scoped>
.trial-bar {
  position: fixed;
  z-index: var(--t-zindex-80);
  width: 100%;
  background-color: var(--t-primary);
  text-align: center;
  padding: var(--t-space-8);
  font-size: var(--t-fs-base);
}
.trial-bar-close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--t-space-8);
}
.talkie-navbar-wrapper-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--t-zindex-70);
}
.talkie-navbar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--t-shadow-dark);
  background-color: var(--t-white);
  width: 100%;
  z-index: var(--t-zindex-70);
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

.talkie-navbar-profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-8);
  position: relative;
}
.talkie-navbar-profile-wrapper:hover > .talkie-navbar-profile-options-wrapper,
.talkie-navbar-profile-wrapper:focus > .talkie-navbar-profile-options-wrapper,
.talkie-navbar-profile-wrapper:focus-within
  > .talkie-navbar-profile-options-wrapper {
  -webkit-transform: scaleY(1);
  -ms-transform: scaleY(1);
  transform: scaleY(1);
  opacity: 1;
  visibility: visible;
}
.talkie-navbar-profile-avatar {
  min-height: var(--profile-avatar-size);
  min-width: var(--profile-avatar-size);
  max-height: var(--profile-avatar-size);
  max-width: var(--profile-avatar-size);
  cursor: pointer;
}
.talkie-navbar-profile-name {
  text-decoration: none;
  transition: 0.1s ease;
}
.talkie-navbar-profile-name:hover {
  filter: opacity(0.8);
}
.talkie-navbar-profile-name:visited {
  color: var(--t-black);
}
.talkie-navbar-profile-image-wrapper {
  border-radius: 50%;
  background-color: var(--t-gray-100);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease;
}
.talkie-navbar-profile-image-wrapper:hover {
  filter: opacity(0.8);
}
.talkie-navbar-profile-options-wrapper {
  box-shadow: 0 10px 30px 0 rgba(22, 22, 11, 0.1);
  width: fit-content;
  border-style: var(--t-space-2) solid var(--t-gray-100);
  background-color: var(--t-white);
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.1s ease-in;
  position: absolute;
  top: 45px;
  right: 0;
}
.talkie-navbar-profile-options-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  gap: var(--t-space-4);
}
.talkie-navbar-profile-options-list-item > a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-8);
  color: var(--t-black);
}
.talkie-navbar-profile-options-list-item > a,
.talkie-navbar-profile-options-list-item > a:hover,
.talkie-navbar-profile-options-list-item > a:visited {
  text-decoration: none;
}

/* Responsiveness */
@media (max-width: 599px) {
  .trial-bar {
    padding: var(--t-space-5);
    font-size: var(--t-fs-small);
  }
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
  .talkie-navbar-profile-avatar {
    --profile-avatar-size: var(--t-space-38);
  }
  .talkie-navbar-link-item {
    display: none;
    font-size: calc(var(--t-fs-small) * 0.85);
  }
  .talkie-navbar-link-item-always-visiable {
    display: inherit;
  }
  .talkie-navbar-profile-name {
    font-size: calc(var(--t-fs-small) - 2px);
  }
  .talkie-navbar-profile-image-wrapper {
    min-width: var(--t-space-36);
    min-height: var(--t-space-36);
  }
  .talkie-navbar-profile-options-wrapper {
    border-radius: var(--t-br-medium);
    font-size: calc(var(--t-fs-small) - 2px);
  }
  .talkie-navbar-profile-options-list {
    gap: var(--t-space-2);
  }
  .talkie-navbar-profile-options-list-link {
    display: inherit;
  }
  .talkie-navbar-profile-options-list-item {
    padding: var(--t-space-12) var(--t-space-50);
    padding-left: var(--t-space-24);
  }
}
@media (min-width: 600px) {
  .trial-bar {
    padding: var(--t-space-8);
    font-size: var(--t-fs-base);
  }
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
  .talkie-navbar-profile-avatar {
    --profile-avatar-size: var(--t-space-44);
  }
  .talkie-navbar-link-item,
  .talkie-navbar-profile-name {
    font-size: var(--t-fs-small);
  }
  .talkie-navbar-profile-image-wrapper {
    min-width: var(--t-space-40);
    min-height: var(--t-space-40);
  }
  .talkie-navbar-profile-options-wrapper {
    border-radius: var(--t-br-large);
    font-size: var(--t-fs-small);
    padding: var(--t-space-8);
  }
  .talkie-navbar-profile-options-list {
    gap: var(--t-space-4);
  }
  .talkie-navbar-profile-options-list-link {
    display: none;
  }
  .talkie-navbar-profile-options-list-item {
    padding: var(--t-space-12) var(--t-space-64);
    padding-left: var(--t-space-24);
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
  .talkie-navbar-profile-avatar {
    --profile-avatar-size: var(--t-space-50);
  }
  .talkie-navbar-link-item {
    font-size: var(--t-fs-base);
  }
  .talkie-navbar-profile-name {
    font-size: var(--t-fs-base);
  }
  .talkie-navbar-profile-image-wrapper {
    min-width: var(--t-space-44);
    min-height: var(--t-space-44);
  }
  .talkie-navbar-profile-options-wrapper {
    font-size: var(--t-fs-base);
  }
}
</style>

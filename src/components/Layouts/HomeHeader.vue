<template>
  <nav class="talkie-navbar-wrapper">
    <!-- Left Side -->
    <a href="#" class="talkie-navbar-logo-link">
      <logo-talkie />
    </a>
    <!-- Right Side -->
    <ul class="talkie-navbar-links-wrapper" v-if="!hideLinksAndProfile">
      <template v-if="!hideLinks" class="talkie-navbar">
        <li
          class="talkie-navbar-link-item"
          v-for="link in links"
          :key="Math.random() * link"
        >
          <a :href="link.url">{{ link.text }}</a>
        </li>
      </template>
      <li class="talkie-navbar-profile-link-item">
        <div class="talkie-navbar-profile-wrapper" tabindex="0">
          <a class="talkie-navbar-profile-name" href="#">Ms Joyce</a>
          <talkie-icon :size="25" :name="'profile'" :isActive="true" />
          <div class="talkie-navbar-profile-options-wrapper">
            <ul class="talkie-navbar-profile-options-list">
              <li class="talkie-navbar-profile-options-list-item">
                <a>Profile</a>
              </li>
              <li
                class="
                  talkie-navbar-profile-options-list-item
                  talkie-navbar-profile-options-list-link
                "
                v-for="link in links"
                :key="Math.random() * link"
              >
                <a :href="link.url">{{ link.text }}</a>
              </li>
              <li class="talkie-navbar-profile-options-list-item">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import LogoTalkie from "../SVGs/LogoTalkie.vue";
import TalkieIcon from "../UICore/Icon.vue";

export default {
  name: "HomeHeader",
  components: { TalkieIcon, LogoTalkie },
  data: () => ({
    links: [
      {
        text: "Upgrade",
        url: "#",
      },
      {
        text: "Help",
        url: "#",
      },
    ],
  }),
  props: {
    hideLinksAndProfile: {
      type: Boolean,
      default: false,
    },
    hideLinks: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.talkie-navbar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--t-shadow-dark);
  background-color: var(--t-white);
}
.talkie-navbar-logo-link > svg {
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
.talkie-navbar-profile-name {
  text-decoration: none;
  transition: 0.1s ease;
}
.talkie-navbar-profile-name:hover {
  filter: opacity(0.8);
}
.talkie-navbar-profile-name:visited {
  color: var(--t-balck);
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
}
.talkie-navbar-profile-options-list-item > a,
.talkie-navbar-profile-options-list-item > a:hover,
.talkie-navbar-profile-options-list-item > a:visited {
  text-decoration: none;
}

/* Responsiveness */
@media (max-width: 599px) {
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-16);
    min-height: var(--t-space-50);
    max-height: var(--t-space-50);
  }
  .talkie-navbar-logo-link > svg {
    --logo-svg-size: var(--t-space-24);
  }
  .talkie-navbar-link-item {
    display: none;
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
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-24);
    min-height: var(--t-space-58);
    max-height: var(--t-space-58);
  }
  .talkie-navbar-logo-link > svg {
    --logo-svg-size: var(--t-space-28);
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
@media (min-width: 1200px) {
  .talkie-navbar-wrapper {
    padding: 0 var(--t-space-32);
    min-height: var(--t-space-70);
    max-height: var(--t-space-70);
  }
  .talkie-navbar-logo-link > svg {
    --logo-svg-size: var(--t-space-33);
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

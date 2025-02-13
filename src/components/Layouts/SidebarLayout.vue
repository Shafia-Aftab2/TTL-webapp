<template>
  <div class="talkie-sidebar-layout-wrapper">
    <div
      :class="[
        'talkie-sidebar-navigation-wrapper',
        hideSidebar && 'talkie-sidebar-navigation-wrapper-hidden',
        computedSubscription?.remainingTrialDays > 0 &&
          computedSubscription?.remainingTrialDays < 15 &&
          !computedSubscription?.hideTrialBar &&
          'talkie-sidebar-navigation-wrapper-trial-pad',
      ]"
      id="talkie-sidebar-navigation-wrapper"
    >
      <div
        class="talkie-sidebar-navigation-content-back-link-wrapper"
        v-if="computedSidebar.hasBackLink"
      >
        <a
          class="talkie-sidebar-navigation-content-back-link"
          @click="handleBackLinkClick"
          >&#8592; back</a
        >
      </div>
      <ul
        class="talkie-sidebar-navigation-content-items-wrapper"
        v-if="computedSidebar.items && computedSidebar.items.length > 0"
      >
        <component
          :is="item.link ? 'router-link' : 'li'"
          :class="[
            'talkie-sidebar-navigation-content-item',
            item.isActive && 'talkie-sidebar-navigation-content-item-active',
          ]"
          v-for="item in computedSidebar.items"
          :key="item"
          :to="item.link"
          @click="item.onClick"
        >
          <p class="p" v-if="item.name">
            {{ item.name }}
          </p>
          <talkie-icon :name="'arrow-head-right'" v-if="item.hasRightIcon" />
        </component>
      </ul>
      <ul
        :class="[
          'talkie-sidebar-navigation-content-checkboxes-wrapper',
          computedSidebar.items &&
            computedSidebar.items.length > 0 &&
            'talkie-sidebar-navigation-content-checkboxes-wrapper-top-spacing',
        ]"
        v-if="
          computedSidebar.checkboxes && computedSidebar.checkboxes.length > 0
        "
      >
        <talkie-check-box
          v-for="_checkbox in computedSidebar.checkboxes"
          :label="_checkbox?.label"
          :isChecked="_checkbox?.isChecked"
          :disabled="_checkbox?.disabled"
          :onToggle="_checkbox?.onToggle"
          :key="_checkbox"
          :customClass="`${
            _checkbox?.isActive &&
            'talkie-sidebar-navigation-content-checkbox-active'
          } ${_checkbox?.customClass}`"
        />
      </ul>
      <ul
        class="talkie-sidebar-navigation-content-buttons-wrapper"
        v-if="computedSidebar.buttons && computedSidebar.buttons.length > 0"
      >
        <template
          v-for="_sidebarButton in computedSidebar.buttons"
          :key="_sidebarButton"
        >
          <talkie-button
            :type="_sidebarButton.type || 'button'"
            :variant="_sidebarButton.variant || 'primary'"
            :size="_sidebarButton.size || 'medium'"
            :outlined="_sidebarButton.outlined || false"
            :fullWidth="_sidebarButton.fullWidth || false"
            :loading="_sidebarButton.loading || false"
            :disabled="_sidebarButton.disabled || false"
            :onClick="_sidebarButton.onClick"
            :customClass="`talkie-sidebar-navigation-content-button ${_sidebarButton.customClass}`"
          >
            {{ _sidebarButton.text }}
          </talkie-button>
        </template>
      </ul>

      <div
        class="profile-account-settings-sectionn layoutPosition"
        v-if="teacher"
      >
        <talkie-button
          :variant="'primary'"
          :outlined="true"
          :onClick="redirectToContactUs"
        >
          <div class="feed-back-button-setting">
            <img src="@/assets/images/chat.png" />
            Give us your feedback
          </div>
        </talkie-button>
      </div>
    </div>

    <div
      :class="[
        'talkie-sidebar-content-wrapper',
        hideSidebar && 'talkie-sidebar-content-wrapper-full-width',
        computedSubscription?.remainingTrialDays > 0 &&
          computedSubscription?.remainingTrialDays < 15 &&
          !computedSubscription?.hideTrialBar &&
          'talkie-sidebar-content-wrapper-trial-pad',
      ]"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import TalkieIcon from "../UICore/Icon.vue";
import TalkieButton from "../UICore/Button.vue";
import TalkieCheckBox from "../UICore/CheckBox.vue";

import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";

export default {
  name: "SidebarLayout",
  components: {
    TalkieIcon,
    TalkieButton,
    TalkieCheckBox,
  },
  data() {
    return {
      teacher: false,
    };
  },
  created() {
    // get user
    const user = authUser.getUser();
    const teacherRole = roles.TEACHER;

    if (user.role === teacherRole) {
      this.teacher = true;
    }
  },
  computed: {
    computedSidebar() {
      return this.$store.state.sidebar;
    },
    computedSubscription() {
      return this.$store.state.subscription;
    },
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleBackLinkClick() {
      this.$router.go(-1);
    },
    redirectToContactUs() {
      this.$router.push("/contact");
    },
  },
};
</script>

<style scoped>
.talkie-sidebar-layout-wrapper {
  width: 100%;
}
.talkie-sidebar-navigation-wrapper {
  position: fixed;
  height: 100%;
  min-width: var(--sidebar-width);
  max-width: var(--sidebar-width);
  border: var(--t-space-1) solid var(--t-gray-175);
  box-shadow: var(--t-shadow-dark);
  background-color: var(--t-white);
  transition: 0.15s ease-in-out;
  overflow-y: scroll;
  z-index: var(--t-zindex-80);
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper:-webkit-scrollbar {
  display: none !important;
}
.talkie-sidebar-navigation-content-back-link {
  text-decoration: none;
}
.talkie-sidebar-navigation-content-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-10);
}
.talkie-sidebar-navigation-content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: var(--t-space-1);
  border-radius: var(--t-br-medium);
  padding: var(--t-space-5);
  padding-left: var(--t-space-16);
  text-decoration: none;
}
.talkie-sidebar-navigation-content-item:hover {
  background-color: var(--t-gray-100);
  border-color: var(--t-gray-100);
}
.talkie-sidebar-navigation-content-item:visited {
  color: var(--t-black);
}
.talkie-sidebar-navigation-content-item-active {
  font-family: var(--t-ff-bold);
}
.talkie-sidebar-navigation-content-checkboxes-wrapper {
  display: flex;
  flex-direction: column;
}
.talkie-sidebar-navigation-content-checkbox-active {
  font-family: var(--t-ff-bold);
}
.talkie-sidebar-navigation-content-buttons-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.talkie-sidebar-content-wrapper {
  margin: auto;
  transition: 0.15s ease;
}
.talkie-sidebar-content-wrapper-full-width {
  margin-left: auto !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-28) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-16);
    padding-bottom: calc(var(--t-space-70) * 3);
    margin-top: var(--t-space-50);
  }
  .talkie-sidebar-navigation-wrapper-hidden {
    transform: translateX(calc(var(--sidebar-width) * -1));
  }
  .talkie-sidebar-navigation-wrapper-trial-pad {
    top: 25px; /* TODO: get from variables */
  }
  .talkie-sidebar-navigation-content-back-link-wrapper {
    padding-bottom: var(--t-space-36);
  }
  .talkie-sidebar-navigation-content-back-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
  .talkie-sidebar-navigation-content-item {
    font-size: calc(var(--t-fs-base) * 0.9);
    min-height: var(--t-space-48);
    max-height: var(--t-space-48);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper {
    gap: var(--t-space-24);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper-top-spacing {
    margin-top: var(--t-space-24);
  }
  .talkie-sidebar-navigation-content-buttons-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-24);
  }
  .talkie-sidebar-navigation-content-button {
    min-height: calc(var(--t-space-48) * 0.8);
    max-height: calc(var(--t-space-48) * 0.8);
  }
  .talkie-sidebar-content-wrapper {
    margin: auto;
    max-width: var(--t-grid-small);
    padding-top: var(--t-space-50);
  }
  .talkie-sidebar-content-wrapper-trial-pad {
    margin-top: 25px; /* TODO: get from variables */
  }
}
@media (min-width: 600px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-20) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    transform: translateX(0);
    padding: var(--t-space-12);
    padding-bottom: calc(var(--t-space-70) * 3);
    margin-top: var(--t-space-58);
  }
  .talkie-sidebar-navigation-wrapper-trial-pad {
    top: var(--t-space-32);
  }
  .talkie-sidebar-navigation-content-back-link-wrapper {
    padding-bottom: var(--t-space-50);
  }
  .talkie-sidebar-navigation-content-back-link {
    font-size: calc(var(--t-fs-small) * 0.95);
  }
  .talkie-sidebar-navigation-content-item {
    font-size: calc(var(--t-fs-base) * 0.9);
    min-height: var(--t-space-48);
    max-height: var(--t-space-48);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper {
    gap: var(--t-space-28);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper-top-spacing {
    margin-top: var(--t-space-24);
  }
  .talkie-sidebar-navigation-content-buttons-wrapper {
    gap: var(--t-space-8);
    margin-top: var(--t-space-24);
  }
  .talkie-sidebar-navigation-content-button {
    min-height: calc(var(--t-space-48) * 0.8);
    max-height: calc(var(--t-space-48) * 0.8);
  }
  .talkie-sidebar-content-wrapper {
    margin: auto;
    max-width: var(--t-grid-large);
    margin-left: var(--sidebar-width) !important;
    padding-top: var(--t-space-58);
  }
  .talkie-sidebar-content-wrapper-trial-pad {
    margin-top: var(--t-space-32);
  }
}
@media (min-width: 900px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-26) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-18);
    padding-bottom: calc(var(--t-space-70) * 3);
  }
  .talkie-sidebar-navigation-content-item {
    font-size: calc(var(--t-fs-base) * 0.95);
  }
}
@media (min-width: 1200px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-32) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-20);
    padding-bottom: calc(var(--t-space-70) * 3);
    margin-top: var(--t-space-70);
  }
  .talkie-sidebar-navigation-content-back-link-wrapper {
    padding-bottom: var(--t-space-70);
  }
  .talkie-sidebar-navigation-content-back-link {
    font-size: var(--t-fs-small);
  }
  .talkie-sidebar-navigation-content-item {
    font-size: var(--t-fs-base);
    min-height: var(--t-space-56);
    max-height: var(--t-space-56);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper {
    gap: var(--t-space-32);
  }
  .talkie-sidebar-navigation-content-checkboxes-wrapper-top-spacing {
    margin-top: var(--t-space-32);
  }
  .talkie-sidebar-navigation-content-buttons-wrapper {
    gap: var(--t-space-16);
    margin-top: var(--t-space-32);
  }
  .talkie-sidebar-navigation-content-button {
    min-height: calc(var(--t-space-56) * 0.8);
    max-height: calc(var(--t-space-56) * 0.8);
  }
  .talkie-sidebar-content-wrapper {
    padding-top: var(--t-space-70);
  }
}

/* TEMP */
.p {
  margin-bottom: 0 !important;
}

/*Position to the feedback button*/
.layoutPosition {
  position: fixed;
  bottom: 90px;
  background: white;
}
.feed-back-button-setting {
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -27px;
}
.feed-back-button-setting img {
  margin-left: -10px;
  margin-right: 2px;
  width: 16px;
  height: 26px;
}

@media (max-width: 905px) {
  .feed-back-button-setting {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>

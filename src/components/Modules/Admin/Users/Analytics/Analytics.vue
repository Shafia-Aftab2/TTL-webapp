<template>
  <div class="admin-users-analytics-wrapper">
    <!-- Header -->
    <div class="admin-users-analytics-header-wrapper">
      <img
        :src="require(`@/assets/images/person-placeholder-image.png`)"
        class="admin-users-analytics-header-image"
      />
      <div class="admin-users-analytics-header-info-wrapper">
        <h2 class="h2">Mr Bookes</h2>
        <h5 class="h5">Hollyfield Academy</h5>
      </div>
    </div>

    <!-- Body -->
    <div
      :class="[
        'admin-users-analytics-content-wrapper',
        'admin-users-analytics-content-wrapper-multi-col',
      ]"
    >
      <div class="admin-users-analytics-content-item">
        <h2 class="h2">36</h2>
        <p class="p">Students</p>
      </div>
      <div class="admin-users-analytics-content-item">
        <h2 class="h2">2</h2>
        <p class="p">Classes</p>
      </div>
      <div class="admin-users-analytics-content-item">
        <h2 class="h2">9</h2>
        <p class="p">Questions</p>
      </div>
      <div class="admin-users-analytics-content-item">
        <h2 class="h2">Active</h2>
        <p class="p">Last Login: Yesterday</p>
      </div>
    </div>

    <!-- Footer -->
    <talkie-button> Remove User </talkie-button>
  </div>
</template>

<script>
import {
  TalkieIcon,
  TalkieTab,
  TalkieSelect,
  TalkieModal,
  TalkieLoader,
  TalkieSwitch,
  TalkieButtonDropDown,
  TalkieBackDropLoader,
  TalkieInput,
  TalkieButton,
} from "@/components/UICore";
import {
  TalkieQuestionCard,
  TalkieStudentCard,
} from "@/components/SubModules/Cards";
import { UserService } from "@/api/services";
import URLModifier from "@/utils/helpers/URLModifier";
import { generateAvatar } from "@/utils/helpers/avatarGenerator";

export default {
  name: "AdminUserAnalytics",
  components: {
    TalkieIcon,
    TalkieTab,
    TalkieSelect,
    TalkieModal,
    TalkieButtonDropDown,
    TalkieButton,
    TalkieLoader,
    TalkieSwitch,
    TalkieBackDropLoader,
    TalkieQuestionCard,
    TalkieStudentCard,
    TalkieInput,
  },
};
</script>

<style scoped>
.admin-users-analytics-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.admin-users-analytics-header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.admin-users-analytics-header-info-wrapper {
  display: flex;
  flex-direction: column;
}
.admin-users-analytics-header-image {
  border-radius: 50%;
  object-fit: cover;
  min-height: var(--image-size);
  min-width: var(--image-size);
  height: var(--image-size);
  width: var(--image-size);
}
.admin-users-analytics-content-wrapper {
  display: grid;
}
.admin-users-analytics-content-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--t-white);
  width: 100%;
}
.admin-users-analytics-loading-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-18);
  }
  .admin-users-analytics-header-wrapper {
    gap: var(--t-space-8);
  }
  .admin-users-analytics-header-info-wrapper {
    gap: var(--t-space-3);
  }
  .admin-users-analytics-header-image {
    --image-size: var(--t-space-63);
  }
  .admin-users-analytics-content-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-analytics-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-small);
    padding: var(--t-space-30) var(--t-space-16);
    gap: var(--t-space-5);
  }
}
@media (min-width: 600px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-24);
  }
  .admin-users-analytics-header-wrapper {
    gap: var(--t-space-12);
  }
  .admin-users-analytics-header-info-wrapper {
    gap: var(--t-space-5);
  }
  .admin-users-analytics-header-image {
    --image-size: var(--t-space-70);
  }
  .admin-users-analytics-content-wrapper {
    gap: var(--t-space-16);
  }
  .admin-users-analytics-content-wrapper-single-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-30) var(--t-space-24);
    gap: var(--t-space-12);
  }
}
@media (min-width: 900px) {
  .admin-users-analytics-wrapper {
    gap: var(--t-space-36);
  }
  .admin-users-analytics-header-image {
    --image-size: calc(var(--t-space-70) * 1.2);
  }
  .admin-users-analytics-content-wrapper-multi-col {
    grid-template-columns: 1fr 1fr;
  }
  .admin-users-analytics-content-item {
    border-radius: var(--t-br-medium);
    padding: var(--t-space-36) var(--t-space-24);
    gap: var(--t-space-16);
  }
}
</style>

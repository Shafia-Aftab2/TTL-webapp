<template>
  <div class="class-invite-students-wrapper">
    <div class="class-invite-students-info-wrapper">
      <h2 class="h2">Invite your students</h2>
      <p class="p" style="margin-bottom: 0 !important">
        Copy and paste the url below
      </p>
    </div>

    <talkie-input
      :placeholder="'Url Here'"
      :value="computedClassLink"
      :customClass="'class-invite-students-input'"
    />

    <div class="class-invite-students-options-wrapper">
      <talkie-button :onClick="hanldeCopyButtonClick">Copy</talkie-button>
      <talkie-button
        :disabled="!isCopiedToClipboard"
        :onClick="handleNextButtonClick"
        >Next</talkie-button
      >
    </div>
  </div>
  <div class="class-invite-students-footer">
    <a :href="`/classes/${classId}`" class="class-invite-students-footer-link">
      Not now
    </a>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton } from "@/components/UICore";
import { notifications } from "@/components/UIActions";
import { copy as copyToClipboard } from "@/utils/helpers/clipboard";

export default {
  name: "InviteStudents",
  components: { TalkieInput, TalkieButton },
  data() {
    return {
      classId: null,
      isCopiedToClipboard: false,
    };
  },
  computed: {
    computedClassLink() {
      return `${window.location.origin}/classes/${this.classId}/join`;
    },
  },
  created() {
    // class id from params
    const classId = this.$route.params.id;
    this.classId = classId;
  },
  methods: {
    async hanldeCopyButtonClick() {
      const isCopiedToClipboard = await copyToClipboard(this.classLink);

      // error case
      if (!isCopiedToClipboard) {
        notifications.show("Failed To Copy To Clipboard..!", {
          variant: "error",
          displayIcon: true,
        });
        this.isCopiedToClipboard = false;
        return;
      }

      // success case
      notifications.show("Copied To Clipboard..!", {
        variant: "success",
        displayIcon: true,
      });
      this.isCopiedToClipboard = true;
    },
    handleNextButtonClick() {
      this.$router.push(`/classes/${this.classId}/tasks/create`);
    },
  },
};
</script>

<style>
.class-invite-students-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  background-color: var(--t-white);
}
.class-invite-students-info-wrapper,
.class-invite-students-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
}
.class-invite-students-input {
  margin: auto;
}
.class-invite-students-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.class-invite-students-footer-link {
  text-decoration: underline;
}
.class-invite-students-footer-link,
.class-invite-students-footer-link:hover,
.class-invite-students-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-invite-students-wrapper {
    max-width: 100%;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    border-radius: var(--t-br-medium);
  }
  .class-invite-students-input {
    max-width: 100%;
  }
  .class-invite-students-footer {
    padding: var(--t-space-64);
  }
  .class-invite-students-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .class-invite-students-wrapper {
    max-width: 65%;
    gap: var(--t-space-36);
    padding: var(--t-space-48);
    border-radius: var(--t-br-medium);
  }
  .class-invite-students-input {
    max-width: 100%;
  }
  .class-invite-students-footer {
    margin-top: var(--t-space-24);
    padding: var(--t-space-50);
  }
  .class-invite-students-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .class-invite-students-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .class-invite-students-input {
    max-width: 85%;
  }
  .class-invite-students-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

<template>
  <div class="class-join-module-wrapper">
    <div class="class-join-module-info-wrapper">
      <h2 class="h2">Join Class</h2>
      <p class="p" style="margin-bottom: 0 !important">
        Paste the url sent by your teacher below
      </p>
    </div>

    <talkie-input
      :placeholder="'Url Here'"
      :onChange="handleUrlChange"
      :customClass="'class-join-module-input'"
      :hint="{
        type: formState?.type || null,
        message: formState?.message || null,
      }"
    />

    <div class="class-join-module-options-wrapper">
      <talkie-button :onClick="handleJoinClassClick">Join</talkie-button>
    </div>
  </div>
</template>
<script>
import { TalkieInput, TalkieButton } from "@/components/UICore";
import isValidId from "@/utils/helpers/isValidId";
import isValidURL from "@/utils/helpers/isValidURL";

export default {
  name: "ClassJoinModule",
  data() {
    return {
      joinClassLink: "",
      formState: {
        type: null,
        message: null,
      },
    };
  },
  components: { TalkieInput, TalkieButton },
  methods: {
    handleUrlChange(e) {
      this.joinClassLink = e.target.value.trim();
    },
    handleJoinClassClick() {
      this.formState = {
        type: null,
        message: null,
      };

      const url = this.joinClassLink?.trim();

      // validate if there is a url
      if (url?.length === 0) {
        this.formState = {
          type: "error",
          message: "Url is required..!",
        };
        return;
      }

      // validate if url is valid
      const classId = url?.split("/classes/")?.[1]?.split("/join")?.[0];
      if (!(isValidURL(url) && isValidId(classId))) {
        this.formState = {
          type: "error",
          message: "Invalid URL..!",
        };
        return;
      }

      // redirect to join class page
      this.$router.push(`/classes/${classId}/join`);
    },
  },
};
</script>

<style scoped>
.class-join-module-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: var(--t-white);
}
.class-join-module-info-wrapper,
.class-join-module-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
}
.class-join-module-input {
  margin: auto;
}
.class-join-module-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.class-join-module-footer-link {
  text-decoration: underline;
}
.class-join-module-footer-link,
.class-join-module-footer-link:hover,
.class-join-module-footer-link:visited {
  text-decoration: underline;
  color: var(--t-black);
}

/* Responsive variants */
@media (max-width: 599px) {
  .class-join-module-wrapper {
    max-width: 100%;
    gap: var(--t-space-36);
    padding: var(--t-space-32);
    margin-top: var(--t-space-48);
    border-radius: var(--t-br-medium);
  }
  .class-join-module-input {
    max-width: 100%;
  }
  .class-join-module-footer {
    padding: var(--t-space-64);
  }
  .class-join-module-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 600px) {
  .class-join-module-wrapper {
    max-width: 65%;
    gap: var(--t-space-48);
    padding: var(--t-space-48);
    margin-top: var(--t-space-70);
    border-radius: var(--t-br-medium);
  }
  .class-join-module-input {
    max-width: 100%;
  }
  .class-join-module-footer {
    margin-top: var(--t-space-24);
    padding: var(--t-space-50);
  }
  .class-join-module-footer-link {
    font-size: calc(var(--t-fs-small) * 0.9);
  }
}
@media (min-width: 1200px) {
  .class-join-module-wrapper {
    max-width: 80%;
    padding: var(--t-space-48);
    border-radius: var(--t-br-large);
  }
  .class-join-module-input {
    max-width: 85%;
  }
  .class-join-module-footer-link {
    font-size: var(--t-fs-small);
  }
}
</style>

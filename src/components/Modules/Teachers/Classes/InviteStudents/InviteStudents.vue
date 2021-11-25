<template>
  <div class="teachers-class-invite-students-wrapper">
    <div class="teachers-class-invite-students-info-wrapper">
      <h2 class="h2">Invite your students</h2>
      <p class="p">Copy and paste the url below</p>
    </div>

    <talkie-input :placeholder="'Url Here'" />

    <div class="teachers-class-invite-students-options-wrapper">
      <talkie-button>Copy</talkie-button>
      <talkie-button :disabled="true">Next</talkie-button>
    </div>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton } from "../../../../UICore";

export default {
  name: "InviteStudents",
  components: { TalkieInput, TalkieButton },
};
</script>

<style>
.teachers-class-invite-students-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-12);
  max-width: 55%;
  gap: var(--t-space-36);
  padding: var(--t-space-48) 0;
}
.teachers-class-invite-students-info-wrapper,
.teachers-class-invite-students-options-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: var(--t-space-12);
}
</style>

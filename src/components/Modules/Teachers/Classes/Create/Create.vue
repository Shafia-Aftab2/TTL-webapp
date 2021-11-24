<template>
  <div class="teachers-create-class-wrapper">
    <!-- on Left of Screen -->
    <div class="teachers-create-class-form">
      <h3 class="h3">¡Hola, Ms. Joyce!</h3>
      <h5 class="teachers-create-class-form-header h5">
        Let’s create your first class...
      </h5>
      <talkie-input
        :size="'medium'"
        :placeholder="'Class Name'"
        :customClass="'teachers-create-class-form-field'"
      />
      <talkie-input
        :size="'medium'"
        :placeholder="'I teach...'"
        :customClass="'teachers-create-class-form-field'"
      />
      <talkie-button
        :size="'medium'"
        :customClass="'teachers-create-class-form-field'"
        >Next</talkie-button
      >
    </div>

    <!-- On Right of Screen -->
    <div class="teachers-create-class-avatar">
      <logo-teacher-class-create />
    </div>
  </div>
</template>

<script>
import { TalkieInput, TalkieButton } from "../../../../UICore";
import LogoTeacherClassCreate from "../../../../SVGs/LogoTeacherClassCreate.vue";

export default {
  name: "TeacherClassCreate",
  components: {
    TalkieInput,
    TalkieButton,
    LogoTeacherClassCreate,
  },
};
</script>

<style>
.teachers-create-class-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  flex-direction: row;
  max-width: 100%;
  gap: var(--t-space-24);
  padding: var(--t-space-24) 0;
}
.teachers-create-class-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: var(--t-space-16);
}
.teachers-create-class-form-header {
  font-family: var(--t-ff-medium);
}
.teachers-create-class-avatar {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
  --logo-width: 500px;
  --logo-height: 500px;
}
.teachers-create-class-avatar > svg {
  position: static;
  opacity: 1;
  transform: translate(0, 0);
  z-index: var(--t-zindex-10);
  width: var(--logo-width);
  height: var(--logo-height);
}
</style>

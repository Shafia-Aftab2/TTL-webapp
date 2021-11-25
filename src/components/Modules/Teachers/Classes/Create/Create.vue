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
}
.teachers-create-class-form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
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

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-16);
    padding: var(--t-space-32);
    margin-top: var(--t-space-12);
  }
  .teachers-create-class-form {
    gap: var(--t-space-12);
  }
  .teachers-create-class-avatar {
    display: none;
  }
}
@media (min-width: 600px) {
  .teachers-create-class-wrapper {
    flex-direction: column;
    gap: var(--t-space-24);
    padding: var(--t-space-32);
    max-width: 75%;
  }
  .teachers-create-class-form {
    gap: var(--t-space-12);
  }
  .teachers-create-class-avatar {
    display: flex;
  }
  .teachers-create-class-avatar > svg {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-40%, -50%);
    opacity: 0.5;
    z-index: var(--t-zindex-nv-10);
    width: calc(var(--logo-width) * 0.9);
    height: calc(var(--logo-height) * 0.9);
  }
}
@media (min-width: 900px) {
  .teachers-create-class-wrapper {
    flex-direction: row;
    gap: var(--t-space-16);
    padding: var(--t-space-58);
    max-width: 100%;
  }
  .teachers-create-class-avatar > svg {
    position: static;
    opacity: 1;
    transform: translate(0, 0);
    z-index: var(--t-zindex-10);
    width: calc(var(--logo-width) * 0.8);
    height: calc(var(--logo-height) * 0.8);
  }
}
@media (min-width: 1200px) {
  .teachers-create-class-wrapper {
    gap: var(--t-space-24);
    padding: var(--t-space-24) 0;
  }
  .teachers-create-class-form {
    gap: var(--t-space-16);
  }
  .teachers-create-class-avatar > svg {
    width: var(--logo-width);
    height: var(--logo-height);
  }
}
</style>

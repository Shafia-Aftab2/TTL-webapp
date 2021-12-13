<template>
  <div class="teachers-class-home-wrapper">
    <div class="teachers-class-home-header-wrapper">
      <div class="teachers-class-home-header-details-wrapper">
        <h2 class="h2">10A Spanish</h2>
        <div class="teachers-class-home-header-details-icons-wrapper">
          <talkie-icon :name="'trophy'" />
          <talkie-icon :name="'setting'" />
        </div>
      </div>
      <div class="teachers-class-home-header-tabs-wrapper">
        <talkie-tab :label="'Questions'" />
        <talkie-tab :label="'Students'" :active="true" />
      </div>
    </div>
    <div class="bar-inline">
      <p>Syed Mohsin</p>
      <talkie-icon :name="'arrow-head-right'" />
    </div>
    <div class="bar-inline">
      <p>Daniyal Haider</p>
      <talkie-icon :name="'arrow-head-right'" />
    </div>
    <div class="bar-inline">
      <p>Shah Shamsi</p>
      <talkie-icon :name="'arrow-head-right'" />
    </div>
  </div>
</template>

<script>
import { TalkieIcon, TalkieTab } from "@/components/UICore";

export default {
  name: "TeacherClassStudents",
  data() {
    return {
      studentsList: [],
    };
  },
  components: {
    TalkieIcon,
    TalkieTab,
  },
  methods: {},
};
</script>

<style scoped>
.bar-inline {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
}
.teachers-class-home-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
.teachers-class-home-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.teachers-class-home-header-details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.teachers-class-home-header-details-icons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.teachers-class-home-header-tabs-wrapper {
  display: flex;
  align-items: center;
  overflow-x: scroll;
}
.teachers-class-home-header-tabs-wrapper::-webkit-scrollbar {
  display: none !important;
}
.teachers-class-home-header-tabs-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.teachers-class-home-header-tabs-wrapper:-webkit-scrollbar {
  display: none !important;
}
.teachers-class-home-header-tabs-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.teachers-class-home-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.teachers-class-home-content-wrapper {
  display: grid;
}

/* Responsive variants */
@media (max-width: 599px) {
  .teachers-class-home-wrapper {
    gap: var(--t-space-18);
  }
  .teachers-class-home-header-wrapper {
    gap: var(--t-space-12);
  }
  .teachers-class-home-header-details-wrapper {
    gap: var(--t-space-12);
  }
  .teachers-class-home-header-details-icons-wrapper {
    gap: var(--t-space-5);
  }
  .teachers-class-home-header-tabs-wrapper {
    gap: var(--t-space-12);
  }
  .teachers-class-home-options-wrapper {
    gap: var(--t-space-12);
  }
  .teachers-class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 2.25) !important;
  }
  .teachers-class-home-content-wrapper {
    grid-template-columns: 1fr;
    gap: var(--t-space-16);
  }
}
@media (min-width: 600px) {
  .teachers-class-home-wrapper {
    gap: var(--t-space-24);
  }
  .teachers-class-home-header-wrapper {
    gap: var(--t-space-16);
  }
  .teachers-class-home-header-details-wrapper {
    gap: var(--t-space-16);
  }
  .teachers-class-home-header-details-icons-wrapper {
    gap: var(--t-space-8);
  }
  .teachers-class-home-header-tabs-wrapper {
    gap: var(--t-space-16);
  }
  .teachers-class-home-options-wrapper {
    gap: var(--t-space-16);
  }
  .teachers-class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 3) !important;
  }
  .teachers-class-home-content-wrapper {
    grid-template-columns: 1fr;
    gap: var(--t-space-16);
  }
}
@media (min-width: 900px) {
  .teachers-class-home-wrapper {
    gap: var(--t-space-12);
  }
  .teachers-class-home-options-custom-talkie-select {
    min-width: calc(var(--t-space-70) * 5) !important;
  }
  .teachers-class-home-content-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

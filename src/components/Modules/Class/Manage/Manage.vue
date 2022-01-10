<template>
  <div class="class-manage-wrapper">
    <div class="class-manage-header-wrapper">
      <div class="class-manage-header-details-wrapper">
        <h2 class="h2">10A Spanish</h2>
        <div class="class-manage-header-details-tab-options-wrapper">
          <p class="p">Manage:</p>
          <template v-for="tabName in tabs" :key="tabName">
            <talkie-tab
              :label="tabName"
              :active="tabName.toLowerCase() === activeTab"
            />
          </template>
        </div>
      </div>
      <div class="class-manage-header-details-manage-options-wrapper">
        <talkie-icon
          :name="'pencil'"
          :variant="'secondary'"
          :size="35"
          :iconToSizeRatio="1.2"
        />
        <talkie-icon
          :name="'trash'"
          :variant="'neutral'"
          :size="35"
          :iconToSizeRatio="1.2"
        />
      </div>
    </div>
    <div class="class-manage-content-wrapper">
      <!-- Students tab -->
      <talkie-student-card
        :mode="'add'"
        :customClass="'class-manage-content-card'"
      />
      <talkie-student-card
        v-for="_student in studentsList"
        :key="_student"
        :mode="'manage'"
        :customClass="'class-manage-content-card'"
        :studentAvatar="_student.avatar"
        :studentName="_student.name"
      />
    </div>
  </div>
</template>

<script>
import { TalkieTab, TalkieIcon } from "@/components/UICore";
import { TalkieStudentCard } from "@/components/SubModules/Cards";

export default {
  name: "ClassManage",
  components: {
    TalkieTab,
    TalkieIcon,
    TalkieStudentCard,
  },
  data() {
    return {
      activeTab: "students",
      tabs: ["students", "topics"],
      studentsList: [
        {
          name: "Jamie S",
          avatar: "https://via.placeholder.com/150",
        },
        {
          name: "Lucy M",
          avatar: "https://via.placeholder.com/150",
        },
      ],
    };
  },
};
</script>

<style>
.class-manage-wrapper {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: var(--t-space-36);
  margin-bottom: var(--t-space-36);
  background-color: var(--t-white);
  max-width: 90%;
  padding: var(--t-space-48);
  border-radius: var(--t-br-large);
  gap: calc(var(--t-space-36) * 2);
}
.class-manage-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.class-manage-header-details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--t-space-16);
}
.class-manage-header-details-tab-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--t-space-12);
}
.class-manage-header-details-manage-options-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  gap: var(--t-space-5);
}
.class-manage-content-wrapper {
  flex-direction: column;
  display: flex;
  justify-content: center;
  gap: var(--t-space-12);
}
.class-manage-content-card {
  border: var(--t-space-1) solid var(--t-gray-75);
}
.class-manage-modal-invite-students {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-30);
}
.class-manage-modal-invite-students-header-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--t-space-5);
}
.class-manage-modal-invite-students-input-wrapper,
.class-manage-modal-invite-students-input-wrapper > div {
  min-width: 80% !important;
}
</style>

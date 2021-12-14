<template>
  <div class="bar-content">
    <a class="back"><span>&#8592; </span>back</a>
    <h1>Inbox</h1>
    <div>
      <Select placeholder="Filter by Question"></Select>
    </div>
    <div class="bar">
      <p>Favourite App</p>
    </div>
    <div class="talkie-icon-bar">
      <div class="messege-bar">
        <p>Audios</p>
      </div>
      <div class="bar-icons">
        <talkie-icon
          :name="'arrow-rounded-left'"
          :isActive="true"
          :variant="'secondary'"
          :size="30"
        />
        <talkie-icon
          :name="'mike-unmuted'"
          :isActive="true"
          :variant="'secondary'"
          :size="50"
        />
        <talkie-icon
          :name="'send'"
          :isActive="true"
          :variant="'secondary'"
          :size="30"
        />
      </div>
    </div>
    <div class="bar-bottom bar-inline">
      <p>Least Favourite Subject</p>
      <Chip label=""></Chip>
    </div>
  </div>
</template>
<script>
import { TalkieIcon } from "../../../UICore";
import Select from "../../../UICore/Select.vue";
import Chip from "../../../UICore/Chip.vue";
export default {
  name: "StudentInbox",
  components: { Select, Chip, TalkieIcon },
};
</script>
<style scoped>
.talkie-icon-bar {
  position: relative;
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.bar-icons {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20px;
  bottom: -50px;
  left: 35%;
}
.bar-icons-pg {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20px;
  left: 30%;
}

.bar-bottom {
  margin-top: 60px;
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.messege-bar {
  margin-bottom: 20px;
}
.bar-content {
  display: grid;
  gap: 10px;
  padding: var(--t-space-18);
}
.bar {
  background-color: var(--t-white);
  padding: var(--t-space-24);
  border-radius: var(--t-space-10);
}
.bar-outline {
  background-color: var(--t-white);
  padding: var(--t-space-16);
  border-radius: var(--t-space-10);
  border: 2px solid var(--t-gray-home);
}
.bar-inline {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}
.back {
  text-decoration: none;
}
@media (max-width: 599px) {
}
@media (min-width: 600px) {
}
@media (min-width: 900px) {
}
@media (min-width: 1200px) {
  .back {
    position: absolute;
    left: var(--t-space-50);
  }
}
</style>

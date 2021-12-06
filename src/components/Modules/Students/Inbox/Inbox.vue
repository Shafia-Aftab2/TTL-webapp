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
<style></style>

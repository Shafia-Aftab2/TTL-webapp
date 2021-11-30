<template>
  <div class="bar-content">
    <a class="back"><span>&#8592; </span>back</a>
    <h1>Inbox</h1>
    <div>
      <Select placeholder="Filter by Question"></Select>
    </div>
    <div class="bar">
      <p>Your Ideal Holiday</p>
    </div>
    <div class="bar bar-inline">
      <p>Least Favourite Subject</p>
      <Chip label=""></Chip>
    </div>
    <div class="bar">
      <img src="" alt="Image here" width="50" height="50" />
    </div>
    <div class="bar">
      <p>Translation: I like horror films</p>
    </div>
    <div class="bar">
      <p>Favourite App</p>
    </div>
    <div class="bar">
      <p>This is translation</p>
    </div>
    <div class="bar">
      <p>Translation: I like horror films</p>
    </div>
  </div>
</template>
<script>
import Select from "../../../UICore/Select.vue";
import Chip from "../../../UICore/Chip.vue";
export default {
  name: "StudentInbox",
  components: { Select, Chip },
};
</script>
<style></style>

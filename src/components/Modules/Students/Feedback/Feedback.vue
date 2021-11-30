<template>
  <div class="bar-content">
    <a class="back"><span>&#8592; </span>back</a>
    <h1>Feedback</h1>
    <div>
      <Select placeholder="Filter by Question"></Select>
    </div>
    <div class="bar bar-inline">
      <p>Your Ideal Holiday</p>
      <Chip label="New" type="button"></Chip>
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
      <p>Translation: I think we do too many exams at school</p>
    </div>
  </div>
</template>
<script>
import Select from "../../../UICore/Select.vue";
import Chip from "../../../UICore/Chip.vue";
export default {
  name: "StudentFeedback",
  components: { Select, Chip },
};
</script>
<style></style>

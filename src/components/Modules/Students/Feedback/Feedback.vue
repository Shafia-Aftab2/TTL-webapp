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
<style scoped>
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

@media (min-width: 1200px) {
  .back {
    position: absolute;
    left: var(--t-space-50);
  }
}
</style>

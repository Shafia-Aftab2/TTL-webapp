<template>
  <div class="container">
    <h2 class="h2">Join Class</h2>
    <p class="p">Paste the url sent by your teacher below</p>
    <Input placeholder="url here" class="talkie-input input" />
    <Button type="button" class="talkie-button">Join</Button>
  </div>
</template>
<script>
import Input from "../../../../UICore/Input.vue";
import Button from "../../../../UICore/Button.vue";

export default {
  name: "join-class",
  components: { Input, Button },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 80vh;
}

.h2 {
  margin-bottom: 9px;
}

.p {
  margin-bottom: 59px;
}

.input {
  margin-bottom: 59px;
}
</style>

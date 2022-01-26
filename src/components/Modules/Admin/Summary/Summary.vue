<template>
  <div class="summary-wrapper">
    <h1>Summary</h1>
    <div class="boxes-1">
      <div class="box-1"></div>
      <div class="box-2"></div>
    </div>
    <div class="boxes-2">
      <div class="box-3"></div>
      <div class="box-4"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminSummary",
};
</script>
<style scoped>
.summary-wrapper {
  margin-top: 160px;
  margin-left: 70px;
  width: 140%;
}
.boxes-1 {
  display: flex;
  gap: 10px;
  margin-top: 70px;
}
.boxes-2 {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.box-1 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-2 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-3 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-4 {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
</style>

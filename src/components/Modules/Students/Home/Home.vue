<template>
  <div class="home-center">
    <h3>
      Hello, Mohsin!
      <br />
      What would you like to do today?
    </h3>
    <div class="content-container">
      <div class="content">
        <div>
          <Button type="button" class="home-btn">Enter</Button>
        </div>
        <div>
          <p><strong>Class Mode</strong></p>
        </div>
        <div>
          <p>You have <strong>3 new </strong>tasks</p>
        </div>
      </div>
      <div class="content">
        <div>
          <Button
            type="button"
            class="home-btn-secondary"
            variant="secondary"
            outlined
            disabled
          >
            Coming Soon
          </Button>
        </div>
        <div>
          <p><strong>Practice Mode</strong></p>
        </div>
        <div>
          <p>Do you own thing here. Always remember Little, but often</p>
        </div>
      </div>
    </div>
    <Button type="button" outlined>View my Inbox</Button>
    <Button type="button" outlined>View my Stats</Button>
  </div>
</template>

<script>
import Button from "../../../UICore/Button.vue";
export default {
  name: "Studenthomepage",
  components: { Button },
};
</script>

<style>
.text-style {
  font-size: 20px;
  color: var(--t-secondary);
}
.box-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 var(--t-space-50) 0;
  gap: 10px;
}
.box-content {
  display: grid;
  width: 70%;
  background-color: white;
  border-radius: var(--t-br-medium);
  padding: var(--t-space-20);
  gap: 10px;
}
.box-header {
  display: grid;
  gap: 10px;
}
.text-center {
  text-align: center;
}
a {
  text-decoration: none;
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
.home-center {
  padding: var(--t-space-32);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
}
.content-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}
.content {
  background-color: var(--t-white);
  border: 2px solid var(--t-primary);
  width: 35%;
  height: 60vh;
  padding: var(--t-space-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  gap: 30px;
}
.home-btn {
  border-radius: 100% !important;
}
.home-btn-secondary {
  border: none !important;
  background-color: var(--t-secondary) !important;
  border-radius: 100% !important;
}
@media (max-width: 599px) {
  .content-container {
    display: flex;
    flex-direction: column;
  }
  .home-center {
    padding: var(--t-space-30);
  }
  .content {
    width: 100%;
    padding: var(--t-space-10);
  }
  .box-content {
    width: 100%;
  }
  .box-container {
    padding: 110px 15px var(--t-space-50) 10px;
  }
}

@media (min-width: 600px) {
  .content {
    width: 50%;
    padding: var(--t-space-10);
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}

@media (min-width: 900px) {
  .content {
    width: 35%;
    padding: var(--t-space-50);
  }
}

@media (min-width: 1200px) {
  .back {
    position: absolute;
    left: var(--t-space-50);
  }
  .back-default {
    position: absolute;
    left: 160px;
  }
}
</style>

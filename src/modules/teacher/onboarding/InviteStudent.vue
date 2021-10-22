<template>
  <div>
    <MainNavbar></MainNavbar>
    <div class="section">
      <div class="align-center">
        <h2>Invite Your students</h2>
        <h3>Copy and Paste url Below</h3>
        <input class="text-input" type="text" v-model="studentUrl" placeholder="Url here"
        onkeyup="if(this.value.length > 0) document.getElementById('start_button').disabled = false; else document.getElementById('start_button').disabled = true;" />
        <button class="btn" type="submit">Copy</button>
        <input class="btn-dis" type="button" value="Next" id="start_button" disabled />
      </div>
    </div>
  </div>
</template>

<script>
  import MainNavbar from '@/components/Navbar'

  export default {
    name: 'inviteStudents',
    components: {
      MainNavbar
    }
  }
</script>

<style scoped>
.section {
  width: 100%;
  height: calc(100vh - 76px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.align-center {
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
}

.text-input {
  height: 63px;
  width: 472px;
  font-size: 17px;
  font-weight: 300;
  border-radius: 8px;
  border-style: none;
  padding-left: 20px;
  background-color: #F9F9F9;
  margin: 60px 0 58px 0;
}

.btn {
  width: 143px;
  height: 49px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 500;
  align-items: center;
  font-size: 16px;
  outline: none;
  border: none;
  position: relative;
  margin: 10px 0;
  background: #F7D41E;
  color: #18191F;
}

.btn-white {
  background: #F4F4F4;
  color: #ADADAD;
}

h3 {
  height: 39px;
  width: 313px;
  text-align: center;
  font-size: 17px;
  line-height: 21px;
  font-family: Inter;
  margin: 0;
}

p {
  height: 21px;
  width: 236px;
  text-align: center;
}

h2 {
  font-size: 32px;
  line-height: 39px;
  font-weight: bold;
  font-family: Inter;
  margin-bottom: 16px;
}

.btn-dis:disabled {
  width: 143px;
  height: 49px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 500;
  align-items: center;
  font-size: 16px;
  outline: none;
  border: none;
  position: relative;
  margin: 10px 0;
  background-color: #E5E5E5;
}

.btn-dis {
  width: 143px;
  height: 49px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 500;
  align-items: center;
  font-size: 16px;
  outline: none;
  border: none;
  position: relative;
  margin: 10px 0;
  background-color: #E5E5E5;
}

@media (max-width: 500px) {
  .text-input {
    height: 40px;
    width: 100%;
  }

  h2 {
    font-size: 28px;
  }
}
</style>
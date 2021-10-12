<template>
  <div class="section">
    <div class="left-container">
         <img src="../../assets/Group 949.png" alt="" srcset="" />
    </div>
    <div class="right-container" >
        <h3 >Create a teacher account</h3>
    <div>
      <input class ="text-input" type="text" placeholder="Your Name" v-model="firstName">
    </div>
     <br>
      <div>
      <input  class ="text-input" type="text" placeholder="Your Display name" v-model="displayName">
    </div>
     <br>
      <div>
      <input  class ="text-input" type="text" placeholder="School Name" v-model="schoolName">
    </div>
     <br>
     <div>
      <input class ="text-input" type="text" placeholder="your email id" v-model="email">
    </div>
    <br>
    <div>
      <input  class ="text-input" type="password" placeholder="Password" v-model="password">
    </div>
    <br>
    <div class="align-center">
    <button  class="btn" type="submit" @click="createAccount">Create</button>
    <br>
    </div>
    <validationProvider>
          <div class="align-center">
            <ul class="form-footer">
              <li>
                By signing up, you accept Talkie’s <br />

                <a href="/terms" target="_blank">
                  Terms of Service
                </a>

                and

                <a href="/privacy" target="_blank">
                  Privacy Policy.
                </a>
              </li>
            </ul>
          </div>
        </validationProvider>
    <p>
      Already have an account?<router-link :to="{ name: 'teacher-login' }"> Login </router-link>
    </p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'signup',
  data() {
    return (
      {
        firstName: '',
        displayName: '',
        schoolName: '',
        email: '',
        password: '',
      });
  },
  methods: {
    createAccount() {
      this.$router.push({ name: 'teacher-login' });
    },
  },
};
</script>

<style  scoped>
.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: #F7D41E;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: 1px solid $logo-color;
  position: relative;
  margin: 10px 0;
}
.left-container {
  width: 50vw;
  align-items: center;
  justify-content: center;
  margin-right: 2%;
}
.right-container {
  display: flex;
  flex-direction: column;
  width: 39%;
}
.align-center {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.text-input {
    height: 63px;
    width: 400px;
    font-size: 14px;
    font-weight: 300;
    border-radius: 5px;
    border-style: none;
    padding-left: 20px;
    background-color:#F9F9F9;
  }
  h3{
    height: 28px;
    width: 300px;
    text-align: right;

  }
  .form-footer{
      list-style-type: none;
      font-size: 15px;
  }
  a{
    font-weight: bold;
    color: black;
    font-family: inter;
    font-size: 15px;
  }
  a:visited{
      color: black;
  }
</style>

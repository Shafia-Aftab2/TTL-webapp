<template>
  <div class="flex-end">
    <!-- <h3>Create a teacher account</h3> -->
    <div>
      <input class="text-input" type="text" placeholder="Your Name" v-model="firstName" />
    </div>
    <br />
    <div>
      <input class="text-input" type="text" placeholder="Your Display name" v-model="displayName" />
    </div>
    <br />
    <div>
      <input class="text-input" type="text" placeholder="School Name" v-model="schoolName" />
    </div>
    <br />
    <div>
      <input class="text-input" type="text" placeholder="your email id" v-model="email" />
    </div>
    <br />
    <div>
      <input class="text-input" type="password" placeholder="Password" v-model="password" />
    </div>
    <br />
    <div class="align-center">
      <button class="btn" type="submit" @click="createAccount">Create</button>
      <br />
    </div>
    <div class="terms_conditions">
      By signing up, you accept Talkie’s <a href="/terms" target="_blank"> Terms of Service </a> and
      <a href="/privacy" target="_blank"> Privacy Policy. </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-signup-teacher',
  data() {
    return {
      firstName: '',
      displayName: '',
      schoolName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    createAccount() {
      this.$router.push({ name: 'teacher-login' });
    },
  },
};
</script>

<style scoped>
.btn {
  width: 143px;
  height: 49px;
  margin-bottom: 10px;
  background: #f7d41e;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  align-items: center;
  font-size: 15px;
  outline: none;
  border: 0px solid;
  position: relative;
  margin: 10px 0;
}
/* .signup-form {
  align-content: center;
} */
.terms_conditions {
  padding: 0 10% 0 10%;
}
@media (min-width: 800px) {
  .text-input {
    width: 400px;
  }
}
@media (min-width: 500px) {
  .text-input {
    width: 500px;
  }
}
@media (max-width: 500px) {
  .text-input {
    width: 200px;
  }
}
.text-input {
  height: 63px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 5px;
  border-style: none;
  padding-left: 20px;
  background-color: #f9f9f9;
}
h3 {
  height: 28px;
  width: 300px;
  text-align: right;
}
.form-footer {
  list-style-type: none;
  font-size: 15px;
}
a {
  font-weight: bold;
  color: black;
  font-family: inter;
  font-size: 15px;
}
a:visited {
  color: black;
}
</style>

<template>
  <section class="row">
    <div class="hero-image">
      <img src="../../assets/Group 949.png" alt="" srcset="" />
    </div>
    <div class="  sign-up-content">
      <h3>Create a teacher account</h3>
      <FormSignupTeacher> </FormSignupTeacher>
      <p>Already have an account?<router-link :to="{ name: 'teacher-login' }"> Login </router-link></p>
    </div>
  </section>
</template>

<script>
import FormSignupTeacher from './components/FormSignupTeacher';

export default {
  name: 'signup',
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
  components: {
    FormSignupTeacher,
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}


img {
  max-width: 100vw;
}
@media (max-width: 767px) {
  .sign-up-content {
    margin-top: 200px;
  }
}

.hero-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex: 1;
  margin: auto;
}

.sign-up-content {
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}
h3 {
  height: 28px;
  /* width: 100%; */
  text-align: center;
}
/* .form-footer {
  list-style-type: none;
  font-size: 15px;
} */
a {
  font-weight: bold;
  color: black;
  font-family: Inter;
  font-size: 15px;
}
a:visited {
  color: black;
}
</style>

<template>
  <div>
    <MainNavbar></MainNavbar>
    <section class="row">
      <div class="hero-image">
        <img src="../../assets/Group 949.png" width="500px" height="400px" alt="" srcset="" />
      </div>
      <div class="sign-up-content">
        <h3>Create a teacher account</h3>
        <FormSignupTeacher> </FormSignupTeacher>
        <p>Already have an account?<router-link :to="{ name: 'teacher-login' }"> Login </router-link></p>
      </div>
    </section>
  </div>
</template>

<script>
import FormSignupTeacher from './components/FormSignupTeacher';
import MainNavbar from '@/components/Navbar';

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
    MainNavbar,
  },
};
</script>

<style scoped>
.row {
  padding: 30px;
  display: flex;
  width: calc(100%-30px);
}

.hero-image {
  width: calc(50vw - 50px);
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
  width: 50vw;
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

@media (max-width: 870px) {
  .hero-image{
    display: none;
  }
  .sign-up-content{
    padding: 0 30px;
    width: 100%;
  }
}
</style>

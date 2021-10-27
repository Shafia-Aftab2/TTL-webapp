<template>
    <div>
      <MainNavbar></MainNavbar>
      <section class="row">
        <div class="hero-image">
          <img src="../../assets/Group 949.png" width="500px" height="400px" alt="" srcset="" />
        </div>
        <div class="sign-up-content">
          <h3>Create a student account</h3>
          <FormSignUpStudent> </FormSignUpStudent>
          <p>Already have an account?<router-link :to="{ name: 'teacher-login' }"> Login </router-link></p>
        </div>
      </section>
    </div>
  </template>
<script>
import MainNavbar from '@/components/Navbar';
import FormSignUpStudent from './FormSignUpStudent';

export default {
  name: 'student-signup',
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
    FormSignUpStudent,
    MainNavbar,
  },
};
</script>

<style scoped>
.row {
  padding: 30px;
  margin-top: 12%;
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
a {
  font-weight: bold;
  color: black;
  font-family: Inter;
  font-size: 15px;
}
a:visited {
  color: black;
}

  @media (max-width: 1060px) {
    .row{
      flex-direction: column;
    }
    .hero-image {
      padding-bottom: 18px;
    }
    .sign-up-content{
      padding: 0 30px;
    }
  }
  @media (max-width: 545px) {
    .hero-image img{
      width: 300px;
      height: 240px;
    }
  }
  </style>


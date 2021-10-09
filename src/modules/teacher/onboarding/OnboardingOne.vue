<template>
  <div>
    <h1>Teacher Onboarding Start 1</h1>
     <router-link :to="{ name: 'create-class' }">Create A class</router-link>
     <router-link :to="{ name: 'choose-topic' }">Choose a Topic</router-link>
     <router-link :to="{ name: 'invite-student' }">Invite Student</router-link>
     <router-link :to="{ name: 'start-convo' }">Start A Convo</router-link>
     <p>
      <router-link :to="{ name: 'home' }">Home</router-link> |
    </p>
  </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

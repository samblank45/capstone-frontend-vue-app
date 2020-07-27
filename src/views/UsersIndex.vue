<template>
  <div class="users-index">
    <div v-for="user in users" v-bind:key="user.id">
      <img :src="user.image[0].url"> 
      <router-link v-bind:to="`/users/${user.id}`">{{user.first_name}} {{user.last_name}}</router-link>
      <h3> {{user.current_location}}</h3>
      <br><br><br>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 150px;
}
</style>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      users: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      console.log("all users", response.data);
      this.users = response.data;
    });
  }
};
</script>

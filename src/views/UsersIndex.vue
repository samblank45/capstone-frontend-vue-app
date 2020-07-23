<template>
  <div class="users-index">
    <div v-for="user in users" v-bind:key="user.id">
      <div v-for="image in user.images" v-bind:key="image.id">
        <img v-bind:src="image.url" v-bind:alt="image.url">
      </div>
      <router-link v-bind:to="`/users/${user.id}`">{{user.first_name}} {{user.last_name}}</router-link>
      <h3> {{user.current_location}}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      users: [],
      images: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      console.log("all users", response.data);
      this.users = response.data;
    });
    axios.get("/api/images").then(response => {
      console.log("all images", response.data);
      this.users = response.data;
    });
  }
};
</script>

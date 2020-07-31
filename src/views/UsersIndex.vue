<template>
  <div class="users-index">
    <div>
      search: <input type="text" v-model="nameFilter" list="name">
    </div>
    <datalist id="names">
      <option v-for="user in users"> {{user.full_name}} </option>
    </datalist>
    <div v-for="user in filterBy(users, nameFilter)" v-bind:key="user.id">
      <img v-if="user.image[0]" :src="user.image[0].url"  @error="imgPlaceHolder"/> 
      <img v-if="!user.image[0]" src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/> 
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
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      users: [],
      nameFilter: ""
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      console.log("all users", response.data);
      this.users = response.data;
    });
  },
  methods: {}
};
</script>

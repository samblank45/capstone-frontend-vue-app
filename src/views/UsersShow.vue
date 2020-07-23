<template>
  <div class="users-show">
    <img :src="user.images" v-bind:alt="user.images">
    <p>{{user.first_name}} {{user.last_name}}</p>
    <p>{{user.current_location}}</p>
    <p>{{user.biography}}</p>
    <p>{{user.hobbies}}</p>
    <p>{{user.country_origin}}</p>
    <p>{{user.aliyah_date}}</p>
    <div v-if="$parent.getUserId() == user.id">
      <router-link :to="`/users/${user.id}/edit`">Edit </router-link>
    </div>

  
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      this.user = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>
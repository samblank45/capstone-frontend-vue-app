<template>
  <div class="users-show">
    <img :src="user.images[0].url" alt="">
    <button type="button" data-toggle="modal" data-target="#showUserImages">Images</button>
    <dialog id="images-details">
      <form method="dialog">
        <div v-for="image in user.images">
          <p>{{image.url}}</p>
        </div>
        <button>close</button>
      </form>
    </dialog>
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

<style scoped>
img {
  width: 200px;
}
</style>

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
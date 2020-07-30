<template>
  <div class="users-show">
    <img :src="user.images[0].url"> 
    <button v-on:click="showImages()">Images</button>
    <div v-if="$parent.getUserId() == user.id">
      <form v-on:submit.prevent="submit()">
        Image: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        <input type="submit" value="Submit">
      </form>
    </div>

    <dialog id="images-details">
      <form method="dialog">
        <p>Pictures</p>
        <div v-for="image in user.images">
          <img :src="image.url">
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
    <div v-for="error in errors"> {{error}} </div>

    <div v-if="$parent.getUserId() != user.id">
      <div v-for="conversation in user.conversations">
        sender_id: {{conversation.sender_id}}
        current_user id: {{$parent.getUserId()}}
        <div v-if="conversation.sender_id == $parent.getUserId() || conversation.recipient_id == $parent.getUserId()">
          <router-link :to="`/conversations/${conversation.id}`">current conversation</router-link>
        </div>
        <div v-else>
          <button v-on:click="createConversation(user)">Create Message</button>
        </div>
      </div>
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
      user: {},
      errors: {},
      images: {},
      url: "",
      user_id: localStorage.getItem("user_id")
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      this.user = response.data;
      this.images = response.data.images;
      console.log(response.data);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.url = event.target.files[0];
      }
    },
    submit: function() {
      // var formData = new FormData();
      // formData.append("user_id", this.user_id);
      // formData.append("url", this.url);
      var params = {
        user_id: this.user_id,
        url: this.url
      };
      axios.post("/api/images", params.path.to_s).then(response => {
        this.$refs.fileInput.value = "";
      });
    },
    showImages: function() {
      document.querySelector("#images-details").showModal();
    },
    createConversation: function(user) {
      var params = {
        sender_id: localStorage.getItem("user_id"),
        recipient_id: user.id
      };
      axios
        .post(`/api/conversations`, params)
        .then(response => {
          console.log("convo created successfully", response.data);
          this.$router.push("/conversations");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
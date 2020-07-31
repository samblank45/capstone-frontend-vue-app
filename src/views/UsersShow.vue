<template>
  <div class="users-show">
    <img v-if="user.images[0]" :src="user.images[0].url" /> 
    <img v-if="!user.images[0]" src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/> 
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
          <div v-if="$parent.getUserId() == user.id">
            <button v-on:click="destroyImage(image)">Delete</button>
          </div>
          <div v-if="$parent.getUserId() == user.id">
            <button v-on:click="makeProfilePic(image)"> Make Profile Pic</button>
          </div>
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
    <div v-if=" ($parent.getUserId() == user.id)">
      <router-link :to="`/users/${user.id}/edit`">Edit </router-link>
    </div>
    <div v-for="error in errors"> {{error}} </div>

    <div v-if="user.paired && (user.id != $parent.getUserId())">
      <button v-on:click="createConversation(user)">Send Message</button>
    </div>
    <div v-if="!user.paired && (user.id != $parent.getUserId())">
      <div v-for="conversation in user.conversations">
        <div v-if="conversation.sender_id == $parent.getUserId() || conversation.recipient_id == $parent.getUserId()">
          <router-link :to="`/conversations/${conversation.id}`">current conversation</router-link>
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
      images: [],
      image: {},
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
      var formData = new FormData();
      formData.append("url", this.url);
      axios.post("/api/images", formData).then(response => {
        this.$refs.fileInput.value = "";
        this.images.push(response.data);
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
    },
    destroyImage: function(image) {
      axios.delete(`/api/images/${image.id}`).then(response => {
        console.log("image successfully destroyed", response.data);
        var index = this.images.indexOf(image);
        console.log(index);
        this.images.splice(index, 1);
      });
    },
    makeProfilePic: function(image) {
      var params = {
        main_image: image.url
      };
      axios.patch(`/api/images/${image.id}`, params).then(response => {
        console.log("image successfully update to main pic", response.data);
        this.images.push(response.data);
      });
    }
  }
};
</script>
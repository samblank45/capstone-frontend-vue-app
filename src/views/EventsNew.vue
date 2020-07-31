
<template>
  <div class="events-new">
    <form v-on:submit.prevent="createEvent()">
      <div class="text-center">
        <h1>New Event</h1>
        <ul>
          <li class="text-danger" v-for="error in errors"> {{error}} </li>
        </ul>
        <img v-if="status" :src="`https://http.cat/${status}`" alt=""/>
      </div>

      <div class="form-group">
        <label>title:</label>
        <input type="body" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>description:</label>
        <input type="body" class="form-control" v-model="description">
      </div>
      <div class="form-group">
        <label> location:</label>
        <input type="body" class="form-control" v-model="location">
      </div>
      <div class="form-group">
        <label> date:</label>
        <input type="datetime-local" class="form-control" v-model="dateTime">
      </div>
      <div class="form-group">
        <label> image:</label>
        <input type="body" class="form-control" v-model="imageUrl">
      </div>
      <div class="form-group">
        <label> address:</label>
        <input type="body" class="form-control" v-model="address">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      title: "",
      description: "",
      location: "",
      dateTime: "",
      status: "",
      imageUrl: "",
      address: ""
    };
  },
  methods: {
    createEvent: function() {
      var params = {
        title: this.title,
        description: this.description,
        location: this.location,
        date_time: this.dateTime,
        image_url: this.imageUrl,
        address: this.address
      };
      axios
        .post("/api/events", params)
        .then(response => {
          this.$router.push("/events");
        })
        .catch(error => {
          this.status = error.response.status;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

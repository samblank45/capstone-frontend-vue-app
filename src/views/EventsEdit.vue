
<template>
  <div class="events-edit">
    <form v-on:submit.prevent="editEvent()">
  
      <div class="form-group">
        <label>Event title</label>
        <input type="text" class="form-control" v-model="event.title">
      </div>
      <div class="form-group">
        <label>description:</label>
        <input type="text" class="form-control" v-model="event.description">
      </div>
      <div class="form-group">
        <label> location:</label>
        <input type="text" class="form-control" v-model="event.location">
      </div>
      <div class="form-group">
        <label>time:</label>
        <input type="datetime-local" class="form-control" v-model="event.date_time">
      </div>
      <div class="form-group">
        <label>image:</label>
        <input type="text" class="form-control" v-model="event.image_url">
      </div>
      <div class="form-group">
        <label>longitude:</label>
        <input type="text" class="form-control" v-model="event.longitude">
      </div>
      <div class="form-group">
        <label>latitude:</label>
        <input type="text" class="form-control" v-model="event.latitude">
      </div>
      <input type="submit" class="btn btn-primary" value="update">
      <button v-on:click="destroyEvent()">Delete</button>
    </form>
  </div>
</template>

<style scoped>
img {
  width: 400px;
}
</style>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      event: {}
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      this.event = response.data;
      console.log(this.event);
    });
  },
  methods: {
    editEvent: function() {
      var params = {
        title: this.event.title,
        description: this.event.description,
        location: this.event.location,
        date_time: this.event.date_time,
        image_url: this.event.image_url,
        longitude: this.event.longitude,
        latitude: this.event.latitude
      };
      axios
        .patch(`/api/events/${this.event.id}`, params)
        .then(response => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function() {
      if (confirm("are you sure you want to delete this")) {
        axios.delete(`/api/events/${this.event.id}`).then(response => {
          console.log("successfully destroyed event", response.data);
          this.$router.push("/events");
        });
      }
    }
  }
};
</script>

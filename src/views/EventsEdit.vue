
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
        <input type="text" class="form-control" v-model="event.date_time">
      </div>
      <input type="submit" class="btn btn-primary" value="update">
      <button v-on:click="destroyEvent()">Delete</button>
    </form>
  </div>
</template>


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
        date_time: this.event.date_time
      };
      axios
        .patch(`/api/events/${this.event.id}`, params)
        .then(response => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch(error => {
          this.error = error.response.data.errors;
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

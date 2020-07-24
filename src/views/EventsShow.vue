<template>
  <div class="events-show">
    <div v-if="$parent.getUserId() == event.host_id">
      <router-link to="/events/:id/edit">Edit</router-link>
    </div>
    <h3>{{event.title}}</h3>
    <p>{{event.description}}</p>
    <p>{{event.location}}</p>
    <p>{{event.date_time}}</p>
    <p>attendees</p>
    <div v-for="attendee in event.attendees">
      <p>{{attendee.full_name}}</p>
    </div>
    <!-- <p>{{event.attendees}}</p> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      event: {}
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      this.event = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>
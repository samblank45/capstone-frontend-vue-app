<template>
  <div class="events-show">
    <div v-if="$parent.getUserId() == event.host_id">
      <router-link v-bind:to="`/events/${event.id}/edit`">Edit</router-link>
    </div>
    <h3>{{event.title}}</h3>
    <img :src="event.image_url">
    <p>{{event.description}}</p>
    <p>{{event.location}}</p>
    <p>{{relativeDate(event.date_time)}}</p>
    <p>attendees</p>
    <div v-for="attendee in event.attendees">
      <p>{{attendee.full_name}}</p>
    </div>
    <!-- <p>{{event.attendees}}</p> -->
  </div>
</template>

<style scoped>
img {
  width: 400px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
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
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    }
  }
};
</script>
<template>
  <div class="events-index">
    <h1>Events</h1>
    <router-link to ="/events/new">Create</router-link>
    <div v-for="event in events" v-bind:key="event.id">
      <h3><router-link v-bind:to="`/events/${event.id}`">{{event.title}}</router-link></h3>
      <p>{{event.description}}</p>
      <p>{{event.location}}</p>
      <p>{{relativeDate(event.date_time)}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      users: [],
      events: []
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log("all userevents", response.data);
      this.events = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    }
  }
};
</script>
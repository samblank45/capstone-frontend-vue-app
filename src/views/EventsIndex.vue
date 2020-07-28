<template>
  <div class="events-index">
    <h1>Events</h1>
    <div>
      search: <input type="text" v-model="titleFilter" list="title">
    </div>
    <datalist id="titles">
      <option v-for="event in events"> {{event.title}} </option>
    </datalist>
    <router-link to ="/events/new">Create</router-link>
    <div v-for="event in filterBy(events, titleFilter)" v-bind:key="event.id">
      <h3><router-link v-bind:to="`/events/${event.id}`">{{event.title}}</router-link></h3>
      <img :src="event.image_url">
      <p>{{event.description}}</p>
      <p>{{event.location}}</p>
      <p>{{relativeDate(event.date_time)}}</p>
      <p>attendees: {{event.attendees.length}}</p>
      <div v-for="attendee in event.attendees">
        <p>{{attendee.full_name}}</p>
      </div>
    </div>
    <h1>My events</h1>
    <div v-for="event in events" v-bind:key="event.id">
      <div v-if="$parent.getUserId() == event.host_id">
         <h3><router-link v-bind:to="`/events/${event.id}`">{{event.title}}</router-link></h3>
    </div>
    </div>
  </div>
</template>

<style>
img {
  width: 400px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      users: [],
      events: {},
      titleFilter: ""
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
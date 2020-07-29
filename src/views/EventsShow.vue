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
    <button v-on:click="attendEvent(event)">Attend</button>
    <p>attendees</p>
    <div v-for="attendee in event.attendees">
      <p>{{attendee.full_name}}</p>
    </div>
    <p>host: {{event.host}}</p>
    <img :src="event.host_picture">
    <!-- <p>{{event.attendees}}</p> -->
    <h1>MAP</h1>
    <div id='map'></div>
  </div>
</template>

<style scoped>
img {
  width: 400px;
}
#map {
  top: 0;
  bottom: 0;
  height: 400px;
  width: 100%;
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
  mounted: function() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2JsYW40NSIsImEiOiJja2NrdWx2OGYxMjVrMnNvMjdjdzA5MG05In0.pULou7hbNXlrVb9H8ZAgvg";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [34.7818, 32.0853], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });
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
    },
    attendEvent: function(event) {
      var params = {
        user_id: localStorage.getItem("user_id"),
        event_id: event.id
      };
      axios
        .post(`/api/user_events`, params)
        .then(response => {
          // this.$router.push(`/events/${this.$route.params.id}`);
          console.log("user successfully attending event", response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
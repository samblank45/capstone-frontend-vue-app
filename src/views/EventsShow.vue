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

     <button v-on:click="showAttendees()">Attendees: {{event.attendees.length}}</button>

      <dialog id="attendees-info">
        <form method="dialog">
          <p>Attendees</p>
          <div v-for="attendee in event.attendees">
            <router-link :to="`/users/${attendee.user_id}`">{{attendee.full_name}}</router-link>
            <img :src="attendee.image">
          </div>
          <button>close</button>
        </form>
      </dialog>

    <div v-if="!event.attending && (event.host.id != $parent.getUserId())">
      <button v-on:click="attendEvent(event)">Attend</button>
    </div>
    <div v-if="event.attending && (event.host.id != $parent.getUserId())">
      <button v-on:click="removeAttendEvent(event)">Remove</button>
    </div>
    <p>host: {{event.host}}</p>
      <router-link :to="`/users/${event.host_id}`"> {{event.host}} </router-link>
    <img :src="event.host_picture">
    <h1>MAP</h1>
    <p>{{event.address}}</p>
    <div id='map'></div>
  </div>
</template>


<style scoped>
img {
  width: 200px;
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
/*global mapboxgl */
/*global MapboxGeocoder */
/*global mapboxSdk */
export default {
  data: function() {
    return {
      event: {},
      attendee: {}
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      this.event = response.data;
      console.log(response.data);
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2JsYW40NSIsImEiOiJja2NrdWx2OGYxMjVrMnNvMjdjdzA5MG05In0.pULou7hbNXlrVb9H8ZAgvg";
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.event.address,
          autocomplete: false,
          limit: 1
        })
        .send()
        .then(function(response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: feature.center,
              zoom: 10
            });
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
          }
        });
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
          this.event.attending = true;
          this.event.attendees.push(response.data.attendee);
          console.log(event);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showAttendees: function() {
      document.querySelector("#attendees-info").showModal();
    },
    removeAttendEvent: function(event) {
      axios
        .delete(`/api/user_events/${event.id}`)
        .then(response => {
          console.log("user removed", response.data);
          this.event.attending = false;
          var index = this.event.attendees.findIndex(
            user => user.user_id == this.$parent.getUserId()
          );
          this.event.attendees.splice(index, 1);

          console.log(event);
          console.log(index);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>
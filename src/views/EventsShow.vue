<template>
  <div class="events-show">
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <article class="single-blog">
              <div class="post-thumb">
                <img :src="event.image_url" />
              </div>
              <div class="post-content">
                <div class="entry-header text-center text-uppercase">
                  <p class="post-cat">
                    {{ event.location }}
                    {{ relativeDate(event.date_time) }}
                  </p>
                  <h2>
                    {{ event.title }}
                  </h2>
                </div>
                <div class="continue-reading text-right text-uppercase">
                  <div v-if="$parent.getUserId() == event.host_id">
                    <router-link v-bind:to="`/events/${event.id}/edit`"
                      >Edit</router-link
                    >
                  </div>
                </div>
                <div class="entry-content">
                  <p>{{ event.description }}</p>
                </div>

                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#showAttendeesModal"
                >
                  Attendees {{ event.attendees.length }}
                </button>

                <div
                  class="modal fade"
                  id="showAttendeesModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="showAttendeesModalLabel"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="showAttendeesModalLabel">
                          Attendees
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div
                          class="col-md-4"
                          v-for="attendee in event.attendees"
                        >
                          <router-link
                            style="all: unset"
                            :to="`/users/${attendee.user_id}`"
                          >
                            <div class="testimonial-area text-center">
                              <div class="single-testimonial">
                                <div class="testimonial-info">
                                  <span class="testimonial-author">{{
                                    attendee.full_name
                                  }}</span>
                                </div>
                                <div class="testimonial-author-image">
                                  <img
                                    v-if="attendee.image"
                                    :src="attendee.image"
                                    alt=""
                                    class="img-circle"
                                  />
                                  <img
                                    v-else
                                    src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                                    alt=""
                                    class="img-circle"
                                  />
                                </div>
                              </div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="continue-reading text-left text-uppercase">
                  <div
                    v-if="
                      !event.attending && event.host.id != $parent.getUserId()
                    "
                  >
                    <button
                      class="btn btn-success"
                      v-on:click="attendEvent(event)"
                    >
                      Attend
                    </button>
                  </div>
                  <div
                    v-if="
                      event.attending && event.host.id != $parent.getUserId()
                    "
                  >
                    <button
                      class="btn btn-danger"
                      v-on:click="removeAttendEvent(event)"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="col-sm-4">
            <div class="kotha-sidebar">
              <aside class="widget about-me-widget  text-center">
                <div class="about-me-content">
                  <div class="about-me-img">
                    <img :src="event.host_picture" />
                    <h2 class="text-uppercase">Host</h2>
                    <h4 class="text-uppercase">
                      <router-link :to="`/users/${event.host_id}`">
                        {{ event.host }}
                      </router-link>
                    </h4>
                    <p>
                      {{ event.host_bio }}
                    </p>
                  </div>
                </div>
              </aside>
              <aside class="widget widget-popular-post">
                <h3 class="widget-title text-uppercase text-center">
                  Location
                </h3>
                <ul>
                  <li>
                    <div id="map"></div>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#map {
  top: 0;
  bottom: 0;
  height: 200px;
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
      attendee: {},
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
      this.event = response.data;
      console.log(response.data);
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2JsYW40NSIsImEiOiJja2NrdWx2OGYxMjVrMnNvMjdjdzA5MG05In0.pULou7hbNXlrVb9H8ZAgvg";
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.event.address,
          autocomplete: false,
          limit: 1,
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
              zoom: 10,
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
        event_id: event.id,
      };
      axios
        .post(`/api/user_events`, params)
        .then((response) => {
          // this.$router.push(`/events/${this.$route.params.id}`);
          console.log("user successfully attending event", response.data);
          this.event.attending = true;
          this.event.attendees.push(response.data.attendee);
          console.log(event);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showAttendees: function() {
      $("#showAttendeesModal").modal("hide");
    },
    removeAttendEvent: function(event) {
      axios
        .delete(`/api/user_events/${event.id}`)
        .then((response) => {
          console.log("user removed", response.data);
          this.event.attending = false;
          var index = this.event.attendees.findIndex(
            (user) => user.user_id == this.$parent.getUserId()
          );
          this.event.attendees.splice(index, 1);

          console.log(event);
          console.log(index);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>

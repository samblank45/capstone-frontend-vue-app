<template>
  <div class="events-index">
    <div class="kotha-default-content">
      <div class="col-sm-10">
        <div class="entry-header text-center">
          <h1>Events</h1>
          <div>
            search:
            <input type="text" v-model="titleFilter" list="title" /> &emsp;
            <router-link class="btn btn" to="/events/new">Create</router-link>
          </div>
          <datalist id="titles">
            <option v-for="event in events"> {{ event.title }} </option>
          </datalist>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <div
              v-for="event in filterBy(events, titleFilter)"
              v-bind:key="event.id"
            >
              <div class="row">
                <div class="col-md-11">
                  <article class="single-blog post-list">
                    <div class="media">
                      <div class="media-left">
                        <div class="post-thumb">
                          <img width="500px" :src="event.image_url" />
                        </div>
                      </div>
                      <div class="media-body">
                        <div class="post-content">
                          <div class="entry-header text-left text-uppercase">
                            <p class="post-cat">
                              {{ event.location }}
                              {{ relativeDate(event.date_time) }}
                            </p>
                            <h2>
                              <router-link v-bind:to="`/events/${event.id}`">{{
                                event.title
                              }}</router-link>
                            </h2>
                          </div>
                          <!-- Modal button -->
                          <button
                            v-on:click="currentEvent = event"
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#showAttendeesModal"
                          >
                            Attendees {{ event.attendees.length }}
                          </button>

                          <div class="post-meta">
                            <ul class="list-inline author-meta">
                              <li class="author">
                                Hosted by {{ event.full_name }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <!-- Modal -->
            <div
              class="modal fade"
              id="showAttendeesModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="showAttendeesModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
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
                    <div v-for="attendee in currentEvent.attendees">
                      <router-link
                        style="all: unset"
                        :to="`/users/${attendee.user_id}`"
                      >
                        <div class="testimonial-area text-center">
                          <div class="single-testimonial">
                            <div class="testimonial-info">
                              <span class="testimonial-author-image"
                                ><p class="text-center">
                                  {{ attendee.full_name }}
                                </p></span
                              >
                            </div>
                            <div class="testimonial-author-image">
                              <img
                                width="200px"
                                v-if="attendee.image"
                                :src="attendee.image"
                                alt=""
                                class="img-rounded"
                              />
                              <img
                                v-else
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
          </div>
          <div class="col-sm-4">
            <div class="kotha-sidebar">
              <aside class="widget insta-widget">
                <h2 class="widget-title text-uppercase text-center">
                  My Events
                </h2>
                <div class="instagram-feed">
                  <div v-for="event in events" v-bind:key="event.id">
                    <div v-if="$parent.getUserId() == event.host_id">
                      <div class="single-instagram">
                        <router-link v-bind:to="`/events/${event.id}}`"
                          ><img width="300px" :src="event.image_url"
                        /></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      errors: [],
      users: [],
      events: {},
      attendee: {},
      titleFilter: "",
      currentEvent: {},
    };
  },
  created: function() {
    axios.get("/api/events").then((response) => {
      console.log("all userevents", response.data);
      this.events = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
    showAttendees: function() {
      document.querySelector("#attendees-info").showModal();
    },
  },
};
</script>

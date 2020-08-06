<template>
  <div class="events-edit">
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <article class="single-blog contact-us">
              <div class="post-content">
                <div class="entry-header text-center text-uppercase">
                  <h2 class="text-left">Edit Event</h2>
                </div>
                <div class="leave-comment">
                  <form v-on:submit.prevent="editEvent()">
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          Event title
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="event.title"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>description:</label>
                        <textarea
                          class="form-control"
                          rows="6"
                          v-model="event.description"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>location:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="event.location"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          time:
                        </label>
                        <input
                          type="datetime-local"
                          id="event-time"
                          class="form-control"
                          v-model="event.date_time"
                        />
                        {{ event.date_time }}
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>image:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="event.image_url"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>address:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="event.address"
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        value="update"
                      >
                        Update
                      </button>
                      <button
                        class="btn btn-danger"
                        v-on:click="destroyEvent()"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      errors: [],
      event: {},
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then((response) => {
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
        date_time: moment(this.event.date_time).format(),
        image_url: this.event.image_url,
        address: this.event.address,
      };
      axios
        .patch(`/api/events/${this.event.id}`, params)
        .then((response) => {
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyEvent: function() {
      if (confirm("are you sure you want to delete this")) {
        axios.delete(`/api/events/${this.event.id}`).then((response) => {
          console.log("successfully destroyed event", response.data);
          this.$router.push("/events");
        });
      }
    },
  },
};
</script>

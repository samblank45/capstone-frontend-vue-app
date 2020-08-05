<template>
  <div class="events-new">
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <article class="single-blog contact-us">
              <div class="post-content">
                <div class="entry-header text-center text-uppercase">
                  <h2 class="text-left">Create Event</h2>
                </div>
                <div class="leave-comment">
                  <ul>
                    <li class="text-danger" v-for="error in errors">
                      {{ error }}
                    </li>
                  </ul>
                  <form v-on:submit.prevent="createEvent()">
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          title:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="title"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>description:</label>
                        <textarea
                          class="form-control"
                          rows="6"
                          v-model="description"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>location:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="location"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          date:
                        </label>
                        <input
                          type="datetime-local"
                          id="event-time"
                          class="form-control"
                          v-model="dateTime"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>image:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="imageUrl"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>address:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="address"
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        value="update"
                      >
                        Submit
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

export default {
  data: function() {
    return {
      errors: [],
      title: "",
      description: "",
      location: "",
      dateTime: "",
      status: "",
      imageUrl: "",
      address: "",
    };
  },
  methods: {
    createEvent: function() {
      var params = {
        title: this.title,
        description: this.description,
        location: this.location,
        date_time: this.dateTime,
        image_url: this.imageUrl,
        address: this.address,
      };
      axios
        .post("/api/events", params)
        .then((response) => {
          this.$router.push("/events");
        })
        .catch((error) => {
          this.status = error.response.status;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

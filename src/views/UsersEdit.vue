<template>
  <div class="users-edit">
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <article class="single-blog contact-us">
              <div class="post-content">
                <div class="entry-header text-center text-uppercase">
                  <h2 class="text-left">Edit Profile</h2>
                </div>
                <div class="leave-comment">
                  <form v-on:submit.prevent="editUser()">
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          first name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.first_name"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>last name:</label>
                        <textarea
                          class="form-control"
                          rows="6"
                          v-model="user.last_name"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>current city:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.current_location"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          country of origin:
                        </label>
                        <input
                          type="datetime-local"
                          id="event-time"
                          class="form-control"
                          v-model="user.country_origin"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>biography:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.biography"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>hobbies:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.hobbies"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>aliyah date:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.aliyah_date"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>email:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.email"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>password:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.password"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>password confirmation:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.passwordConfirmation"
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
                      <button class="btn btn-danger" v-on:click="destroyUser()">
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

export default {
  data: function() {
    return {
      errors: [],
      user: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
    editUser: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        current_location: this.user.current_location,
        country_origin: this.user.country_origin,
        biography: this.user.biography,
        hobbies: this.user.hobbies,
        aliyah_date: this.user.aliyah_date,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.passwordConfirmation,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          this.error = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("are you sure you want to delete your profile?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("successfully destroyed user", response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>

<template>
  <div class="signup">
    <div class="kotha-default-content">
      <div id="img-header">
        <div class="container">
          <div id="logo">
            <h2 class="tagline">Sharsheret</h2>
          </div>
        </div>
      </div>
      <div class="container" style="position:relative; left: 200px;">
        <div class="row">
          <div class="col-sm-8">
            <article class="single-blog contact-us">
              <div class="post-content">
                <div class="entry-header text-center text-uppercase">
                  <h2 class="text-left">Signup</h2>
                </div>
                <div class="leave-comment">
                  <form v-on:submit.prevent="submit()">
                    <ul>
                      <li class="text-danger" v-for="error in errors">
                        {{ error }}
                      </li>
                    </ul>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>
                          first name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="firstName"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>last name:</label>
                        <input
                          class="form-control"
                          type="text"
                          v-model="lastName"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>email:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="email"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>password:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="password"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label>Password confirmation:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="passwordConfirmation"
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,

        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

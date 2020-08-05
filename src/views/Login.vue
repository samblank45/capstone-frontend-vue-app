<template>
  <div class="login">
    <body class="comingsoon">
      <div id="comingsoon-wrap" class="comingsoon-wrap text-center">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <form v-on:submit.prevent="submit()">
                <h1 class="text">
                  Sharsheret
                </h1>
                <img
                  class="col-sm-12"
                  src="https://www.kinaxis.com/sites/default/files/blog/2016/10/iStock_82553549_MEDIUM-1024x711.jpg"
                />
                <h3 class="content">
                  Sign-in
                </h3>
                <ul>
                  <li class="text-danger" v-for="error in errors">
                    {{ error }}
                  </li>
                </ul>
                <div class="form-group">
                  <label>Email:</label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <input type="submit" class="btn btn-primary" value="Submit" />
                <div>
                  <p>not a member?</p>
                  <p>
                    <router-link id="signup" to="/signup">Signup</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <!-- //row -->
        </div>
        <!-- //container -->
      </div>
    </body>
  </div>
</template>
<style>
#signup {
  color: grey;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/events");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

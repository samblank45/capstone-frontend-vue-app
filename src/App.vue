<template>
  <div id="app">
    <header class="kotha-menu marketing-menu">
      <nav class="navbar  navbar-default">
        <div class="container">
          <div class="menu-content">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <p class="navbar-brand text-uppercase">
                Sharsheret
              </p>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="top-social-icons list-inline pull-right">
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-instagram"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-pinterest"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
              </ul>
              <ul class="nav navbar-nav text-uppercase pull-left">
                <li v-if="isLoggedIn()">
                  <router-link :to="`/users/${getUserId()}`"
                    >My Profile
                  </router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link to="/events">Events</router-link>
                </li>
                <li v-if="!isLoggedIn()">
                  <router-link to="/signup">Signup</router-link>
                </li>
                <li v-if="!isLoggedIn()">
                  <router-link to="/">Login</router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link to="/logout">Logout</router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link to="/users">People</router-link>
                </li>
                <li v-if="isLoggedIn()">
                  <router-link to="/conversations">Messages</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </nav>
    </header>
    <router-view :key="$route.fullPath"> </router-view>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      // return true or false
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

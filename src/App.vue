<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <li v-if="isLoggedIn()">
         <router-link to="/events">Events</router-link> |
      </li>
      <li v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link> |
      </li>
      <li v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link> |
      </li>
      <li v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link> |
      </li>
      <li v-if="isLoggedIn()">
        <router-link to="/users">People</router-link> |
      </li>
      <li v-if="isLoggedIn()">
        <router-link to="/conversations">Messages</router-link> |
        </li>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

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
    }
  }
};
</script>

<template>
  <div class="users-index">
    <div class="entry-header text-center">
      <h1>People</h1>
      <div>search: <input type="text" v-model="nameFilter" list="name" /></div>
      <datalist id="names">
        <option v-for="user in users"> {{ user.full_name }} </option>
      </datalist>
    </div>
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-sm-3" v-for="user in filterBy(users, nameFilter)">
                <article class="portfolio portfolio-2 post-grid">
                  <div class="post-thumb">
                    <router-link v-bind:to="`/users/${user.id}`">
                      <img v-if="user.image[0]" :src="user.image[0].url"/>
                      <img
                        v-else
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    /></router-link>
                  </div>
                  <div class="post-content">
                    <header class="entry-header text-center text-uppercase">
                      <h6>
                        <router-link v-bind:to="`/users/${user.id}`">{{
                          user.current_location
                        }}</router-link>
                      </h6>
                      <h2 class="entry-title">
                        <router-link v-bind:to="`/users/${user.id}`"
                          >{{ user.first_name }}
                          {{ user.last_name }}</router-link
                        >
                      </h2>
                    </header>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      users: [],
      nameFilter: "",
    };
  },
  created: function() {
    axios.get("/api/users").then((response) => {
      console.log("all users", response.data);
      this.users = response.data;
    });
  },
  methods: {},
};
</script>


<template>
  <div class="users-edit">
    <form v-on:submit.prevent="editUser()">
  
      <div class="form-group">
        <label>first name:</label>
        <input type="body" class="form-control" v-model="user.first_name">
      </div>
      <div class="form-group">
        <label>last name:</label>
        <input type="body" class="form-control" v-model="user.last_name">
      </div>
      <div class="form-group">
        <label> current city:</label>
        <input type="body" class="form-control" v-model="user.current_location">
      </div>
      <div class="form-group">
        <label>country origin:</label>
        <input type="body" class="form-control" v-model="user.country_origin">
      </div>
      <div class="form-group">
        <label>biography:</label>
        <input type="body" class="form-control" v-model="user.biography">
      </div>
      <div class="form-group">
        <label>hobbies:</label>
        <input type="body" class="form-control" v-model="user.hobbies">
      </div>
      <div class="form-group">
        <label>aliyah date:</label>
        <input type="body" class="form-control" v-model="user.aliyah_date">
      </div>
      <div class="form-group">
        <label>email:</label>
        <input type="body" class="form-control" v-model="user.email">
      </div>
      <div class="form-group">
        <label>password:</label>
        <input type="body" class="form-control" v-model="user.password">
      </div>
      <div class="form-group">
        <label>password confirmation:</label>
        <input type="body" class="form-control" v-model="user.passwordConfirmation">
      </div>
      <input type="submit" class="btn btn-primary" value="update">
    </form>
    <button v-on:click="destroyUser()">Delete Profile</button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      user: {}
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
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
        password_confirmation: this.user.passwordConfirmation
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then(response => {
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch(error => {
          this.error = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("are you sure you want to delete your profile?")) {
        axios.delete(`/api/users/${this.user.id}`).then(response => {
          console.log("successfully destroyed user", response.data);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>

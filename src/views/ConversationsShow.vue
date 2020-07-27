<template>
  <div class="conversations-show">
    <router-link :to="`/users/${partner.id}`">{{conversation.partner.first_name}} {{conversation.partner.last_name}} </router-link>
    <div v-for="message in messages">
      <p>{{message.text}}</p>
      <p>{{relativeTime(message.created_at)}}</p>
    </div>
    <form v-on:submit.prevent="createMessage()">
      <label>Send Message: </label>
      <input type="text" class="form-control" :placeholder="`Message ${partner.first_name}`" v-model="newMessage">
      <input type="submit" class="btn btn-primary" value="send">
    </form>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      errors: [],
      conversation: {},
      partner: {},
      messages: {},
      newMessage: ""
    };
  },
  created: function() {
    axios.get(`/api/conversations/${this.$route.params.id}`).then(response => {
      console.log("all messages", response.data);
      this.conversation = response.data;
      this.partner = response.data.partner;
      this.messages = response.data.messages;
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        text: this.newMessage,
        conversation_id: this.conversation.id
      };
      axios
        .post("api/messages", params)
        .then(response => {
          this.messages.push(response.data);
          this.newMessage = "";
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
    relativeTime: function(time) {
      return moment(time)
        .startOf("hour")
        .fromNow();
    }
  }
};
</script>
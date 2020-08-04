<template>
  <div class="conversations-show">
    <router-link :to="`/users/${partner.id}`"
      >{{ conversation.partner.first_name }}
      {{ conversation.partner.last_name }}
    </router-link>
    <img v-if="conversation.partner_image" :src="conversation.partner_image" />
    <img
      v-if="!conversation.partner_image"
      src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    />
    <div v-for="message in messages">
      <strong>{{ message.name }}:</strong>
      {{ message.text }} at
      {{ relativeTime(message.created_at) }}
    </div>
    <form v-on:submit.prevent="createMessage()">
      <label>Send Message: </label>
      <textarea
        type="text"
        class="form-control"
        :placeholder="`Message ${partner.first_name}`"
        v-model="newMessage"
        cols="30"
        rows="3"
      ></textarea>
      <input type="submit" class="btn btn-primary" value="send" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ActionCable from "actioncable";

export default {
  data: function() {
    return {
      errors: [],
      conversation: {},
      partner: {},
      messages: [],
      newMessage: "",
    };
  },
  created: function() {
    axios
      .get(`/api/conversations/${this.$route.params.id}`)
      .then((response) => {
        console.log("all messages", response.data);
        this.conversation = response.data;
        this.partner = response.data.partner;
        this.messages = response.data.messages;
      });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.messages.push(data); // update the messages in real time
      },
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        text: this.newMessage,
        conversation_id: this.conversation.id,
      };
      axios
        .post("api/messages", params)
        .then((response) => {
          this.newMessage = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
    relativeTime: function(time) {
      return moment.utc(time).fromNow();
    },
  },
};
</script>

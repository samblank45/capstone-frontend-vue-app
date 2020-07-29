<template>
  <div class="conversations-index">
    <h1>Messages</h1>
        <div v-for="conversation in conversations">
          <img :src="conversation.partner_image">
          <p>{{conversation.partner.first_name}} {{conversation.partner.last_name}}</p>
          <router-link v-bind:to="`/conversations/${conversation.id}`">{{conversation.last_message.text}}</router-link>
          <p>{{relativeTime(conversation.last_message.created_at)}}</p>
        </div>
  </div>
</template>

<style>
img {
  width: 200px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      conversations: []
    };
  },
  created: function() {
    axios.get("/api/conversations").then(response => {
      console.log("all conversations", response.data);
      this.conversations = response.data;
    });
  },
  methods: {
    relativeTime: function(time) {
      return moment(time)
        .startOf("hour")
        .fromNow();
    }
  }
};
</script>
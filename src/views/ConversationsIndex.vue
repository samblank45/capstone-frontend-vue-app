<template>
  <div class="conversations-index">
    <div class="kotha-default-content">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="comment-area">
              <div class="comment-heading">
                <h2>Messages</h2>
              </div>
              <div class="single-comment" v-for="conversation in conversations">
                <div class="media">
                  <div class="media-left text-center">
                    <div v-if="conversation.partner_image">
                      <img
                        width="160px"
                        class="media-object"
                        :src="conversation.partner_image"
                        alt=""
                      />
                    </div>
                    <div v-else>
                      <img
                        class="media-object"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      />
                    </div>
                  </div>
                  <div class="media-body">
                    <div class="media-heading">
                      <h3 class="text-uppercase">
                        {{ conversation.partner.first_name }}
                        {{ conversation.partner.last_name }}
                      </h3>
                    </div>

                    <p class="comment-date">
                      {{ relativeTime(conversation.last_message.created_at) }}
                    </p>
                    <p class="comment-p">
                      <router-link
                        v-bind:to="`/conversations/${conversation.id}`"
                      >
                        {{ conversation.last_message.text }}
                      </router-link>
                    </p>
                  </div>
                </div>
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
import moment from "moment";
export default {
  data: function() {
    return {
      conversations: [],
    };
  },
  created: function() {
    axios.get("/api/conversations").then((response) => {
      console.log("all conversations", response.data);
      this.conversations = response.data;
    });
  },
  methods: {
    relativeTime: function(time) {
      return moment(time)
        .startOf("hour")
        .fromNow();
    },
  },
};
</script>

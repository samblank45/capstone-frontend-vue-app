<template>
  <div class="conversations-show">
    <div class="main-content">
      <div class="container">
        <!-- shop header-->
        <div class="product-info">
          <div class="col-md-4">
            <div v-if="conversation.partner_image">
              <img
                class="media-object img-circle"
                :src="conversation.partner_image"
              />
            </div>
            <div v-else>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </div>
          </div>
          <div class="row">
            <div class="text-left">
              <router-link :to="`/users/${partner.id}`">
                <h1>{{ partner.first_name }} {{ partner.last_name }}</h1>
              </router-link>
            </div>
          </div>
          <div class="tab">
            <div class="fix"></div>
            <div class="tab-content review">
              <div role="tabpanel" class="tab-pane fade active in" id="reviews">
                <div id="product-comments-block-tab">
                  <ul class="media-list">
                    <li class="media">
                      <div class="review-form leave-comment">
                        <div class="row">
                          <form v-on:submit.prevent="createMessage()">
                            <div class="col-sm-12">
                              <div class="form-group">
                                <textarea
                                  type="text"
                                  class="form-control"
                                  :placeholder="`Message ${partner.first_name}`"
                                  v-model="newMessage"
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <button
                                type="submit"
                                class="review-send text-uppercase"
                                value="send"
                              >
                                Send
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="media-body">
                        <div v-for="message in messages">
                          <div class="media-left">
                            <div v-if="message.user_id == $parent.getUserId()">
                              <div v-if="conversation.user_image">
                                <img
                                  class="media-object img-circle"
                                  width="60px"
                                  :src="conversation.user_image"
                                />
                              </div>
                              <div v-else>
                                <img
                                  class="media-object img-circle"
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                />
                              </div>
                            </div>
                            <div v-else>
                              <div v-if="conversation.partner_image">
                                <img
                                  class="media-object img-circle"
                                  width="60px"
                                  :src="conversation.partner_image"
                                />
                              </div>
                              <div v-else>
                                <img
                                  class="media-object img-circle"
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                />
                              </div>
                            </div>
                          </div>
                          <h4 class="media-heading">{{ message.name }}</h4>
                          <p class="comment-date">
                            {{ relativeTime(message.created_at) }}
                          </p>
                          <p class="comment-p fix">
                            {{ message.text }}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
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
    var cable = ActionCable.createConsumer("ws://https://sharsheret.herokuapp.com//cable");
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
        this.messages.unshift(data); // update the messages in real time
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

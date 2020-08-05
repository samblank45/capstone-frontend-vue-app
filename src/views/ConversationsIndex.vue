<template>
  <div class="conversations-index">
    <div class="kotha-default-content">
      <div class="container">
        <h1 class="text-center">Messages</h1>
        <div class="row">
          <div class="col-sm-10">
            <div v-for="conversation in conversations">
              <div class="row">
                <div class="col-md-6">
                  <article class="single-blog post-list">
                    <div class="media">
                      <div class="media-left">
                        <div class="post-thumb">
                          <div v-if="conversation.partner_image">
                            <img :src="conversation.partner_image" />
                          </div>
                          <div v-else>
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="media-body">
                        <div class="post-content">
                          <div class="entry-header text-left text-uppercase">
                            <h2>
                              {{ conversation.partner.first_name }}
                              {{ conversation.partner.last_name }}
                            </h2>
                          </div>
                          <div class="entry-content">
                            <div v-if="conversation.last_message">
                              <router-link
                                class="post-cat"
                                v-bind:to="`/conversations/${conversation.id}`"
                                ><p>
                                  {{ conversation.last_message.text }}
                                  {{
                                    relativeTime(
                                      conversation.last_message.created_at
                                    )
                                  }}
                                </p>
                              </router-link>
                            </div>
                            <div v-else>
                              <router-link
                                v-bind:to="`/conversations/${conversation.id}`"
                                >send message</router-link
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
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

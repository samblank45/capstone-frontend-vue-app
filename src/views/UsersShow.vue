<template>
  <div class="users-show">
    <div class="kotha-default-content">
      <div class="container">
        <h1>{{ user.first_name }} {{ user.last_name }}</h1>
        <p>Current Location</p>
        <p>{{ user.current_location }}</p>

        <div v-for="error in errors">{{ error }}</div>
        <div class="row">
          <div class="col-sm-8">
            <article class="post-area single-blog">
              <div class="about-me">
                <div class="about-img text-center">
                  <img
                    width="500px"
                    v-if="user.images[0]"
                    :src="user.images[0].url"
                    alt
                    class=""
                  />
                  <img
                    v-if="!user.images[0]"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt
                    class="img-circle"
                  />
                </div>
                <!-- modal button -->
                <div
                  style="position:relative; left: 5px; top: 30px;"
                  class="text-left"
                >
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#showImagesModal"
                  >
                    Images
                  </button>
                </div>
                <br />
                <!-- modal -->
                <div
                  class="modal fade"
                  id="showImagesModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="showImagesModalLabel"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="showImagesModalLabel">
                          Images
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" v-for="image in user.images">
                        <div class="testimonial-area text-center">
                          <div class="single-testimonial">
                            <div class="testimonial-info">
                              <span
                                class="testimonial-author-image text-center"
                              >
                                <img width="300 px" :src="image.url" />
                                <div v-if="$parent.getUserId() == user.id">
                                  <button
                                    class="btn btn-danger btn-sm"
                                    v-on:click="destroyImage(image)"
                                  >
                                    X
                                  </button>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- cloudinary image upload -->
                <!-- style="position:absolute; left: 430px; top:440px;" -->
                <div
                  style="position:relative; left: 500px; top:-45px;"
                  v-if="$parent.getUserId() == user.id"
                >
                  <form v-on:submit.prevent="submit()">
                    <input
                      type="file"
                      v-on:change="setFile($event)"
                      ref="fileInput"
                    />
                    <input
                      type="submit"
                      class="btn btn-primary"
                      value="Submit"
                    />
                  </form>
                </div>
                <!-- link to conversation -->
                <div class="about-me-text">
                  <p>{{ user.biography }}</p>
                  <div v-if="!user.paired && user.id != $parent.getUserId()">
                    <button
                      class="btn btn-default"
                      v-on:click="createConversation(user)"
                    >
                      Send Message
                    </button>
                  </div>

                  <div v-if="user.paired && user.id != $parent.getUserId()">
                    <button class="btn btn-default">
                      <router-link :to="`/conversations/${user.paired}`"
                        >current conversation</router-link
                      >
                    </button>
                  </div>
                  <div
                    style="position:absolute; left: 950px; top:-100px;"
                    class="continue-reading text-right text-uppercase"
                  >
                    <div v-if="$parent.getUserId() == user.id">
                      <button class="btn btn-warning">
                        <router-link :to="`/users/${user.id}/edit`"
                          >Edit
                        </router-link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="col-sm-4">
            <div class="kotha-sidebar">
              <aside class="widget widget-popular-post">
                <h1 class="widget-title text-uppercase text-center">About</h1>
                <ul>
                  <li>
                    <a href="#" class="popular-img"
                      ><img src="assets/images/p-1.jpg" alt="" />
                    </a>
                    <div class="p-content">
                      <h3>Country of Origin</h3>
                      <br />
                      <p>{{ user.country_origin }}</p>
                    </div>
                  </li>
                  <li>
                    <a href="#" class="popular-img"
                      ><img src="assets/images/p-2.jpg" alt="" />
                    </a>
                    <div class="p-content">
                      <h3>Aliyah Date</h3>
                      <br />
                      <p>{{ user.aliyah_date }}</p>
                    </div>
                  </li>
                  <li>
                    <a href="#" class="popular-img"
                      ><img src="assets/images/p-3.jpg" alt="" />
                    </a>
                    <div class="p-content">
                      <h3>Hobbies</h3>
                      <br />
                      <p>{{ user.hobbies }}</p>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: {},
      images: [],
      image: {},
      url: "",
      user_id: localStorage.getItem("user_id"),
    };
  },
  created: function() {
    $("#showAttendeesModal").modal("hide");
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.images = response.data.images;
      console.log(response.data);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.url = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("url", this.url);
      axios.post("/api/images", formData).then((response) => {
        this.$refs.fileInput.value = "";
        this.images.push(response.data);
      });
    },
    showImages: function() {
      document.querySelector("#images-details").showModal();
    },
    createConversation: function(user) {
      var params = {
        sender_id: localStorage.getItem("user_id"),
        recipient_id: user.id,
      };
      axios
        .post(`/api/conversations`, params)
        .then((response) => {
          console.log("convo created successfully", response.data);
          this.$router.push(`/conversations/`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    destroyImage: function(image) {
      axios.delete(`/api/images/${image.id}`).then((response) => {
        console.log("image successfully destroyed", response.data);
        var index = this.images.indexOf(image);
        console.log(index);
        this.images.splice(index, 1);
      });
    },
    makeProfilePic: function(image) {
      var params = {
        main_image: image.url,
      };
      axios.patch(`/api/images/${image.id}`, params).then((response) => {
        console.log("image successfully update to main pic", response.data);
        this.images.push(response.data);
      });
    },
  },
};
</script>

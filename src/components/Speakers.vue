<template>
  <div class="speakers">
    <div class="container">
      <div class="row justify-content-center align-items-top">
        <div
          v-for="item in data.items"
          :key="item.id"
          :set="speaker = getJSONData(item.fields)"
          class="stat_col col-lg-4"
        >
          <div class="speakers_item text-center pb-4 px-1">
            <g-image
              v-if="speaker.image"
              class="speakers_img"
              :src="item.image"
              :alt="speaker.title"
            />
            <h3 class="h3 my-3" v-if="speaker.name">{{ speaker.name }}</h3>
            <div>
              <span class="lead text-warning">{{ speaker.company }}</span>
            </div>
            <div class="">
              <span v-if="speaker.title" class="">{{ speaker.title }}</span>
              <span v-if="speaker.city">, {{ speaker.city }}</span>
              <span v-if="speaker.country">, {{ speaker.country }}</span>
            </div>
            <div
              v-if="speaker.socialLinks[0].src"
              class="contact-us_social-icons navbar-expand d-inline-block h4 mt-3 my-0">
              <ul class="social-icons list-unstyled navbar-nav">
                <li
                  v-for="socialLink in speaker.socialLinks"
                  :key="socialLink.id"
                  class="social-icons_item nav-item"
                >
                  <a
                    target="_blank"
                    class="social-icons_link nav-link"
                    v-if="socialLink.src"
                    :href="socialLink.src"
                  >
                    <i :class="socialLink.icon"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div v-if="speaker.bio" class="mt-3 text-left">
              <span>
                <vue-markdown>{{ speaker.bio }}</vue-markdown>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  props: {
    mode: {
      type: String,
      required: false
    },
    speakersData: {
      type: Object,
      required: true
    }
  },
  components: {
    VueMarkdown
  },
  mounted() {
    // debugger
  },
  computed: {
    data() {
      return this.$props.speakersData;
    }
  },
  methods: {
    getJSONData: str => {
      return JSON.parse(str);
    },
    getBlockSizes: mode => {
      let result = "";

      switch (mode) {
        case "xlarge":
          result = "col-6 col-sm-4 col-md-4 col-lg-3";
          break;
        case "large":
          result = "col-4 col-sm-3 col-md-3 col-lg-2";
          break;
      }

      return result;
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.speakers {
  &_img {
    max-width: 100%;
    border-radius: 50%;
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

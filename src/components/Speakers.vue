<template>
  <div class="speakers">
    <div class="container">
      <div class="row justify-content-center align-items-top">
        <div
          v-for="item in data.items"
          :key="item.id"
          :set="speaker = getJSONData(item.fields)"
          class="stat_col col-md-6 col-lg-4"
        >
          <div class="speakers_item text-center px-1 mb-5">
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
            <div class="speakers_item_caption">
              <span v-if="speaker.title">{{ speaker.title }}</span>
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
  &_item {
    &_caption {
      font-weight: 500;
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

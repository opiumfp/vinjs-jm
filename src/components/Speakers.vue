<template>
  <div class="speakers">
    <div class="container">
      <div class="row justify-content-center align-items-top">
        <div
          v-for="item in data.items"
          :key="item.id"
          :set="speaker = {self: getJSONData(item.fields), talk: getJSONData(item.talk)}"
          class="stat_col col-md-6 col-lg-4"
        >
          <div :id="speaker.self.id" class="speakers_item text-center px-1 mb-5">
            <g-image
              v-if="speaker.self.image"
              class="speakers_img"
              :src="item.image"
              :alt="speaker.self.title"
            />
            <h3 class="h3 my-3" v-if="speaker.self.name">{{ speaker.self.name }}</h3>
            <div>
              <span class="lead text-warning">{{ speaker.self.company }}</span>
            </div>
            <div class="speakers_item_caption">
              <span v-if="speaker.self.title">{{ speaker.self.title }}</span>
              <span v-if="speaker.self.city">, {{ speaker.self.city }}</span>
              <span v-if="speaker.self.country">, {{ speaker.self.country }}</span>
            </div>
            <div
              v-if="speaker.self.socialLinks[0].src"
              class="contact-us_social-icons navbar-expand d-inline-block h4 mt-3 my-0">
              <ul class="social-icons list-unstyled navbar-nav">
                <li
                  v-for="socialLink in speaker.self.socialLinks"
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
            <div v-if="speaker.self.bio" class="mt-3 text-left">
              <span>
                <vue-markdown>{{ speaker.self.bio }}</vue-markdown>
              </span>
              <div class="text-center py-3">
                <a 
                  v-if="speaker.talk.id" 
                  class="btn btn-outline-primary btn-sm" 
                  :href="`#${speaker.talk.id}`">Talk Info
                </a>
                <span 
                  v-else
                  class="btn btn-outline-secondary btn-sm"
                  > Talk Will Be Announced
                </span>
              </div>
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
      let result = str ?  JSON.parse(str) : {};
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
  &_item {
    position: relative;
    z-index: 1;
    &:hover:before {
      opacity: 1;
    }
    &:before {
      content: '';
      @include transition(all ease-in-out 0.2s);
      position: absolute;
      display: block;
      border-radius: $border-radius;
      top: -1em;
      bottom: -1em;
      left: -1em;
      right: -1em;
      z-index: -1;
      background: rgba($dark, 0.05);
      opacity: 0;
    }
    &_caption {
      font-weight: 500;
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

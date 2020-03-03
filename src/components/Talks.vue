<template>
  <div class="talks">
    <div class="container">
      <div class>
        <div
          v-for="item in data.items"
          :key="item.id"
          :set="talk = {self: getJSONData(item.talk), speaker: getJSONData(item.speaker)}"
          class="row align-items-top"
        >
          <div class="col-12 talks_item px-1 mb-3">
            <div :id="talk.self.id" class="talks-item p-3 p-lg-4 text-white">
              <div class="row align-items-center">
                <div class="col-12 col-md-3 pr-lg-5 text-center align-self-baseline">
                  <a class="talks_item_a" :href="`#${talk.speaker.id}`">
                      <g-image
                      v-if="item.image"
                      class="talks_img"
                      :src="item.image"
                      :alt="item.title"
                    />
                    <h3 class="talks_item-speaker-name h5 mt-3 mb-0" v-if="talk.speaker.name">{{ talk.speaker.name }}</h3>
                  </a>
                </div>
                <div class="col-12 col-md-9">
                  <h3 v-if="talk.self.title" class="talks_item_title mt-3 mt-md-0">{{ talk.self.title }}</h3>
                  <div v-if="talk.self.description" class="mt-3 text-left">
                    <span>
                      <vue-markdown>{{ talk.self.description }}</vue-markdown>
                    </span>
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
import VueMarkdown from "vue-markdown";

export default {
  props: {
    mode: {
      type: String,
      required: false
    },
    talksData: {
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
      return this.$props.talksData;
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
.talks {
  &_img {
    max-width: 80%;
    border-radius: 50%;
  }
  &_item {
    background-color: rgba($dark, 0.8);
    border-radius: $border-radius;
    @include transition(all ease-in-out 0.2s);
    &:hover {
      background-color: rgba($dark, 0.7);
    }
    &_title {
      color: $vjs-yellow;
      @include media-breakpoint-down(sm) {
        font-size: 1.5em;
        text-align: center;
      }
    }
     &-speaker-name {
       text-decoration: none;
      &:hover {
        text-decoration: none;  
      }
    }
    &_a {
      color: $white;
      @include transition(all ease 0.15s);
      &:hover {
        color: $vjs-yellow;
        text-decoration: none;  
      }
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

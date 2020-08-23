<template>
  <div class="schedule">
    <div class="container">
      <div class="schedules">
        <div class="container">
          <div class>
            <div
              v-for="item in data"
              :v-if="item.active"
              class="schedules"
            >
             <h5
                class="text-center"
                v-if="item.schedule.fulltitle"
              >{{item.schedule.starttime | formatDate}} - {{item.schedule.fulltitle}}</h5>
              <div
                v-for="slot in item.schedule.items"
                >
                <div class="schedule">
                  <div class="row">
                    <div class="col-1">
                        {{slot.time | formatTime}}
                    </div>
                    <div class="col-6">
                        {{slot.talk.title}}
                    </div>
                    <div class="col-3">
                        <a :href="`#${slot.speaker.id}`">
                          {{slot.speaker.name}}
                        </a>
                    </div>
                  </div>
                </div>
                <div class="schedule_talk_speaker_name">Speaker: {{slot.speaker.name}}</div>
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
import PageTitle from "@/components/PageTitle";
import moment from 'moment';

export default {
  props: {
    mode: {
      type: String,
      required: false
    },
    scheduleData: {
      type: Array,
      required: true
    }
  },
  components: {
    VueMarkdown,
    PageTitle
  },
  mounted() {
    // debugger
    console.log(this.data)
  },
  computed: {
    data() {
      return this.$props.scheduleData;
    }
  },
  filters: {
    formatTime: function(value) {
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
    },
    formatDate: function(value) {
      if (value) {
        // return moment(String(value)).format('MMMM Do')
        return moment(String(value)).locale('en').calendar(null,{
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[last] dddd',
            nextWeek : 'dddd',
            sameElse : 'L'
        })
      }
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

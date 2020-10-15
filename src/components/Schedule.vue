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
                class="text-center pt-3 pt-lg-4"
                v-if="item.schedule.fulltitle"
              >{{item.schedule.starttime | formatDate}}<span class="font-weight-normal"> - {{item.schedule.title}}</span></h5>
              <div class="schedule pt-0 pb-3 pt-lg-3 pb-lg-4">
                <div
                  v-for="slot in item.schedule.items"
                  >
                  <div class="schedule_slot rounded" :id="slot.talk.id">
                    <div class="schedule_slot_row row align-items-center py-2">
                      <div class="col-12 col-lg-1 text-center pt-2 pt-lg-0">
                          <span class="schedule_slot_time">{{slot.time | formatTime}}</span>
                      </div>
                      <div class="col-12 col-lg-7">
                          <h6 class="schedule_slot_talk_title h6 m-0 py-2 py-lg-0 text-center text-lg-left" @click="openSlot($event)">{{slot.talk.title || slot.titlee}}</h6>
                      </div>
                      <div class="col-12 col-lg-3 text-center text-lg-right">
                          <a :href="`#${slot.speaker.id}`" v-if="slot.speaker.image" >
                            <g-image
                              class="schedule_slot_speaker_img mr-2"
                              v-if="slot.speaker.image"
                              :src="slot.speaker.image"
                              :alt="slot.speaker.title"
                            />
                            <span v-if="slot.speaker.name" class="schedule_slot_speaker_name">{{slot.speaker.name}}</span>
                          </a>
                      </div>
                      <div class="col-12 col-lg-1 text-center text-lg-right">
                          <button class="schedule_slot_opener py-2 py-lg-0" v-if="slot.talk.description || slot.titleedescription" @click="openSlot($event)"></button>
                      </div>
                      
                    </div>
                    <div class="row schedule_slot_info " v-if="slot.talk.description || slot.titleedescription">
                      <div class="offset-lg-1 col-12 col-lg-10">
                          <div class="schedule_slot_talk_description">
                              <div class="schedule_slot_talk_description_block rounded pt-3 pb-1 px-3 mx-3 mx-lg-0 mt-1 mb-3">
                                <vue-markdown>{{ slot.talk.description || slot.titleedescription }}</vue-markdown>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.schedule.link || item.schedule.linkdiscord || item.schedule.linkyoutube" class="schedule_slot_talk_buttons text-center mb-5">
                <h5>Join Online:</h5>
                <a v-if="item.schedule.link" :href="item.schedule.link" target="_blank" class="btn btn-primary mt-2 mx-2">Join Online</a>
                <a v-if="item.schedule.linkdiscord" :href="item.schedule.linkdiscord" target="_blank" class="btn btn-discord mt-2 mx-2"><i class="icon icon-discord mr-2"></i>Discord</a>
                <a v-if="item.schedule.linkyoutube" :href="item.schedule.linkyoutube" target="_blank" class="btn btn-danger mt-2 mx-2"><i class="icon icon-youtube-play mr-2"></i>Youtube</a>
              </div>
              <hr/>
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
  },
  computed: {
    data() {
      return this.$props.scheduleData;
    }
  },
  methods: {
    openSlot: function(event) {
      const parent = event.target.closest('.schedule_slot');
      const opener = parent.querySelector('.schedule_slot_opener');
      const description = parent.querySelector('.schedule_slot_talk_description');
      if (description && opener) {
        opener.classList.toggle('active');
        description.classList.toggle('show');
      }
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
        return moment(String(value)).calendar(null,{
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[last] dddd',
            nextWeek : 'DD.MM',
            sameElse : 'DD.MM'
        })
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.schedule {
  &_slot {
    border-bottom: 1px solid rgba($dark, 0.2);
    background-color: rgba($dark, 0.04);
    @include transition(all ease-in-out 0.2s);
    &:hover {
      @include media-breakpoint-up(md) {
          background-color: rgba($dark, 0.08);
      }
    }
    &_row {
      position: relative;
      min-height: 4em;
    }
    &_opener {
      /* position: absolute; */
      padding: 0;
      right: 15px;
      top: 0;
      height: 100%;
      width: 3em;
      font-family: 'icomoon' !important;
      background: none;
      border: none;
      outline: none;
      @include transition(all linear 0.2s);
      &:before {
        content: "\e90a";
      }
      &.active {
        & {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
        }
      }
    }
    &_time {
      color: darken($vjs-yellow, 7%);
    }
    &_talk {
      &_title {
        vertical-align: middle;
        &:hover {
          cursor: pointer;
        }
      }
      &_buttons {
        .icon {
          vertical-align: middle;
          font-size: $font-size-base * 1.35;
        }
      }
      &_description {
        max-height: 0;
        overflow: hidden;
        @include transition(all ease-in-out 0.3s);
        &.show {
          max-height: 350px;
          @include media-breakpoint-down(md) {
            max-height: 600px;
          }
        }
        &_block {
          background-color: rgba($dark, 0.1);
        }
      }
    }
    &_speaker {
      &_name {
        vertical-align: middle;
      }
      &_img {
        max-width: 30px;
        border-radius: 50%;
      }
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

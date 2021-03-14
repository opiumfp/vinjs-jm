<template>
  <!-- <div id="tme" class="tme d-none d-lg-block"> -->
  <div id="tme" class="tme">
    <button @click="toggleTme()" class="tme_button"><i class="icon icon-telegram"></i></button>
    <div class="tme_main">
      <div id="tme_main_overlay" class="tme_main_overlay">
        <button @click="toggleTme()" class="tme_main_btn-close"><i class="icon icon-angle-right"></i></button>
        <div class="tme_main_wrap p-4">
          <div class="tme_main_body">
            <component 
            is="script"  
            async 
            src="https://telegram.org/js/telegram-widget.js?14" 
            :data-telegram-post="`${$props.channel}/${$props.postid}`" 
            data-width="100%" 
            data-color="DB8400"
            data-userpic="false"
            ></component>
            <a :href="`https://t.me/${$props.channel}`" target="_blank" class="tme_main_btn-channel btn btn-primary py-1 mt-3">View in Channel</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        channel: {
          type: String,
          required: true
        },
        postid: {
          type: String,
          required: true
        }
    },
    methods: {
      toggleTme () {
        document.querySelector('#tme_main_overlay').classList.toggle('show')
      }
    },
    mounted() {
      // debugger
    },
}
</script>


<style scoped lang="scss">

@import "assets/styles/base.scss";

.tme {
  &_button {
    background: none;
    padding: 0;
    border: 0;
    position: fixed;
    font-size: 3em;
    line-height: 1;
    right: .5em;
    color:$orange;
    @include transition(all ease-in-out 0.15s);
    z-index: 9;
    top: auto;
    bottom: calc(#{$nav-height} + .2em);
    @include media-breakpoint-down(lg) {
      bottom: 15px;
      right: 25px;
    }
    &:before{
      content: '';
      position: absolute;
      border-radius: 50%;
      left: 10%;
      right:10%;
      top: 20%;
      bottom:20%;
      background: $white;
      z-index: -1;
    }
    &:hover {
      color:darken($orange, 10%);
    }
  }
  &_main {
    position: relative;
    &_btn-close {
      outline: none;
      background-color: transparent;
      border: none;
      position: absolute;
      left: -2px;
      font-size: 2.4em;
      color: $white;
      height: 100%;
      padding: 0 0.4em;
      @include transition(all ease-in-out 0.15s);
      &:hover {
        cursor: pointer;
        left: 0;
        background-color: rgba($black, 0.1);
        color: darken($white, 20%);
      }
    }
    &_overlay {
      overflow: hidden;
      position: fixed;
      background-color: rgba($dark, 0.7);
      top: 0;
      bottom: $nav-height;
      right: 0;
      left: auto;
      padding-left: .5em;
      padding-right: .5em;
      @include transition(all ease 0.5s);
      width: 500px;
      z-index: 11;
      margin-right: -100%;
      @include media-breakpoint-down(lg) {
        width: 100%;
        bottom: 0;
        z-index: 1031;
      }
      &:before {
        content: '';
        position: absolute;
        height: 1em;
        width: 100%;
        bottom: 0;
        left: 0;
        @include gradient-y($start-color: transparent, $end-color: rgba($dark, 0.5), $start-percent: 0%, $end-percent: 100%)
      }
      &.show {
        right:-20px;
        margin-right: 0;
        @include media-breakpoint-down(lg) {
          right: 0;
        }
      }
    }
    &_wrap {
      position: absoulte;
      height: 100%;
      width: 100%;
      overflow: auto;
      scrollbar-width: thin;
    }
    &_body {
      min-height: 100%;
      text-align: center;
    }
  }
}

</style>

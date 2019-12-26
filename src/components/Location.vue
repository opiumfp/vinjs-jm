<template>
<div class="location">
  <div v-if="data.image" class="location_bg">
    <div class="location_bg_wrap">
      <div class="location_bg_prlx" v-prlx="{ fromBottom: true }">
        <g-image v-if="data.image" class="location_bg_img location_bg_img-landscape" :src="data.image"/>
        <g-image v-if="data.imagePt" class="location_bg_img location_bg_img-portrait" :src="data.imagePt"/>
      </div>
    </div>
  </div>
  <div class="location_map">
    <div class="container-fluid pt-4 pb-4 pt-lg-5 pb-lg-5">
      <div class="row justify-content-center ">
        <div v-if="data.logo" class="col-8 text-center mb-4 mb-lg-5">
          <g-image class="location_logo" :src="data.logo"/>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11">
          <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="data.mapLinkIframe"></iframe>
          <br/>
          <small>
            <a class="location_map_link" :href="data.mapLinkDirect" target="blank">
              <g-image src="~/../assets/images/misc/openstreetmap-logo.svg" width="24" class="align-bottom"></g-image>
              <span class="h6 ml-1 text-dark font-weight-bold">OpenStreetMap</span>
            </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
    props: {
        locationData: {
          type: Object,
          required: true
        }
    },
    mounted() {
      // debugger
    },
    computed: {
      data() {
        return this.$props.locationData
      }
    },
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.location {
  position: relative;
    &_logo {
      max-width: 100%;
    }
  &_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    &_prlx {
      transition: none!important;
    }
    &_img {
      height: 100%;
      &-portrait {
        display: none;
      }
      @include media-breakpoint-down(md) {
        @media (orientation: portrait) {
          &-landscape {
            display: none;
          }
          &-portrait {
            display: block;
          }
        }
      }
    }
    &_wrap {
      position: absolute;
      transform: translateY(-50%);
      width: 100%;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($dark, .4);
      }
    }
  }
  &_map {
    position: relative;
    &_link {
      position: absolute;
      bottom: 1em;
      left: 2em;
      &_img {
      }
    }
  }

  @include media-breakpoint-down(lg) {}
}

</style>

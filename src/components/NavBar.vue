<template>
<nav class="vjs-navbar navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
  <!-- <a class="navbar-brand" href="http://vinnytsiajs.org">
      <g-image src="../../assets/images/logo/vinjs19-logo-inline.png" width="100" fit="contain" background="none" />
  </a> -->
  <div class="vjs-navbar_nav-mobile">
    <button @click="toggleDropNav" class="navbar-toggler" type="button"  data-target="#navbar_dropmenu" aria-controls="navbar_dropmenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
  </div>

  <div class="vjs-navbar_collaplse navbar-collapse" id="navbar_dropmenu">
      <div class="vjs-navbar_social-wrap">
        <div style="width:150px; height:24px; background: red;">

        </div>
      </div>
      <ul class="vjs-navbar_nav navbar-nav">
              <!-- <li v-for="post in $page.posts.edges" :key="post.id">
              <g-link :to="post.node.path">
                  {{ post.node.title }}
              </g-link>
              </li> -->
          <li v-for="item in $props.navData.items" :key="item.id" class="nav-item">
              <a v-if="item.active" class="nav-link" :href="item.src">{{item.title}} <span class="sr-only">(current)</span></a>
          </li>
          <!-- <li class="nav-item active">
              <a class="nav-link" href="#">Link</a>
          </li> -->
      </ul>
      <div class="vjs-navbar_button-wrap">
        <button class="btn btn-outline-success d-block mx-auto ml-lg-auto mr-lg-0" type="submit">Search</button>
      </div>
  </div>
</nav>
</template>

<script>

export default {
    props: {
        navData: {
        type: Object,
        required: true
        }
    },
    mounted() {
      console.log('this.$props.navData ::: ', this.$props.navData);
    //   debugger
    },
    methods: {
      toggleDropNav: () => {
        document.querySelector('body').classList.toggle('nav_dropmenu-show')
      }
    },
}
</script>

<style lang="scss">
@import "assets/styles/base.scss";
#main {
  @include transition(all linear .2s);
  .nav_dropmenu-show &{
    filter: blur(5px);
  }
}
</style>

<style scoped lang="scss">
@import "assets/styles/base.scss";

$nav-height: 72px;

.vjs-navbar {
  height: $nav-height;
  background-color: rgba($dark, .3) !important;
  @include transition(background-color linear .2s);
  .nav_dropmenu-show & {
    background-color: rgba($dark, .5) !important;
    height: auto;
  }
  @include media-breakpoint-down(lg) {
    top: 0;
    bottom: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
  &_collaplse {
    justify-content: space-between;
    @include media-breakpoint-down(lg) {
      display: none;
      height: calc(100vh - #{$nav-height});
      flex-direction: column;
      .nav_dropmenu-show & {
        display: flex;
        justify-content: space-around;
      }
    }
  }
  &_nav {
    text-align: center;
    justify-content: center;
    &-mobile {
      display: flex;
      align-items: center;
      min-height: $nav-height;
    }
    @include media-breakpoint-down(lg) {
      flex-grow: 1;
    }
  }
  &_social-wrap,
  &_button-wrap {
    min-width: 20%;
    @include media-breakpoint-down(lg) {
      flex-grow: 1;
    }
  }
  @include media-breakpoint-down(lg) {
    &_social-wrap {
      order: 1;
    }
  }
}
</style>

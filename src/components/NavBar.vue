<template>
  <nav class="vjs-navbar navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark">
    <!-- <a class="navbar-brand" href="http://vinnytsiajs.org">
      <g-image src="../../assets/images/logo/vinjs19-logo-inline.png" width="100" fit="contain" background="none" />
    </a>-->
    <div class="vjs-navbar_nav-mobile">
      <button
        @click="toggleDropNav"
        class="navbar-toggler"
        type="button"
        data-target="#navbar_dropmenu"
        aria-controls="navbar_dropmenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="vjs-navbar_collaplse navbar-collapse" id="navbar_dropmenu">
      <div class="vjs-navbar_social-wrap">
        <social-icons :socialIconsData="getObject(this.$props.navData.socialicons)"></social-icons>
      </div>
      <ul class="vjs-navbar_nav navbar-nav">
        <li v-for="item in $props.navData.items" :key="item.id" class="nav-item">
          <a v-if="item.active" class="vjs-navbar_link nav-link scroll text-uppercase" :href="item.src">
            {{item.title}}
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <div class="vjs-navbar_button-wrap">
        <a
          v-if="this.$props.navData.button"
          :href="this.$props.navData.button.src"
          target="_blank"
          class="btn btn-primary d-block mx-auto ml-lg-auto mr-lg-0"
        >{{this.$props.navData.button.title}}</a>
      </div>
    </div>
  </nav>
</template>

<script>
import SocialIcons from "@/components/SocialIcons";

export default {
  props: {
    navData: {
      type: Object,
      required: true
    }
  },
  components: {
    SocialIcons
  },
  mounted() {
    window.addEventListener(
      "orientationchange",
      function() {
        document.querySelector("body").classList.remove("nav_dropmenu-show");
      },
      false
    );

    window.addEventListener("scroll", () => {
      let pageScrolled = false;
      if (window.scrollY === 0) {
        document.querySelector("body").classList.remove("page-scrolled");
        pageScrolled = false;
      } else {
        if (pageScrolled) return;

        document.querySelector("body").classList.add("page-scrolled");
        pageScrolled = true;
      }
    });
  },
  methods: {
    getObject: str => {
      return JSON.parse(str);
    },
    toggleDropNav: () => {
      document.querySelector("body").classList.toggle("nav_dropmenu-show");
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.vjs-navbar {
  height: $nav-height;
  background-color: transparent !important;
  .page-scrolled & {
    background-color: rgba($dark, 0.7) !important;
  }
  @include transition(background-color linear 0.15s);
  .nav_dropmenu-show & {
    background-color: rgba($dark, 0.6) !important;
    height: auto;
  }
  @include media-breakpoint-down(md) {
    top: 0;
    bottom: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
  &_collaplse {
    justify-content: space-between;
    @include media-breakpoint-down(md) {
      display: none;
      height: calc(100vh - #{$nav-height});
      flex-direction: column;
      justify-content: space-around;
      .nav_dropmenu-show & {
        display: flex;
      }
    }
  }
  &_link {
    white-space: nowrap;
    font-size: .9rem;
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
      header & .nav-link {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        @include media-breakpoint-between(sm, md) {
          @media (max-height: 768px) {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      }
    }
    @include media-breakpoint-down(md) {
      flex-grow: 1;
      margin-bottom: 2em;
    }
    @include media-breakpoint-between(sm, md) {
      @media (max-height: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 2em;
      }
    }
    @media screen and (max-width: 768px) and (orientation: landscape) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  &_social-wrap,
  &_button-wrap {
    min-width: 18%;
    @include media-breakpoint-down(md) {
      flex-grow: 1;
    }
  }
  &_social-wrap {
    @include media-breakpoint-down(md) {
      order: 1;
      margin-bottom: 3rem;
    }
  }
  .social-icons {
    font-size: $font-size-base * 1.1;
    @include media-breakpoint-down(lg) {
      flex-direction: row;
    }
    @include media-breakpoint-down(md) {
      margin-top: 1em;
    }
    ::v-deep .social-icons_link {
      padding-right: 0.75rem;
      padding-left: 0.75rem;
      @include media-breakpoint-up(md) {
        @media (max-width: 1100px) {
          padding-left: 0.5rem; // Exception Issue / TODO remove
          padding-right: 0.5rem; // Exception Issue / TODO remove
        }
      }
    }
  }
}
</style>

<template>
  <div class="layout" ref="layoutx">
    <header class="header">
      <nav-bar :navData="$static.pageData.nav"></nav-bar>
    </header>
    <div id="main">
      <slot />
    </div>

    <popup-youtube v-if="showPopup" ref="mtPlayer" :youtubeId="videoId"></popup-youtube>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  pageData: conf (path: "/content/conf/vinnytsiajs-2020") {
    nav {
      button {
        active
        src
        title
      }
      items {
        active
        src
        title
      }
      socialicons {
        items {
          active
          icon
          src
          title
        }
      }
    }
  }
}
</static-query>

<script>
import { store, mutations } from "~/stores/store";
import NavBar from "@/components/NavBar";
import PopupYoutube from "@/components/PopupYoutube";
import {
  isMobile,
  isMobileOnly,
  isTablet,
  isIE,
  isEdge,
  isBrowser
} from "mobile-device-detect";
import smoothscroll from "smoothscroll-polyfill";

export default {
  data() {
    return {
      deviceData: {
        isMobile: isMobile,
        isMobileOnly: isMobileOnly,
        isTablet: isTablet,
        isEdge: isEdge,
        isBrowser: isBrowser,
        isIE: isIE
      },
      videoId: '',
      showPopup: false
    };
  },
  components: {
    NavBar,
    PopupYoutube
  },
  methods: {
    setDevice: mutations.setDevice,
    showPopupYoutube(show) {
      this.showPopup = show;
    },
    loadPopupVideo(id) {
      this.videoId = id;
      if (!this.showPopup) {
        this.showPopupYoutube(true);
      } else {
        this.$refs.mtPlayer.loadVideo(id);
      }
    }
  },
  computed: {
    device() {
      return store.device;
    }
  },
  created() {
    this.deviceData.noPrlx = this.deviceData.isEdge || this.deviceData.IE;
    this.deviceData.isShowVideo =
      this.deviceData.isBrowser &&
      !this.deviceData.isIE &&
      !this.deviceData.isEdge;

    this.setDevice(this.deviceData);
  },
  mounted() {
    // Smooth Scroll behavior polyfill
    smoothscroll.polyfill();

    let htmlTag = document.querySelector("html");

    this.device.isMobile && htmlTag.classList.add("mobile");
    this.device.isMobileOnly && htmlTag.classList.add("mobile-only");
    this.device.isTablet && htmlTag.classList.add("tablet");
    this.device.isBrowser && htmlTag.classList.add("browser");
    this.device.isIE && htmlTag.classList.add("ie");
    this.device.isEdge && htmlTag.classList.add("edge");

    // Anchor bahavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        let target = document.querySelector(this.getAttribute("href"));
        if (!target) return false;

        e.preventDefault();
        document.querySelector("body").classList.remove("nav_dropmenu-show");
        target.scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth !important;
}
</style>

<style scoped lang="scss">
@import "assets/styles/base.scss";

#main {
  @include transition(all linear 0.2s);
  .nav_dropmenu-show &,
  .body-blurred & {
    filter: blur(5px);
  }
}
</style>

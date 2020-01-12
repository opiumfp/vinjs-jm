<template>
  <div class="layout" ref="layoutx">
    <header class="header">
      <nav-bar :navData="getNav($static.pageData.nav)"></nav-bar>
    </header>
    <div id="main">
      <slot />
    </div>

    <popup-youtube v-if="showPopup" ref="mtPlayer" :youtubeId="videoId"></popup-youtube>
    <!-- <button
      class="position-fixed"
      style="top: 0;"
      @click="loadPopupVideo('M3m25mdBBYM')"
    >Change Video {{this.videoId}}</button>-->
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  pageData: conf (path: "/content/conf/vinnytsiajs-2020") {
    nav
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
      videoId: "",
      showPopup: false
    };
  },
  components: {
    NavBar,
    PopupYoutube
  },
  methods: {
    setDevice: mutations.setDevice,
    getNav: str => {
      return JSON.parse(str);
    },
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
        scrollAnchors(e);
        // target.scrollIntoView({
        //   behavior: "smooth"
        // });
      });
    });

        (function() {
    	scrollTo();
    })();

    // function scrollTo() {
    // 	const links = document.querySelectorAll('.scroll');
    // 	links.forEach(each => (each.onclick = scrollAnchors));
    // }

    function scrollAnchors(e) {
      const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
      e.preventDefault();
      let targetID = e.target.getAttribute("href");
      const targetAnchor = document.querySelector(targetID);
      if (!targetAnchor) return;
      const originalTop = distanceToTop(targetAnchor);
      window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
      const checkIfDone = setInterval(function() {
        const atBottom =
          window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = "-1";
          targetAnchor.focus();
          window.history.pushState("", "", targetID);
          clearInterval(checkIfDone);
        }
      }, 100);
    }
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

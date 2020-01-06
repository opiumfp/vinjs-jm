<template>
  <div class="layout">
    <header class="header">
      <nav-bar :navData="getNav($static.pageData.nav)"></nav-bar>
    </header>
    <div id="main">
      <slot/>
    </div>
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
import NavBar from "@/components/NavBar"
import { isMobile, isMobileOnly, isTablet, isIE, isEdge } from 'mobile-device-detect'


export default {
  components: {
    NavBar
  },
  methods: {
    getNav: (str) => {
      return JSON.parse(str)
    }
  },
  data () {
    return {
      isMobile: isMobile,
      isMobileOnly: isMobileOnly,
      isTablet: isTablet,
      isEdge: isEdge,
      isIE: isIE
    }
  },
  mounted() {
    // debugger;
    let htmlTag = document.querySelector('html');

    isMobile && htmlTag.classList.add('mobile');
    isMobileOnly && htmlTag.classList.add('mobile-only');
    isTablet && htmlTag.classList.add('tablet');
    isIE && htmlTag.classList.add('ie');
    isEdge && htmlTag.classList.add('edge');
    // debugger
  }
}
</script>

<style scoped lang="scss">

</style>

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

export default {
  components: {
    NavBar
  },
  methods: {
    getNav: (str) => {
      return JSON.parse(str)
    }
  },
  mounted() {
    // debugger
  }
}
</script>

<style scoped lang="scss">

</style>

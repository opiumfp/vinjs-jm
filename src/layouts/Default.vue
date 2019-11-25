<template>
  <div class="layout">
    <nav-bar></nav-bar>
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/team/">Team</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  navData: nav (path: "/content/nav/main-menu") {
    title
  }
}
</static-query>

<script>
import NavBar from "@/components/NavBar"

export default {
  components: {
    NavBar
  },
  mounted() {
    console.log('this.$static.navData ::: ', this.$static.navData);
    // debugger
  }
}
</script>

<style scoped lang="scss">

</style>

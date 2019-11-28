<template>
<nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
  <a class="navbar-brand" href="http://vinnytsiajs.org">
      <g-image src="../../assets/images/logo/vinjs19-logo-inline.png" width="100" fit="contain" background="none" />
  </a>
  <button @click="toggleDropNav" class="navbar-toggler" type="button"  data-target="#navbar_dropmenu" aria-controls="navbar_dropmenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>

  <div class="navbar-collapse" id="navbar_dropmenu">
      <ul class="navbar-nav mr-auto">
              <!-- <li v-for="post in $page.posts.edges" :key="post.id">
              <g-link :to="post.node.path">
                  {{ post.node.title }}
              </g-link>
              </li> -->
          <li v-for="item in $props.navData.items" :key="item.id" class="nav-item">
              <a v-if="item.active" class="nav-link" :href="item.src">{{item.title}} <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
              <a class="nav-link" href="#">Link</a>
          </li>
      </ul>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
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

<style scoped lang="scss">
@import "assets/styles/base.scss";

@include media-breakpoint-down(lg) {
  #navbar_dropmenu {
    display: none;
    height: 100vh;
    .nav_dropmenu-show & {
      display: block;
    }
    .navbar-nav {
      text-align: center;
    }
  }
}
</style>

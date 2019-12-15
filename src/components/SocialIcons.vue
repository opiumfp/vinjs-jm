<template>
<ul class="social-icons list-unstyled navbar-nav">
  <li v-for="item in this.$props.socialIconsData.items" :key="item.id" class="social-icons_item nav-item">
    <a v-if="item.active" class="social-icons_link nav-link" :href="item.src"><i :class="item.icon"></i></a>
  </li>
</ul>
</template>

<script>

export default {
    props: {
        socialIconsData: {
          type: Object,
          required: true
        }
    },
    mounted() {
      // debugger
    },
    methods: {},
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

@include media-breakpoint-down(lg) {}

</style>

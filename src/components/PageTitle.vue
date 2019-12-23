<template>
<div class="page-title text-center">
  <h2 v-if="$props.title">{{ $props.title }}</h2>
  <h6 v-if="$props.subtitle">{{ $props.subtitle }}</h6>
</div>
</template>

<script>
export default {
    props: {
        title: {
          type: String,
          required: true
        },
        subtitle: {
          type: String,
          required: true
        }
    },
    methods: {
    },
    mounted() {
      // debugger
    },
    methods: {},
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.page-title {
  @include media-breakpoint-down(lg) {}
}

</style>

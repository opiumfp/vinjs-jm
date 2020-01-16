<template>
  <div class="about">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 align-self-center text-center">
          <div class="about_descrition">
            <h1>{{ data.title }}</h1>
            <p class="my-4">{{ data.paragraph }}</p>
            <a :href="data.link" class="btn btn-primary my-2 my-sm-0">{{ data.linkTitle }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    aboutData: {
      type: Object,
      required: true
    }
  },
  created() {
    this.data = this.$props.aboutData;
  },
  mounted() {
    // debugger
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.about {
  width: 100%;
  &_logo {
    max-width: 100%;
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

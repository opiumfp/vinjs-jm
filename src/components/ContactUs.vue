<template>
  <div class="contact-us">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="text-center pb-4">
            <p
              class="h5 font-weight-normal"
              >Follow us on social media for more information and news about the conference. <br/>See you soon!
            </p>
            <div class="contact-us_social-icons navbar-expand d-inline-block h4 my-3">
              <social-icons :socialIconsData="this.socialData.socialicons"></social-icons>
            </div>
            <div class="btn-group mb-3">
              <a class="btn btn-secondary py-0" :href="/policy/">Policy</a></a>
              <a class="btn btn-secondary py-0" href="http://vinnytsiajs.org/docs/Code_of_Conduct_-_VinnytsiaJS.pdf">Code of Conduct</a></a>
            </div>
            <ul class="list-unstyled">
              <li>
                <span>Partnership:</span>
                <a href="tel:+380636310436">+38 063 63 104 36</a>
              </li>
              <li>
                <span>Transfer:</span>
                <a href="tel:+380632007748">+38 063 200-77-48</a>
              </li>
              <li>
                <a href="mailto:info@vinnytsiajs.org">info@vinnytsiajs.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SocialIcons from "@/components/SocialIcons";

export default {
  components: {
    SocialIcons
  },
  props: {
    contactUsData: {
      type: Object,
      required: true
    },
    socialIconsData: {
      type: Object,
      required: false
    }
  },
  mounted() {
    // debugger
  },
  computed: {
    data() {
      return this.$props.contactUsData;
    },
    socialData() {
      return this.$props.socialIconsData;
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.contact-us {
  &_social-icons {
    .social-icons {
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>

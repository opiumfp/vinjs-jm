<template>
<div>

  <h1>-- {{lang}} version --</h1>
  <hero
    v-if="$static.pageData.hero.image"
    :id="$static.pageData.hero.id"
    :heroData="$static.pageData.hero"
  ></hero>
  <div class="layer layer-content">
    <section
      class="py-7 vjs-bg-logo vjs-bg-logo-purple text-white section-vh-100 d-flex align-items-center justify-content-center"
      :id="$static.pageData.about.id"
    >
      <about
        v-if="$static.pageData.about.titleI18N[lang]"
        :aboutData="$static.pageData.about"
        :lang="lang"
      ></about>
    </section>
    <section :id="$static.pageData.stat.id">
      <stat v-if="$static.pageData.stat.items" :statData="$static.pageData.stat"></stat>
    </section>
    <section :id="$static.pageData.mediaTiles.id" class="vjs-bg-logo vjs-bg-logo-red text-white">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <page-title
              class="position-relative py-8"
              :title="$static.pageData.mediaTiles.title"
              :subtitle="$static.pageData.mediaTiles.subtitle"
            ></page-title>
          </div>
        </div>
      </div>
      <media-tiles :mediaTilesData="$static.pageData.mediaTiles"></media-tiles>
    </section>
    <section class="position-relative pt-5 pb-2">
      <div class="anchor-id" :id="$static.pageData.speakers.id"></div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <page-title
              class="position-relative"
              :title="$static.pageData.speakers.title"
              :subtitle="$static.pageData.speakers.subtitle"
            ></page-title>
            <speakers class="mt-5" :speakersData="$static.pageData.speakers"></speakers>
          </div>
        </div>
      </div>
    </section>
    <hr />
    <section class="position-relative pt-5 pb-5">
      <div class="anchor-id" :id="$static.pageData.talks.id"></div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <page-title
              class="position-relative"
              :title="$static.pageData.talks.title"
              :subtitle="$static.pageData.talks.subtitle"
            ></page-title>
            <talks class="mt-5" :talksData="$static.pageData.talks"></talks>
          </div>
        </div>
      </div>
    </section>
    <section class="vjs-bg-logo vjs-bg-logo-blue text-white py-6">
      <div class="anchor-id" id="cfp"></div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <page-title class="position-relative" title="Call for Papers"></page-title>
            <p class="my-4 lead">Have to contribute anything of value? Submit your talk!</p>
            <a
              href="https://forms.gle/jY1gcjCJKCbp8NNS8"
              class="btn btn-primary my-2 px-5 my-sm-0"
              target="_blank"
            >Submit</a>
          </div>
        </div>
      </div>
    </section>
    <section class="position-relative pb-5">
      <div class="anchor-id" :id="$static.pageData.pricing.id"></div>
      <page-title
        class="pt-5 pb-4"
        :title="$static.pageData.pricing.title"
        :subtitle="$static.pageData.pricing.subtitle"
      ></page-title>
      <pricing :pricingData="$static.pageData.pricing" />
    </section>
    <hr />
    <section class="position-relative">
      <div class="anchor-id" :id="$static.pageData.partners.id"></div>
      <page-title
        class="pt-5 pb-4"
        :title="$static.pageData.partners.title"
        :subtitle="$static.pageData.partners.subtitle"
      ></page-title>
      <partners :partnersData="$static.pageData.partners" mode="xlarge"></partners>
    </section>
    <section>
      <page-title
        class="pt-5 pb-4"
        :title="$static.pageData.friends.title"
        :subtitle="$static.pageData.friends.subtitle"
      ></page-title>
      <partners :partnersData="$static.pageData.friends" mode="large"></partners>
    </section>
    <section>
      <page-title
        class="pt-5 pb-4"
        :title="$static.pageData.mediapartners.title"
        :subtitle="$static.pageData.mediapartners.subtitle"
      ></page-title>
      <partners :partnersData="$static.pageData.mediapartners" mode="small"></partners>
      <div class="text-center pt-5 pb-4">
        <a
          href="mailto:partners@vinnytsiajs.org?subject=VinnytsiaJS%202020%3A%20Became%20a%20Partner"
          class="btn btn-primary my-2 my-sm-0"
        >Become a Partner</a>
      </div>
    </section>
    <hr />
    <section :id="$static.pageData.location.id">
      <page-title class="pt-4 pb-3" title="Location" id="location"></page-title>
      <location :locationData="$static.pageData.location"></location>
    </section>
    <section class="position-relative">
      <div class="anchor-id" id="contact"></div>
      <page-title class="pt-5 pb-3" title="Contact Us"></page-title>
      <contact-us :contactUsData="{}" :socialIconsData="$static.pageData.nav"></contact-us>
    </section>
    <div class="spacer-nav-bottom"></div>
  </div>
</div>
</template>

<static-query>
query Conf {
  pageData: conf (path: "/content/conf/vinnytsiajs-2020") {
    nav
    title
    startDate
    hero {
      id
      title
      subtitle
      date
      image (quality:40)
      imagePt (quality:40)
      button {
        title
        link
      }
    }
    about {
      id
      title
      titleI18N {
        en
        ua
        ru
      }
      paragraph
      linkTitle
      link
      logo
    }
    stat {
      image (quality:60)
      imagePt (quality:40)
      items {
        title
        paragraph
      }
    }
    mediaTiles {
      title
      subtitle
      id
      items {
        title
        active
        type
        src
        colDesk
        image (quality:90, width:640, height:360)
      }
    }
    playlists {
      title
      subtitle
      id
      items {
        title
        active
        type
        src
        image (quality:40)
      }
    }
    speakers {
      title
      subtitle
      id
      items {
        fields
        image (quality:90, width:200)
        talk
      }
    }
    talks {
      title
      subtitle
      id
      items {
        talk
        speaker
        image (quality:90, width:200)
      }
    }
    partners {
      title
      subtitle
      id
      items {
        active
        fields
        image (quality:90, width:400)
      }
    }
    pricing {
      title
      subtitle
      id
      currency
      col
      items {
        title
        status
        caption
        btnLabel
        btnSrc
        price
      }
    }
    friends {
      title
      subtitle
      id
      items {
        active
        fields
        image (quality:90, width:200)
      }
    }
    mediapartners {
      title
      subtitle
      id
      items {
        active
        fields
        image (quality:90, width:200)
      }
    }
    location {
      id
      title
      image (quality:60)
      imagePt (quality:40)
      logo (width: 380)
      name
      address
      mapLinkDirect
      mapLinkIframe
      mapLinkGoogle
    }
  }
}

</static-query>

<script>
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stat from "@/components/Stat";
import PageTitle from "@/components/PageTitle";
import MediaTiles from "@/components/MediaTiles";
import Pricing from "@/components/Pricing";
import Speakers from "@/components/Speakers";
import Talks from "@/components/Talks";
import Partners from "@/components/Partners";
import Location from "@/components/Location";
import ContactUs from "@/components/ContactUs";

export default {
  components: {
    Hero,
    About,
    Stat,
    PageTitle,
    MediaTiles,
    Pricing,
    Speakers,
    Talks,
    Partners,
    Location,
    ContactUs
  },
  props: {
    lang: {
      type: String,
      required: true
    }
  },
  created() {
    // this.data = this.$props.aboutData;
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

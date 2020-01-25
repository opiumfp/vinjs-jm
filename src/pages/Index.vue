<template>
  <Layout>
    <hero
      v-if="$page.pageData.hero.image"
      :id="$page.pageData.hero.id"
      :heroData="$page.pageData.hero"
    ></hero>
    <div class="layer layer-content">
      <section
        class="py-7 vjs-bg-logo vjs-bg-logo-purple text-white section-vh-100 d-flex align-items-center justify-content-center"
        :id="$page.pageData.about.id"
      >
        <about v-if="$page.pageData.about.title" :aboutData="$page.pageData.about"></about>
      </section>
      <section :id="$page.pageData.stat.id">
        <stat v-if="$page.pageData.stat.items" :statData="$page.pageData.stat"></stat>
      </section>
      <section :id="$page.pageData.mediaTiles.id" class="vjs-bg-logo vjs-bg-logo-red text-white">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <page-title
                class="position-relative py-8"
                :title="$page.pageData.mediaTiles.title"
                :subtitle="$page.pageData.mediaTiles.subtitle"
              ></page-title>
            </div>
          </div>
        </div>
        <media-tiles :mediaTilesData="$page.pageData.mediaTiles"></media-tiles>
      </section>
      <section class="vjs-bg-logo vjs-bg-logo-green text-white py-6">
        <div class="anchor-id" id="speakers"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <page-title
                class="position-relative"
                title="Speakers"
                subtitle="First Speakers will be Announced Soon"
              ></page-title>
              <p class="my-4">Have to contribute anything of value? Submit your talk!</p>
              <a
                href="https://forms.gle/jY1gcjCJKCbp8NNS8"
                class="btn btn-primary my-2 my-sm-0"
                target="_blank"
              >Call For Papers</a>
            </div>
          </div>
        </div>
      </section>
      <section class="position-relative">
        <div class="anchor-id" :id="$page.pageData.pricing.id"></div>
        <page-title
          class="pt-5 pb-4"
          :title="$page.pageData.pricing.title"
          :subtitle="$page.pageData.pricing.subtitle"
        ></page-title>
        <pricing :pricingData="$page.pageData.pricing" />
      </section>
      <section class="position-relative">
        <div class="anchor-id" :id="$page.pageData.partners.id"></div>
        <page-title
          class="pt-5 pb-4"
          :title="$page.pageData.partners.title"
          :subtitle="$page.pageData.partners.subtitle"
        ></page-title>
        <partners :partnersData="$page.pageData.partners" mode="xlarge"></partners>
      </section>
      <section>
        <page-title
          class="pt-5 pb-4"
          :title="$page.pageData.friends.title"
          :subtitle="$page.pageData.friends.subtitle"
        ></page-title>
        <partners :partnersData="$page.pageData.friends" mode="large"></partners>
        <div class="text-center pt-5 pb-4">
          <a
            href="mailto:partners@vinnytsiajs.org?subject=VinnytsiaJS%202020%3A%20Became%20a%20Partner"
            class="btn btn-primary my-2 my-sm-0"
          >Became a Partner</a>
        </div>
      </section>
      <hr />
      <section :id="$page.pageData.location.id">
        <page-title class="pt-4 pb-3" title="Location" id="location"></page-title>
        <location :locationData="$page.pageData.location"></location>
      </section>
      <section class="position-relative">
        <div class="anchor-id" id="contact"></div>
        <page-title class="pt-5 pb-3" title="Contact Us"></page-title>
        <contact-us :contactUsData="{}" :socialIconsData="$page.pageData.nav"></contact-us>
      </section>
      <div class="spacer-nav-bottom"></div>
    </div>
  </Layout>
</template>

<page-query>
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
        image (quality:70, width:640, height:360)
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
    partners {
      title
      subtitle
      id
      items {
        active
        fields
        image (quality:90, width:200)
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

</page-query>

<script>
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stat from "@/components/Stat";
import PageTitle from "@/components/PageTitle";
import MediaTiles from "@/components/MediaTiles";
import Pricing from "@/components/Pricing";
import Partners from "@/components/Partners";
import Location from "@/components/Location";
import ContactUs from "@/components/ContactUs";

export default {
  metaInfo: {
    title: "Javascript Open Air Conference 2020",
    meta: [
      { httpEquiv: "X-UA-Compatible", content: "IE=edge,chrome=1" },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,shrink-to-fit=no"
      },
      {
        name: "keywords",
        content:
          "ReactJS, React, React Native, Vue, VueJS, Angular, GraphQL framework,, JavaScript, development, Facebook, vinnitsa, conference, вінниця, винница"
      },
      {
        name: "description",
        content:
          "VinnytsiaJS conference is a full day open-air conference of all things Javascript, gathering Front-end developers across Ukraine and abroad in the heart of the country."
      },
      { property: "og:image", content: "" },
      {
        property: "og:title",
        content: "VinnytsiaJS 2020, UA Frontend Conference"
      },
      { property: "og:type", content: "article" },
      { property: "og:description", content: "" }
    ],
    link: [{ rel: "canonical", href: "http://vinnytsiajs.org/" }]
  },
  components: {
    Hero,
    About,
    Stat,
    PageTitle,
    MediaTiles,
    Pricing,
    Partners,
    Location,
    ContactUs
  },
  mounted() {
    // console.log('this.$page.pageData ::: ', this.$page.pageData)
    // debugger
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.layer {
  position: relative;
  background: $body-bg;
}
</style>

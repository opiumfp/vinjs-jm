<template>
  <Layout>
    <hero v-if="$page.pageData.hero.image" :id="$page.pageData.hero.id" :heroData="$page.pageData.hero"></hero>
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
      <!-- <section :id="$page.pageData.partners.id">
        <page-title
          class="pt-6 pb-4"
          :title="$page.pageData.partners.title"
          :subtitle="$page.pageData.partners.subtitle"
        ></page-title>
        <partners :partnersData="$page.pageData.partners" mode="xlarge"></partners>
      </section> -->
      <section :id="$page.pageData.friends.id">
        <page-title
          class="pt-6 pb-4"
          :title="$page.pageData.friends.title"
          :subtitle="$page.pageData.friends.subtitle"
        ></page-title>
        <partners :partnersData="$page.pageData.friends" mode="large"></partners>
      </section>
      <hr />
      <section :id="$page.pageData.location.id">
        <page-title class="pt-4 pb-3" title="Location" id="location"></page-title>
        <location :locationData="$page.pageData.location"></location>
      </section>
      <section>
        <!-- <hr class="col-12 col-md-6 p-0" /> -->
        <page-title class="pt-5 pb-3" title="Contact Us" id="contact"></page-title>
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
      image (width: 1920, quality:40)
      imagePt (width: 768, quality:40)
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
      image (quality:40)
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
      image (quality:40)
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
import Partners from "@/components/Partners";
import Location from "@/components/Location";
import ContactUs from "@/components/ContactUs";

export default {
  metaInfo: {
    title: "Hello, world!"
  },
  components: {
    Hero,
    About,
    Stat,
    PageTitle,
    MediaTiles,
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

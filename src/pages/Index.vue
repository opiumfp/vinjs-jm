<template>
  <Layout>
    <hero
      v-if="$page.pageData.hero.image"
      :id="$page.pageData.hero.id"
      :heroData="$page.pageData.hero"
    ></hero>
    <!-- vjs-bg-logo-purple -->
    <div class="layer layer-content">
      <!-- <section>
        <hero-pt
          v-if="$page.pageData.heropt.image"
          :id="$page.pageData.heropt.id"
          :heroPTData="$page.pageData.heropt"
        ></hero-pt>
      </section> -->
      <section>
        <hero-pt
          v-if="$page.pageData.herocf.image"
          :id="$page.pageData.herocf.id"
          :heroPTData="$page.pageData.herocf"
          :center="true"
        ></hero-pt>
      </section>
      <section
        class="py-7 vjs-bg-logo vjs-bg-logo-blue text-white section-vh-100 d-flex align-items-center justify-content-center"
        :id="$page.pageData.about.id"
      >
        <about v-if="$page.pageData.about.title" :aboutData="$page.pageData.about"></about>
      </section>
      <!--
      <section :id="$page.pageData.stat.id">
        <stat v-if="$page.pageData.stat.items" :statData="$page.pageData.stat"></stat>
      </section>
      -->
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

      <section class="position-relative pt-5 pb-5">
        <div class="anchor-id" :id="$page.pageData.confspeakers.id"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <page-title
                class="position-relative"
                :title="$page.pageData.confspeakers.title"
                :subtitle="$page.pageData.confspeakers.subtitle"
              ></page-title>
              <speakers class="mt-5" :speakersData="$page.pageData.confspeakers"></speakers>
            </div>
          </div>
        </div>
      </section>

      <section class="position-relative pt-5 pb-5">
        <div class="anchor-id" :id="$page.pageData.speakers.id"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <page-title
                class="position-relative"
                :title="$page.pageData.speakers.title"
                :subtitle="$page.pageData.speakers.subtitle"
              ></page-title>
              <speakers class="mt-5" :speakersData="$page.pageData.speakers"></speakers>
            </div>
          </div>
        </div>
      </section>
      <section class="vjs-bg-logo vjs-bg-logo-blue text-white py-6">
        <div class="anchor-id" id="cfp"></div>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <page-title
                class="position-relative"
                title="Call for Papers"
              ></page-title>
              <p class="my-4 lead">Have to contribute anything of value? Submit your talk!</p>
              <a
                href="https://forms.gle/p7sLi6SnGKMWRSM86"
                class="btn btn-primary my-2 px-5 my-sm-0"
                target="_blank"
              >Submit</a>
            </div>
          </div>
        </div>
      </section>
      <section class="position-relative pt-5 pb-5">
        <div class="anchor-id" :id="$page.pageData.talks.id"></div>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <page-title
                class="position-relative"
                :title="$page.pageData.talks.title"
                :subtitle="$page.pageData.talks.subtitle"
              ></page-title>
              <talks class="mt-5" :talksData="$page.pageData.talks"></talks>
            </div>
          </div>
        </div>
      </section>
      <section class="position-relative pt-5 pb-5">
        <div class="anchor-id" :id="$page.pageData.schedule.id"></div>
        <page-title
                class="position-relative"
                :title="'Conference Schedule'"
        ></page-title>
        <h5 class="text-center pt-3 pt-lg-4">21.08<span class="font-weight-normal"> - VinnytsiaJS 2021 - Open Air Conference</span></h5>
        <div class="h6 text-center"><span>Location: </span><a href="#location">Recreation Base "Butterfly"</a></div>
        <h4 class="h5 text-center py-4">The Conference Schedule Will Be Announced Soon</h4>
        <div class="schedule_slot_talk_buttons text-center mb-5">
          <div class="h5">Join Us:</div><a href="#pricing" class="btn btn-primary mt-2 mx-2">Get Ticket</a>
        </div>
      </section>
      <hr/>
      <section class="position-relative pt-5 pb-5">
        <div class="anchor-id" :id="$page.pageData.schedule.id"></div>
        <page-title
                class="position-relative"
                :title="$page.pageData.schedule.title"
        ></page-title>
        <schedule :scheduleData="$page.pageData.schedule.schedules"></schedule>
      </section>
      <section class="position-relative pb-5">
        <div class="anchor-id" :id="$page.pageData.pricing.id"></div>
        <page-title
          class="pt-5 pb-4"
          :title="$page.pageData.pricing.title"
          :subtitle="$page.pageData.pricing.subtitle"
        ></page-title>
        <pricing :pricingData="$page.pageData.pricing" />
        <!-- <page-title
          class="pt-6 pb-4"
          :title="$page.pageData.pricing.title"
          :subtitle="'Sale of tickets on the event is temporary suspended!'"
        ></page-title> -->
      </section>
      <hr />
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
      </section>
      <section>
        <page-title
          class="pt-5 pb-4"
          :title="$page.pageData.mediapartners.title"
          :subtitle="$page.pageData.mediapartners.subtitle"
        ></page-title>
        <partners :partnersData="$page.pageData.mediapartners" mode="small"></partners>
        <div class="text-center pt-5 pb-4">
          <a
            href="mailto:partners@vinnytsiajs.org?subject=VinnytsiaJS%202020%3A%20Became%20a%20Partner"
            class="btn btn-primary my-2 my-sm-0"
          >Become a Partner</a>
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

    <telegram-widget channel="vinjs" postid="88"></telegram-widget>

  </Layout>
</template>

<page-query>
query Conf {
  pageData: conf (path: "/content/conf/vinnytsiajs-2020") {
    nav {
      button {
        active
        src
        title
      }
      items {
        active
        src
        title
      }
      socialicons {
        items {
          active
          icon
          src
          title
        }
      }
    }
    title
    startDate
    hero {
      id
      title
      subtitle
      date
      image (quality:95)
      imagePt (quality:65)
      button {
        title
        link
      }
    }
    herocf {
      id
      title
      subtitle
      date
      image (quality:95)
      imagePt (quality:65)
      button {
        title
        link
      }
    }
    heropt {
      id
      title
      date
      image (quality:95)
      imagePt (quality:65)
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
    confspeakers {
      title
      subtitle
      id
      items {
        fields {
          bio
          city
          name
          socialLinks {
            src
            icon
          }
          id
          country
          title
          image (quality:90, width:200)
          company
        }
        talk {
          id
          title
          description
        }
      }
    }    
    speakers {
      title
      subtitle
      id
      items {
        fields {
          bio
          city
          name
          socialLinks {
            src
            icon
          }
          id
          country
          title
          image (quality:90, width:200)
          company
        }
        talk {
          id
          title
          description
        }
      }
    }
    talks {
      title
      subtitle
      id
      items {
        talk {
          id
          title
          description
        }
        speaker {
          id
          name
          image (quality:90, width:200)
        }
      }
    }
    schedule {
      title
      id
      schedules {
        schedule {
          collapsed
          location
          locationlink
          description
          fulltitle
          title
          starttime
          endtime
          link
          linkyoutube
          linkdiscord
          linkbuy
          items {
            time
            titlee
            titleedescription
            talk {
              id
              title
              description
            }
            speaker {
              name
              image
              id
            }
            speaker2 {
              name
              image
              id
            }
          }
        }
        active
      }
    }
    partners {
      title
      subtitle
      id
      items {
        active
        fields {
          description
          image (quality:90, width:400)
          src
          title
        }
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
        fields {
          description
          image (quality:90, width:400)
          src
          title
        }
      }
    }
    mediapartners {
      title
      subtitle
      id
      items {
        active
        fields {
          description
          image (quality:90, width:400)
          src
          title
        }
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
import HeroPt from "@/components/HeroPT";
import About from "@/components/About";
import Stat from "@/components/Stat";
import PageTitle from "@/components/PageTitle";
import MediaTiles from "@/components/MediaTiles";
import Pricing from "@/components/Pricing";
import Speakers from "@/components/Speakers";
import Talks from "@/components/Talks";
import Schedule from "@/components/Schedule";
import Partners from "@/components/Partners";
import Location from "@/components/Location";
import ContactUs from "@/components/ContactUs";
import TelegramWidget from "@/components/TelegramWidget";

export default {
  metaInfo: {
    title: "Javascript Open Air Conference and Meetups",
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
          "VinnytsiaJS conference is a full day open-air conference and meetups of all things Javascript, gathering Front-end developers across Ukraine and abroad in the heart of the country."
      },
      { property: "og:image", content: "" },
      {
        property: "og:title",
        content: "VinnytsiaJS, UA Javascript Community"
      },
      { property: "og:type", content: "article" },
      { property: "og:description", content: "" }
    ],
    link: [{ rel: "canonical", href: "http://vinnytsiajs.org/" }]
  },
  components: {
    Hero,
    HeroPt,
    About,
    Stat,
    PageTitle,
    MediaTiles,
    Pricing,
    Speakers,
    Talks,
    Schedule,
    Partners,
    Location,
    ContactUs,
    TelegramWidget
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

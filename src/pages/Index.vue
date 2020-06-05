<template>
  <Layout>
    <main-page :pageData="$page.pageData" lang="en" />
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

</page-query>

<script>
import MainPage from "@/components/MainPage";

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
    MainPage
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

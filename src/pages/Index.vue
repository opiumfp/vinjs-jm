<template>
  <Layout>
    <hero v-if="$page.pageData.hero.image" :heroData="$page.pageData.hero"></hero>
    <section class="mt-5 mb-5" :id="$page.pageData.about.id">
      <about v-if="$page.pageData.about.title" :aboutData="$page.pageData.about"></about>
    </section>
    <section :id="$page.pageData.stat.id">
      <stat v-if="$page.pageData.stat.items" :statData="$page.pageData.stat"></stat>
    </section>
    <section :id="$page.pageData.mediaTiles.id">
      <page-title class="pt-5 pb-4" :title="$page.pageData.mediaTiles.title" :subtitle="$page.pageData.mediaTiles.subtitle"></page-title>
      <media-tiles :mediaTilesData="$page.pageData.mediaTiles"></media-tiles>
    </section>
    <section :id="$page.pageData.partners.id">
      <page-title class="pt-5 pb-4" :title="$page.pageData.partners.title" :subtitle="$page.pageData.partners.subtitle"></page-title>
      <partners :partnersData="$page.pageData.partners"></partners>
    </section>
    <div class="container">

      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <g-image alt="Example image" src="~/favicon.png" width="135" blur="0"/>

      <h1>Hello, world!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
        </p>
      <!-- <ul>
        <li v-for="post in $page.posts.edges" :key="post.id">
          <g-link :to="post.node.path">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul> -->


      <ul>
        <li><g-link to="/blog-html/blog-post-one">Blog Post One</g-link></li>
        <li><g-link to="/blog-html/blog-post-two">Blog Post Two</g-link></li>
        <li><g-link to="/blog-html/blog-post-three">Blog Post Three</g-link></li>
      </ul>

      <p class="home-links">
        <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
        <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
      </p>
    </div>

  </Layout>
</template>

<page-query>
query Conf {
  pageData: conf (path: "/content/conf/vinnytsiajs-2020") {
    title
    startDate
    hero {
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
        image (quality:40, width:640, height:360)
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
        parnter
      }
    }
  }
}

</page-query>

<script>
import Hero from "@/components/Hero"
import About from "@/components/About"
import Stat from "@/components/Stat"
import PageTitle from "@/components/PageTitle"
import MediaTiles from "@/components/MediaTiles"
import Partners from "@/components/Partners"

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Hero,
    About,
    Stat,
    PageTitle,
    MediaTiles,
    Partners
  },
  mounted() {
    // console.log('this.$page.pageData ::: ', this.$page.pageData)
    // debugger
  },
}
</script>

<style scoped lang="scss">

</style>

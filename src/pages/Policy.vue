<template>
  <Layout>
    <div class="layer layer-content">
      <section>
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <div class="btn-group">
                <button class="btn btn-secondary policy_btn-lang flex align-items-center" @click="toggleLang('EN')"><img class="flag" src="../../assets/images/flags/en.svg"><span class="label">EN</span></button>
                <button class="btn btn-secondary policy_btn-lang flex align-items-center" @click="toggleLang('UA')"><img class="flag" src="../../assets/images/flags/ua.svg"><span class="label">UA</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-vh-100">
        <div class="position-relative">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="policy_content-en">
                  <page-title class="pt-5 pb-5" :title="$page.policyData.title"></page-title>
                  <div class="text-center pb-5">
                    <vue-markdown>{{ $page.policyData.description }}</vue-markdown>
                  </div>
                </div>
                <div class="policy_content-ua">
                    <page-title class="pt-5 pb-5" :title="$page.policyData.titleUA"></page-title>
                    <div class="text-center pb-5">
                      <vue-markdown>{{ $page.policyData.descriptionUA }}</vue-markdown>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr>
      <section class="position-relative pb-5">
        <div class="anchor-id" id="contact"></div>
        <page-title class="pt-5 pb-3" title="Contact Us"></page-title>
        <contact-us :contactUsData="{}" :socialIconsData="$page.pageData.nav"></contact-us>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query Policy {
  policyData: policy (path: "/content/policy/policy") {
    title
    titleUA
    description
    descriptionUA
  }
  pageData: conf (path: "/content/conf/vinnytsiajs-2022-conference") {
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
  }
}

</page-query>

<script>
import PageTitle from "@/components/PageTitle";
import ContactUs from "@/components/ContactUs";
import VueMarkdown from "vue-markdown";

export default {
  metaInfo: {
    title: 'Policy'
  },
  components: {
    PageTitle,
    ContactUs,
    VueMarkdown
  },
  mounted() {
    // console.log('this.$page.pageData ::: ', this.$page.pageData)
    // debugger
    // window.scroll(0,1)
  },
  methods: {
    toggleLang(lang) {
      document.querySelector('html').setAttribute('page-lang', lang);
    }
  },
}
</script>

<style lang="scss">
    @import "assets/styles/base.scss";
    
    .layout .vjs-navbar {
      background-color: rgba(38, 38, 38, 0.7) !important;
    }
</style>

<style scoped lang="scss">
  @import "assets/styles/base.scss";

  html,
  html[page-lang=EN] {
    .policy_content {
      &-en {
        opacity: block;
      }
      &-ua {
        display: none;
      }
    }
  }

  html[page-lang=UA] {
    .policy_content {
      &-en {
        display: none;
      }
      &-ua {
        display: block;
      }
    }
  }

  .policy {
    &_btn-lang {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      .flag {
        width: 1.5em;
        height: 1.5em;
        margin-right: 0.5em;
      }
    }
  }

  @include media-breakpoint-down(md) {
    .layout {
      padding-top: 72px;
    }
  }

</style>
    

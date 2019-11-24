<template>
  <BlogLayout>
    <h1>{{$page.post.title}}</h1>
    <!-- <img :src="$page.post.featuredImage" alt="" width="50"> -->
    <!-- <g-image src="../../static/uploads/wp1.jpg" width="500" height="500" fit="contain"/> -->
    <!-- <g-image :src="$page.post.featuredImage" /> -->
    <featured-image :image="$page.post.featuredImage" />
    <div class="markdown-body" v-html="$page.post.content" />
  </BlogLayout>
</template>

<page-query>
  query Post ($path: String!) {
    post: post (path: $path){
      title
      content
      featuredImage (width: 300, height: 200, quality: 90)
    }
  }
</page-query>

<script>
import FeaturedImage from "@/components/FeaturedImage"

export default {
  components: {
    FeaturedImage
  },
  metaInfo() {
    return {
      title: this.$page.post.title
    }
  },
  created() {
    // debugger
  },
}
</script>
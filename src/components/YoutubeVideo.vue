<template>
  <div class="youtube-video" >
    <iframe width="100%" height="auto" @click="showVideo()" 
      :src="`https://www.youtube.com/embed/${ this.getId(this.$props.src) }`"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</template>

<script>

export default {
    props: {
        src: {
          type: String,
          required: true
        }
    },
    methods: {
      getId (url) {
        // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#]*).*/
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        let result = 'error'

        if (match && match[2].length === 11) {
          result = match[2]
        }
        return result
      },
      showVideo () {
        console.log('clicked');
      }
    },
    mounted() {
      // debugger
    },
}
</script>


<style scoped lang="scss">
  .youtube-video {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  .youtube-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
